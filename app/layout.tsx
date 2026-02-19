import './globals.css'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { LanguageProvider } from './context/LanguageContext'
import { CityProvider } from './context/CityContext'
import { ThemeProvider } from './context/ThemeContext'
import Navigation from './components/Navigation'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vaktia e Ramazanit 2026 | Kosovo',
  description: 'Vaktia e Ramazanit për territorin e Republikës së Kosovës 2026 / 1447H',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sq" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('ramadan-theme');document.documentElement.setAttribute('data-theme',t||'dark');})();`,
          }}
        />
      </head>
      <body className={outfit.className}>
        <ThemeProvider>
        <LanguageProvider>
          <CityProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="fixed bottom-0 w-full theme-footer py-2 text-center text-sm z-10">
            © {new Date().getFullYear()} a.h
          </footer>
          </CityProvider>
        </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 