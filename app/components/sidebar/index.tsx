'use client'
import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

export interface ISidebarProps {
  currentId: string
  onCurrentIdChange: (id: string) => void
  list: any[]
  onMoreAction?: (id: string) => void
}

const Sidebar: FC<ISidebarProps> = ({
  currentId,
  onCurrentIdChange,
  list,
}) => {
  const { t } = useTranslation()
  const copyRight = '© '

  return (
    <div className='flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-100 w-[260px] flex-shrink-0'>
      {/* header / new chat */}
      <div className='p-4'>
        <button
          onClick={() => onCurrentIdChange('')}
          className='flex items-center w-full gap-2 px-4 py-2.5 text-sm font-medium text-slate-100 bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors shadow-sm'
        >
          <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
          </svg>
          <span>{t('app.chat.newChat') || 'New chat'}</span>
        </button>
      </div>

      {/* conversation list */}
      <nav className='flex-1 overflow-y-auto px-3 py-2 space-y-1'>
        {list.map((item) => {
          const isCurrent = item.id === currentId
          return (
            <div
              key={item.id}
              onClick={() => onCurrentIdChange(item.id)}
              className={classNames(
                'flex items-center w-full px-3 py-2.5 rounded-xl text-sm cursor-pointer transition-colors group',
                isCurrent ? 'bg-slate-800 text-indigo-400 font-medium' : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-100'
              )}
            >
              <svg
                className={classNames(
                  isCurrent ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-300',
                  'mr-3 h-5 w-5 flex-shrink-0'
                )}
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' />
              </svg>
              <span className='truncate'>{item.name}</span>
            </div>
          )
        })}
      </nav>

      {/* footer */}
      <div className='p-4 border-t border-slate-800 text-xs text-slate-500'>
        <div>{copyRight} {(new Date()).getFullYear()} LUMI</div>
      </div>
    </div>
  )
}

export default React.memo(Sidebar)
