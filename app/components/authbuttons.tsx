'use client'
import React from 'react'

interface AuthButtonsProps {
  onOpenModal: () => void
}

export default function AuthButtons({ onOpenModal }: AuthButtonsProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Tombol Log in (Putih) */}
      <button
        onClick={onOpenModal}
        className="bg-white hover:bg-slate-200 text-black text-sm font-medium px-5 py-2.5 rounded-full transition cursor-pointer shadow-sm"
      >
        Log in
      </button>

      {/* Tombol Sign up for free (Gelap dengan border) */}
      <button
        onClick={onOpenModal}
        className="bg-[#212121] hover:bg-[#2f2f2f] text-white text-sm font-medium px-5 py-2.5 rounded-full border border-slate-700/80 transition cursor-pointer shadow-sm"
      >
        Sign up for free
      </button>
    </div>
  )
}