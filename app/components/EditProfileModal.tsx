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
  // State lokal untuk form
  const [displayName, setDisplayName] = useState(profile?.displayName || '')
  const [username, setUsername] = useState(profile?.username || '')
  const [grade, setGrade] = useState(profile?.grade || '')

  // Update nilai form jika prop profile berubah
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || '')
      setUsername(profile.username || '')
      setGrade(profile.grade || '')
    }
  }, [profile])

  if (!isOpen) { return null }

  const handleSaveClick = () => {
    // Simpan perubahan ke state utama profile
    setProfile((prev: any) => ({
      ...prev,
      displayName,
      username,
      grade,
    }))
    onSave() // Tutup modal & tampilkan notifikasi
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#131622] text-white p-6 rounded-3xl shadow-2xl relative border border-gray-800">

        {/* Tombol Close (X) di kanan atas */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white transition"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-6">Edit profile</h2>

        {/* Bagian Avatar / Foto Profil & Tombol Kamera */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#2dd4bf]">
            <img
              src={profile?.avatar || user?.user_metadata?.avatar_url || 'https://github.com/shadcn.png'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-[#1e2330] p-2 rounded-full border border-gray-700 cursor-pointer hover:bg-gray-700 transition">
              📷
            </div>
          </div>
        </div>

        {/* Field Display Name */}
        <div className="mb-4 bg-[#1b1f2e] p-3 rounded-2xl border border-gray-800/60">
          <label className="text-xs text-gray-400 block mb-1">Display name</label>
          <input
            type="text"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            className="w-full bg-transparent text-white outline-none text-sm font-medium"
          />
        </div>

        {/* Field Username */}
        <div className="mb-4 bg-[#1b1f2e] p-3 rounded-2xl border border-gray-800/60">
          <label className="text-xs text-gray-400 block mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full bg-transparent text-white outline-none text-sm font-medium"
          />
        </div>

        {/* Field Kelas / Bio */}
        <div className="mb-2 bg-[#1b1f2e] p-3 rounded-2xl border border-gray-800/60">
          <label className="text-xs text-gray-400 block mb-1">Kelas / Bio</label>
          <input
            type="text"
            value={grade}
            onChange={e => setGrade(e.target.value)}
            className="w-full bg-transparent text-white outline-none text-sm font-medium"
          />
        </div>

        <p className="text-[11px] text-gray-500 mb-8 mt-2">
          Your profile helps people recognize you in group chats.
        </p>

        {/* Tombol Cancel & Save */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-300 hover:bg-gray-800 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveClick}
            className="px-7 py-2.5 rounded-full text-sm font-medium bg-white text-black hover:bg-gray-200 transition"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  )
}
