'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('URL_SUPABASE_KAMU', 'ANON_KEY_KAMU')

// Menerima props isOpen dan onClose dari halaman utama
export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [emailInput, setEmailInput] = useState('')

  // Kalau isOpen bernilai false, komponen tidak akan dirender sama sekali
  if (!isOpen) return null

  // Fungsi Login Google
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' })
  }

  // Fungsi Kirim Link Login via Email (Opsional)
  const handleEmailLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email: emailInput })
    if (error) {
      alert('Gagal mengirim link: ' + error.message)
    } else {
      alert('Cek email kamu untuk link login!')
    }
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999
    }}>
      <div style={{ background: 'white', padding: '30px', borderRadius: '8px', width: '320px', textAlign: 'center', color: 'black' }}>
        <h3>Login dulu untuk melanjutkan</h3>
        
        {/* Input Email di atas */}
        <input 
          type="email" 
          placeholder="Masukkan email kamu..." 
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
        <button 
          onClick={handleEmailLogin}
          style={{ width: '100%', padding: '8px', marginBottom: '15px', cursor: 'pointer' }}
        >
          Kirim Link Login via Email
        </button>

        {/* Tulisan OR di tengah */}
        <p style={{ color: '#888', margin: '10px 0' }}>or</p>

        {/* Tombol Login dengan Google di bawah */}
        <button 
          onClick={handleGoogleLogin} 
          style={{ width: '100%', padding: '8px', background: '#4285F4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Login with Google
        </button>

        <br /><br />
        <button 
          onClick={onClose} 
          style={{ background: 'transparent', border: 'none', color: 'red', cursor: 'pointer' }}
        >
          Tutup
        </button>
      </div>
    </div>
  )
}