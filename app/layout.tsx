import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'

export const metadata = {
  title: 'Voarah',
  description: 'Formulario de demanda inmobiliaria',
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
        }}
      >
        {children}

        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}
