'use client'
import type { FC } from 'react'
import React, { useState } from 'react'
import { XMarkIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export interface IAuthModalProps {
  isOpen: boolean
  onClose: () => void
}

const AuthModal: FC<IAuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn">
      {/* Kotak Modal */}
      <div className="relative w-full max-w-md p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-slate-100">
        
        {/* Tombol X di Pojok Kanan Atas */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {/* Judul Modal */}
        <div className="text-center mb-6 mt-2">
          <h3 className="text-lg font-bold text-white">Login/Daftar terlebih dahulu untuk melanjutkan</h3>
          <p className="text-xs text-slate-400 mt-1">Akses semua fitur cerdas LUMI dengan masuk ke akunmu.</p>
        </div>

        {/* Form Email */}
        <div className="space-y-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
              <EnvelopeIcon className="w-5 h-5" />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email kamu..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <button
            onClick={() => alert(`Mengirim link login ke: ${email}`)}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-blue-600/20"
          >
            Kirim Link Login via Email
          </button>
        </div>

        {/* Pemisah "OR" */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="px-3 text-xs text-slate-500 uppercase font-medium">atau</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* Tombol Google */}
        <button
          onClick={() => alert('Login dengan Google diklik!')}
          className="w-full flex items-center justify-center gap-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm rounded-xl border border-slate-700 transition-all"
        >
          {/* Logo Google SVG */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.1 8.9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.3 14.7c-.2-.7-.3-1.5-.3-2.3s.1-1.6.3-2.3L1.6 7.2C.6 9.2 0 11.5 0 14s.6 4.8 1.6 6.8l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5.3L1.6 15.9C3.5 19.7 7.4 23 12 23z"
            />
          </svg>
          Lanjutkan dengan Google
        </button>

      </div>
    </div>
  )
}

export default AuthModal