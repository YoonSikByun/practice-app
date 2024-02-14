import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './globals.css'
import Top from '@/app/main/component/top/Top'

// const inter = Inter({ subsets: ['latin'] })

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
      {/* Body 부분이 스크롤 되는 것 방지 위한 style */}
      {/* <body className={inter.className} style={{margin: 0, height: '100%', overflow: 'hidden'}}> */}
      <body style={{margin: 0, height: '100%', overflow: 'hidden'}}>
        <div>
          <Top/>
        </div>
        <div>
          {children}
        </div>
      </body>
    </html>
  )
}
