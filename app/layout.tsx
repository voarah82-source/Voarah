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
      <body>{children}</body>
    </html>
  )
}
