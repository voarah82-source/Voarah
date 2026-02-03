import Footer from './components/Footer'

export const metadata = {
  title: 'Voarah',
  description: 'Formulario de demanda inmobiliaria'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          fontFamily: 'Montserrat, system-ui, sans-serif'
        }}
      >
        {children}
        <Footer />
      </body>
    </html>
  )
}
