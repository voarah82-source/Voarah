'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header
      style={{
        width: '100%',
        borderBottom: '1px solid #e5e5e5',
        background: '#ffffff'
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'Montserrat, system-ui, sans-serif'
        }}
      >
        {/* LOGO */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://storage.googleapis.com/msgsndr/JXR7pttzzH9R0mOEMF3S/media/697b69f5e98b489f5b32a200.png"
            alt="Voarah"
            width={140}
            height={40}
            priority
          />
        </Link>

        {/* NAV */}
        <nav
          style={{
            display: 'flex',
            gap: 32,
            alignItems: 'center',
            fontSize: 14,
            fontWeight: 500
          }}
        >
          <Link
            href="/#servicios"
            style={{ textDecoration: 'none', color: '#424242' }}
          >
            Servicios
          </Link>

          <Link
            href="/#productos"
            style={{ textDecoration: 'none', color: '#424242' }}
          >
            Productos
          </Link>

          <Link
            href="/#como-funciona"
            style={{ textDecoration: 'none', color: '#424242' }}
          >
            Cómo funciona
          </Link>

          {/* CTA */}
          <Link
            href="/#activar"
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
          </Link>
        </nav>
      </div>
    </header>
  )
}
