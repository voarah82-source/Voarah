'use client'

export default function Footer() {
  return (
    <footer
      style={{
        width: '100%',
        borderTop: '1px solid #e5e5e5',
        marginTop: 64,
        padding: '32px 20px',
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
          alignItems: 'center',
          gap: 20
        }}
      >
        {/* LINKS */}
        <div
          style={{
            display: 'flex',
            gap: 24,
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <a href="/privacidad" style={linkStyle}>Privacidad</a>
          <a href="/terminos" style={linkStyle}>Términos</a>
          <a href="/contacto" style={linkStyle}>Contacto</a>
        </div>

        {/* COPYRIGHT */}
        <p
          style={{
            fontSize: 14,
            color: '#666',
            margin: 0
          }}
        >
          © {new Date().getFullYear()} Voarah
        </p>

        {/* DISCLAIMER */}
        <p
          style={{
            maxWidth: 900,
            fontSize: 12,
            color: '#888',
            lineHeight: 1.5,
            textAlign: 'center',
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

const linkStyle: React.CSSProperties = {
  color: '#8E24AA',
  textDecoration: 'none',
  fontSize: 14,
  fontWeight: 500
}
