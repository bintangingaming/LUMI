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
  // State untuk Popup & Modal
  const [showSettings, setShowSettings] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)

  // State Data Profil User
  const [profile, setProfile] = useState({
    name: 'Siswa LUMI',
    grade: '12 SMA - IPA',
    avatar: 'https://github.com/shadcn.png'
  })

  // State Pengaturan AI & Memori
  const [aiSettings, setAiSettings] = useState({
    mode: 'Metode Socrates',
    memoryLimit: '10 Pesan',
    temperature: 'Seimbang (0.7)',
    systemPrompt: 'Bimbing siswa SMA memecahkan masalah dengan pertanyaan kritis.',
  })

  // Handler Buat Chat Baru
  const handleCreateNewChat = () => {
    // Reset ID ke string kosong untuk memulai sesi chat baru
    onCurrentIdChange('')
    setShowProfileMenu(false)
  }

  return (
    <aside className="relative z-30 flex flex-col h-full bg-[#0B0F19] border-r border-slate-800/50 text-slate-100 w-16 flex-shrink-0 items-center justify-between py-4 select-none pointer-events-auto">
      {/* BAGIAN ATAS: LOGO & NEW CHAT */}
      <div className="flex flex-col items-center gap-4 w-full">
        {/* Logo Sparkle */}
        <button
          type="button"
          onClick={handleCreateNewChat}
          className="p-2 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
          title="LUMI AI - Chat Baru"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
        </button>

        {/* Tombol New Chat (Tambah Chat Baru) */}
        <button
          type="button"
          onClick={handleCreateNewChat}
          title="Tambah Chat Baru"
          className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-all cursor-pointer relative group active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>

        {/* List Riwayat Chat */}
        <div className="flex flex-col items-center gap-1.5 w-full px-2 overflow-y-auto max-h-[50vh] scrollbar-none">
          {list && list.length > 0 && list.map((item) => {
            const isCurrent = item.id === currentId
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onCurrentIdChange(item.id)}
                title={item.name || 'Percakapan'}
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

      {/* BAGIAN BAWAH: SETTINGS & PROFIL */}
      <div className="flex flex-col items-center gap-3 w-full relative">
        {/* Tombol Settings */}
        <button
          type="button"
          onClick={() => {
            setShowSettings(!showSettings)
            setShowProfileMenu(false)
          }}
          title="Pengaturan AI"
          className="p-2.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* Avatar Profil */}
        <button
          type="button"
          onClick={() => {
            setShowProfileMenu(!showProfileMenu)
            setShowSettings(false)
          }}
          className="w-8 h-8 rounded-full overflow-hidden border border-slate-700 hover:ring-2 hover:ring-indigo-500 transition cursor-pointer"
        >
          <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
        </button>

        {/* POPOVER MENU PROFIL */}
        {showProfileMenu && (
          <div className="absolute bottom-0 left-16 ml-2 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 text-xs text-slate-200">
            <div className="px-3 py-2 border-b border-slate-800">
              <div className="font-semibold text-white truncate">{profile.name}</div>
              <div className="text-[10px] text-slate-400">{profile.grade}</div>
            </div>
            <button
              onClick={() => {
                setShowProfileMenu(false)
                setShowEditProfile(true)
              }}
              className="w-full text-left px-3 py-2 hover:bg-slate-800 rounded-lg transition text-slate-300 hover:text-white cursor-pointer mt-1 flex items-center gap-2"
            >
              <span>✏️</span> Edit Profil
            </button>
            <button
              onClick={() => {
                setShowProfileMenu(false)
                setShowSettings(true)
              }}
              className="w-full text-left px-3 py-2 hover:bg-slate-800 rounded-lg transition text-slate-300 hover:text-white cursor-pointer flex items-center gap-2"
            >
              <span>⚙️</span> Pengaturan AI
            </button>
          </div>
        )}

        {/* MODAL EDIT PROFIL */}
        {showEditProfile && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-5 relative shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-white">Edit Profil Saya</h3>
                <button onClick={() => setShowEditProfile(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Kelas / Tingkat</label>
                  <input
                    type="text"
                    value={profile.grade}
                    onChange={(e) => setProfile({ ...profile, grade: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">URL Avatar / Foto</label>
                  <input
                    type="text"
                    value={profile.avatar}
                    onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                onClick={() => setShowEditProfile(false)}
                className="mt-5 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium transition cursor-pointer"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        )}

        {/* MODAL PENGATURAN AI */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-5 relative shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-white">Pengaturan Memori & AI</h3>
                <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Mode Pendekatan AI</label>
                  <select
                    value={aiSettings.mode}
                    onChange={(e) => setAiSettings({ ...aiSettings, mode: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Metode Socrates">Metode Socrates (Pemancing Kritis)</option>
                    <option value="Penjelas Langsung">Penjelas Langsung (To the point)</option>
                    <option value="Tutor Santai">Tutor Santai & Kasual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Kapasitas Memori Context</label>
                  <select
                    value={aiSettings.memoryLimit}
                    onChange={(e) => setAiSettings({ ...aiSettings, memoryLimit: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="5 Pesan">5 Pesan Terakhir (Hemat)</option>
                    <option value="10 Pesan">10 Pesan Terakhir (Standard)</option>
                    <option value="20 Pesan">20 Pesan Terakhir (Memori Panjang)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Instruksi Khusus (System Prompt)</label>
                  <textarea
                    rows={2}
                    value={aiSettings.systemPrompt}
                    onChange={(e) => setAiSettings({ ...aiSettings, systemPrompt: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
              </div>

              <button
                onClick={() => setShowSettings(false)}
                className="mt-5 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium transition cursor-pointer"
              >
                Simpan Pengaturan AI
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default React.memo(Sidebar)