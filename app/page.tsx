'use client'
import type { FC } from 'react'
import React, { useState } from 'react'

import type { IMainProps } from '@/app/components'
import Main from '@/app/components'
import AuthModal from '@/app/components/AuthModal'
import EditProfileModal from '@/app/components/EditProfileModal'

const App: FC<IMainProps> = ({
  params,
}: any) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  
  // State navigasi untuk pindah menu (default buka Beranda)
  const [activeTab, setActiveTab] = useState('beranda') 

  // Dummy data profil (nanti bisa dihubungkan ke Supabase/API kamu)
  const [profile] = useState({
    displayName: 'Bintang',
    username: 'adminlumi',
    grade: '12 SMA - IPS',
    avatar: 'https://github.com/shadcn.png'
  })

  return (
    <div className="flex h-screen w-full bg-[#0f1117] text-slate-200 font-sans overflow-hidden">
      
      {/* 1. SIDEBAR KIRI */}
      <aside className="w-64 bg-[#161922] border-r border-slate-800 flex flex-col justify-between shrink-0 z-10">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-500 mb-8 tracking-wider">LUMI.</h1>
          <nav className="space-y-2 text-sm font-medium">
            <button
              onClick={() => setActiveTab('beranda')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === 'beranda' ? 'bg-indigo-600/10 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              🏠 Beranda
            </button>
            <button
              onClick={() => setActiveTab('tryout')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === 'tryout' ? 'bg-indigo-600/10 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              📝 Tryout UTBK
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === 'chat' ? 'bg-indigo-600/10 text-indigo-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              💬 Chat Tutor AI
            </button>
          </nav>
        </div>

        {/* Tombol Profil (Akan membuka EditProfileModal) */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => setIsEditProfileOpen(true)}
            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800 transition-colors text-left"
          >
            <img src={profile.avatar} className="w-10 h-10 rounded-full border border-slate-700" alt="Avatar" />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">{profile.displayName}</p>
              <p className="text-xs text-slate-500 truncate">@{profile.username}</p>
            </div>
          </button>
        </div>
      </aside>

      {/* 2. AREA KONTEN DINAMIS */}
      <div className="flex-1 overflow-hidden relative">
        
        {/* Tampilan Halaman Beranda / Dashboard */}
        {activeTab === 'beranda' && (
          <main className="p-8 h-full overflow-y-auto">
            {/* Hero Banner */}
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

            {/* Akses Cepat Grid */}
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">⚡ Akses Cepat</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <div onClick={() => setActiveTab('tryout')} className="bg-[#1e2330] border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-xl mb-4 text-blue-400 group-hover:scale-110 transition-transform">📝</div>
                <h4 className="font-semibold text-slate-200 mb-1">Tryout SNBT 2026</h4>
                <p className="text-xs text-slate-500">Uji kemampuanmu dengan soal terbaru.</p>
              </div>

              <div onClick={() => setActiveTab('chat')} className="bg-[#1e2330] border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors cursor-pointer group">
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

        {/* Tampilan Dummy Halaman Tryout */}
        {activeTab === 'tryout' && (
          <main className="p-8 flex items-center justify-center h-full">
            <div className="text-center text-slate-400">
              <div className="text-6xl mb-4">🚧</div>
              <h2 className="text-2xl font-bold mb-2 text-slate-200">Fitur Tryout Segera Hadir</h2>
              <p>Sedang dalam tahap pengembangan fase 3, blay!</p>
            </div>
          </main>
        )}

        {/* Tampilan Chat AI (Komponen Main aslimu) */}
        {activeTab === 'chat' && (
          <div className="h-full w-full bg-white dark:bg-gray-900 rounded-tl-3xl overflow-hidden shadow-2xl">
            <Main
              params={params}
              onOpenEditProfile={() => setIsEditProfileOpen(true)}
            />
          </div>
        )}

      </div>

      {/* 3. MODAL (Tetap disembunyikan sampai dipanggil) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
      />

    </div>
  )
}

export default React.memo(App)