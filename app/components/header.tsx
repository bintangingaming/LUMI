'use client'
import type { FC } from 'react'
import React, { useState, useEffect, useRef } from 'react'
import {
  Bars3Icon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid'
import AppIcon from '@/app/components/base/app-icon'
import { supabase } from '@/app/lib/supabase'

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
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)
    }

    checkUserSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  // Deklarasi variabel pakai if-else murni
  let userAvatar = 'https://github.com/shadcn.png'
  if (user) {
    if (user.user_metadata) {
      if (user.user_metadata.avatar_url) {
        userAvatar = user.user_metadata.avatar_url
      } else if (user.user_metadata.picture) {
        userAvatar = user.user_metadata.picture
      }
    }
  }

  let userName = 'Pengguna'
  if (user) {
    if (user.user_metadata) {
      if (user.user_metadata.full_name) {
        userName = user.user_metadata.full_name
      }
    }
    if (userName === 'Pengguna' && user.email) {
      userName = user.email.split('@')[0]
    }
  }

  // Render komponen kanan pakai if-else murni, TANPA ternary di JSX
  let rightContent = (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 text-xs font-semibold px-3.5 py-1.5 rounded-full transition shadow-sm cursor-pointer"
    >
      <span>Masuk Google</span>
    </button>
  )

  if (user) {
    rightContent = (
      <div>
        <button
          type="button"
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="hidden sm:flex items-center gap-2 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 px-3 py-1.5 rounded-full text-xs text-slate-300 transition cursor-pointer"
        >
          <img
            src={userAvatar}
            alt="Avatar"
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="font-medium text-slate-200 max-w-[120px] truncate">
            {userName}
          </span>
          <span className="text-[10px] text-slate-400">▼</span>
        </button>

        {showUserMenu && (
          <div className="absolute right-0 mt-2 w-44 bg-[#0b0f19] border border-slate-800 rounded-xl shadow-2xl p-1.5 z-50 text-xs text-slate-200">
            <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
              <p className="font-medium text-white truncate">{userName}</p>
              <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 hover:bg-red-500/10 text-red-400 rounded-lg transition cursor-pointer flex items-center gap-2"
            >
              <span>🚪</span> Logout
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="shrink-0 flex items-center justify-between h-12 px-4 bg-transparent relative z-40">
      {/* Bagian Kiri */}
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

      {/* Bagian Kanan */}
      <div className="flex items-center space-x-3">
        {isMobile && (
          <div className='flex items-center justify-center h-8 w-8 cursor-pointer' onClick={() => onCreateNewChat?.()} >
            <PencilSquareIcon className="h-4 w-4 text-slate-400" />
          </div>
        )}

        {!loading && (
          <div className="relative" ref={menuRef}>
            {rightContent}
          </div>
        )}
      </div>
    </div>
  )
}

export default React.memo(Header)
