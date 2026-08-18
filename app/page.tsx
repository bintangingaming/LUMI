'use client'
import type { FC } from 'react'
import React, { useState } from 'react'

import type { IMainProps } from '@/app/components'
import Main from '@/app/components'
import AuthModal from '@/app/components/AuthModal' // Sesuaikan path foldernya kalau beda

const App: FC<IMainProps> = ({
  params,
}: any) => {
  // State buat ngontrol popup login (buka/tutup)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  return (
    <>
      {/* Komponen utama LUMI kamu */}
      <Main params={params} />

      {/* 
        Contoh: Kalau komponen Main kamu punya tombol "Upload" atau "Edit Profil", 
        kamu bisa lempar fungsi "setIsAuthModalOpen(true)" ke dalamnya 
        atau dipasang di sini.
      */}

      {/* Komponen Popup Login */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  )
}

export default React.memo(App)