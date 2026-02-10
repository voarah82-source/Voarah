'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type HeaderProps = {
  onOpenModal: () => void
}

export default function Header({ onOpenModal }: HeaderProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: '#fff',
        borderBottom: '1px solid #e5e5e5'
      }}
    >
     <div
  style={{
    maxWidth: 1200,
    margin: '0 auto',
    padding: '6px 16px', //altura header
    minHeight: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }}
>

        <Link href="/" style={{ textDecoration: 'none' }}>
  <div
    style={{
      height: 86,            // ALTURA DEL logo
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden'
    }}
  >
    <img
      src="https://storage.googleapis.com/msgsndr/JXR7pttzzH9R0mOEMF3S/media/697b69f5e98b489f5b32a200.png"
      alt="Voarah"
      style={{
        height: '100%',
        width: 'auto'
      }}
    />
  </div>
</Link>

        {/* DESKTOP NAV */}
        {!isMobile && (
          <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            <button onClick={() => scrollTo('partners')}>Partners</button>            
            <button onClick={() => scrollTo('como-funciona')}>Cómo funciona</button>
            <button onClick={() => scrollTo('quienes-somos')}>Quiénes somos</button>
            <button
              onClick={onOpenModal}
              style={{
                padding: '10px 18px',
                background: '#8E24AA',
                color: '#fff',
                borderRadius: 6,
                border: 'none',
                fontWeight: 600
              }}
            >
              Activar beneficios
            </button>
          </nav>
        )}

        {/* HAMBURGER */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              fontSize: 26,
              background: 'none',
              border: 'none'
            }}
          >
            ☰
          </button>
        )}
      </div>

      {/* MOBILE MENU */}
      {isMobile && menuOpen && (
        <div
          style={{
            background: '#fff',
            borderTop: '1px solid #e5e5e5',
            padding: 12,
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}
        >
          <button onClick={() => scrollTo('partners')}>Partners</button>
          <button onClick={() => scrollTo('como-funciona')}>Cómo funciona</button>
          <button onClick={() => scrollTo('quienes-somos')}>Quiénes somos</button>

          <button
            onClick={() => {
              setMenuOpen(false)
              onOpenModal()
            }}
            style={{
              marginTop: 8,
              padding: '12px',
              background: '#8E24AA',
              color: '#fff',
              borderRadius: 8,
              border: 'none',
              fontWeight: 600
            }}
          >
            Activar beneficios
          </button>
        </div>
      )}
    </header>
  )
}
