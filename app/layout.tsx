'use client' // Ubah jadi client component kalau mau pakai useState
import { useState } from 'react'
import { getLocaleOnServer } from '@/i18n/server'
import AuthModal from '@/components/AuthModal' // Sesuaikan path foldermu

import './styles/globals.css'
import './styles/markdown.scss'

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Kalau mau pakai state modal di layout, biasanya butuh 'use client'
  // Catatan: getLocaleOnServer biasanya untuk Server Component. 
  // Jika layout ini jadi client component, pastikan cara ambil locale-nya disesuaikan.
  
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <div className="overflow-x-auto">
          <div className="w-screen h-screen min-w-[300px]">
            {children}
            {/* AuthModal bisa ditaruh di sini supaya selalu siap dipanggil */}
          </div>
        </div>
      </body>
    </html>
  )
}