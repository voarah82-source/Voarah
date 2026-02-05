export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 40,
        padding: '24px 16px',
        borderTop: '1px solid #e5e5e5',
        textAlign: 'center',
        fontSize: 14,
        color: '#666',
        fontFamily: 'Montserrat, system-ui, sans-serif'
      }}
    >
      <p style={{ marginBottom: 8 }}>
        © {new Date().getFullYear()} Voarah
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          alignItems: 'center',
          marginBottom: 16
        }}
      >
        <a href="/privacidad">Privacidad</a>
        <a href="/terminos">Términos</a>
        <a href="/contacto">Contacto</a>
      </div>

      <p
        style={{
          maxWidth: 900,
          margin: '0 auto',
          fontSize: 12,
          color: '#888',
          lineHeight: 1.5
        }}
      >
        VOARAH es una plataforma de intermediación que conecta usuarios con
        proveedores de servicios e inmobiliarias. Cada proveedor o inmobiliaria
        es responsable de la ejecución, condiciones y garantías de su servicio.
        VOARAH no presta directamente los servicios ni asume responsabilidad por
        su realización.
      </p>
    </footer>
  )
}

