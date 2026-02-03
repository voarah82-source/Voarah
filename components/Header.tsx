//components/Header.tsx
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
          padding: '4px 12px',
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
  <button
    onClick={() =>
      document
        .getElementById('servicios')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#424242' }}
  >
    Servicios
  </button>

  <button
    onClick={() =>
      document
        .getElementById('servicios')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#424242' }}
  >
    Productos
  </button>

  <button
    onClick={() =>
      document
        .getElementById('como-funciona')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#424242' }}
  >
    Cómo funciona
  </button>

  <button
    onClick={() =>
      document
        .getElementById('activar')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
    style={{
      padding: '10px 18px',
      background: '#8E24AA',
      color: '#ffffff',
      borderRadius: 6,
      fontWeight: 600,
      border: 'none',
      cursor: 'pointer'
    }}
  >
    Activar beneficios
  </button>
</nav>

      </div>
    </header>
  )
}
