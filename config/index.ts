import type { AppInfo } from '@/types/app'

export const APP_ID = `${process.env.NEXT_PUBLIC_APP_ID}`
export const API_KEY = `${process.env.NEXT_PUBLIC_APP_KEY}`
export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`

export const APP_INFO: AppInfo = {
  title: 'LUMI',
  description: 'LUMI (*Learning, Understanding, Mental Insight*) adalah asisten belajar AI interaktif yang dirancang khusus untuk mendampingi siswa SMA. Menggunakan pendekatan metode Socrates. LUMI membimbing kamu memecahkan soal matematika, sains, dan pelajaran lainnya lewat pertanyaan pemancing yang melatih pola pikir kritis.',
  copyright: '',
  privacy_policy: '',
  default_language: 'en',
  disable_session_same_site: false, // set it to true if you want to embed the chatbot in an iframe
}

export const isShowPrompt = false
export const promptTemplate = 'I want you to act as a javascript console.'

export const API_PREFIX = '/api'

export const LOCALE_COOKIE_NAME = 'locale'

export const DEFAULT_VALUE_MAX_ LEN =48
