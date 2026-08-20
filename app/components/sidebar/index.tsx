'use client'
import type { FC } from 'react'
import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Camera } from 'lucide-react'
import { supabase } from '@/app/lib/supabase'

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
  const [showSettings, setShowSettings] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchInput, setShowSearchInput] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // State Profil User yang tersinkronisasi dengan Supabase Auth
  const [profile, setProfile] = useState({
    displayName: 'Pengguna LUMI',
    username: 'lumi_user',
    grade: 'Siswa / Umum',
    avatar: 'https://github.com/shadcn.png',
  })

  // Ambil data user aktif dari Supabase saat komponen dimuat
  useEffect(() => {
    const fetchUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        const user = session.user
        const meta = user.user_metadata
        setProfile({
          displayName: meta?.full_name || meta?.name || user.email?.split('@')[0] || 'Pengguna LUMI',
          username: user.email?.split('@')[0] || 'lumi_user',
          grade: 'Siswa / Umum',
          avatar: meta?.avatar_url || meta?.picture || 'https://github.com/shadcn.png',
        })
      }
    }
    fetchUserSession()
  }, [])

  // Handler untuk upload/ganti foto profil lokal jika diinginkan
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    setShowEditProfile(false)
  }

  const [aiSettings, setAiSettings] = useState({
    mode: 'Metode Socrates',
    memoryLimit: '10 Pesan',
  })

  const handleNewChat = () => {
    onCurrentIdChange('')
    setShowProfileMenu(false)
  }

  const filteredList = list.filter(item =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  return (
    <aside className="relative z-30 flex flex-col h-screen max-h-screen bg-[#111827] text-slate-200 w-[280px] flex-shrink-0 border-r border-slate-800/40 select-none pointer-events-auto">
      {/* MENU ATAS UTAMA */}
      <div className="p-3 space-y-1 flex-shrink-0">
        <button
          type="button"
          onClick={handleNewChat}
          className="flex items-center w-full gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-100 hover:bg-slate-800/60 transition-colors cursor-pointer group"
        >
          <svg className="w-5 h-5 text-slate-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>Percakapan baru</span>
        </button>

        <button
          type="button"
          onClick={() => setShowSearchInput(!showSearchInput)}
          className="flex items-center w-full gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 transition-colors cursor-pointer group"
        >
          <svg className="w-5 h-5 text-slate-400 group-hover:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Telusuri percakapan</span>
        </button>

        {showSearchInput && (
          <div className="px-1 py-1">
            <input
              type="text"
              placeholder="Cari chat..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#0b0f19] text-xs text-white rounded-lg px-3 py-2 border border-slate-700/60 focus:outline-none focus:border-indigo-500"
            />
          </div>
        )}

        <button
          type="button"
          className="flex items-center w-full gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 transition-colors cursor-pointer group"
        >
          <svg className="w-5 h-5 text-slate-400 group-hover:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>Koleksi</span>
        </button>
      </div>

      <div className="px-4 pt-2 pb-1 flex-shrink-0">
        <span className="text-xs font-semibold text-slate-400 tracking-wide">Terbaru</span>
      </div>

      {/* DAFTAR PERCAKAPAN (Bisa di-scroll ke atas/bawah dengan bebas) */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1 min-h-0">
        {filteredList && filteredList.length > 0
          ? (
            filteredList.map((item) => {
              const isCurrent = item.id === currentId
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onCurrentIdChange(item.id)}
                  title={item.name}
                  className={classNames(
                    'w-full text-left px-3.5 py-2.5 rounded-full text-sm transition-all cursor-pointer block truncate',
                    isCurrent
                      ? 'bg-slate-800 text-white font-medium shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800/40 hover:text-slate-100',
                  )}
                >
                  {item.name || 'Percakapan Tanpa Judul'}
                </button>
              )
            })
          )
          : (
            <div className="px-3 py-4 text-xs text-slate-500 italic">
              Belum ada riwayat percakapan.
            </div>
          )}
      </div>

      {/* FOOTER BAWAH */}
      <div className="p-3 border-t border-slate-800/60 flex items-center justify-between relative flex-shrink-0">
        <button
          type="button"
          onClick={() => {
            setShowProfileMenu(!showProfileMenu)
            setShowSettings(false)
          }}
          className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-800/60 transition w-full text-left cursor-pointer"
        >
          <img src={profile.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover border border-slate-700" />
          <div className="truncate flex-1">
            <div className="text-xs font-medium text-white truncate">{profile.displayName}</div>
            <div className="text-[10px] text-slate-400 truncate">@{profile.username}</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setShowSettings(!showSettings)
            setShowProfileMenu(false)
          }}
          title="Pengaturan"
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* POPOVER PROFIL */}
        {showProfileMenu && (
          <div className="absolute bottom-16 left-3 w-56 bg-[#0b0f19] border border-slate-800 rounded-xl shadow-2xl p-2 z-50 text-xs text-slate-200">
            <button
              onClick={() => {
                setShowProfileMenu(false)
                setShowEditProfile(true)
              }}
              className="w-full text-left px-3 py-2 hover:bg-slate-800 rounded-lg transition text-slate-300 hover:text-white cursor-pointer flex items-center gap-2"
            >
              <span>✏️</span> Edit Profil Saya
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 hover:bg-red-500/10 text-red-400 rounded-lg transition cursor-pointer flex items-center gap-2 mt-1"
            >
              <span>🚪</span> Logout
            </button>
          </div>
        )}

        {/* MODAL EDIT PROFIL */}
        {showEditProfile && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1e2330] border border-slate-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl text-slate-100">
              <div className="flex justify-between items-center pb-4 mb-2">
                <h3 className="text-xl font-semibold tracking-wide">Edit Profile</h3>
                <button onClick={() => setShowEditProfile(false)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">✕</button>
              </div>

              <div className="flex flex-col items-center justify-center mb-6">
                <div
                  className="relative group cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <img
                    src={profile.avatar}
                    alt="Avatar Preview"
                    className="h-24 w-24 rounded-full object-cover border-2 border-indigo-600 shadow-inner"
                  />
                  <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 border border-slate-700 text-slate-300 shadow-md transition-transform group-hover:scale-105">
                    <Camera className="w-4 h-4" />
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex flex-col rounded-xl bg-slate-900/60 p-3 border border-slate-800">
                  <label className="text-slate-400 mb-1 font-medium">Display name</label>
                  <input
                    type="text"
                    value={profile.displayName}
                    onChange={e => setProfile({ ...profile, displayName: e.target.value })}
                    className="bg-transparent text-slate-100 outline-none text-sm font-medium"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end space-x-3 pt-2">
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="rounded-full px-5 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition-colors shadow-lg cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL PENGATURAN */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111827] border border-slate-800 rounded-2xl w-full max-w-md p-5 relative shadow-2xl text-left">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-white">Pengaturan AI</h3>
                <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="mt-5 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium transition cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default React.memo(Sidebar)
