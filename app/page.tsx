'use client'

import { useState } from 'react'
import Header from '../components/Header'

export default function HomePage() {
  const [open, setOpen] = useState(false)
  const [interes, setInteres] = useState<'servicios' | 'productos' | 'ambos' | ''>('')
  const [loading, setLoading] = useState(false)

  const inputStyle = {
    padding: '12px 14px',
    borderRadius: 10,
    border: '1px solid #ddd',
    fontSize: 14,
    fontFamily: 'Montserrat, system-ui, sans-serif'
  }

  // 👉 LEEMOS EL ORIGEN DESDE LA URL (QR / LINK)
  const params =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : null

  const origen = params?.get('origen') || ''

  async function handleSubmit(e: any) {
  e.preventDefault()
  setLoading(true)

  const formData = new FormData(e.target)

  //  ACÁ VA ESTO interes
  const interesFromForm =
    formData.get('interes') || 'servicios'

  await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: formData.get('nombre'),
      email: formData.get('email'),
      telefono: formData.get('telefono'),
      comentario: formData.get('comentario'),
      interes: interesFromForm, // 👈 USAMOS ESTE
      origen
    })
  })

  setLoading(false)
  setOpen(false)
  alert('Datos enviados correctamente. En breve nos contactamos.')
}


  return (
    <>
      <Header onOpenModal={() => setOpen(true)} />

      <main
        style={{
          fontFamily: 'Montserrat, system-ui, sans-serif',
          background: '#ffffff',
          color: '#1a1a1a'
        }}
      >
        {/* HERO */}
        <section
          id="activar"
          style={{
            padding: '96px 24px 64px',
            maxWidth: 1100,
            margin: '0 auto'
          }}
        >
          <h1 style={{ fontSize: 42, lineHeight: 1.2, marginBottom: 16 }}>
            Empieza tu mudanza. Simplificala.
          </h1>

          <p style={{ fontSize: 18, color: '#555', maxWidth: 640, marginBottom: 32 }}>
            Voarah te acompaña en todo lo que viene ahora:
            mudanza, acondicionamiento y equipamiento para tu nuevo hogar,
            con beneficios a través de nuestros partners.
          </p>

          <button
            onClick={() => setOpen(true)}
            style={{
              padding: '14px 28px',
              background: '#8E24AA',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Activar mis beneficios
          </button>

          <p style={{ marginTop: 12, fontSize: 12, color: '#777' }}>
            Beneficios para clientes de
            inmobiliarias adheridas.
          </p>
        </section>

{/* SLIDER ECOSISTEMA VOARAH */}
<section
  style={{
    width: '100%',
    overflow: 'hidden',
    background: '#ffffff',
    padding: '32px 0'
  }}
>
  <div className="slider-track">
    {[
  'https://images.unsplash.com/photo-1604014237800-1c9102c219da',
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
  'https://images.unsplash.com/photo-1615873968403-89e068629265',
  'https://images.unsplash.com/photo-1593784991095-a205069470b6',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
  'https://images.unsplash.com/photo-1600121848594-d8644e57abab',

  'https://images.unsplash.com/photo-1604014237800-1c9102c219da',
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
  'https://images.unsplash.com/photo-1615873968403-89e068629265',
  'https://images.unsplash.com/photo-1593784991095-a205069470b6',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
  'https://images.unsplash.com/photo-1600121848594-d8644e57abab'
    ].map((src, i) => (
      <img
        key={i}
        src={src}
        alt="Servicios Voarah"
        style={{
          height: 220,
          width: 320,
          objectFit: 'cover',
          borderRadius: 12,
          marginRight: 12,
          flexShrink: 0
        }}
      />
    ))}
  </div>

  <style jsx>{`
    .slider-track {
      display: flex;
      width: max-content;
      animation: slider-marquee 30s linear infinite;
    }

    @keyframes slider-marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `}</style>
</section>

{/* SERVICIOS + PRODUCTOS */}
<section
  id="servicios"
  style={{
    background: '#f7f7f7',
    padding: '64px 24px'
  }}
>
  <div
    style={{
      maxWidth: 1100,
      margin: '0 auto',
      display: 'flex',
      gap: 48,
      alignItems: 'flex-start'
    }}
  >
    <div style={{ flex: 1 }}>
      <h2 style={{ fontSize: 28, marginBottom: 24 }}>
        Servicios para vos
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          { title: 'Mudanza & Logística', desc: 'Traslados, fletes y coordinación' },
          { title: 'Limpieza', desc: 'Puesta a punto de tu nueva casa' },
          { title: 'Pintura', desc: 'Acondicionamiento interior y exterior' },
          { title: 'Descarte y vaciado', desc: 'Gestión de objetos y espacios' }
        ].map((item) => (
          <div
            key={item.title}
            style={{
              background: '#ffffff',
              padding: 24,
              borderRadius: 12,
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
            }}
          >
            <h3 style={{ marginBottom: 6 }}>{item.title}</h3>
            <p style={{ color: '#666', fontSize: 14 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>

    <div style={{ flex: 1 }}>
      <h2 style={{ fontSize: 28, marginBottom: 24 }}>
        Productos para equipar tu casa
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          { title: 'Muebles', desc: 'Soluciones funcionales para cada ambiente' },
          { title: 'Equipamiento', desc: 'Todo lo necesario para tu nuevo hogar' },
          { title: 'Decoración', desc: 'Personalizá tus espacios' },
          { title: 'Soluciones extendidas', desc: 'Complementos y servicios adicionales' }
        ].map((item) => (
          <div
            key={item.title}
            style={{
              background: '#ffffff',
              padding: 24,
              borderRadius: 12,
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
            }}
          >
            <h3 style={{ marginBottom: 6 }}>{item.title}</h3>
            <p style={{ color: '#666', fontSize: 14 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


{/* COMO FUNCIONA */}
<section
  id="como-funciona"
  style={{
    padding: '80px 24px',
    maxWidth: 1100,
    margin: '0 auto'
  }}
>
  <h2 style={{ fontSize: 28, marginBottom: 24 }}>
    ¿Cómo funciona Voarah?
  </h2>

  <p style={{ fontSize: 16, color: '#555', maxWidth: 720, marginBottom: 16 }}>
    A través de inmobiliarias que trabajan con Voarah, los compradores
    acceden a un ecosistema de servicios y productos diseñados para
    reducir fricciones y simplificar la mudanza.
  </p>

  <p style={{ fontSize: 16, color: '#555', maxWidth: 720 }}>
    Voarah coordina, valida y conecta con partners estratégicos,
    asegurando una experiencia ordenada y trazable.
  </p>
</section>

{/* FOOTER */}
<footer
  style={{
    borderTop: '1px solid #eee',
    padding: '32px 24px',
    textAlign: 'center',
    fontSize: 12,
    color: '#777'
  }}
>
  © {new Date().getFullYear()} Voarah — Todos los derechos reservados
</footer>
</main>

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
            <input
              type="radio"
              name="interes"
              value="servicios"
              checked={interes === 'servicios'}
              onChange={() => setInteres('servicios')}
              required
            />
            Servicios
          </label>

          <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14 }}>
            <input
              type="radio"
              name="interes"
              value="productos"
              checked={interes === 'productos'}
              onChange={() => setInteres('productos')}
            />
            Productos
          </label>

          <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14 }}>
            <input
              type="radio"
              name="interes"
              value="ambos"
              checked={interes === 'ambos'}
              onChange={() => setInteres('ambos')}
            />
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

    </>
  )
}
const radioStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 14,
  cursor: 'pointer'
}
