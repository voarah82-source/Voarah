// app/layout.tsx
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'

export const metadata = {
  title: 'Voarah',
  description: 'Más confiable. Más rápido. Más simple',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          fontFamily: 'Montserrat, system-ui, sans-serif',
    overflowX: 'hidden'
  }}
      >
        {children}
        <CookieBanner />
        <Footer />
      </body>
    </html>
  )
}
