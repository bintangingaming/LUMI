'use client'
import type { FC } from 'react'
import React, { useState } from 'react'
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
  const [showSettings, setShowSettings] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchInput, setShowSearchInput] = useState(false)

  // State Profil User
  const [profile, setProfile] = useState({
    name: 'Siswa LUMI',
    grade: '12 SMA - IPA',
    avatar: 'https://github.com/shadcn.png'
  })

  // State Pengaturan AI
  const [aiSettings, setAiSettings] = useState({
    mode: 'Metode Socrates',
    memoryLimit: '10 Pesan',
    systemPrompt: 'Bimbing siswa SMA memecahkan masalah dengan pertanyaan kritis.',
  })

  const handleNewChat = () => {
    onCurrentIdChange('')
    setShowProfileMenu(false)
  }

  // Filter daftar chat berdasarkan pencarian
  const filteredList = list.filter((item) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <aside className="relative z-30 flex flex-col h-full bg-[#1e1f22] text-slate-200 w-[280px] flex-shrink-0 border-r border-slate-800/40 select-none pointer-events-auto">
      {/* MENU ATAS UTAMA */}
      <div className="p-3 space-y-1">
        {/* Percakapan Baru */}
        <button
          type="button"
          onClick={handleNewChat}
          className="flex items-center w-full gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-100 hover:bg-[#2b2d31] transition-colors cursor-pointer group"
        >
          <svg className="w-5 h-5 text-slate-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>Percakapan baru</span>
        </button>

        {/* Telusuri Percakapan */}
        <button
          type="button"
          onClick={() => setShowSearchInput(!showSearchInput)}
          className="flex items-center w-full gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-slate-100 hover:bg-[#2b2d31] transition-colors cursor-pointer group"
        >
          <svg className="w-5 h-5 text-slate-400 group-hover:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Telusuri percakapan</span>
        </button>

        {/* Input Pencarian jika di-klik */}
        {showSearchInput && (
          <div className="px-1 py-1">
            <input
              type="text"
              placeholder="Cari chat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111214] text-xs text-white rounded-lg px-3 py-2 border border-slate-700/60 focus:outline-none focus:border-indigo-500"
            />
          </div>
        )}

        {/* Koleksi */}
        <button
          type="button"
          className="flex items-center w-full gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-slate-100 hover:bg-[#2b2d31] transition-colors cursor-pointer group"
        >
          <svg className="w-5 h-5 text-slate-400 group-hover:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>Koleksi</span>
        </button>
      </div>

      {/* HEADER SECTION TERBARU */}
      <div className="px-4 pt-4 pb-2">
        <span className="text-xs font-semibold text-slate-400 tracking-wide">Terbaru</span>
      </div>

      {/* DAFTAR PERCAKAPAN (LIST ITEM CHAT) */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1 scrollbar-none">
        {filteredList && filteredList.length > 0 ? (
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
                    ? 'bg-[#2b2d31] text-white font-medium shadow-sm'
                    : 'text-slate-300 hover:bg-[#2b2d31]/60 hover:text-slate-100'
                )}
              >
                {item.name || 'Percakapan Tanpa Judul'}
              </button>
            )
          })
        ) : (
          <div className="px-3 py-4 text-xs text-slate-500 italic">
            Belum ada riwayat percakapan.
          </div>
        )}
      </div>

      {/* FOOTER BAWAH: PROFIL & SETTINGS */}
      <div className="p-3 border-t border-slate-800/60 flex items-center justify-between relative">
        <button
          type="button"
          onClick={() => {
            setShowProfileMenu(!showProfileMenu)
            setShowSettings(false)
          }}
          className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-[#2b2d31] transition w-full text-left cursor-pointer"
        >
          <img src={profile.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover border border-slate-700" />
          <div className="truncate flex-1">
            <div className="text-xs font-medium text-white truncate">{profile.name}</div>
            <div className="text-[10px] text-slate-400 truncate">{profile.grade}</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setShowSettings(!showSettings)
            setShowProfileMenu(false)
          }}
          title="Pengaturan"
          className="p-2 text-slate-400 hover:text-white hover:bg-[#2b2d31] rounded-xl transition cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* POPOVER PROFIL */}
        {showProfileMenu && (
          <div className="absolute bottom-16 left-3 w-56 bg-[#111214] border border-slate-800 rounded-xl shadow-2xl p-2 z-50 text-xs text-slate-200">
            <button
              onClick={() => {
                setShowProfileMenu(false)
                setShowEditProfile(true)
              }}
              className="w-full text-left px-3 py-2 hover:bg-[#2b2d31] rounded-lg transition text-slate-300 hover:text-white cursor-pointer flex items-center gap-2"
            >
              <span>✏️</span> Edit Profil Saya
            </button>
          </div>
        )}

        {/* MODAL EDIT PROFIL */}
        {showEditProfile && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1e1f22] border border-slate-800 rounded-2xl w-full max-w-sm p-5 relative shadow-2xl text-left">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-white">Edit Profil</h3>
                <button onClick={() => setShowEditProfile(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Nama</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-[#111214] border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Kelas / Bio</label>
                  <input
                    type="text"
                    value={profile.grade}
                    onChange={(e) => setProfile({ ...profile, grade: e.target.value })}
                    className="w-full bg-[#111214] border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                onClick={() => setShowEditProfile(false)}
                className="mt-5 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium transition cursor-pointer"
              >
                Simpan
              </button>
            </div>
          </div>
        )}

        {/* MODAL PENGATURAN AI */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1e1f22] border border-slate-800 rounded-2xl w-full max-w-md p-5 relative shadow-2xl text-left">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-white">Pengaturan Memori & AI</h3>
                <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Mode Pendekatan</label>
                  <select
                    value={aiSettings.mode}
                    onChange={(e) => setAiSettings({ ...aiSettings, mode: e.target.value })}
                    className="w-full bg-[#111214] border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Metode Socrates">Metode Socrates (Pemancing Kritis)</option>
                    <option value="Penjelas Langsung">Penjelas Langsung</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Kapasitas Memori</label>
                  <select
                    value={aiSettings.memoryLimit}
                    onChange={(e) => setAiSettings({ ...aiSettings, memoryLimit: e.target.value })}
                    className="w-full bg-[#111214] border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="5 Pesan">5 Pesan Terakhir</option>
                    <option value="10 Pesan">10 Pesan Terakhir</option>
                    <option value="20 Pesan">20 Pesan Terakhir</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setShowSettings(false)}
                className="mt-5 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium transition cursor-pointer"
              >
                Simpan Pengaturan
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default React.memo(Sidebar)