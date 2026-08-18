'use client'
import type { FC } from 'react'
import React from 'react'
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
  list = [],
}) => {
  return (
    <aside className="relative z-30 flex flex-col h-full bg-[#0B0F19] border-r border-slate-800/50 text-slate-100 w-16 flex-shrink-0 items-center justify-between py-4 select-none pointer-events-auto">
      {/* Bagian Atas */}
      <div className="flex flex-col items-center gap-4 w-full">
        {/* Logo Sparkle */}
        <div className="p-2 text-amber-400">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
        </div>

        {/* Tombol New Chat */}
        <button
          type="button"
          onClick={() => onCurrentIdChange('')}
          title="New Chat"
          className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-all cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>

        {/* List History Chat (Ikon Only) */}
        <div className="flex flex-col items-center gap-1.5 w-full px-2 overflow-y-auto max-h-[55vh] scrollbar-none">
          {list && list.length > 0 && list.map((item) => {
            const isCurrent = item.id === currentId
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onCurrentIdChange(item.id)}
                title={item.name}
                className={classNames(
                  'p-2.5 rounded-xl transition-all relative group cursor-pointer',
                  isCurrent
                    ? 'bg-indigo-600/30 text-indigo-400 font-medium'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                )}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </button>
            )
          })}
        </div>
      </div>

      {/* Bagian Bawah */}
      <div className="flex flex-col items-center gap-3 w-full">
        {/* Settings */}
        <button
          type="button"
          title="Settings"
          className="p-2.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* Profil Avatar */}
        <button type="button" className="w-8 h-8 rounded-full overflow-hidden border border-slate-700 hover:ring-2 hover:ring-slate-500 transition cursor-pointer">
          <img src="https://github.com/shadcn.png" alt="Profile" className="w-full h-full object-cover" />
        </button>
      </div>
    </aside>
  )
}

export default React.memo(Sidebar)