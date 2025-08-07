import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wi-Fi QR Generator',
  description: 'Generate QR codes for your Wi-Fi network to easily share with guests',
  keywords: 'wifi, qr code, generator, network, sharing',
  authors: [{ name: 'Wi-Fi QR Generator' }],
  viewport: 'width=device-width, initial-scale=1',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-simple.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/favicon-simple.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' }
    ],
  },
  themeColor: '#9333ea',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Wi-Fi QR Generator',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LenisProvider>
          <div className="min-h-screen liquid-gradient relative">
            {/* Optimized Background Elements for Better Performance */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Reduced number of floating elements */}
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/6 rounded-full blur-2xl animate-float"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/4 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/3 rounded-full blur-2xl animate-pulse-glow"></div>
              
              {/* Single additional element for depth */}
              <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-pink-500/2 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>
              
              {/* Gradient overlay for enhanced depth */}
              <div className="absolute inset-0 gradient-overlay opacity-30"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </LenisProvider>
      </body>
    </html>
  )
} 