'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  marginBottom: 12,
  borderRadius: 4,
  border: '1px solid #ccc',
  fontSize: 14
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          background: '#f5f5f5'
        }}
      >
        <div
          style={{
            background: '#fff',
            padding: 32,
            borderRadius: 8,
            maxWidth: 420,
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}
        >
          <h2>Gracias</h2>
          <p>Recibimos tu información correctamente.</p>
        </div>
      </main>
    )
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif'
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          padding: 32,
          borderRadius: 8,
          width: '100%',
          maxWidth: 420,
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}
      >
        <h1 style={{ marginBottom: 24 }}Estoy Buscando</h1>

        <input
          style={inputStyle}
          name="nombre"
          placeholder="Nombre"
          required
          onChange={handleChange}
        />

        <input
          style={inputStyle}
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />

        <input
          style={inputStyle}
          name="telefono"
          placeholder="Teléfono"
          onChange={handleChange}
        />

        <input
          style={inputStyle}
          name="ciudad"
          placeholder="Ciudad o zona"
          onChange={handleChange}
        />

        <select
          style={inputStyle}
          name="tipo_operacion"
          required
          onChange={handleChange}
        >
          <option value="">Tipo de operación</option>
          <option value="compra">Compra</option>
          <option value="alquiler">Alquiler</option>
        </select>

        <select
          style={inputStyle}
          name="tipo_propiedad"
          required
          onChange={handleChange}
        >
          <option value="">Tipo de propiedad</option>
          <option value="casa">Casa</option>
          <option value="departamento">Departamento</option>
          <option value="terreno">Terreno</option>
          <option value="ph">P.H.</option>
          <option value="local">Local</option>
          <option value="galpón">Galpón</option>
        </select>

        <input
          style={inputStyle}
          name="presupuesto"
          placeholder="Presupuesto aproximado"
          onChange={handleChange}
        />

        <textarea
          style={{ ...inputStyle, height: 80 }}
          name="mensaje"
          placeholder="Comentario opcional"
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </main>
  )
}

