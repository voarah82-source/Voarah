import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      empresa_nombre,
      contacto_nombre,
      email,
      telefono,
      ciudad_zona,

      servicio_mudanza,
      servicio_guardamuebles,
      servicio_limpieza,
      servicio_pintura,
      servicio_decoracion,
      servicio_compra_objetos,
      servicio_mantenimiento,
      servicio_otros,
      servicio_otros_texto
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
        email,
        telefono,
        ciudad_zona,

        servicio_mudanza: !!servicio_mudanza,
        servicio_guardamuebles: !!servicio_guardamuebles,
        servicio_limpieza: !!servicio_limpieza,
        servicio_pintura: !!servicio_pintura,
        servicio_decoracion: !!servicio_decoracion,
        servicio_compra_objetos: !!servicio_compra_objetos,
        servicio_mantenimiento: !!servicio_mantenimiento,
        servicio_otros: !!servicio_otros,
        servicio_otros_texto
      })

    if (error) {
      console.error(error)
      return NextResponse.json({ error: 'DB error' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
