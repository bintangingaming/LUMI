'use client'
import type { FC } from 'react'
import React, { useState } from 'react'

import type { IMainProps } from '@/app/components'
import Main from '@/app/components'
import AuthModal from '@/app/components/AuthModal'
import EditProfileModal from '@/app/components/EditProfileModal'
import AuthButtons from '@/app/components/AuthButtons' // <-- 1. Import komponen tombol auth

const App: FC<IMainProps> = ({
  params,
}: any) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)

  return (
    <>
      {/* 2. Tambahkan AuthButtons di pojok kanan atas */}
      <div className="absolute top-4 right-6 z-40">
        <AuthButtons onOpenModal={() => setIsAuthModalOpen(true)} />
      </div>

      <Main 
        params={params} 
        onOpenEditProfile={() => setIsEditProfileOpen(true)} 
      />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      <EditProfileModal 
        isOpen={isEditProfileOpen} 
        onClose={() => setIsEditProfileOpen(false)} 
      />
    </>
  )
}

export default React.memo(App)