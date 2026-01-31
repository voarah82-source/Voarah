'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        background: '#ffffff',
        borderBottom: '1px solid #e5e5e5'
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'Montserrat, system-ui, sans-serif'
        }}
      >
        {/* LOGO DENTRO DEL HEADER */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            textDecoration: 'none'
          }}
        >
          <img
            src="https://storage.googleapis.com/msgsndr/JXR7pttzzH9R0mOEMF3S/media/697b69f5e98b489f5b32a200.png"
            alt="Voarah"
            style={{
              height: 120,   // 👈 grande pero controlado
              width: 'auto',
              display: 'block'
            }}
          />
        </Link>

        {/* NAV */}
        <nav
          style={{
            display: 'flex',
            gap: 32,
            alignItems: 'center',
            fontSize: 15,
            fontWeight: 500
          }}
        >
          <a href="#servicios" style={{ color: '#424242', textDecoration: 'none' }}>
            Servicios
          </a>

          <a href="#productos" style={{ color: '#424242', textDecoration: 'none' }}>
            Productos
          </a>

          <a href="#como-funciona" style={{ color: '#424242', textDecoration: 'none' }}>
            Cómo funciona
          </a>

          <a
            href="#activar"
            style={{
              padding: '10px 18px',
              background: '#8E24AA',
              color: '#ffffff',
              borderRadius: 6,
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            Activar beneficios
          </a>
        </nav>
      </div>
    </header>
  )
}
