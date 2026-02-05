'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type HeaderProps = {
  onOpenModal: () => void
}

export default function Header({ onOpenModal }: HeaderProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

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
          padding: '8px 12px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? 12 : 0,
          justifyContent: 'space-between',
          fontFamily: 'Montserrat, system-ui, sans-serif'
        }}
      >
        <Link href="/" style={{ textDecoration: 'none' }}>
          <img
            src="https://storage.googleapis.com/msgsndr/JXR7pttzzH9R0mOEMF3S/media/697b69f5e98b489f5b32a200.png"
            alt="Voarah"
            style={{ height: isMobile ? 56 : 120 }}
          />
        </Link>

        <nav
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 12 : 32,
            width: isMobile ? '100%' : 'auto'
          }}
        >
          {[
            ['Partners', 'partners'],
            ['Servicios', 'servicios'],
            ['Productos', 'servicios'],
            ['Cómo funciona', 'como-funciona'],
            ['Quiénes somos', 'quienes-somos']
          ].map(([label, id]) => (
            <button
              key={label}
              onClick={() =>
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
              }
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                padding: 0,
                textAlign: 'left'
              }}
            >
              {label}
            </button>
          ))}

          <button
            onClick={onOpenModal}
            style={{
              marginTop: isMobile ? 8 : 0,
              padding: '10px 18px',
              background: '#8E24AA',
              color: '#fff',
              borderRadius: 6,
              border: 'none',
              fontWeight: 600,
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
