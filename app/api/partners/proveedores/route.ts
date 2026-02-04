import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      empresa_nombre,
      contacto_nombre,
      cargo,
      email,
      telefono,
      ciudad,
      servicio_mudanza,
      servicio_limpieza,
      servicio_pintura,
      servicio_decoracion,
      servicio_mantenimiento,
      servicio_otros,
      tipo_equipo,
      plazos,
      tiene_seguro,
      emite_factura,
      web,
      mensaje
    } = body

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error } = await supabase
      .from('partners_proveedores')
      .insert({
        empresa_nombre,
        contacto_nombre,
        cargo,
        email,
        telefono,
        ciudad,
        servicio_mudanza,
        servicio_limpieza,
        servicio_pintura,
        servicio_decoracion,
        servicio_mantenimiento,
        servicio_otros,
        tipo_equipo,
        plazos,
        tiene_seguro,
        emite_factura,
        web,
        mensaje
      })

    if (error) {
      console.error('PROVEEDOR INSERT ERROR:', error)
      return NextResponse.json({ error: 'DB error' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('PROVEEDOR API ERROR:', err)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
