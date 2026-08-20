import React, { useState, useEffect } from 'react'

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  profile: {
    displayName: string
    username: string
    grade: string
    avatar: string
  }
  setProfile: React.Dispatch<React.SetStateAction<any>>
  user: any
  onSave: () => void
}

export default function EditProfileModal({
  isOpen,
  onClose,
  profile,
  setProfile,
  user,
  onSave,
}: EditProfileModalProps) {
  const [displayName, setDisplayName] = useState(profile?.displayName || '')
  const [username, setUsername] = useState(profile?.username || '')
  const [grade, setGrade] = useState(profile?.grade || '')

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || '')
      setUsername(profile.username || '')
      setGrade(profile.grade || '')
    }
  }, [profile])

  if (!isOpen) { return null }

  const handleSaveClick = () => {
    setProfile((prev: any) => ({
      ...prev,
      displayName,
      username,
      grade,
    }))
    onSave()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#1e2330] text-slate-100 p-6 rounded-2xl shadow-2xl relative border border-slate-800">

        {/* Tombol Close */}
        <div className="flex justify-between items-center pb-4 mb-2">
          <h3 className="text-xl font-semibold tracking-wide">Edit Profile</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Foto Profil */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative group cursor-pointer">
            <img
              src={profile?.avatar || user?.user_metadata?.avatar_url || 'https://github.com/shadcn.png'}
              alt="Avatar Preview"
              className="h-24 w-24 rounded-full object-cover border-2 border-indigo-600 shadow-inner"
            />
            <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 border border-slate-700 text-slate-300 shadow-md transition-transform group-hover:scale-105">
              📷
            </div>
          </div>
        </div>

        {/* Form Inputs (Display Name, Username, Kelas/Bio) */}
        <div className="space-y-4 text-xs">

          {/* Display Name */}
          <div className="flex flex-col rounded-xl bg-slate-900/60 p-3 border border-slate-800">
            <label className="text-slate-400 mb-1 font-medium">Display name</label>
            <input
              type="text"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              className="bg-transparent text-slate-100 outline-none text-sm font-medium"
            />
          </div>

          {/* Username */}
          <div className="flex flex-col rounded-xl bg-slate-900/60 p-3 border border-slate-800">
            <label className="text-slate-400 mb-1 font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Atur username kamu"
              className="bg-transparent text-slate-100 outline-none text-sm font-medium"
            />
          </div>

          {/* Kelas / Bio */}
          <div className="flex flex-col rounded-xl bg-slate-900/60 p-3 border border-slate-800">
            <label className="text-slate-400 mb-1 font-medium">Kelas / Bio</label>
            <input
              type="text"
              value={grade}
              onChange={e => setGrade(e.target.value)}
              placeholder="Contoh: 12 SMA - IPS"
              className="bg-transparent text-slate-100 outline-none text-sm font-medium"
            />
          </div>

        </div>

        <p className="text-[11px] text-slate-400 mt-4 mb-2">
          Your profile helps people recognize you in group chats.
        </p>

        {/* Tombol Cancel & Save */}
        <div className="mt-6 flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-5 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveClick}
            className="rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition-colors shadow-lg cursor-pointer"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  )
}
