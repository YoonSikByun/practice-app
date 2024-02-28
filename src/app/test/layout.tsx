export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      {/* Body 부분이 스크롤 되는 것 방지 위한 style */}
      <body>
        <div>
          {children}
        </div>
      </body>
    </html>
  )
}
