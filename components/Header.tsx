'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Header() {
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

    const el = document.getElementById(id)
    if (!el) return

    const yOffset = -90 // altura header (ajustá si cambia)
    const y =
      el.getBoundingClientRect().top + window.pageYOffset + yOffset

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    })
  }

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: '#fff',
        borderBottom: '1px solid #e5e5e5',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '6px 16px',
          minHeight: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* LOGO */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ height: 86, display: 'flex', alignItems: 'center' }}>
            <img
              src="https://storage.googleapis.com/msgsndr/JXR7pttzzH9R0mOEMF3S/media/697b69f5e98b489f5b32a200.png"
              alt="Voarah"
              style={{ height: '100%' }}
            />
          </div>
        </Link>

        {/* DESKTOP */}
        {!isMobile && (
          <nav style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => scrollTo('faq')}
              style={{
                padding: '8px 16px',
                background: '#e1bee7',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
              }}
            >
              FAQ
            </button>

            <button
              onClick={() => scrollTo('contacto')}
              style={{
                padding: '8px 16px',
                background: '#e1bee7',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
              }}
            >
              Contacto
            </button>
          </nav>
        )}

        {/* MOBILE BTN */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ fontSize: 26, background: 'none', border: 'none' }}
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
            gap: 12,
          }}
        >
          <button onClick={() => scrollTo('faq')}>FAQ</button>
          <button onClick={() => scrollTo('contacto')}>Contacto</button>
        </div>
      )}
    </header>
  )
}
