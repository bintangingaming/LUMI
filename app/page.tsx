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
  // State buat ngontrol popup login (buka/tutup)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  
  // State buat ngontrol popup edit profil (buka/tutup)
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)

  return (
    <>
      {/* Komponen utama LUMI kamu, dikasih props buat nge-trigger popup edit profil */}
      <Main 
        params={params} 
        onOpenEditProfile={() => setIsEditProfileOpen(true)} 
      />

      {/* Komponen Popup Login */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      {/* Komponen Popup Edit Profil */}
      <EditProfileModal 
        isOpen={isEditProfileOpen} 
        onClose={() => setIsEditProfileOpen(false)} 
      />
    </>
  )
}

export default React.memo(App)