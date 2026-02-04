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
    margin: '0 auto',
    textAlign: 'center'
  }}
>
  <h1
    style={{
      fontSize: 42,
      lineHeight: 1.2,
      marginBottom: 16
    }}
  >
    Más confiable. Más rápido. Más simple.
  </h1>

  <p
    style={{
      fontSize: 18,
      color: '#555',
      maxWidth: 640,
      margin: '0 auto 32px'
    }}
  >
    Ecosistema de servicios integrados para cada operación inmobiliaria.<br />
    Todo en un solo lugar.
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
          <h2 style={{ textAlign: 'center', fontSize: 28, marginBottom: 24 }}>
  Un sistema. Todas las soluciones.
</h2>

         <div className="slider-track">
  {[
    'https://pub-9dfc71df9bad42b19366c96dcbca6cd0.r2.dev/Decoracion.PNG',
    'https://pub-9dfc71df9bad42b19366c96dcbca6cd0.r2.dev/Limpieza%20y%20puesta%20a%20punto.PMG',
    'https://pub-9dfc71df9bad42b19366c96dcbca6cd0.r2.dev/Soluciones%20extendidas.png',
    'https://pub-9dfc71df9bad42b19366c96dcbca6cd0.r2.dev/deshacete%20de%20tus%20articulos.png',
    'https://pub-9dfc71df9bad42b19366c96dcbca6cd0.r2.dev/mudanza%20y%20logistica.png',
    'https://pub-9dfc71df9bad42b19366c96dcbca6cd0.r2.dev/pintura.png',
    

    // DUPLICADO PARA LOOP INFINITO
    'https://pub-9dfc71df9bad42b19366c96dcbca6cd0.r2.dev/Decoracion.PNG',
    'https://pub-9dfc71df9bad42b19366c96dcbca6cd0.r2.dev/Limpieza%20y%20puesta%20a%20punto.PMG',
    'https://pub-9dfc71df9bad42b19366c96dcbca6cd0.r2.dev/Soluciones%20extendidas.png',
    'https://pub-9dfc71df9bad42b19366c96dcbca6cd0.r2.dev/deshacete%20de%20tus%20articulos.png',
    'https://pub-9dfc71df9bad42b19366c96dcbca6cd0.r2.dev/mudanza%20y%20logistica.png',
    'https://pub-9dfc71df9bad42b19366c96dcbca6cd0.r2.dev/pintura.png',
    'https://pub-9dfc71df9bad42b19366c96dcbca6cd0.r2.dev/titulo%20sobre%20las%20imagenes.png',
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


    {/* QUIÉNES SOMOS */}
<section
  id="quienes-somos"
  style={{
    padding: '80px 24px',
    maxWidth: 1100,
    margin: '0 auto',
    textAlign: 'center'
  }}
>
  <h2
    style={{
      fontSize: 28,
      marginBottom: 24
    }}
  >
    ¿Quiénes somos?
  </h2>

  <p
    style={{
      fontSize: 16,
      color: '#555',
      maxWidth: 760,
      margin: '0 auto 16px'
    }}
  >
    En VOARAH conectamos a personas que están por mudarse o entrar en una vivienda con proveedores de servicios confiables: 
    mudanzas, limpieza, mantenimiento, reformas, compra venta de artículos usados, etc.
    Trabajamos con inmobiliarias para que sus clientes resuelvan todo lo que necesitan para su nuevo hogar, de forma simple, rápida y sin costo para ellos.
    Nosotros coordinamos, el cliente elige, y los servicios suceden.

  </p>

  <p
    style={{
      fontSize: 16,
      color: '#555',
      maxWidth: 760,
      margin: '0 auto'
    }}
  >
    Trabajamos junto a inmobiliarias y partners estratégicos para ofrecer
    soluciones confiables, coordinadas y pensadas para acompañarte antes,
    durante y después de tu mudanza.
  </p>
</section>


      {/* COMO FUNCIONA */}
<section
  id="como-funciona"
  style={{
    background: '#f7f7f7',
    padding: '80px 24px'
  }}
>
  <div
    style={{
      maxWidth: 1100,
      margin: '0 auto',
      textAlign: 'center'
    }}
  >
    <h2 style={{ fontSize: 28, marginBottom: 24 }}>
      ¿Cómo funciona Voarah?
    </h2>

    <p
      style={{
        fontSize: 16,
        color: '#555',
        maxWidth: 720,
        margin: '0 auto 16px'
      }}
    >
      VOARAH ofrece tranquilidad en uno de los momentos más estresantes en la vida de las personas.
      Organiza y coordina los servicios necesarios alrededor de una operación inmobiliaria,
      integrándolos en un sistema simple, claro y confiable.
    </p>

    <p
      style={{
        fontSize: 16,
        color: '#555',
        maxWidth: 720,
        margin: '0 auto 16px'
      }}
    >
      A través de nuestra infraestructura, cualquier persona puede resolver en un mismo entorno
      soluciones que habitualmente están dispersas, evitando la búsqueda individual,
      la falta de coordinación y la incertidumbre.
    </p>

    <p
      style={{
        fontSize: 16,
        color: '#555',
        maxWidth: 720,
        margin: '0 auto 32px'
      }}
    >
      Cada servicio es brindado por especialistas seleccionados y validados por VOARAH,
      bajo estándares definidos de calidad y experiencia,
      para que todo funcione de manera rápida y ordenada.
    </p>

    <button
      onClick={() => setOpen(true)}
      style={{
        display: 'block',
        margin: '0 auto',
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
  </div>
</section>
        {/* PARTNERS VOARAH */}
<section
  id="partners"
  style={{
    background: '#ffffff',
    padding: '80px 24px'
  }}
>
  <div
    style={{
      maxWidth: 1100,
      margin: '0 auto'
    }}
  >
    <h2
      style={{
        fontSize: 28,
        marginBottom: 40,
        textAlign: 'center'
      }}
    >
      Sumate como partner de Voarah
    </h2>

    <div
      style={{
        display: 'flex',
        gap: 32,
        flexWrap: 'wrap'
      }}
    >
      {/* INMOBILIARIAS */}
      <div
        style={{
          flex: 1,
          minWidth: 280,
          background: '#f7f7f7',
          padding: 32,
          borderRadius: 16
        }}
      >
        <h3 style={{ fontSize: 22, marginBottom: 16 }}>
          Para Inmobiliarias
        </h3>

        <p style={{ fontSize: 15, color: '#555', marginBottom: 16 }}>
          En VOARAH ayudamos a las inmobiliarias a ofrecer un valor añadido real
          a sus clientes. A través de nuestra plataforma, sus inquilinos o
          compradores acceden fácilmente a servicios clave para su mudanza y
          puesta a punto de la vivienda.
        </p>

        <p style={{ fontSize: 15, color: '#555', marginBottom: 24 }}>
          Sin gestión extra para tu equipo, sin coste para tus clientes y con
          proveedores verificados. Si quieres mejorar la experiencia de tus
          clientes y diferenciarte, hablemos.
        </p>

     <button
  onClick={() => setOpenInmoModal(true)}
  style={{
    padding: '14px 22px',
    background: '#8E24AA',
    color: '#ffffff',
    borderRadius: 8,
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer'
  }}
>
  Quiero sumar mi inmobiliaria
</button>

      </div>

      {/* PROVEEDORES */}
      <div
        style={{
          flex: 1,
          minWidth: 280,
          background: '#f7f7f7',
          padding: 32,
          borderRadius: 16
        }}
      >
        <h3 style={{ fontSize: 22, marginBottom: 16 }}>
          Para Proveedores de servicios
        </h3>

        <p style={{ fontSize: 15, color: '#555', marginBottom: 16 }}>
          En VOARAH conectamos tu servicio con clientes que realmente lo
          necesitan, en el momento justo: cuando entran a una nueva vivienda.
        </p>

        <p style={{ fontSize: 15, color: '#555', marginBottom: 24 }}>
          Colaboramos con profesionales de mudanzas, limpieza, mantenimiento,
          reformas y todo tipo de servicios que quieran recibir nuevas
          oportunidades de trabajo a través de nuestra red de inmobiliarias.
        </p>

       <button
  onClick={() => setOpenProveedorModal(true)}
  style={{
    padding: '14px 22px',
    background: '#8E24AA',
    color: '#ffffff',
    borderRadius: 8,
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer'
  }}
>
  Quiero ser partner de Voarah
</button>

      </div>
    </div>
  </div>
</section>




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
      </main>
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

