export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 60,
        padding: '24px 16px',
        borderTop: '1px solid #eee',
        textAlign: 'center',
        fontSize: 14,
        color: '#666'
      }}
    >
      <div style={{ marginBottom: 8 }}>
        © {new Date().getFullYear()} Voarah · Alma Spain LLC
      </div>

      <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
        <a href="/privacidad">Privacidad</a>
        <a href="/terminos">Términos</a>
        <a href="/contacto">Contacto</a>
      </div>
    </footer>
  )
}
