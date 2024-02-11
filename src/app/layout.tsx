import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GNB from '@/app/main/component/GNB'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Node Designer',
  description: 'Produced by PYS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <GNB/>
        </div>
        <div>
          {children}
        </div>
      </body>
    </html>
  )
}
