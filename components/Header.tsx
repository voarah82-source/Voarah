//components/Header.tsx
'use client'

import Link from 'next/link'

type HeaderProps = {
  onOpenModal: () => void
}

export default function Header({ onOpenModal }: HeaderProps) {
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
        <Link href="/" style={{ textDecoration: 'none' }}>
          <img
            src="https://storage.googleapis.com/msgsndr/JXR7pttzzH9R0mOEMF3S/media/697b69f5e98b489f5b32a200.png"
            alt="Voarah"
            style={{ height: 120 }}
          />
        </Link>

        <nav style={{ display: 'flex', gap: 32 }}>
      
          <button
  onClick={() =>
    document.getElementById('partners')?.scrollIntoView({ behavior: 'smooth' })
  }
>
  Partners
</button>

          <button
            onClick={() =>
              document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Servicios
          </button>

          <button
            onClick={() =>
              document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Productos
          </button>

          <button
            onClick={() =>
              document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Cómo funciona
          </button>

           <button
    onClick={() =>
      document.getElementById('quienes-somos')?.scrollIntoView({ behavior: 'smooth' })
    }
  >
    Quiénes somos
  </button>

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
      </div>
    </header>
  )
}
