// components/EditProfileModal.tsx
import React, { useRef } from 'react'
import { Camera } from 'lucide-react'

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  profile: {
    avatar?: string
    displayName?: string
    username?: string
    grade?: string
  }
  setProfile: React.Dispatch<React.SetStateAction<any>>
  onSave: () => void
}

export default function EditProfileModal({
  isOpen,
  onClose,
  profile = {},
  setProfile,
  onSave,
}: EditProfileModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) { return null }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile((prev: any) => ({ ...(prev || {}), avatar: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e2330] border border-slate-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl text-slate-100">
        <h3 className="text-xl font-semibold mb-4">Edit profile</h3>

        <div className="flex flex-col items-center mb-6">
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <img
              src={profile?.avatar || 'https://github.com/shadcn.png'}
              className="h-24 w-24 rounded-full object-cover border-2 border-teal-600"
              alt="Profile Avatar"
            />
            <div className="absolute bottom-0 right-0 p-2 bg-slate-900 rounded-full border border-slate-700">
              <Camera className="w-4 h-4" />
            </div>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
        </div>

        <div className="space-y-4 text-xs">
          <input
            className="w-full bg-slate-900/60 p-3 rounded-xl border border-slate-800"
            value={profile?.displayName || ''}
            onChange={e => setProfile({ ...profile, displayName: e.target.value })}
            placeholder="Display name"
          />
          <input
            className="w-full bg-slate-900/60 p-3 rounded-xl border border-slate-800"
            value={profile?.username || ''}
            onChange={e => setProfile({ ...profile, username: e.target.value })}
            placeholder="Username"
          />
          <input
            className="w-full bg-slate-900/60 p-3 rounded-xl border border-slate-800"
            value={profile?.grade || ''}
            onChange={e => setProfile({ ...profile, grade: e.target.value })}
            placeholder="Kelas / Bio"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 hover:bg-slate-800 rounded-full cursor-pointer">Cancel</button>
          <button onClick={onSave} className="px-6 py-2 bg-slate-100 text-slate-950 rounded-full font-medium cursor-pointer">Save</button>
        </div>
      </div>
    </div>
  )
}
