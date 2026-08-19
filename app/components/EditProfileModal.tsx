'use client'
import React, { useState } from 'react'
import { Camera, X } from 'lucide-react'

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  // State untuk menampung nilai input pengguna
  const [displayName, setDisplayName] = useState('Bwnjiwngn Twengik')
  const [username, setUsername] = useState('bintangingaming')
  const [kelasBio, setKelasBio] = useState('12 SMA - IPA')
  const [avatar, setAvatar] = useState('BT') // Bisa inisial atau URL foto

  if (!isOpen) return null

  const handleSave = () => {
    // Di sini kamu bisa tambahkan logika simpan (misal ke localStorage atau backend)
    console.log({ displayName, username, kelasBio })
    onClose()
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'>
      <div className='relative w-full max-w-md rounded-2xl bg-[#1e2330] p-6 text-slate-100 shadow-2xl border border-slate-800 animate-in fade-in zoom-in-95 duration-200'>
        
        {/* Tombol Close (X) di pojok kanan atas */}
        <div className='flex items-center justify-between pb-4 mb-2'>
          <h2 className='text-xl font-semibold tracking-wide'>Edit profile</h2>
          <button 
            onClick={onClose}
            className='rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Bagian Foto Profil di Tengah */}
        <div className='flex flex-col items-center justify-center mb-6'>
          <div className='relative group cursor-pointer'>
            <div className='flex h-24 w-24 items-center justify-center rounded-full bg-teal-600 text-2xl font-bold text-white shadow-inner'>
              {avatar}
            </div>
            {/* Tombol Kamera di Foto */}
            <div className='absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 border border-slate-700 text-slate-300 shadow-md transition-transform group-hover:scale-105'>
              <Camera className='w-4 h-4' />
            </div>
          </div>
        </div>

        {/* Form Input Data */}
        <div className='space-y-4'>
          {/* Display Name */}
          <div className='flex flex-col rounded-xl bg-slate-900/60 p-3 border border-slate-800 focus-within:border-teal-500 transition-colors'>
            <label className='text-xs font-medium text-slate-400 mb-1'>Display name</label>
            <input
              type='text'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className='bg-transparent text-slate-100 outline-none text-sm font-medium'
            />
          </div>

          {/* Username */}
          <div className='flex flex-col rounded-xl bg-slate-900/60 p-3 border border-slate-800 focus-within:border-teal-500 transition-colors'>
            <label className='text-xs font-medium text-slate-400 mb-1'>Username</label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='bg-transparent text-slate-100 outline-none text-sm font-medium'
            />
          </div>

          {/* Elemen Kelas / Bio (Tetap Dipertahankan) */}
          <div className='flex flex-col rounded-xl bg-slate-900/60 p-3 border border-slate-800 focus-within:border-teal-500 transition-colors'>
            <label className='text-xs font-medium text-slate-400 mb-1'>Kelas / Bio</label>
            <input
              type='text'
              value={kelasBio}
              onChange={(e) => setKelasBio(e.target.value)}
              className='bg-transparent text-slate-100 outline-none text-sm font-medium'
            />
          </div>

          <p className='text-xs text-slate-400 px-1 pt-1'>
            Your profile helps people recognize you in group chats.
          </p>
        </div>

        {/* Tombol Aksi (Cancel & Save) */}
        <div className='mt-6 flex items-center justify-end space-x-3 pt-2'>
          <button
            onClick={onClose}
            className='rounded-full px-5 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors'
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className='rounded-full bg-slate-100 px-6 py-2.5 text-sm font-medium text-slate-950 hover:bg-white transition-colors shadow-lg'
          >
            Save
          </button>
        </div>

      </div>
    </div>
  )
}