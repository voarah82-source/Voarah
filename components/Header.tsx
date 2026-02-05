'use client'

import Link from 'next/link'
import { useState } from 'react'

type HeaderProps = {
  onOpenModal: () => void
}

export default function Header({ onOpenModal }: HeaderProps) {
  const [open, setOpen] = useState(false)

  const scrollTo = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        background: '#fff',
        borderBottom: '1px solid #e5e5e5'
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'Montserrat, system-ui, sans-serif'
        }}
      >
        {/* LOGO */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <img
            src="https://storage.googleapis.com/msgsndr/JXR7pttzzH9R0mOEMF3S/media/697b69f5e98b489f5b32a200.png"
            alt="Voarah"
            style={{ height: 64 }}
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28
          }}
        >
          <button onClick={() => scrollTo('partners')}>Partners</button>
          <button onClick={() => scrollTo('servicios')}>Servicios</button>
          <button onClick={() => scrollTo('servicios')}>Productos</button>
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
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Activar beneficios
          </button>
        </nav>

        {/* HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          className="burger"
          style={{
            background: 'none',
            border: 'none',
            fontSize: 26,
            cursor: 'pointer'
          }}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div
          style={{
            background: '#fff',
            borderTop: '1px solid #eee',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}
        >
          <button onClick={() => scrollTo('partners')}>Partners</button>
          <button onClick={() => scrollTo('servicios')}>Servicios</button>
          <button onClick={() => scrollTo('servicios')}>Productos</button>
          <button onClick={() => scrollTo('como-funciona')}>Cómo funciona</button>
          <button onClick={() => scrollTo('quienes-somos')}>Quiénes somos</button>

          <button
            onClick={() => {
              setOpen(false)
              onOpenModal()
            }}
            style={{
              marginTop: 8,
              padding: '14px',
              background: '#8E24AA',
              color: '#fff',
              borderRadius: 8,
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Activar beneficios
          </button>
        </div>
      )}

      <style jsx>{`
        button {
          background: none;
          border: none;
          font-size: 14px;
          cursor: pointer;
          text-align: left;
        }

        .burger {
          display: none;
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }

          .burger {
            display: block;
          }
        }
      `}</style>
    </header>
  )
}

