export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 60,
        padding: '32px 20px',
        borderTop: '1px solid #e5e5e5',
        fontFamily: 'Montserrat, system-ui, sans-serif',
        background: '#fff'
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16
        }}
      >
        <p style={{ fontSize: 14, color: '#666', margin: 0 }}>
          © {new Date().getFullYear()} Voarah
        </p>

        {/* LINKS */}
        <nav className="footer-links">
          <a href="/privacidad">Privacidad</a>
          <a href="/terminos">Términos</a>
          <a href="/contacto">Contacto</a>
        </nav>

        <p
          style={{
            maxWidth: 900,
            fontSize: 12,
            color: '#888',
            lineHeight: 1.5,
            textAlign: 'center',
            marginTop: 8
          }}
        >
          VOARAH es una plataforma de intermediación que conecta usuarios con
          proveedores de servicios e inmobiliarias. Cada proveedor o inmobiliaria
          es responsable de la ejecución, condiciones y garantías de su servicio.
          VOARAH no presta directamente los servicios ni asume responsabilidad por
          su realización.
        </p>
      </div>

      <style jsx>{`
        .footer-links {
          display: flex;
          gap: 24px;
          font-size: 14px;
        }

        .footer-links a {
          color: #6a1b9a;
          text-decoration: none;
          font-weight: 500;
        }

        .footer-links a:hover {
          text-decoration: underline;
        }

        /* MOBILE */
        @media (max-width: 640px) {
          .footer-links {
            flex-direction: column;
            gap: 12px;
            align-items: center;
          }
        }
      `}</style>
    </footer>
  )
}

