'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Header from '../components/Header'

export default function HomePage() {

  const [session, setSession] = useState<any>(null)
  const [open, setOpen] = useState(false)
  const [openInmoModal, setOpenInmoModal] = useState(false)
  const [openProveedorModal, setOpenProveedorModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingInmo, setLoadingInmo] = useState(false)
  const [loadingProveedor, setLoadingProveedor] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // ⚠️ MUY IMPORTANTE: crear cliente dentro del componente
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const inputStyle = {
    padding: '12px 14px',
    borderRadius: 10,
    border: '1px solid #ddd',
    fontSize: 14,
    fontFamily: 'Montserrat, system-ui, sans-serif'
  }

  // 👉 LEEMOS ORIGEN DESDE QR
  const [origen, setOrigen] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const origenParam = params.get('origen') || ''
    setOrigen(origenParam)
  }, [])

  // ===============================
  // 🔹 Detectar login y enviar lead
  // ===============================
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setSession(data.session)

        const pending = localStorage.getItem("pendingLead")

        if (pending) {
          fetch('/api/lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: pending
          }).then(() => {
            localStorage.removeItem("pendingLead")
            alert("Datos enviados correctamente.")
          })
        }
      }
    })
  }, [])

  // ===============================
  // 🔹 SUBMIT CLIENTE (MAGIC LINK)
  // ===============================
  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target)

    const payload = {
      nombre: formData.get('nombre'),
      email: formData.get('email'),
      telefono: formData.get('telefono'),
      comentario: formData.get('comentario'),
      origen,

      servicio_mudanza: formData.get('servicio_mudanza') === 'on',
      servicio_guardamuebles: formData.get('servicio_guardamuebles') === 'on',
      servicio_limpieza: formData.get('servicio_limpieza') === 'on',
      servicio_pintura: formData.get('servicio_pintura') === 'on',
      servicio_decoracion: formData.get('servicio_decoracion') === 'on',
      servicio_mantenimiento: formData.get('servicio_mantenimiento') === 'on',
      servicio_otros: formData.get('servicio_otros') === 'on',
      servicio_otros_texto: formData.get('servicio_otros_texto')
    }

    // Guardamos temporalmente
    localStorage.setItem("pendingLead", JSON.stringify(payload))

    // Mandamos magic link
    await supabase.auth.signInWithOtp({
      email: payload.email as string,
      options: {
        emailRedirectTo: "https://www.voarah.com/auth/callback"
      }
    })

    setLoading(false)
    alert("Te enviamos un link a tu email para confirmar.")
  }

//===================hendler inmobs======================//
async function handleSubmitInmobiliaria(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault()
  setLoadingInmo(true)

  const formData = new FormData(e.currentTarget)

  try {
    const res = await fetch('/api/partners/inmobiliarias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        inmobiliaria_nombre: formData.get('inmobiliaria_nombre'),
        contacto_nombre: formData.get('contacto_nombre'),
        email: formData.get('email'),
        telefono: formData.get('telefono'),
        ciudad_zona: formData.get('ciudad')
      })
    })

if (!res.ok) throw new Error('Error API inmobiliarias')

setOpenInmoModal(false)
e.currentTarget.reset()
setShowSuccess(true) // 👈 MOSTRAMOS MODAL DE ÉXITO
} catch (err) {
  console.error(err)
  setOpenInmoModal(false) // cerramos igual
  e.currentTarget.reset() // limpiamos igual
} finally {
  setLoadingInmo(false)
}

}



  //===========handler proveedores=================
async function handleSubmitProveedor(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault()
  setLoadingProveedor(true)

  const formData = new FormData(e.currentTarget)

  try {
    const res = await fetch('/api/partners/proveedores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        empresa_nombre: formData.get('empresa_nombre'),
        contacto_nombre: formData.get('contacto_nombre'),
        email: formData.get('email'),
        telefono: formData.get('telefono'),
        ciudad_zona: formData.get('ciudad'),

        servicio_mudanza: formData.get('servicio_mudanza') === 'on',
        servicio_guardamuebles: formData.get('servicio_guardamuebles') === 'on',
        servicio_limpieza: formData.get('servicio_limpieza') === 'on',
        servicio_pintura: formData.get('servicio_pintura') === 'on',
        servicio_decoracion: formData.get('servicio_decoracion') === 'on',
        servicio_compra_objetos: false,
        servicio_mantenimiento: formData.get('servicio_mantenimiento') === 'on',
        servicio_otros: formData.get('servicio_otros') === 'on',
        servicio_otros_texto: formData.get('servicio_otros_texto')
      })
    })

if (!res.ok) throw new Error('Error API proveedores')

setOpenProveedorModal(false)
e.currentTarget.reset()
setShowSuccess(true) //  MOSTRAMOS MODAL DE ÉXITO
} catch (err) {
  console.error(err)
  setOpenProveedorModal(false) // cerramos igual
  e.currentTarget.reset() // limpiamos igual
} finally {
  setLoadingProveedor(false)
}

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
    VOARAH es un ecosistema que integra y coordina los servicios que rodean la operación inmobiliaria.<br />
  </p>

 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
  <span style={{ fontSize: 14, fontWeight: 500 }}>
    Soy Particular
  </span>

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
</div>

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
  <h1
    style={{
      textAlign: 'center',
      fontSize: 28,
      marginBottom: 24,
      padding: '0 16px'
    }}
  >
    Un sistema. Todas las soluciones.
  </h1>

  {/* WRAPPER PARA EVITAR OVERFLOW GLOBAL */}
  <div
    style={{
      width: '100%',
      overflow: 'hidden'
    }}
  >
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
  </div>

  <style jsx>{`
    .slider-track {
      display: flex;
      width: max-content;
      animation: slider-marquee 30s linear infinite;
      will-change: transform;
    }

    @keyframes slider-marquee {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    /* ===== MOBILE FIX ===== */
    @media (max-width: 768px) {
      .slider-track img {
        width: 240px;
        height: 160px;
      }

      .slider-track {
        animation-duration: 40s;
      }
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
  VOARAH nace de una idea simple: los momentos importantes de la vida no deberían estar llenos de estrés ni desorden.< br/>
    
Creamos una infraestructura que integra soluciones que normalmente están dispersas, transformándolas en una experiencia coordinada, clara y confiable.
Organizamos cada etapa alrededor de una operación inmobiliaria para que todo fluya de forma simple.
  </p>

  <p
    style={{
      fontSize: 16,
      color: '#555',
      maxWidth: 760,
      margin: '0 auto'
    }}
  >
    
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
      ¿Cómo funciona VOARAH?
    </h2>

    <p
      style={{
        fontSize: 16,
        color: '#555',
        maxWidth: 720,
        margin: '0 auto 16px'
      }}
    >
     VOARAH organiza y coordina los servicios necesarios alrededor de una operación inmobiliaria, integrándolos en un sistema simple, claro y confiable.
Desde un mismo entorno, las personas acceden a soluciones que antes estaban dispersas, evitando la búsqueda individual, la falta de coordinación y la incertidumbre.
Cada servicio es brindado por especialistas seleccionados y validados por VOARAH, bajo estándares definidos de calidad y experiencia.
    </p>

    <p
      style={{
        fontSize: 16,
        color: '#555',
        maxWidth: 720,
        margin: '0 auto 16px'
      }}
    >
      {/*VOARAH organiza y coordina los servicios necesarios alrededor de una operación inmobiliaria, integrándolos en un sistema simple, claro y confiable.
Desde un mismo entorno, las personas acceden a soluciones que antes estaban dispersas, evitando la búsqueda individual, la falta de coordinación y la incertidumbre.
Cada servicio es brindado por especialistas seleccionados y validados por VOARAH, bajo estándares definidos de calidad y experiencia.*/}
    </p>

    <p
      style={{
        fontSize: 16,
        color: '#555',
        maxWidth: 720,
        margin: '0 auto 32px'
      }}
    >
      {/* Cada servicio es brindado por especialistas seleccionados y validados por VOARAH,
      bajo estándares definidos de calidad y experiencia,
      para que todo funcione de manera rápida y ordenada.*/}
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
      Sumate como partner de VOARAH
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
           Inmobiliarias
        </h3>

        <p style={{ fontSize: 15, color: '#555', marginBottom: 16 }}>
        En VOARAH ayudamos a las inmobiliarias a diferenciarse ofreciendo una experiencia más completa en cada operación.
A través de nuestra infraestructura, tus clientes acceden a soluciones confiables y coordinadas, sin gestión adicional para tu equipo, fortaleciendo tu posicionamiento y tu capacidad de atraer y cerrar más operaciones.
        </p>

        <p style={{ fontSize: 15, color: '#555', marginBottom: 24 }}>
          Además, al sumarte accedés a beneficios exclusivos que fortalecen tu negocio; te lo contamos al contactarte.

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
          Quiero sumarme a VOARAH
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
           Proveedores de servicios
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
          Quiero sumarme a VOARAH
        </button>
      </div>
    </div>
  </div>
</section>

        
        {/* MODAL CTAs */}
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
      backdropFilter: 'blur(4px)',
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
        fontFamily: 'Montserrat, system-ui, sans-serif',
      }}
    >
      <h2
        style={{
          fontSize: 24,
          marginBottom: 8,
          fontWeight: 700,
        }}
      >
        Activar beneficios VOARAH
      </h2>

      <p
        style={{
          fontSize: 14,
          color: '#666',
          marginBottom: 24,
        }}
      >
        Dejanos tus datos y un asesor te contactará a la brevedad.
      </p>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);

          const formData = new FormData(e.currentTarget);

          try {
            const res = await fetch('/api/lead', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                nombre: formData.get('nombre'),
                email: formData.get('email'),
                telefono: formData.get('telefono'),
                comentario: formData.get('comentario'),

                servicio_mudanza: formData.get('servicio_mudanza') === 'on',
                servicio_guardamuebles:
                  formData.get('servicio_guardamuebles') === 'on',
                servicio_limpieza: formData.get('servicio_limpieza') === 'on',
                servicio_pintura: formData.get('servicio_pintura') === 'on',
                servicio_decoracion:
                  formData.get('servicio_decoracion') === 'on',
                servicio_mantenimiento:
                  formData.get('servicio_mantenimiento') === 'on',
                servicio_otros: formData.get('servicio_otros') === 'on',
                servicio_otros_texto: formData.get(
                  'servicio_otros_texto'
                ),

                // 🔴 ESTO ES LO QUE FALTABA
                origen: new URLSearchParams(
                  window.location.search
                ).get('origen'),
              }),
            });

            if (!res.ok) {
              throw new Error('Error API lead');
            }

            setOpen(false);
            e.currentTarget.reset();
            setShowSuccess(true);
          } catch (err) {
            console.error(err);
            setOpen(false);
            e.currentTarget.reset();
          } finally {
            setLoading(false);
          }
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <input name="nombre" placeholder="Nombre" required style={inputStyle} />

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
            marginTop: 4,
          }}
        >
          <span style={{ fontSize: 13, color: '#555', fontWeight: 500 }}>
            ¿Qué estás buscando?
          </span>

          <label style={{ display: 'flex', gap: 8, fontSize: 14 }}>
            <input type="checkbox" name="servicio_mudanza" /> Mudanza
          </label>

          <label style={{ display: 'flex', gap: 8, fontSize: 14 }}>
            <input type="checkbox" name="servicio_guardamuebles" /> Guardamuebles
          </label>

          <label style={{ display: 'flex', gap: 8, fontSize: 14 }}>
            <input type="checkbox" name="servicio_limpieza" /> Limpieza
          </label>

          <label style={{ display: 'flex', gap: 8, fontSize: 14 }}>
            <input type="checkbox" name="servicio_pintura" /> Pintura
          </label>

          <label style={{ display: 'flex', gap: 8, fontSize: 14 }}>
            <input type="checkbox" name="servicio_decoracion" /> Decoración
          </label>

          <label style={{ display: 'flex', gap: 8, fontSize: 14 }}>
            <input type="checkbox" name="servicio_mantenimiento" /> Mantenimiento
          </label>

          <label style={{ display: 'flex', gap: 8, fontSize: 14 }}>
            <input type="checkbox" name="servicio_otros" /> Otros
          </label>

          <input
            name="servicio_otros_texto"
            placeholder="Si marcaste otros, especificá el servicio"
            style={{
              marginTop: 6,
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid #ddd',
              fontSize: 14,
            }}
          />
        </div>

        <textarea
          name="comentario"
          placeholder="Dejale toda la info que puedas a tu proveedor, como fecha de mudanza, detalles, etc."
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
            cursor: 'pointer',
          }}
        >
          {loading ? 'Enviando…' : 'Enviar'}
        </button>
      </form>
    </div>
  </div>
)}


{/* MODAL INMOBILIARIAS */}
{openInmoModal && (
  <div
    onClick={() => setOpenInmoModal(false)}
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(20,20,20,0.55)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 3000
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: '#fff',
        padding: 36,
        borderRadius: 16,
        width: 480,
        maxHeight: '90vh',
        overflowY: 'auto',
        fontFamily: 'Montserrat, system-ui, sans-serif'
      }}
    >
      <h2 style={{ marginBottom: 16 }}>
        Quiero sumar mi inmobiliaria a VOARAH
      </h2>

<form
  onSubmit={handleSubmitInmobiliaria}
  style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
>
  <input
    name="inmobiliaria_nombre"
    placeholder="Nombre de la inmobiliaria"
    required
  />
  <input
    name="contacto_nombre"
    placeholder="Nombre y apellido del contacto"
    required
  />
  <input name="email" type="email" placeholder="Email" required />
  <input name="telefono" placeholder="Teléfono / WhatsApp" required />
  <input name="ciudad" placeholder="Ciudad / zona donde opera" required />

  <button
    type="submit"
    style={{
      marginTop: 12,
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
    Quiero que me contacten
  </button>
</form>

    </div>
  </div>
)}

{/* MODAL PROVEEDORES */}
{openProveedorModal && (
  <div
    onClick={() => setOpenProveedorModal(false)}
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(20,20,20,0.55)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 3000
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: '#fff',
        padding: 36,
        borderRadius: 16,
        width: 520,
        maxHeight: '90vh',
        overflowY: 'auto',
        fontFamily: 'Montserrat, system-ui, sans-serif'
      }}
    >
      <h2 style={{ marginBottom: 16 }}>
        Quiero ser partner de servicios de VOARAH
      </h2>

  <form
  onSubmit={handleSubmitProveedor}
  style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
>
  <input name="empresa_nombre" placeholder="Nombre de la empresa" required />
  <input name="contacto_nombre" placeholder="Nombre y apellido del contacto" required />
  <input name="email" type="email" placeholder="Email" required />
  <input name="telefono" placeholder="Teléfono / WhatsApp" required />
  <input name="ciudad" placeholder="Ciudad / zonas donde opera" required />

  <strong>Servicios que ofrecen</strong>
  <label><input type="checkbox" name="servicio_mudanza" /> Mudanza</label>
  <label><input type="checkbox" name="servicio_guardamuebles" /> Guardamuebles</label>
  <label><input type="checkbox" name="servicio_limpieza" /> Limpieza</label>
  <label><input type="checkbox" name="servicio_pintura" /> Pintura</label>
  <label><input type="checkbox" name="servicio_decoracion" /> Decoración</label>
  <label><input type="checkbox" name="servicio_mantenimiento" /> Mantenimiento</label>
  <label><input type="checkbox" name="servicio_otros" /> Otros</label>

  <input
    name="servicio_otros_texto"
    placeholder="Si marcaste otros, especificá el servicio"
  />

  <button
    type="submit"
    style={{
      marginTop: 12,
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
    Quiero ser partner de Voarah
  </button>
</form>
{showSuccess && (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(20,20,20,0.55)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 3000
    }}
  >
    <div
      style={{
        background: '#fff',
        padding: '32px 36px',
        borderRadius: 14,
        width: 420,
        textAlign: 'center',
        boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
        fontFamily: 'Montserrat, system-ui, sans-serif'
      }}
    >
      <h3 style={{ fontSize: 22, marginBottom: 12 }}>
        ¡Datos enviados!
      </h3>

      <p style={{ fontSize: 15, color: '#555', marginBottom: 24 }}>
        Hemos ingresado tus datos y nos pondremos en contacto a la brevedad.
      </p>

      <button
        onClick={() => setShowSuccess(false)}
        style={{
          padding: '12px 22px',
          background: '#8E24AA',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          fontSize: 15,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Cerrar
      </button>
    </div>
  </div>
)}



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

