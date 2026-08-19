'use client'
import type { FC } from 'react'
import React, { useState } from 'react'

import type { IMainProps } from '@/app/components'
import Main from '@/app/components'
import AuthModal from '@/app/components/AuthModal'
import EditProfileModal from '@/app/components/EditProfileModal'
import AuthButtons from '@/app/components/authbuttons'
const App: FC<IMainProps> = ({
  params,
}: any) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)

  return (
    <>
      {/* 2. Tambahkan AuthButtons di pojok kanan atas */}
      {/* Tambahkan padding-right (pr-8) atau atur jaraknya dari kanan */}
<div className="absolute top-6 right-10 z-40 flex items-center gap-3">
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