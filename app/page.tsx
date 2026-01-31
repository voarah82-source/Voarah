'use client'

export default function HomePage() {
  return (
    <main
      style={{
        fontFamily: 'Montserrat, system-ui, sans-serif',
        background: '#ffffff',
        color: '#1a1a1a'
      }}
    >
      {/* HERO */}
      <section
        style={{
          padding: '96px 24px 64px',
          maxWidth: 1100,
          margin: '0 auto'
        }}
      >
        <h1
          style={{
            fontSize: 42,
            lineHeight: 1.2,
            marginBottom: 16
          }}
        >
          Compraste una casa.
          <br />
          Ahora empieza lo importante.
        </h1>

        <p
          style={{
            fontSize: 18,
            color: '#555',
            maxWidth: 640,
            marginBottom: 32
          }}
        >
          Voarah te acompaña en todo lo que viene después de la compra:
          mudanza, acondicionamiento y soluciones para tu nuevo hogar,
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

        <p
          style={{
            marginTop: 12,
            fontSize: 12,
            color: '#777'
          }}
        >
          Beneficios disponibles para compradores de propiedades a través de
          inmobiliarias adheridas.
        </p>
      </section>

      {/* ABANICO DE SERVICIOS */}
      <section
        style={{
          background: '#f7f7f7',
          padding: '64px 24px'
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 28,
              marginBottom: 32
            }}
          >
            Todo lo que necesitás para tu mudanza, en un solo lugar
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 24
            }}
          >
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
              },
              {
                title: 'Productos para el hogar',
                desc: 'Soluciones y equipamiento'
              },
              {
                title: 'Servicios complementarios',
                desc: 'Todo lo que rodea una mudanza'
              }
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: '#fff',
                  padding: 24,
                  borderRadius: 12,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
                }}
              >
                <h3 style={{ marginBottom: 8 }}>{item.title}</h3>
                <p style={{ color: '#666', fontSize: 14 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOQUE INSTITUCIONAL */}
      <section
        style={{
          padding: '80px 24px',
          maxWidth: 1100,
          margin: '0 auto'
        }}
      >
        <h2 style={{ fontSize: 28, marginBottom: 24 }}>
          ¿Qué es Voarah?
        </h2>

        <p
          style={{
            fontSize: 16,
            color: '#555',
            maxWidth: 720,
            marginBottom: 16
          }}
        >
          Voarah es una infraestructura que conecta a compradores de viviendas
          con proveedores de servicios y productos para la mudanza, asegurando
          beneficios, trazabilidad y una mejor experiencia post-compra.
        </p>

        <p
          style={{
            fontSize: 16,
            color: '#555',
            maxWidth: 720
          }}
        >
          Trabajamos junto a inmobiliarias y partners estratégicos para que
          mudarte sea más simple, ordenado y previsible.
        </p>
      </section>

      {/* FOOTER SIMPLE */}
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
  )
}
