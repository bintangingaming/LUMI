'use client'
import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
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

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })
  }

  return (
    <div className="shrink-0 flex items-center justify-between h-12 px-4 bg-transparent">
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
          <div>
            {user
              ? (
                <div className="hidden sm:flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 px-3 py-1 rounded-full text-xs text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                </div>
              )
              : (
                <button
                  onClick={handleGoogleLogin}
                  className="flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 text-xs font-semibold px-3.5 py-1.5 rounded-full transition shadow-sm cursor-pointer"
                >
                  <span>Masuk Google</span>
                </button>
              )}
          </div>
        )}
      </div>
    </div>
  )
}

export default React.memo(Header)
