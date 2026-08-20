'use client'
import type { FC } from 'react'
import React, { useEffect, useRef } from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import Textarea from 'rc-textarea'
import { PaperClipIcon } from '@heroicons/react/24/outline'
import s from './style.module.css'
import Answer from './answer'
import Question from './question'
import type { FeedbackFunc } from './type'
import type { ChatItem, VisionFile, VisionSettings } from '@/types/app'
import Tooltip from '@/app/components/base/tooltip'
import Toast from '@/app/components/base/toast'

export interface IChatProps {
  chatList: ChatItem[]
  feedbackDisabled?: boolean
  isHideSendInput?: boolean
  onFeedback?: FeedbackFunc
  checkCanSend?: () => boolean
  onSend?: (message: string, files: VisionFile[]) => void
  useCurrentUserAvatar?: boolean
  isResponding?: boolean
  controlClearQuery?: number
  visionConfig?: VisionSettings
  fileConfig?: any
}

const Chat: FC<IChatProps> = ({
  chatList,
  feedbackDisabled = false,
  isHideSendInput = false,
  onFeedback,
  checkCanSend,
  onSend = () => { },
  useCurrentUserAvatar,
  isResponding,
  controlClearQuery,
}) => {
  const { t } = useTranslation()
  const { notify } = Toast
  const isUseInputMethod = useRef(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [query, setQuery] = React.useState('')
  const queryRef = useRef('')

  const handleContentChange = (e: any) => {
    const value = e.target.value
    setQuery(value)
    queryRef.current = value
  }

  const logError = (message: string) => {
    notify({ type: 'error', message, duration: 3000 })
  }

  const valid = () => {
    const query = queryRef.current
    if (!query || query.trim() === '') {
      logError(t('app.errorMessage.valueOfVarRequired'))
      return false
    }
    return true
  }

  useEffect(() => {
    if (controlClearQuery) {
      setQuery('')
      queryRef.current = ''
    }
  }, [controlClearQuery])

  const handleSend = () => {
    if (!valid() || (checkCanSend && !checkCanSend())) { return }

    onSend(queryRef.current, [])

    if (!isResponding) {
      setQuery('')
      queryRef.current = ''
    }
  }

  const handleKeyUp = (e: any) => {
    if (e.code === 'Enter') {
      e.preventDefault()
      if (!e.shiftKey && !isUseInputMethod.current) { handleSend() }
    }
  }

  const handleKeyDown = (e: any) => {
    isUseInputMethod.current = e.nativeEvent.isComposing
    if (e.code === 'Enter' && !e.shiftKey) {
      const result = query.replace(/\n$/, '')
      setQuery(result)
      queryRef.current = result
      e.preventDefault()
    }
  }

  const suggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    queryRef.current = suggestion
    handleSend()
  }

  // Handler opsional ketika ikon klip kertas diklik
  const handleAttachClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={cn(!feedbackDisabled && 'px-3.5', 'h-full')}>
      {/* Chat List */}
      <div className="h-full space-y-[30px]">
        {chatList && chatList.map((item) => {
          if (item.isAnswer) {
            const isLast = item.id === chatList[chatList.length - 1].id
            return <Answer
              key={item.id}
              item={item}
              feedbackDisabled={feedbackDisabled}
              onFeedback={onFeedback}
              isResponding={isResponding && isLast}
              suggestionClick={suggestionClick}
            />
          }
          return (
            <Question
              key={item.id}
              id={item.id}
              content={item.content}
              useCurrentUserAvatar={useCurrentUserAvatar}
              imgSrcs={(item.message_files && item.message_files?.length > 0) ? item.message_files.map(item => item.url) : []}
            />
          )
        })}
      </div>

      {/* Input Box: Angka 0 Dihapus & Tombol Klip Kertas Ditambahkan */}
      {
        !isHideSendInput && (
          <div className='fixed z-10 bottom-0 left-1/2 transform -translate-x-1/2 pc:ml-[122px] tablet:ml-[96px] mobile:ml-0 pc:w-[794px] tablet:w-[794px] max-w-full mobile:w-full px-3.5 pb-4'>
            <div className='p-[5.5px] max-h-[150px] bg-slate-900/80 backdrop-blur-xl border-[1.5px] border-slate-700/80 rounded-xl overflow-y-auto shadow-2xl transition-all relative'>
              <Textarea
                className='block w-full px-3 pr-[88px] py-[7px] leading-5 max-h-none text-base text-slate-100 placeholder-slate-400 bg-transparent outline-none appearance-none resize-none'
                value={query}
                onChange={handleContentChange}
                onKeyUp={handleKeyUp}
                onKeyDown={handleKeyDown}
                placeholder="Ketik pesan..."
                autoSize
              />

              {/* Input file tersembunyi untuk lampiran */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => {
                  // Tambahkan logika handle file lokal di sini jika diperlukan
                  console.log(e.target.files)
                }}
              />

              <div className="absolute bottom-2 right-4 flex items-center space-x-2 h-8">
                {/* Tombol Klip Kertas */}
                <button
                  type="button"
                  onClick={handleAttachClick}
                  className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg transition cursor-pointer"
                  title="Lampirkan file"
                >
                  <PaperClipIcon className="w-5 h-5" />
                </button>

                {/* Tombol Kirim (Pesawat Kertas) */}
                <Tooltip
                  selector='send-tip'
                  htmlContent={
                    <div className="text-xs text-slate-200 p-1">
                      <div>{t('common.operation.send')} Enter</div>
                      <div>{t('common.operation.lineBreak')} Shift Enter</div>
                    </div>
                  }
                >
                  <div
                    onClick={handleSend}
                    className={`${s.sendBtn} w-8 h-8 cursor-pointer rounded-md transition-opacity hover:opacity-80`}
                  ></div>
                </Tooltip>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default React.memo(Chat)
