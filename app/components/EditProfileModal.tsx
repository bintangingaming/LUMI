'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://aztrwfonfwdlfpyonxif.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dHJ3Zm9uZndkbGZweW9ueGlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwMjk2MDMsImV4cCI6MjEwMjYwNTYwM30.lQjuNq7aWcBqvGLZ3gu5uI_a14LCZRFV7MliTaQ8Zi8')

export default function EditProfileModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [loading, setLoading] = useState(false)

  // Ambil data user yang sedang login saat modal dibuka
  useEffect(() => {
    async function loadUserData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // Ambil nama dan foto dari metadata Google Auth
        setFullName(user.user_metadata?.full_name || user.email?.split('@')[0] || '')
        setAvatarUrl(user.user_metadata?.avatar_url || '')
        
        // Cek apakah sudah ada data tambahan di tabel profile kustom (jika ada)
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profile) {
          setUsername(profile.username || '')
        }
      }
    }
    if (isOpen) {
      loadUserData()
    }
  }, [isOpen])

  if (!isOpen) return null

  // Fungsi untuk menyimpan perubahan profil
  const handleSave = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      alert('Kamu harus login terlebih dahulu!')
      setLoading(false)
      return
    }

    // Update metadata di auth.users (untuk nama)
    const { error: authError } = await supabase.auth.updateUser({
      data: { full_name: fullName }
    })

    // Upsert data ke tabel profiles (jika kamu punya tabel profiles sendiri)
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: fullName,
        username: username,
        updated_at: new Date(),
      })

    setLoading(false)

    if (authError || profileError) {
      alert('Gagal menyimpan profil: ' + (authError?.message || profileError?.message))
    } else {
      alert('Profil berhasil diperbarui!')
      onClose()
    }
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999
    }}>
      <div style={{ 
        background: '#1e1e24', padding: '30px', borderRadius: '12px', width: '400px', 
        color: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', position: 'relative' 
      }}>
        {/* Tombol Close (X) di pojok kanan atas */}
        <button 
          onClick={onClose}
          style={{ background: 'transparent', border: 'none', color: '#aaa', fontSize: '18px', position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }}
        >
          ✕
        </button>

        <h3 style={{ marginBottom: '20px', fontSize: '20px' }}>Edit profile</h3>

        {/* Bagian Foto Profil & Tombol Kamera */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '25px', position: 'relative' }}>
          <div style={{ width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #2ecc71', background: '#333', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: '28px', fontWeight: 'bold' }}>{fullName ? fullName.charAt(0).toUpperCase() : 'U'}</span>
            )}
          </div>
          {/* Badge Kamera */}
          <div style={{ 
            position: 'absolute', bottom: '0', right: '145px', background: '#2c2c35', 
            borderRadius: '50%', padding: '6px', border: '1px solid #444', cursor: 'pointer' 
          }}>
            📷
          </div>
        </div>

        {/* Input Display Name */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#bbb', marginBottom: '6px' }}>Display name</label>
          <input 
            type="text" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{ width: '100%', padding: '10px', background: '#121216', border: '1px solid #333', borderRadius: '6px', color: 'white', boxSizing: 'border-box' }}
          />
        </div>

        {/* Input Username */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#bbb', marginBottom: '6px' }}>Username</label>
          <input 
            type="text" 
            value={username}
            placeholder="bintangingaming"
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '10px', background: '#121216', border: '1px solid #333', borderRadius: '6px', color: 'white', boxSizing: 'border-box' }}
          />
          <p style={{ fontSize: '11px', color: '#777', marginTop: '5px' }}>Your profile helps people recognize you in group chats.</p>
        </div>

        {/* Tombol Aksi (Cancel & Save) */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '25px' }}>
          <button 
            onClick={onClose}
            style={{ padding: '8px 18px', background: 'transparent', border: '1px solid #444', borderRadius: '6px', color: 'white', cursor: 'pointer' }}
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={loading}
            style={{ padding: '8px 22px', background: 'white', border: 'none', borderRadius: '6px', color: 'black', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}