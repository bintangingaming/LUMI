'use client'
import type { FC } from 'react'
import React from 'react'
import cn from 'classnames'

export interface IAnswerProps {
  item: any
  feedbackDisabled?: boolean
  onFeedback?: any
  isResponding?: boolean
  suggestionClick?: (suggestion: string) => void
}

const Answer: FC<IAnswerProps> = ({
  item,
  isResponding,
  suggestionClick,
}) => {
  return (
    <div className='flex justify-start mb-6 group'>
      <div className='flex items-start max-w-[85%] gap-3'>
        {/* Avatar AI */}
        <div className='w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 text-xs font-bold flex-shrink-0 shadow-md'>
          🤖
        </div>

        {/* Bubble Chat Content */}
        <div className='flex flex-col space-y-3 w-full'>
          <div className='px-5 py-4 bg-slate-800/90 text-slate-100 rounded-2xl rounded-tl-none border border-slate-700/80 shadow-xl backdrop-blur-xl text-sm leading-relaxed whitespace-pre-wrap break-words'>
            {item.content || (isResponding && <span className='animate-pulse text-indigo-400'>Sedang berpikir...</span>)}
          </div>

          {/* Prompt Suggestions (Tombol Rekomendasi) */}
          {item.suggested_questions && item.suggested_questions.length > 0 && (
            <div className='flex flex-wrap gap-2 pt-1'>
              {item.suggested_questions.map((quest: string, index: number) => (
                <button
                  key={index}
                  onClick={() => suggestionClick && suggestionClick(quest)}
                  className='px-3.5 py-1.5 text-xs bg-slate-800/80 hover:bg-slate-700 text-indigo-300 border border-slate-700/80 rounded-xl transition-all shadow-sm'
                >
                  {quest}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default React.memo(Answer)