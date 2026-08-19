import type { FC } from 'react'
import React from 'react'
import {
  Bars3Icon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid'
import AppIcon from '@/app/components/base/app-icon'

export interface IHeaderProps {
  title: string
  isMobile?: boolean
  onShowSideBar?: () => void
  onCreateNewChat?: () => void
}

const Header: FC<IHeaderProps> = ({
  title,
  isMobile,
  onShowSideBar,
  onCreateNewChat,
}) => {
  return (
    /* 1. Hapus border-b dan border-slate-800 agar garisnya hilang 
       2. Ganti bg-slate-900 jadi transparan atau biarkan sesuai background utama kamu */
    <div className="shrink-0 flex items-center justify-between h-12 px-4 bg-transparent">
      
      {/* Bagian Kiri: Logo LUMI dipaksa langsung ke ujung kiri */}
      <div className='flex items-center space-x-2'>
        {isMobile && (
          <div
            className='flex items-center justify-center h-8 w-8 cursor-pointer mr-1'
            onClick={() => onShowSideBar?.()}
          >
            <Bars3Icon className="h-4 w-4 text-slate-400" />
          </div>
        )}
        <AppIcon size="small" />
        <div className="text-sm text-slate-100 font-bold">{title}</div>
      </div>

      {/* Bagian Kanan: Tempat tombol Login & Sign Up kamu nantinya */}
      <div className="flex items-center">
        {isMobile && (
          <div className='flex items-center justify-center h-8 w-8 cursor-pointer' onClick={() => onCreateNewChat?.()} >
            <PencilSquareIcon className="h-4 w-4 text-slate-400" />
          </div>
        )}
      </div>
    </div>
  )
}

export default React.memo(Header)