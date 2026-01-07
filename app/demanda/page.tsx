'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function DemandaPage() {
  const [form, setForm] = useState({})
  const [enviado, setEnviado] = useState(false)

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    await supabase.from('demandas_inmobiliarias').insert(form)
    setEnviado(true)
  }

  if (enviado) {
    return <h2>Gracias, recibimos tu información.</h2>
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Formulario de Demanda Inmobiliaria</h1>

      <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="telefono" placeholder="Teléfono" onChange={handleChange} />
      <input name="ciudad" placeholder="Ciudad o zona" onChange={handleChange} />

      <select name="tipo_operacion" onChange={handleChange}>
        <option value="">Tipo de operación</option>
        <option value="compra">Compra</option>
        <option value="alquiler">Alquiler</option>
      </select>

      <select name="tipo_propiedad" onChange={handleChange}>
        <option value="">Tipo de propiedad</option>
        <option value="casa">Casa</option>
        <option value="departamento">Departamento</option>
        <option value="terreno">Terreno</option>
      </select>

      <input name="presupuesto" placeholder="Presupuesto aproximado" onChange={handleChange} />
      <textarea name="mensaje" placeholder="Comentario opcional" onChange={handleChange} />

      <button type="submit">Enviar</button>
    </form>
  )
}
