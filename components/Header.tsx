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
    style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#424242'
    }}
  >
    Servicios
  </button>

  <button
    onClick={() =>
      document
        .getElementById('servicios')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
    style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#424242'
    }}
  >
    Productos
  </button>

  <button
    onClick={() =>
      document
        .getElementById('como-funciona')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
    style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#424242'
    }}
  >
    Cómo funciona
  </button>

  <button
    onClick={() => setOpen(true)} // 👈 ABRE MODAL
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

{/* MODAL */}
{open && (
  <div
    onClick={() => setOpen(false)}
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(20, 20, 20, 0.55)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      backdropFilter: 'blur(4px)'
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: '#ffffff',
        padding: '36px 40px',
        borderRadius: 16,
        width: 440,
        boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
        fontFamily: 'Montserrat, system-ui, sans-serif'
      }}
    >
      <h2
        style={{
          fontSize: 24,
          marginBottom: 8,
          fontWeight: 700
        }}
      >
        Activar beneficios Voarah
      </h2>

      <p
        style={{
          fontSize: 14,
          color: '#666',
          marginBottom: 24
        }}
      >
        Dejanos tus datos y un asesor te contactará a la brevedad.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14
        }}
      >
        <input
          name="nombre"
          placeholder="Nombre"
          required
          style={inputStyle}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          style={inputStyle}
        />

        <input
          name="telefono"
          placeholder="Teléfono (ej: 5491112345678)"
          required
          style={inputStyle}
        />

        {/* INTERÉS */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            marginTop: 4
          }}
        >
          <span style={{ fontSize: 13, color: '#555', fontWeight: 500 }}>
            ¿Qué estás buscando?
          </span>

          <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14 }}>
            <input type="radio" name="interes" value="servicios" required />
            Servicios
          </label>

          <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14 }}>
            <input type="radio" name="interes" value="productos" />
            Productos
          </label>

          <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14 }}>
            <input type="radio" name="interes" value="ambos" />
            Ambos
          </label>
        </div>

        <textarea
          name="comentario"
          placeholder="Comentario (opcional)"
          rows={3}
          style={{ ...inputStyle, resize: 'none' }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 8,
            padding: '14px',
            background: '#8E24AA',
            color: '#ffffff',
            border: 'none',
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {loading ? 'Enviando…' : 'Enviar'}
        </button>
      </form>

      <button
        onClick={() => setOpen(false)}
        style={{
          marginTop: 16,
          background: 'transparent',
          border: 'none',
          color: '#999',
          fontSize: 13,
          cursor: 'pointer'
        }}
      >
        Cancelar
      </button>
    </div>
  </div>
)}
      </div>
    </header>
  )
}
