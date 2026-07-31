'use client'
import type { FC } from 'react'
import React from 'react'
import cn from 'classnames'

export interface IQuestionProps {
  id: string
  content: string
  useCurrentUserAvatar?: boolean
  imgSrcs?: string[]
}

const Question: FC<IQuestionProps> = ({
  content,
  useCurrentUserAvatar,
  imgSrcs,
}) => {
  return (
    <div className='flex justify-end mb-6 group'>
      <div className='flex items-start max-w-[85%] gap-3 flex-row-reverse'>
        {/* Avatar User */}
        <div className='w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md'>
          {useCurrentUserAvatar ? 'U' : 'ME'}
        </div>

        {/* Bubble Chat Content */}
        <div className='flex flex-col items-end space-y-2'>
          <div className='px-4 py-3 bg-indigo-600/90 text-slate-100 rounded-2xl rounded-tr-none border border-indigo-500/30 shadow-md backdrop-blur-md text-sm leading-relaxed whitespace-pre-wrap break-words'>
            {content}
          </div>

          {/* Image Attachments */}
          {imgSrcs && imgSrcs.length > 0 && (
            <div className='flex flex-wrap gap-2 justify-end'>
              {imgSrcs.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt='User attachment'
                  className='max-w-[200px] max-h-[200px] rounded-xl border border-slate-700 object-cover shadow-md'
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default React.memo(Question)
