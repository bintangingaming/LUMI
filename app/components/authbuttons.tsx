'use client'
import React, { useState, useEffect } from 'react'
import { supabase } from '@/app/lib/supabase' // sesuaikan path import Supabase kamu

const AuthButtons = ({ onOpenModal }: { onOpenModal: (type: string) => void }) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Cek apakah user sedang aktif login saat halaman dimuat
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // 2. Pantau perubahan status (kalau user login atau logout secara real-time)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    window.location.reload()
  }

  if (loading) { return null }

  // KALO UDAH LOGIN: Tombol Login/Sign Up otomatis HILANG, diganti info user & tombol Logout
  if (user) {
    return (
      <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl shadow-lg">
        <div className="flex items-center gap-2">
          {user.user_metadata?.avatar_url && (
            <img
              src={user.user_metadata.avatar_url}
              alt="Avatar"
              className="w-7 h-7 rounded-full border border-slate-700"
            />
          )}
          <span className="text-slate-200 text-xs font-medium max-w-[120px] truncate">
            {user.user_metadata?.full_name || user.email}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="px-2.5 py-1 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-all"
        >
          Logout
        </button>
      </div>
    )
  }

  // KALO BELUM LOGIN: Tampilkan tombol Login & Sign Up seperti biasa
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onOpenModal('login')}
        className="px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl border border-slate-700 transition-all"
      >
        Login
      </button>
      <button
        onClick={() => onOpenModal('signup')}
        className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all shadow-lg shadow-indigo-500/20"
      >
        Sign Up
      </button>
    </div>
  )
}

export default AuthButtons
