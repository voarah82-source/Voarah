'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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
      <main style={{ padding: 40 }}>
        <h2>Gracias</h2>
        <p>Recibimos tu información correctamente.</p>
      </main>
    )
  }

  return (
    <main style={{ padding: 40, maxWidth: 500 }}>
      <h1>Demanda Inmobiliaria</h1>

      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" required onChange={handleChange} />
        <br /><br />

        <input name="email" placeholder="Email" required onChange={handleChange} />
        <br /><br />

        <input name="telefono" placeholder="Teléfono" onChange={handleChange} />
        <br /><br />

        <input name="ciudad" placeholder="Ciudad o zona" onChange={handleChange} />
        <br /><br />

        <select name="tipo_operacion" onChange={handleChange} required>
          <option value="">Tipo de operación</option>
          <option value="compra">Compra</option>
          <option value="alquiler">Alquiler</option>
        </select>
        <br /><br />

        <select name="tipo_propiedad" onChange={handleChange} required>
          <option value="">Tipo de propiedad</option>
          <option value="casa">Casa</option>
          <option value="departamento">Departamento</option>
          <option value="terreno">Terreno</option>
        </select>
        <br /><br />

        <input name="presupuesto" placeholder="Presupuesto aproximado" onChange={handleChange} />
        <br /><br />

        <textarea name="mensaje" placeholder="Comentario opcional" onChange={handleChange} />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </main>
  )
}
