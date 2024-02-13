import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TopHead from '@/app/main/component/TopHead'

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
    <html lang="kor">
      <body className={inter.className}>
        <div>
          <TopHead/>
        </div>
        <div>
          {children}
        </div>
      </body>
    </html>
  )
}
