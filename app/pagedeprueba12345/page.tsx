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

      servicio_mudanza: formData.get('servicio_mudanza') === 'on',
      servicio_guardamuebles: formData.get('servicio_guardamuebles') === 'on',
      servicio_limpieza: formData.get('servicio_limpieza') === 'on',
      servicio_diseno_interior: formData.get('servicio_diseno_interior') === 'on',
      servicio_mantenimiento: formData.get('servicio_mantenimiento') === 'on',
      servicio_fotografia: formData.get('servicio_fotografia') === 'on',
      servicio_juridico: formData.get('servicio_juridico') === 'on',
      servicio_seguros: formData.get('servicio_seguros') === 'on',
      servicio_jardineria: formData.get('servicio_jardineria') === 'on',
      servicio_seguridad: formData.get('servicio_seguridad') === 'on',
      servicio_otros: formData.get('servicio_otros') === 'on',
      servicio_otros_texto: formData.get('servicio_otros_texto'),

      producto_materiales_obra: formData.get('producto_materiales_obra') === 'on',
      producto_pintura: formData.get('producto_pintura') === 'on',
      producto_pisos_revestimientos: formData.get('producto_pisos_revestimientos') === 'on',
      producto_electricidad_plomeria_banos: formData.get('producto_electricidad_plomeria_banos') === 'on',
      producto_herramientas: formData.get('producto_herramientas') === 'on',
      producto_electrodomesticos: formData.get('producto_electrodomesticos') === 'on',
      producto_hogar_muebles_jardin: formData.get('producto_hogar_muebles_jardin') === 'on',
      producto_bienes_usados: formData.get('producto_bienes_usados') === 'on',
      producto_otros: formData.get('producto_otros') === 'on',
      producto_otros_texto: formData.get('producto_otros_texto')
    }

    try {
      localStorage.setItem("pendingLead", JSON.stringify(payload))

      const { error } = await supabase.auth.signInWithOtp({
        email: payload.email as string,
        options: {
          emailRedirectTo: "https://www.voarah.com/auth/callback"
        }
      })

      if (error) {
        alert("Hubo un problema enviando el email.")
        localStorage.removeItem("pendingLead")
        return
      }

      alert("Te enviamos un link a tu email para confirmar.")

    } catch (err) {
      alert("Error inesperado.")
      localStorage.removeItem("pendingLead")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header onOpenModal={() => setOpen(true)} />

      <main style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>

{/* MODAL */}
{open && (
  <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(20,20,20,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', padding: 40, borderRadius: 16, width: 900 }}>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        <div style={{ display: 'flex', gap: 16 }}>
          <input name="nombre" placeholder="Nombre" required style={{ ...inputStyle, flex: 1 }} />
          <input name="email" type="email" placeholder="Email" required style={{ ...inputStyle, flex: 1 }} />
        </div>

        <input name="telefono" placeholder="Teléfono" required style={inputStyle} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>

{/* SERVICIOS */}
<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
<span style={{ fontWeight: 600 }}>Servicios</span>

<label><input type="checkbox" name="servicio_mudanza" /> Mudanza</label>
<label><input type="checkbox" name="servicio_guardamuebles" /> Guardamuebles</label>
<label><input type="checkbox" name="servicio_limpieza" /> Limpieza</label>
<label><input type="checkbox" name="servicio_diseno_interior" /> Diseño interior</label>
<label><input type="checkbox" name="servicio_mantenimiento" /> Mantenimiento</label>
<label><input type="checkbox" name="servicio_fotografia" /> Foto / video / dron</label>
<label><input type="checkbox" name="servicio_juridico" /> Jurídicos</label>
<label><input type="checkbox" name="servicio_seguros" /> Seguros</label>
<label><input type="checkbox" name="servicio_jardineria" /> Jardinería</label>
<label><input type="checkbox" name="servicio_seguridad" /> Seguridad</label>
<label><input type="checkbox" name="servicio_otros" /> Otros</label>

<input name="servicio_otros_texto" placeholder="Otros..." style={inputStyle} />
</div>

{/* PRODUCTOS */}
<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
<span style={{ fontWeight: 600 }}>Productos</span>

<label><input type="checkbox" name="producto_materiales_obra" /> Materiales obra</label>
<label><input type="checkbox" name="producto_pintura" /> Pintura</label>
<label><input type="checkbox" name="producto_pisos_revestimientos" /> Pisos</label>
<label><input type="checkbox" name="producto_electricidad_plomeria_banos" /> Electricidad / plomería</label>
<label><input type="checkbox" name="producto_herramientas" /> Herramientas</label>
<label><input type="checkbox" name="producto_electrodomesticos" /> Electrodomésticos</label>
<label><input type="checkbox" name="producto_hogar_muebles_jardin" /> Muebles / hogar</label>
<label><input type="checkbox" name="producto_bienes_usados" /> Usados</label>
<label><input type="checkbox" name="producto_otros" /> Otros</label>

<input name="producto_otros_texto" placeholder="Otros..." style={inputStyle} />
</div>

        </div>

        <button type="submit" style={{ padding: 14, background: '#8E24AA', color: '#fff', borderRadius: 10 }}>
          {loading ? 'Enviando…' : 'Enviar'}
        </button>

      </form>

    </div>
  </div>
)}

      </main>
    </>
  )
}
