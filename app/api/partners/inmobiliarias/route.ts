import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      inmobiliaria_nombre,
      contacto_nombre,
      cargo,
      email,
      telefono,
      ciudad,
      operaciones_mensuales,
      tipo_operaciones,
      interes_diferenciacion,
      interes_ingresos,
      interes_experiencia,
      interes_fidelizacion,
      interes_todo
    } = body

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error } = await supabase
      .from('partners_inmobiliarias')
      .insert({
        inmobiliaria_nombre,
        contacto_nombre,
        cargo,
        email,
        telefono,
        ciudad,
        operaciones_mensuales,
        tipo_operaciones,
        interes_diferenciacion,
        interes_ingresos,
        interes_experiencia,
        interes_fidelizacion,
        interes_todo
      })

    if (error) {
      console.error('INMO INSERT ERROR:', error)
      return NextResponse.json({ error: 'DB error' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('INMO API ERROR:', err)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
