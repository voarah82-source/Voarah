'use client'

import Header from '../components/Header'

export default function HomePage() {
  return (
    <>
      <Header />

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

       {/* SERVICIOS + PRODUCTOS (OPCIÓN B: IMAGEN ANCLA POR COLUMNA) */}
<section
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
    {/* COLUMNA SERVICIOS */}
    <div style={{ flex: 1 }}>
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        alt="Servicios de mudanza"
        style={{
          width: '100%',
          height: 260,
          objectFit: 'cover',
          borderRadius: 16,
          marginBottom: 24
        }}
      />

      <h2 style={{ fontSize: 28, marginBottom: 24 }}>
        Servicios para tu mudanza
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          {
            title: 'Mudanza & Logística',
            desc: 'Traslados, fletes y coordinación'
          },
          {
            title: 'Limpieza',
            desc: 'Puesta a punto de tu nueva casa'
          },
          {
            title: 'Pintura',
            desc: 'Acondicionamiento interior y exterior'
          },
          {
            title: 'Descarte y vaciado',
            desc: 'Gestión de objetos y espacios'
          }
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

    {/* COLUMNA PRODUCTOS */}
    <div style={{ flex: 1 }}>
      <img
        src="https://images.unsplash.com/photo-1505691938895-1758d7feb511"
        alt="Productos para el hogar"
        style={{
          width: '100%',
          height: 260,
          objectFit: 'cover',
          borderRadius: 16,
          marginBottom: 24
        }}
      />

      <h2 style={{ fontSize: 28, marginBottom: 24 }}>
        Productos para equipar tu casa
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          {
            title: 'Muebles',
            desc: 'Soluciones funcionales para cada ambiente'
          },
          {
            title: 'Equipamiento',
            desc: 'Todo lo necesario para tu nuevo hogar'
          },
          {
            title: 'Decoración',
            desc: 'Personalizá tus espacios'
          },
          {
            title: 'Soluciones extendidas',
            desc: 'Complementos y servicios adicionales'
          }
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
    </>
  )
}
