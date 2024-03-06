import type { Metadata } from 'next'
import './globals.css'
import TopContainer from '@/app/main/component/top/TopContainer'

export const metadata: Metadata = {
  title: 'MLapp Studio',
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
      <body id='main-body' style={{
          margin: 0,
          height: '100%',
          overflow: 'hidden',
          backgroundColor: 'white'
        }}
      >
        <div>
          <TopContainer/>
        </div>
        <div>
          {children}
        </div>
      </body>
    </html>
  )
}
