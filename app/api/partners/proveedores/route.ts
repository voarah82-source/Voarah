import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      empresa_nombre,
      contacto_nombre,
      contacto_cargo,
      email,
      telefono,
      ciudad_zona,

      servicio_mudanza = false,
      servicio_limpieza = false,
      servicio_pintura = false,
      servicio_decoracion = false,
      servicio_compra_objetos = false,
      servicio_mantenimiento = false,
      servicio_otros = false,

      tipo_equipo,
      coordina_plazos,
      seguro_responsabilidad,
      emite_factura,

      sitio_web,
      motivacion
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
        contacto_cargo,
        email,
        telefono,
        ciudad_zona,

        servicio_mudanza,
        servicio_limpieza,
        servicio_pintura,
        servicio_decoracion,
        servicio_compra_objetos,
        servicio_mantenimiento,
        servicio_otros,

        tipo_equipo,
        coordina_plazos,
        seguro_responsabilidad,
        emite_factura,

        sitio_web,
        motivacion
      })

    if (error) {
      return NextResponse.json({ error: 'DB error' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
