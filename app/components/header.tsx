'use client'
import type { FC } from 'react'
import React from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'

export interface IHeaderProps {
  title: string
  isMobile?: boolean
  onShowSideBar?: () => void
  onCreateNewChat?: () => void
  onOpenAuthModal?: () => void // <-- Ditambahkan agar sinkron dengan index.tsx
}

const Header: FC<IHeaderProps> = ({
  title,
  isMobile,
  onShowSideBar,
  onCreateNewChat,
  onOpenAuthModal,
}) => {
  return (
    <div className='flex items-center justify-between w-full h-16 px-4 border-b border-slate-800 bg-slate-950'>
      <div className='flex items-center gap-3'>
        {isMobile && (
          <button
            onClick={onShowSideBar}
            className='p-2 text-slate-400 hover:text-slate-100 rounded-lg'
          >
            <Bars3Icon className='w-6 h-6' />
          </button>
        )}
        <h1 className='text-lg font-semibold text-slate-100 truncate'>{title}</h1>
      </div>

      <div className='flex items-center gap-3'>
        {/* Tombol Login yang memicu fungsi onOpenAuthModal */}
        {onOpenAuthModal && (
          <button
            onClick={onOpenAuthModal}
            className='px-4 py-2 text-sm font-medium bg-teal-600 hover:bg-teal-500 text-white rounded-xl transition-colors cursor-pointer'
          >
            Login
          </button>
        )}
      </div>
    </div>
  )
}

export default React.memo(Header)
