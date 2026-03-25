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
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)

  const [formState, setFormState] = useState({})

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

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

  const [origen, setOrigen] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const origenParam = params.get('origen') || ''
    setOrigen(origenParam)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === '1') {
      alert('Datos enviados correctamente. Te contactaremos pronto.')
    }
  }, [])

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

    // ================= SERVICIOS =================
    servicio_mudanza: formData.get('servicio_mudanza') === 'on',
    servicio_guardamuebles: formData.get('servicio_guardamuebles') === 'on',
    servicio_limpieza: formData.get('servicio_limpieza') === 'on',
    servicio_pintura: formData.get('servicio_pintura') === 'on',
    servicio_decoracion: formData.get('servicio_decoracion') === 'on',
    servicio_mantenimiento: formData.get('servicio_mantenimiento') === 'on',
    servicio_diseno_interior: formData.get('servicio_diseno_interior') === 'on',
    servicio_fotografia_video_dron: formData.get('servicio_fotografia_video_dron') === 'on',
    servicio_juridicos: formData.get('servicio_juridicos') === 'on',
    servicio_seguros: formData.get('servicio_seguros') === 'on',
    servicio_jardinero_piletero: formData.get('servicio_jardinero_piletero') === 'on',
    servicio_seguridad: formData.get('servicio_seguridad') === 'on',

    // SUBITEMS SERVICIOS
servicio_mudanza_embalaje: formData.get('servicio_mudanza_embalaje') === 'on',
servicio_mudanza_desembalaje: formData.get('servicio_mudanza_desembalaje') === 'on',
servicio_mudanza_solo_transporte: formData.get('servicio_mudanza_solo_transporte') === 'on',

servicio_guardamuebles_recogida: formData.get('servicio_guardamuebles_recogida') === 'on',
servicio_guardamuebles_entrega: formData.get('servicio_guardamuebles_entrega') === 'on',
servicio_guardamuebles_embalaje: formData.get('servicio_guardamuebles_embalaje') === 'on',
servicio_guardamuebles_bauleras: formData.get('servicio_guardamuebles_bauleras') === 'on',

servicio_limpieza_hogares: formData.get('servicio_limpieza_hogares') === 'on',
servicio_limpieza_locales: formData.get('servicio_limpieza_locales') === 'on',
servicio_limpieza_oficinas: formData.get('servicio_limpieza_oficinas') === 'on',
servicio_limpieza_edificios: formData.get('servicio_limpieza_edificios') === 'on',
servicio_limpieza_fin_obra: formData.get('servicio_limpieza_fin_obra') === 'on',
servicio_limpieza_fachadas: formData.get('servicio_limpieza_fachadas') === 'on',
servicio_limpieza_tejados: formData.get('servicio_limpieza_tejados') === 'on',
servicio_limpieza_tapizados: formData.get('servicio_limpieza_tapizados') === 'on',
servicio_limpieza_piletas: formData.get('servicio_limpieza_piletas') === 'on',
servicio_limpieza_poda_arboles: formData.get('servicio_limpieza_poda_arboles') === 'on',

servicio_diseno_disenos: formData.get('servicio_diseno_disenos') === 'on',
servicio_diseno_proyectos: formData.get('servicio_diseno_proyectos') === 'on',
servicio_diseno_planos: formData.get('servicio_diseno_planos') === 'on',
servicio_diseno_certificaciones: formData.get('servicio_diseno_certificaciones') === 'on',

servicio_mantenimiento_pintura: formData.get('servicio_mantenimiento_pintura') === 'on',
servicio_mantenimiento_plomeria: formData.get('servicio_mantenimiento_plomeria') === 'on',
servicio_mantenimiento_electricidad: formData.get('servicio_mantenimiento_electricidad') === 'on',
servicio_mantenimiento_pisos: formData.get('servicio_mantenimiento_pisos') === 'on',
servicio_mantenimiento_banos: formData.get('servicio_mantenimiento_banos') === 'on',
servicio_mantenimiento_humedades: formData.get('servicio_mantenimiento_humedades') === 'on',
servicio_mantenimiento_refacciones: formData.get('servicio_mantenimiento_refacciones') === 'on',

servicio_juridico_civil: formData.get('servicio_juridico_civil') === 'on',
servicio_juridico_contratos: formData.get('servicio_juridico_contratos') === 'on',
servicio_juridico_sucesiones: formData.get('servicio_juridico_sucesiones') === 'on',
servicio_juridico_divisiones_propiedad: formData.get('servicio_juridico_divisiones_propiedad') === 'on',
servicio_juridico_mediaciones: formData.get('servicio_juridico_mediaciones') === 'on',

servicio_seguro_hogar: formData.get('servicio_seguro_hogar') === 'on',
servicio_seguro_comercio: formData.get('servicio_seguro_comercio') === 'on',
servicio_seguro_autos: formData.get('servicio_seguro_autos') === 'on',
servicio_seguro_cauciones: formData.get('servicio_seguro_cauciones') === 'on',
servicio_seguro_proteccion_alquiler: formData.get('servicio_seguro_proteccion_alquiler') === 'on',

servicio_seguridad_camaras: formData.get('servicio_seguridad_camaras') === 'on',
servicio_seguridad_alarmas: formData.get('servicio_seguridad_alarmas') === 'on',

  
    // ================= PRODUCTOS =================
    producto_materiales_obra: formData.get('producto_materiales_obra') === 'on',
    producto_pintura: formData.get('producto_pintura') === 'on',
    producto_pisos_revestimientos: formData.get('producto_pisos_revestimientos') === 'on',
    producto_electricidad_plomeria_banos: formData.get('producto_electricidad_plomeria_banos') === 'on',
    producto_herramientas: formData.get('producto_herramientas') === 'on',
    producto_electrodomesticos: formData.get('producto_electrodomesticos') === 'on',
    producto_hogar_muebles_jardin: formData.get('producto_hogar_muebles_jardin') === 'on',
    producto_muebles_decoracion: formData.get('producto_muebles_decoracion') === 'on',
    producto_compra_venta_muebles_decoracion_usados: formData.get('producto_compra_venta_muebles_decoracion_usados') === 'on',
    producto_bienes_usados: formData.get('producto_bienes_usados') === 'on',
    producto_compra_venta_productos_usados: formData.get('producto_compra_venta_productos_usados') === 'on',

    
// SUBITEMS PRODUCTOS
producto_termotanques: formData.get('producto_termotanques') === 'on',
producto_calefaccion_aire: formData.get('producto_calefaccion_aire') === 'on',
producto_piletas: formData.get('producto_piletas') === 'on',

producto_usado_laptops: formData.get('producto_usado_laptops') === 'on',
producto_usado_celulares: formData.get('producto_usado_celulares') === 'on',
producto_usado_videoconsolas: formData.get('producto_usado_videoconsolas') === 'on',
producto_usado_relojes: formData.get('producto_usado_relojes') === 'on',
producto_usado_camaras_fotos: formData.get('producto_usado_camaras_fotos') === 'on',
producto_usado_bicicletas: formData.get('producto_usado_bicicletas') === 'on',
producto_usado_raquetas: formData.get('producto_usado_raquetas') === 'on',
producto_usado_motos: formData.get('producto_usado_motos') === 'on',
    
  }

  try {
    // guardamos lead pendiente
    localStorage.setItem("pendingLead", JSON.stringify(payload))

    const { data, error } = await supabase.auth.signInWithOtp({
      email: payload.email as string,
      options: {
        emailRedirectTo: "https://www.voarah.com/auth/callback"
      }
    })

    console.log("OTP DATA:", data)
    console.log("OTP ERROR:", error)

    if (error) {
      console.error("Error enviando OTP:", error.message)
      alert("Hubo un problema enviando el email. Intentá nuevamente.")
      localStorage.removeItem("pendingLead")
      return
    }

    alert("Te enviamos un link a tu email para confirmar. Revisa la casilla Spam / correo no deseado")

  } catch (err) {
    console.error("Error real:", err)
    alert("Error inesperado. Intentá nuevamente.")
    localStorage.removeItem("pendingLead")
  } finally {
    setLoading(false)
  }
}

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
      setShowSuccess(true)
    } catch (err) {
      console.error(err)
      setOpenInmoModal(false)
      e.currentTarget.reset()
    } finally {
      setLoadingInmo(false)
    }
  }

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

        // SERVICIOS
        servicio_mudanza: formData.get('servicio_mudanza') === 'on',
        servicio_guardamuebles: formData.get('servicio_guardamuebles') === 'on',
        servicio_limpieza: formData.get('servicio_limpieza') === 'on',
        servicio_pintura: formData.get('servicio_pintura') === 'on',
        servicio_decoracion: formData.get('servicio_decoracion') === 'on',
        servicio_mantenimiento: formData.get('servicio_mantenimiento') === 'on',
        servicio_otros: formData.get('servicio_otros') === 'on',
        servicio_otros_texto: formData.get('servicio_otros_texto'),

        // PRODUCTOS
        producto_pintura: formData.get('producto_pintura') === 'on',
        producto_materiales_obra: formData.get('producto_materiales_obra') === 'on',
        producto_electricidad_plomeria: formData.get('producto_electricidad_plomeria') === 'on',
        producto_herramientas: formData.get('producto_herramientas') === 'on',
        producto_electrodomesticos: formData.get('producto_electrodomesticos') === 'on',
        producto_muebles: formData.get('producto_muebles') === 'on',
        producto_otros: formData.get('producto_otros') === 'on',
        producto_otros_texto: formData.get('producto_otros_texto')
      })
    })

    if (!res.ok) throw new Error('Error API proveedores')

    setOpenProveedorModal(false)
    e.currentTarget.reset()
    setShowSuccess(true)

  } catch (err) {
    console.error(err)
    setOpenProveedorModal(false)
    e.currentTarget.reset()
  } finally {
    setLoadingProveedor(false)
  }
}


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
    Un sitio. Todas las soluciones.
  </h1>

  <div
    style={{
      marginTop: 24,
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        display: 'flex',
        gap: 16,
        padding: 12,
        borderRadius: 20,
        background: 'rgba(142,36,170,0.12)',
      }}
    >
      <div style={{ background: '#fff', padding: '16px 20px', borderRadius: 16, boxShadow: '0 10px 25px rgba(0,0,0,0.08)', fontSize: 14, textAlign: 'center', minWidth: 140 }}>
        Solucioná en minutos
      </div>

      <div style={{ background: '#fff', padding: '16px 20px', borderRadius: 16, boxShadow: '0 14px 30px rgba(0,0,0,0.12)', fontSize: 16, fontWeight: 700, textAlign: 'center', minWidth: 160 }}>
        Más seguridad
      </div>

      <div style={{ background: '#fff', padding: '16px 20px', borderRadius: 16, boxShadow: '0 10px 25px rgba(0,0,0,0.08)', fontSize: 14, textAlign: 'center', minWidth: 140 }}>
        Profesionales validados
      </div>
    </div>
  </div>

{/* BLOQUE CTA */}
<div
  style={{
    padding: '100px 24px',
    display: 'flex',
    justifyContent: 'center',
  }}
>
  <div style={{ textAlign: 'center', width: '100%', maxWidth: 700 }}>
    
    <h1
      style={{
        fontSize: 42,
        letterSpacing: 2,
        marginBottom: 40,
      }}
    >
      ¿Qué buscás?
    </h1>

    <div
      style={{
        background: '#f5f5f5',
        borderRadius: 48,
        padding: '40px 48px 48px',
        width: '100%',
        boxShadow: '0 30px 80px rgba(0,0,0,0.18)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 40,
          gap: 20,
        }}
      >
        {/* SERVICIOS */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700 }}>
            Servicios
          </div>
          <div style={{ fontSize: 64, marginTop: 16 }}>🚚</div>
        </div>

        {/* DIVISOR */}
        <div style={{ width: 1, height: 100, background: '#ddd' }} />

        {/* PRODUCTOS */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700 }}>
            Productos
          </div>
          <div style={{ fontSize: 64, marginTop: 16 }}>🔨</div>
        </div>
      </div>

      <button
        onClick={() => setOpen(true)}
        style={{
          width: '100%',
          padding: '20px',
          background: '#e1bee7',
          border: 'none',
          borderRadius: 20,
          fontSize: 26,
          fontWeight: 800,
          letterSpacing: 6,
          cursor: 'pointer',
        }}
      >
        ¡ELEGIR!
      </button>
    </div>
  </div>
</div>
  </section> 


   {/* QUIENES SOMOS + POR QUE */}
<section
  style={{
    padding: '80px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 32,
  }}
>
  {/* CARD 1 */}
  <div
    style={{
      width: '100%',
      maxWidth: 720,
      background: '#fff',
      borderRadius: 20,
      border: '1px solid rgba(142,36,170,0.3)',
      padding: '28px 32px',
      textAlign: 'center',
    }}
  >
    <h2
      style={{
        fontSize: 20,
        marginBottom: 12,
        fontWeight: 600,
      }}
    >
      ¿Quiénes somos?
    </h2>

    <p
      style={{
        fontSize: 15,
        lineHeight: 1.6,
        color: '#555',
      }}
    >
      VOARAH es la forma más simple de resolver lo que necesitás,
      sin búsquedas ni riesgos.
      <br />
      Trabajamos con profesionales validados para ofrecer
      seguridad y servicios de calidad a los usuarios.
    </p>
  </div>

  {/* CARD 2 */}
  <div
    style={{
      width: '100%',
      maxWidth: 720,
      background: '#fff',
      borderRadius: 20,
      border: '1px solid rgba(142,36,170,0.3)',
      padding: '28px 32px',
      textAlign: 'center',
    }}
  >
    <h2
      style={{
        fontSize: 20,
        marginBottom: 12,
        fontWeight: 600,
      }}
    >
      ¿Por qué elegir VOARAH?
    </h2>

    <p
      style={{
        fontSize: 15,
        lineHeight: 1.6,
        color: '#555',
      }}
    >
      En VOARAH hacemos fácil lo difícil.
      <br />
      Organizamos un universo de soluciones en una sola plataforma
      para que vivas una experiencia sencilla y confiable,
      en cualquier momento de tu vida.
    </p>
  </div>
</section>
   
  {/* TRABAJA CON NOSOTROS */}
<section
  style={{
    padding: '80px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }}
>
  {/* SEPARADOR */}
  <div
    style={{
      width: '100%',
      maxWidth: 720,
      height: 1,
      background: '#ddd',
      marginBottom: 40,
    }}
  />

  {/* TITULO */}
  <h2
    style={{
      fontSize: 28,
      letterSpacing: 4,
      marginBottom: 40,
      textAlign: 'center',
    }}
  >
    ¡Sumate a VOARAH!
  </h2>

  {/* CARDS */}
  <div
    style={{
      display: 'flex',
      gap: 24,
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: '100%',
      maxWidth: 900,
    }}
  >
    {/* INMOBILIARIA */}
    <div
      style={{
        flex: 1,
        minWidth: 260,
        maxWidth: 340,
        background: '#fff',
        borderRadius: 20,
        border: '1px solid #ddd',
        padding: '28px 24px',
        textAlign: 'center',
      }}
    >
      <h3 style={{ fontSize: 20, marginBottom: 12 }}>
        Soy Inmobiliaria
      </h3>

      <p
        style={{
          fontSize: 14,
          color: '#666',
          lineHeight: 1.5,
          marginBottom: 20,
        }}
      >
        ¡Impulsá tu inmobiliaria!
        <br />
        Integrá VOARAH hoy
        <br />
        y solucionale la vida a tus clientes.
      </p>

      <button
        onClick={() => setOpenInmoModal(true)}
        style={{
          padding: '10px 20px',
          background: '#e1bee7',
          border: 'none',
          borderRadius: 20,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        ¡Me sumo!
      </button>
    </div>

    {/* PROVEEDOR */}
    <div
      style={{
        flex: 1,
        minWidth: 260,
        maxWidth: 340,
        background: '#fff',
        borderRadius: 20,
        border: '1px solid #ddd',
        padding: '28px 24px',
        textAlign: 'center',
      }}
    >
      <h3 style={{ fontSize: 20, marginBottom: 12 }}>
        Soy Proveedor
      </h3>

      <p
        style={{
          fontSize: 14,
          color: '#666',
          lineHeight: 1.5,
          marginBottom: 20,
        }}
      >
        ¡Impulsá tu negocio!
        <br />
        Integrá VOARAH hoy mismo y
        <br />
        crecé con nosotros.
      </p>

      <button
        onClick={() => setOpenProveedorModal(true)}
        style={{
          padding: '10px 20px',
          background: '#e1bee7',
          border: 'none',
          borderRadius: 20,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        ¡Postularme!
      </button>
    </div>
  </div>
</section>

{/* FAQ VOARAH */}
<section
  id="faq"
  style={{
    padding: '80px 24px',
    display: 'flex',
    justifyContent: 'center',
  }}
>
  <div style={{ width: '100%', maxWidth: 800 }}>
    
    <h2
      style={{
        fontSize: 28,
        marginBottom: 32,
        textAlign: 'center',
      }}
    >
      Preguntas frecuentes
    </h2>

    {[
      {
        q: '¿Cómo funciona VOARAH?',
        a: `Elegís el servicio o producto que necesitás, dejás tus datos y en menos de 60 minutos nuestro equipo se comunica con vos —de lunes a viernes de 9 a 22 hs— para entender bien tu pedido y asignarte al profesional indicado.

Después, en las siguientes 12 horas hábiles, ese profesional te contacta para pasarte el presupuesto y, si estás de acuerdo, coordinar la visita.`,
      },
      {
        q: '¿Por qué usar VOARAH en lugar de buscar por tu cuenta?',
        a: `Porque ahorrás tiempo, reducís la incertidumbre y accedés a proveedores verificados, sin tener que comparar opciones ni asumir el riesgo de dejar entrar desconocidos a tu casa.

Tu seguridad es lo más importante para nosotros, y es el principal valor que recibís cuando elegís VOARAH.`,
      },
      {
        q: '¿VOARAH tiene algún costo para mí?',
        a: `No. Solicitar un servicio a través de VOARAH es totalmente gratuito.`,
      },
      {
        q: '¿Tengo que buscar entre distintos prestadores?',
        a: `No. Nuestro sistema se encarga de identificar y asignarte al profesional correcto para lo que necesitás.`,
      },
      {
        q: '¿Los profesionales están verificados?',
        a: `Sí. VOARAH selecciona profesionales evaluados en función de su desempeño, cumplimiento y calidad de servicio.`,
      },
      {
        q: '¿Qué pasa si no estoy conforme con el servicio?',
        a: `Cada proveedor es responsable de garantizar la calidad de los productos y servicios que ofrece.

Podés contactarlo directamente una vez terminado el trabajo.

De todas formas, si hay algún incumplimiento, podés escribirnos a hola@voarah.com para que podamos intervenir y ayudarte.`,
      },
    ].map((item, i) => (
      <details
        key={i}
        style={{
          marginBottom: 16,
          borderRadius: 16,
          border: '1px solid rgba(142,36,170,0.25)',
          overflow: 'hidden',
          background: '#fff',
        }}
      >
        <summary
          style={{
            padding: '18px 20px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 16,
            listStyle: 'none',
          }}
        >
          {item.q}
        </summary>

        <div
          style={{
            padding: '0 20px 20px',
            fontSize: 14,
            lineHeight: 1.6,
            color: '#555',
            whiteSpace: 'pre-line',
          }}
        >
          {item.a}
        </div>
      </details>
    ))}
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
        width: 900,
        maxHeight: '90vh',
        overflowY: 'auto',
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
  onSubmit={handleSubmit}
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  }}
>
  {/* DATOS BASICOS */}
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <input
      name="nombre"
      placeholder="Nombre"
      required
      style={{ ...inputStyle, flex: 1, minWidth: 260 }}
    />
    <input
      name="email"
      type="email"
      placeholder="Email"
      required
      style={{ ...inputStyle, flex: 1, minWidth: 260 }}
    />
  </div>

  <input
    name="telefono"
    placeholder="Teléfono (ej: 5491112345678)"
    required
    style={inputStyle}
  />

  {/* SERVICIOS */}
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <div
      style={{
        background: '#8E24AA',
        color: '#fff',
        padding: '10px 14px',
        borderRadius: 8,
        fontWeight: 700,
        fontSize: 16
      }}
    >
      Servicios
    </div>

    {/* MUDANZAS */}
    <div style={{ border: '1px solid #f3c4e8', borderRadius: 10, overflow: 'hidden' }}>
      <button
        type="button"
        onClick={() => setOpenAccordion(openAccordion === 'mudanzas' ? null : 'mudanzas')}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '14px 16px',
          background: '#f8d7f0',
          border: 'none',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Mudanzas
      </button>
      {openAccordion === 'mudanzas' && (
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <label><input type="checkbox" name="servicio_mudanza" /> Mudanza</label>
          <label><input type="checkbox" name="servicio_mudanza_embalaje" /> Con embalaje</label>
          <label><input type="checkbox" name="servicio_mudanza_desembalaje" /> Con desembalaje</label>
          <label><input type="checkbox" name="servicio_mudanza_solo_transporte" /> Solo transporte</label>
        </div>
      )}
    </div>

    {/* GUARDAMUEBLES */}
    <div style={{ border: '1px solid #f3c4e8', borderRadius: 10, overflow: 'hidden' }}>
      <button
        type="button"
        onClick={() => setOpenAccordion(openAccordion === 'guardamuebles' ? null : 'guardamuebles')}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '14px 16px',
          background: '#f8d7f0',
          border: 'none',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Guardamuebles y Self-Storage
      </button>
      {openAccordion === 'guardamuebles' && (
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <label><input type="checkbox" name="servicio_guardamuebles" /> Guardamuebles / Self-Storage</label>
          <label><input type="checkbox" name="servicio_guardamuebles_recogida" /> Recogida en domicilio</label>
          <label><input type="checkbox" name="servicio_guardamuebles_entrega" /> Entrega en domicilio</label>
          <label><input type="checkbox" name="servicio_guardamuebles_embalaje" /> Embalaje</label>
          <label><input type="checkbox" name="servicio_guardamuebles_bauleras" /> Bauleras para self-storage</label>
        </div>
      )}
    </div>

    {/* LIMPIEZA */}
    <div style={{ border: '1px solid #f3c4e8', borderRadius: 10, overflow: 'hidden' }}>
      <button
        type="button"
        onClick={() => setOpenAccordion(openAccordion === 'limpieza' ? null : 'limpieza')}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '14px 16px',
          background: '#f8d7f0',
          border: 'none',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Limpieza
      </button>
      {openAccordion === 'limpieza' && (
        <div style={{ padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <label><input type="checkbox" name="servicio_limpieza" /> Limpieza</label>
          <label><input type="checkbox" name="servicio_limpieza_hogares" /> Hogares</label>
          <label><input type="checkbox" name="servicio_limpieza_locales" /> Locales</label>
          <label><input type="checkbox" name="servicio_limpieza_oficinas" /> Oficinas</label>
          <label><input type="checkbox" name="servicio_limpieza_edificios" /> Edificios</label>
          <label><input type="checkbox" name="servicio_limpieza_fin_obra" /> Fin de obra</label>
          <label><input type="checkbox" name="servicio_limpieza_fachadas" /> Fachadas</label>
          <label><input type="checkbox" name="servicio_limpieza_tejados" /> Tejados</label>
          <label><input type="checkbox" name="servicio_limpieza_tapizados" /> Tapizados</label>
          <label><input type="checkbox" name="servicio_limpieza_piletas" /> Piletas</label>
          <label><input type="checkbox" name="servicio_limpieza_poda_arboles" /> Poda de árboles</label>
        </div>
      )}
    </div>

    {/* DISEÑO INTERIOR */}
    <div style={{ border: '1px solid #f3c4e8', borderRadius: 10, overflow: 'hidden' }}>
      <button
        type="button"
        onClick={() => setOpenAccordion(openAccordion === 'diseno' ? null : 'diseno')}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '14px 16px',
          background: '#f8d7f0',
          border: 'none',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Diseño interior
      </button>
      {openAccordion === 'diseno' && (
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <label><input type="checkbox" name="servicio_diseno_interior" /> Diseño interior</label>
          <label><input type="checkbox" name="servicio_diseno_disenos" /> Diseños</label>
          <label><input type="checkbox" name="servicio_diseno_proyectos" /> Proyectos</label>
          <label><input type="checkbox" name="servicio_diseno_planos" /> Planos</label>
          <label><input type="checkbox" name="servicio_diseno_certificaciones" /> Certificaciones</label>
        </div>
      )}
    </div>

    {/* MANTENIMIENTO */}
    <div style={{ border: '1px solid #f3c4e8', borderRadius: 10, overflow: 'hidden' }}>
      <button
        type="button"
        onClick={() => setOpenAccordion(openAccordion === 'mantenimiento' ? null : 'mantenimiento')}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '14px 16px',
          background: '#f8d7f0',
          border: 'none',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Mantenimiento
      </button>
      {openAccordion === 'mantenimiento' && (
        <div style={{ padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <label><input type="checkbox" name="servicio_mantenimiento" /> Mantenimiento</label>
          <label><input type="checkbox" name="servicio_mantenimiento_pintura" /> Pintura</label>
          <label><input type="checkbox" name="servicio_mantenimiento_plomeria" /> Plomería</label>
          <label><input type="checkbox" name="servicio_mantenimiento_electricidad" /> Electricidad</label>
          <label><input type="checkbox" name="servicio_mantenimiento_pisos" /> Pisos</label>
          <label><input type="checkbox" name="servicio_mantenimiento_banos" /> Baños</label>
          <label><input type="checkbox" name="servicio_mantenimiento_humedades" /> Humedades</label>
          <label><input type="checkbox" name="servicio_mantenimiento_refacciones" /> Refacciones</label>
        </div>
      )}
    </div>

    {/* FOTOGRAFIA */}
    <div style={{ border: '1px solid #f3c4e8', borderRadius: 10, overflow: 'hidden' }}>
      <button
        type="button"
        onClick={() => setOpenAccordion(openAccordion === 'foto' ? null : 'foto')}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '14px 16px',
          background: '#f8d7f0',
          border: 'none',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Fotografía, video, grabación con dron
      </button>
      {openAccordion === 'foto' && (
        <div style={{ padding: 16 }}>
          <label><input type="checkbox" name="servicio_fotografia_video_dron" /> Fotografía / video / dron</label>
        </div>
      )}
    </div>

    {/* JURIDICOS */}
    <div style={{ border: '1px solid #f3c4e8', borderRadius: 10, overflow: 'hidden' }}>
      <button
        type="button"
        onClick={() => setOpenAccordion(openAccordion === 'juridico' ? null : 'juridico')}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '14px 16px',
          background: '#f8d7f0',
          border: 'none',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Servicios jurídicos
      </button>
      {openAccordion === 'juridico' && (
        <div style={{ padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <label><input type="checkbox" name="servicio_juridicos" /> Servicios jurídicos</label>
          <label><input type="checkbox" name="servicio_juridico_civil" /> Civil</label>
          <label><input type="checkbox" name="servicio_juridico_contratos" /> Contratos</label>
          <label><input type="checkbox" name="servicio_juridico_sucesiones" /> Sucesiones</label>
          <label><input type="checkbox" name="servicio_juridico_divisiones_propiedad" /> Divisiones de propiedad</label>
          <label><input type="checkbox" name="servicio_juridico_mediaciones" /> Mediaciones</label>
        </div>
      )}
    </div>

    {/* SEGUROS */}
    <div style={{ border: '1px solid #f3c4e8', borderRadius: 10, overflow: 'hidden' }}>
      <button
        type="button"
        onClick={() => setOpenAccordion(openAccordion === 'seguros' ? null : 'seguros')}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '14px 16px',
          background: '#f8d7f0',
          border: 'none',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Seguros
      </button>
      {openAccordion === 'seguros' && (
        <div style={{ padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <label><input type="checkbox" name="servicio_seguros" /> Seguros</label>
          <label><input type="checkbox" name="servicio_seguro_hogar" /> Hogar</label>
          <label><input type="checkbox" name="servicio_seguro_comercio" /> Comercio</label>
          <label><input type="checkbox" name="servicio_seguro_autos" /> Autos</label>
          <label><input type="checkbox" name="servicio_seguro_cauciones" /> Cauciones</label>
          <label><input type="checkbox" name="servicio_seguro_proteccion_alquiler" /> Protección pagos alquiler</label>
        </div>
      )}
    </div>

    {/* JARDINERO */}
    <div style={{ border: '1px solid #f3c4e8', borderRadius: 10, overflow: 'hidden' }}>
      <button
        type="button"
        onClick={() => setOpenAccordion(openAccordion === 'jardin' ? null : 'jardin')}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '14px 16px',
          background: '#f8d7f0',
          border: 'none',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Jardinero y piletero
      </button>
      {openAccordion === 'jardin' && (
        <div style={{ padding: 16 }}>
          <label><input type="checkbox" name="servicio_jardinero_piletero" /> Jardinero y piletero</label>
        </div>
      )}
    </div>

    {/* SEGURIDAD */}
    <div style={{ border: '1px solid #f3c4e8', borderRadius: 10, overflow: 'hidden' }}>
      <button
        type="button"
        onClick={() => setOpenAccordion(openAccordion === 'seguridad' ? null : 'seguridad')}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '14px 16px',
          background: '#f8d7f0',
          border: 'none',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Seguridad
      </button>
      {openAccordion === 'seguridad' && (
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <label><input type="checkbox" name="servicio_seguridad" /> Seguridad</label>
          <label><input type="checkbox" name="servicio_seguridad_camaras" /> Cámaras de videovigilancia</label>
          <label><input type="checkbox" name="servicio_seguridad_alarmas" /> Alarmas</label>
        </div>
      )}
    </div>
  </div>

  {/* PRODUCTOS */}
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <div
      style={{
        background: '#8E24AA',
        color: '#fff',
        padding: '10px 14px',
        borderRadius: 8,
        fontWeight: 700,
        fontSize: 16
      }}
    >
      Productos
    </div>

    <div style={{ border: '1px solid #f3c4e8', borderRadius: 10, overflow: 'hidden' }}>
      <button
        type="button"
        onClick={() => setOpenAccordion(openAccordion === 'materiales' ? null : 'materiales')}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '14px 16px',
          background: '#f8d7f0',
          border: 'none',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Materiales para refacción
      </button>
      {openAccordion === 'materiales' && (
        <div style={{ padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <label><input type="checkbox" name="producto_materiales_obra" /> Materiales de obra</label>
          <label><input type="checkbox" name="producto_pintura" /> Pintura</label>
          <label><input type="checkbox" name="producto_pisos_revestimientos" /> Pisos y revestimientos</label>
          <label><input type="checkbox" name="producto_electricidad_plomeria_banos" /> Electricidad, Plomería y Baños</label>
          <label><input type="checkbox" name="producto_herramientas" /> Herramientas eléctricas y manuales</label>
          <label><input type="checkbox" name="producto_hogar_muebles_jardin" /> Muebles de jardín</label>
          <label><input type="checkbox" name="producto_termotanques" /> Termotanques</label>
          <label><input type="checkbox" name="producto_calefaccion_aire" /> Calefacción / Aire acondicionado</label>
          <label><input type="checkbox" name="producto_piletas" /> Piletas estructurales e inflables</label>
        </div>
      )}
    </div>

    <div style={{ border: '1px solid #f3c4e8', borderRadius: 10, overflow: 'hidden' }}>
      <button
        type="button"
        onClick={() => setOpenAccordion(openAccordion === 'muebles_deco' ? null : 'muebles_deco')}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '14px 16px',
          background: '#f8d7f0',
          border: 'none',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Muebles y decoración
      </button>
      {openAccordion === 'muebles_deco' && (
        <div style={{ padding: 16 }}>
          <label><input type="checkbox" name="producto_muebles_decoracion" /> Muebles y decoración</label>
        </div>
      )}
    </div>

    <div style={{ border: '1px solid #f3c4e8', borderRadius: 10, overflow: 'hidden' }}>
      <button
        type="button"
        onClick={() => setOpenAccordion(openAccordion === 'electro' ? null : 'electro')}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '14px 16px',
          background: '#f8d7f0',
          border: 'none',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Electrodomésticos
      </button>
      {openAccordion === 'electro' && (
        <div style={{ padding: 16 }}>
          <label><input type="checkbox" name="producto_electrodomesticos" /> Electrodomésticos</label>
        </div>
      )}
    </div>

    <div style={{ border: '1px solid #f3c4e8', borderRadius: 10, overflow: 'hidden' }}>
      <button
        type="button"
        onClick={() => setOpenAccordion(openAccordion === 'muebles_usados' ? null : 'muebles_usados')}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '14px 16px',
          background: '#f8d7f0',
          border: 'none',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Compra-Venta muebles y decoración usados
      </button>
      {openAccordion === 'muebles_usados' && (
        <div style={{ padding: 16 }}>
          <label><input type="checkbox" name="producto_compra_venta_muebles_decoracion_usados" /> Compra-Venta muebles y decoración usados</label>
        </div>
      )}
    </div>

    <div style={{ border: '1px solid #f3c4e8', borderRadius: 10, overflow: 'hidden' }}>
      <button
        type="button"
        onClick={() => setOpenAccordion(openAccordion === 'productos_usados' ? null : 'productos_usados')}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '14px 16px',
          background: '#f8d7f0',
          border: 'none',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Compra-Venta productos usados
      </button>
      {openAccordion === 'productos_usados' && (
        <div style={{ padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <label><input type="checkbox" name="producto_compra_venta_productos_usados" /> Compra-Venta productos usados</label>
          <label><input type="checkbox" name="producto_usado_laptops" /> Laptops</label>
          <label><input type="checkbox" name="producto_usado_celulares" /> Celulares</label>
          <label><input type="checkbox" name="producto_usado_videoconsolas" /> Videoconsolas</label>
          <label><input type="checkbox" name="producto_usado_relojes" /> Relojes</label>
          <label><input type="checkbox" name="producto_usado_camaras_fotos" /> Cámaras de fotos</label>
          <label><input type="checkbox" name="producto_usado_bicicletas" /> Bicicletas</label>
          <label><input type="checkbox" name="producto_usado_raquetas" /> Raquetas</label>
          <label><input type="checkbox" name="producto_usado_motos" /> Motos</label>
        </div>
      )}
    </div>
  </div>

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

        <strong style={{ marginTop: 12 }}>Productos que ofrecen</strong>
        <label><input type="checkbox" name="producto_pintura" /> Pintura</label>
        <label><input type="checkbox" name="producto_materiales_obra" /> Materiales de obra</label>
        <label><input type="checkbox" name="producto_electricidad_plomeria" /> Electricidad y Plomería</label>
        <label><input type="checkbox" name="producto_herramientas" /> Herramientas</label>
        <label><input type="checkbox" name="producto_electrodomesticos" /> Electrodomésticos</label>
        <label><input type="checkbox" name="producto_muebles" /> Muebles</label>
        <label><input type="checkbox" name="producto_otros" /> Otros</label>

        <input
          name="producto_otros_texto"
          placeholder="Si marcaste otros, especificá el producto"
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
