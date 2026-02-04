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
      }}
    >
      <p style={{ marginBottom: 8 }}>
        © {new Date().getFullYear()} Voarah 
      </p>

      <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
        <a href="/privacidad">Privacidad</a>
        <a href="/terminos">Términos</a>
        <a href="/contacto">Contacto</a>
      </div>
    </footer>
  )
}
