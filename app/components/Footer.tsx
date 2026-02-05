export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 48,
        padding: '32px 20px',
        borderTop: '1px solid #e5e5e5',
        fontFamily: 'Montserrat, system-ui, sans-serif',
        background: '#ffffff'
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        {/* LINKS */}
        <div
          style={{
            display: 'flex',
            gap: 24,
            flexWrap: 'wrap',
            justifyContent: 'center',
            fontSize: 14
          }}
        >
          <a href="/privacidad" style={{ color: '#6a1b9a', textDecoration: 'none' }}>
            Privacidad
          </a>
          <a href="/terminos" style={{ color: '#6a1b9a', textDecoration: 'none' }}>
            Términos
          </a>
          <a href="/contacto" style={{ color: '#6a1b9a', textDecoration: 'none' }}>
            Contacto
          </a>
        </div>

        {/* COPYRIGHT */}
        <p style={{ fontSize: 13, color: '#666', margin: 0 }}>
          © {new Date().getFullYear()} Voarah
        </p>

        {/* DISCLAIMER */}
        <p
          style={{
            maxWidth: 900,
            fontSize: 12,
            color: '#888',
            lineHeight: 1.6,
            margin: 0
          }}
        >
          VOARAH es una plataforma de intermediación que conecta usuarios con
          proveedores de servicios e inmobiliarias. Cada proveedor o inmobiliaria
          es responsable de la ejecución, condiciones y garantías de su servicio.
          VOARAH no presta directamente los servicios ni asume responsabilidad por
          su realización.
        </p>
      </div>
    </footer>
  )
}
