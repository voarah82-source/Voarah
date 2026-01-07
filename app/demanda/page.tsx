'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const colors = {
  primary: '#1f3a5f',     // azul Voarah
  secondary: '#4f6d8c',
  background: '#f2f4f7'
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  marginBottom: 14,
  borderRadius: 6,
  border: '1px solid #d0d5dd',
  fontSize: 14,
  outline: 'none'
}

export default function DemandaPage() {
  const [form, setForm] = useState<any>({})
  const [enviado, setEnviado] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from('demandas_inmobiliarias')
      .insert(form)

    setLoading(false)

    if (!error) {
      setEnviado(true)
    } else {
      alert('Error al enviar el formulario')
    }
  }

  if (enviado) {
    return (
      <main
        style={{
          minHeight: '100vh',
          background: colors.background,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif'
        }}
      >
        <div
          style={{
            background: '#fff',
            padding: 40,
            borderRadius: 12,
            maxWidth: 420,
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.12)'
          }}
        >
          <h2 style={{ color: colors.primary, marginBottom: 12 }}>
            Gracias por contactarnos
          </h2>
          <p style={{ color: '#555' }}>
            Un asesor de <strong>Voarah</strong> se pondrá en contacto con vos a la brevedad.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: colors.background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          padding: 40,
          borderRadius: 12,
          width: '100%',
          maxWidth: 440,
          boxShadow: '0 20px 40px rgba(0,0,0,0.12)'
        }}
      >
        {/* Marca */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: colors.primary,
              letterSpacing: 1
            }}
          >
            VOARAH
          </div>
          <h1 style={{ margin: '8px 0', fontSize: 26 }}>
            Demanda Inmobiliaria
          </h1>
          <p style={{ color: '#555', fontSize: 14 }}>
            Contanos qué estás buscando y te ayudamos a encontrarlo.
          </p>
        </div>

        <input style={inputStyle} name="nombre" placeholder="Nombre completo" required onChange={handleChange} />
        <input style={inputStyle} name="email" placeholder="Email" required onChange={handleChange} />
        <input style={inputStyle} name="telefono" placeholder="Teléfono" onChange={handleChange} />
        <input style={inputStyle} name="ciudad" placeholder="Ciudad o zona de interés" onChange={handleChange} />

        <select style={inputStyle} name="tipo_operacion" required onChange={handleChange}>
          <option value="">Tipo de operación</option>
          <option value="compra">Compra</option>
          <option value="alquiler">Alquiler</option>
        </select>

        <select style={inputStyle} name="tipo_propiedad" required onChange={handleChange}>
          <option value="">Tipo de propiedad</option>
          <option value="casa">Casa</option>
          <option value="departamento">Departamento</option>
          <option value="terreno">Terreno</option>
        </select>

        <input
          style={inputStyle}
          name="presupuesto"
          placeholder="Presupuesto aproximado"
          onChange={handleChange}
        />

        <textarea
          style={{ ...inputStyle, height: 90, resize: 'none' }}
          name="mensaje"
          placeholder="Algún detalle adicional que quieras contarnos"
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            background: colors.primary,
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 15,
            marginTop: 8
          }}
        >
          {loading ? 'Enviando…' : 'Enviar solicitud'}
        </button>

        <p style={{ marginTop: 16, fontSize: 12, color: '#777', textAlign: 'center' }}>
          Tus datos serán tratados de forma confidencial.
        </p>
      </form>
    </main>
  )
}

