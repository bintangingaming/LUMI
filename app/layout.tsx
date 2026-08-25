import { getLocaleOnServer } from '@/i18n/server'

import './styles/globals.css'
import './styles/markdown.scss'

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Ambil locale di server component secara aman
  const locale = await getLocaleOnServer()

  return (
    <html lang={locale || 'en'} className="h-full">
      <body className="h-full">
        <div className="w-screen h-screen overflow-hidden">
          <div className="w-full h-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
