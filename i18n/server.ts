import 'server-only'

import { cookies, headers } from 'next/headers'
import Negotiator from 'negotiator'
import { match } from '@formatjs/intl-localematcher'
import type { Locale } from '.'
import { i18n } from '.'

export const getLocaleOnServer = async (): Promise<Locale> => {
  // @ts-expect-error locales are readonly
  const locales: string[] = i18n.locales

  let languages: string[] | undefined
  // get locale from cookie
  const localeCookie = (await cookies()).get('locale')
  languages = localeCookie?.value ? [localeCookie.value] : []

  if (!languages.length) {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {}
    const headersList = await headers()
    headersList.forEach((value, key) => (negotiatorHeaders[key] = value))
    // Use negotiator and intl-localematcher to get best locale
    try {
      languages = new Negotiator({ headers: negotiatorHeaders }).languages()
    } catch (e) {
      languages = [i18n.defaultLocale]
    }
  }

  // Saring dan bersihin format bahasanya (ganti underscore jadi strip)
  const safeLanguages = languages.map(lang => lang.replace(/_/g, '-'))

  // Match locale dipakein pelindung try-catch biar gak error 500
  let matchedLocale: Locale
  try {
    matchedLocale = match(safeLanguages, locales, i18n.defaultLocale) as Locale
  } catch (error) {
    matchedLocale = i18n.defaultLocale as Locale
  }
  
  return matchedLocale
}
