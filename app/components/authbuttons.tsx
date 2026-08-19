'use client'
import React from 'react'

interface AuthButtonsProps {
  onOpenModal: () => void
}

export default function AuthButtons({ onOpenModal }: AuthButtonsProps) {
  return (
    <div className="flex items-center gap-2.5">
      {/* Tombol Log in yang lebih ramping */}
      <button
        onClick={onOpenModal}
        className="bg-white hover:bg-slate-200 text-black text-xs font-medium px-4 py-2 rounded-full transition cursor-pointer shadow-sm"
      >
        Log in
      </button>

      {/* Tombol Sign up yang lebih ramping */}
      <button
        onClick={onOpenModal}
        className="bg-[#212121] hover:bg-[#2f2f2f] text-white text-xs font-medium px-4 py-2 rounded-full border border-slate-700/80 transition cursor-pointer shadow-sm"
      >
        Sign up for free
      </button>
    </div>
  )
}