'use client'
import type { FC } from 'react'
import React, { useState } from 'react'

import type { IMainProps } from '@/app/components'
import Main from '@/app/components' // <-- Kita aktifkan lagi import-nya
import AuthModal from '@/app/components/AuthModal'
import EditProfileModal from '@/app/components/EditProfileModal'

const App: FC<IMainProps> = ({ params }: any) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  
  const [activeTab, setActiveTab] = useState('chat') 
  
  // State baru untuk mengecek apakah persona sudah dipilih atau belum
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null)

  const [profile] = useState({
    displayName: 'Bintang',
    username: 'adminlumi',
    grade: '12 SMA - IPS',
    avatar: 'https://github.com/shadcn.png'
  })

  const recentChats = [
    { id: 1, title: 'haloo', info: '4 pesan • 2.8K token' },
    { id: 2, title: 'kak, gimana caranya b...', info: '10 pesan • 9.9K token' },
  ]

  // Fungsi saat tombol + Chat Baru diklik
  const handleNewChat = () => {
    setSelectedPersona(null) // Kembali ke halaman pilih persona
  }

  return (
    <div className="flex h-screen w-full bg-[#12141c] text-slate-200 font-sans overflow-hidden">
      
      {/* 1. SIDEBAR KIRI */}
      <aside className="w-64 bg-[#161922] border-r border-slate-800 flex flex-col justify-between shrink-0 z-10">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-500 mb-8 tracking-wider">LUMI.</h1>
          <nav className="space-y-2 text-sm font-medium">
            <button onClick={() => { setActiveTab('beranda'); setSelectedPersona(null); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'beranda' ? 'bg-indigo-600/10 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>🏠 Beranda</button>
            <button onClick={() => { setActiveTab('tryout'); setSelectedPersona(null); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'tryout' ? 'bg-indigo-600/10 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>📝 Tryout UTBK</button>
            <button onClick={() => setActiveTab('chat')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'chat' ? 'bg-indigo-600/10 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>💬 Chat Tutor AI</button>
          </nav>
        </div>
        <div className="p-4 border-t border-slate-800">
          <button onClick={() => setIsEditProfileOpen(true)} className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800 transition-colors text-left">
            <img src={profile.avatar} className="w-10 h-10 rounded-full border border-slate-700" alt="Avatar" />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">{profile.displayName}</p>
              <p className="text-xs text-slate-500 truncate">@{profile.username}</p>
            </div>
          </button>
        </div>
      </aside>

      {/* 2. AREA KONTEN TENGAH */}
      <div className="flex-1 flex overflow-hidden bg-[#1a1d24]">
        
        {/* === TAMPILAN MENU CHAT AI === */}
        {activeTab === 'chat' && (
          <>
            {/* Bagian Kiri/Tengah Chat */}
            <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-900 rounded-tl-3xl shadow-2xl relative">
              
              {/* Jika Persona belum dipilih, tampilkan grid kartunya */}
              {!selectedPersona ? (
                <div className="absolute inset-0 z-20 bg-[#1a1d24] p-10 flex flex-col items-center justify-center overflow-y-auto">
                  <h2 className="text-3xl font-bold text-white mb-2">Pilih Mode Belajarmu</h2>
                  <p className="text-slate-400 mb-10 text-center">Pilih personality LUMI yang paling cocok buat nemenin kamu belajar hari ini.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-5xl w-full">
                    <div onClick={() => setSelectedPersona('tutor')} className="bg-[#232732] border border-slate-700 hover:border-emerald-500 p-6 rounded-3xl cursor-pointer transition-all group flex flex-col h-72 shadow-lg hover:shadow-emerald-500/10">
                      <div className="h-32 bg-gradient-to-b from-emerald-500/20 to-transparent rounded-2xl mb-4 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">🤓</div>
                      <h3 className="text-lg font-bold text-white mb-1">LUMI Tutor</h3>
                      <p className="text-sm text-slate-400 mb-4 flex-1">Kakak pembimbing yang sabar & jelas.</p>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full w-fit tracking-wide">KAKAK KELAS</span>
                    </div>

                    <div onClick={() => setSelectedPersona('konsul')} className="bg-[#232732] border border-slate-700 hover:border-blue-500 p-6 rounded-3xl cursor-pointer transition-all group flex flex-col h-72 shadow-lg hover:shadow-blue-500/10">
                      <div className="h-32 bg-gradient-to-b from-blue-500/20 to-transparent rounded-2xl mb-4 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">🧐</div>
                      <h3 className="text-lg font-bold text-white mb-1">LUMI Konsul</h3>
                      <p className="text-sm text-slate-400 mb-4 flex-1">Objektif, logis, tenang, dan berbasis fakta.</p>
                      <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-full w-fit tracking-wide">OBJEKTIF</span>
                    </div>

                    <div onClick={() => setSelectedPersona('motivator')} className="bg-[#232732] border border-slate-700 hover:border-cyan-400 p-6 rounded-3xl cursor-pointer transition-all group flex flex-col h-72 shadow-lg hover:shadow-cyan-400/10">
                      <div className="h-32 bg-gradient-to-b from-cyan-400/20 to-transparent rounded-2xl mb-4 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">🔥</div>
                      <h3 className="text-lg font-bold text-white mb-1">LUMI Motivator</h3>
                      <p className="text-sm text-slate-400 mb-4 flex-1">Tegas, disiplin, dan peduli dengan kesuksesanmu.</p>
                      <span className="text-xs font-bold text-cyan-400 bg-cyan-400/10 px-3 py-1.5 rounded-full w-fit tracking-wide">TEGAS</span>
                    </div>

                    <div onClick={() => setSelectedPersona('english')} className="bg-[#232732] border border-slate-700 hover:border-indigo-400 p-6 rounded-3xl cursor-pointer transition-all group flex flex-col h-72 shadow-lg hover:shadow-indigo-400/10">
                      <div className="h-32 bg-gradient-to-b from-indigo-400/20 to-transparent rounded-2xl mb-4 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">🌍</div>
                      <h3 className="text-lg font-bold text-white mb-1">LUMI English</h3>
                      <p className="text-sm text-slate-400 mb-4 flex-1">Profesional & Encouraging. Lingkungan full Inggris.</p>
                      <span className="text-xs font-bold text-indigo-400 bg-indigo-400/10 px-3 py-1.5 rounded-full w-fit tracking-wide">PROFESSIONAL</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Jika Persona SUDAH DIPILIH, tampilkan Komponen AI aslimu */
                <Main
                  params={params}
                  onOpenEditProfile={() => setIsEditProfileOpen(true)}
                />
              )}
            </div>

            {/* Bagian Sidebar Kanan (Selalu Muncul di tab Chat) */}
            <div className="w-80 bg-[#1b1f27] border-l border-slate-800 p-5 flex flex-col shrink-0">
              <button onClick={handleNewChat} className="w-full bg-[#fce04a] hover:bg-[#f5d427] text-black font-bold py-3.5 rounded-xl mb-6 transition-colors flex items-center justify-center gap-2">
                <span className="text-xl">+</span> Chat Baru
              </button>

              <div className="relative mb-6">
                <input type="text" placeholder="Cari percakapan..." className="w-full bg-[#12141c] border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-slate-500" />
              </div>

              <div className="flex-1 overflow-y-auto">
                <h4 className="text-xs font-bold text-slate-500 mb-4 tracking-widest">OLDER</h4>
                <div className="space-y-4">
                  {recentChats.map((chat) => (
                    <div key={chat.id} className="cursor-pointer group" onClick={() => setSelectedPersona('tutor')}>
                      <p className="text-slate-300 text-sm font-medium mb-1 truncate group-hover:text-white flex items-center gap-2"><span className="text-slate-500">💬</span> {chat.title}</p>
                      <p className="text-xs text-slate-500 pl-6">{chat.info}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-medium text-slate-400">Penggunaan Harian</p>
                  <p className="text-xs font-bold text-slate-300">0%</p>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2">
                  <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <p className="text-[10px] text-slate-500">0% dari kuota harian terpakai</p>
              </div>
            </div>
          </>
        )}

        {/* === TAMPILAN BERANDA === */}
        {activeTab === 'beranda' && (
          <main className="p-8 w-full h-full overflow-y-auto bg-[#1a1d24]">
            <div className="bg-gradient-to-r from-indigo-900/40 to-[#1e2330] border border-indigo-900/50 rounded-3xl p-8 mb-8 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold mb-2">Halo, {profile.displayName}! 👋</h2>
                <p className="text-slate-400 italic">"Gagal itu biasa, yang penting usahanya maksimal buat UTBK!"</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400 mb-1">Target Kampus</p>
                <p className="text-xl font-bold text-indigo-400">Universitas Gadjah Mada</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">⚡ Akses Cepat</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <div onClick={() => { setActiveTab('tryout'); setSelectedPersona(null); }} className="bg-[#1e2330] border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-xl mb-4 text-blue-400 group-hover:scale-110 transition-transform">📝</div>
                <h4 className="font-semibold text-slate-200 mb-1">Tryout SNBT 2026</h4>
                <p className="text-xs text-slate-500">Uji kemampuanmu dengan soal terbaru.</p>
              </div>
              <div onClick={() => { setActiveTab('chat'); setSelectedPersona(null); }} className="bg-[#1e2330] border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-xl mb-4 text-emerald-400 group-hover:scale-110 transition-transform">💬</div>
                <h4 className="font-semibold text-slate-200 mb-1">Tanya LUMI</h4>
                <p className="text-xs text-slate-500">Minta AI jelaskan materi yang sulit.</p>
              </div>
              <div className="bg-[#1e2330] border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-xl mb-4 text-purple-400 group-hover:scale-110 transition-transform">📊</div>
                <h4 className="font-semibold text-slate-200 mb-1">Progres Belajar</h4>
                <p className="text-xs text-slate-500">Pantau grafik dan riwayat tryout kamu.</p>
              </div>
            </div>
          </main>
        )}

        {/* === TAMPILAN TRYOUT === */}
        {activeTab === 'tryout' && (
          <main className="p-8 flex items-center justify-center w-full h-full bg-[#1a1d24]">
            <div className="text-center text-slate-400">
              <div className="text-6xl mb-4">🚧</div>
              <h2 className="text-2xl font-bold mb-2 text-slate-200">Fitur Tryout Segera Hadir</h2>
              <p>Sedang dalam tahap pengembangan fase 3, blay!</p>
            </div>
          </main>
        )}

      </div>

      {/* 3. MODAL */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <EditProfileModal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} />

    </div>
  )
}

export default React.memo(App)