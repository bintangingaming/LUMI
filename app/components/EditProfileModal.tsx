import React, { useState, useEffect } from 'react'

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  profile: any
  setprofile: (profile: any) => void
  user: any // Data user dari auth (misal: Supabase user)
  onSave: (updatedData: { displayName: string, username: string, bio: string }) => void
}

export default function EditProfileModal({ isOpen, onClose, user, onSave }: EditProfileModalProps) {
  // 1. Ambil data awal dari Google (user_metadata) jika ada, lalu masukkan ke state
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    if (user) {
      // Sinkronisasi otomatis data awal dari Google Auth
      setDisplayName(user.user_metadata?.full_name || user.email?.split('@')[0] || '')
      setUsername(user.user_metadata?.user_name || '')
      setAvatarUrl(user.user_metadata?.avatar_url || '')
      // Bio atau Kelas bisa diambil dari database jika sebelumnya sudah pernah disimpan
      setBio(user.user_metadata?.bio || '')
    }
  }, [user])

  if (!isOpen) { return null }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Kirim data yang sudah diedit user ke fungsi save utama
    onSave({ displayName, username, bio })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#131622] text-white p-6 rounded-2xl shadow-2xl relative border border-gray-800">

        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-6">Edit profile</h2>

        {/* Foto Profil & Tombol Kamera */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-500">
            <img
              src={avatarUrl || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-[#1e2330] p-1.5 rounded-full border border-gray-700 cursor-pointer hover:bg-gray-700">
              📷
            </div>
          </div>
        </div>

        <form onSubmit={handleFormSubmit}>
          {/* Display Name */}
          <div className="mb-4 bg-[#1b1f2e] p-3 rounded-xl border border-gray-800">
            <label className="text-xs text-gray-400 block mb-1">Display name</label>
            <input
              type="text"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              className="w-full bg-transparent text-white outline-none text-sm font-medium"
              required
            />
          </div>

          {/* Username */}
          <div className="mb-4 bg-[#1b1f2e] p-3 rounded-xl border border-gray-800">
            <label className="text-xs text-gray-400 block mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Atur username kamu"
              className="w-full bg-transparent text-white outline-none text-sm font-medium"
            />
          </div>

          {/* Kelas / Bio */}
          <div className="mb-2 bg-[#1b1f2e] p-3 rounded-xl border border-gray-800">
            <label className="text-xs text-gray-400 block mb-1">Kelas / Bio</label>
            <input
              type="text"
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Contoh: 12 SMA - IPS"
              className="w-full bg-transparent text-white outline-none text-sm font-medium"
            />
          </div>

          <p className="text-[11px] text-gray-500 mb-6">
            Your profile helps people recognize you in group chats.
          </p>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:bg-gray-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-sm font-medium bg-white text-black hover:bg-gray-200 transition"
            >
              Save
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
