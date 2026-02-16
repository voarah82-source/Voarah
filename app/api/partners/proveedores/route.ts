import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

export const runtime = "nodejs"

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
      servicio_otros_texto,

      producto_pintura,
      producto_materiales_obra,
      producto_electricidad_plomeria,
      producto_herramientas,
      producto_electrodomesticos,
      producto_muebles,
      producto_otros,
      producto_otros_texto
    } = body

    if (
      !empresa_nombre ||
      !contacto_nombre ||
      !email ||
      !telefono ||
      !ciudad_zona
    ) {
      return NextResponse.json(
        { error: 'Datos incompletos' },
        { status: 400 }
      )
    }

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
        servicio_otros_texto,

        producto_pintura: !!producto_pintura,
        producto_materiales_obra: !!producto_materiales_obra,
        producto_electricidad_plomeria: !!producto_electricidad_plomeria,
        producto_herramientas: !!producto_herramientas,
        producto_electrodomesticos: !!producto_electrodomesticos,
        producto_muebles: !!producto_muebles,
        producto_otros: !!producto_otros,
        producto_otros_texto
      })

    if (error) {
      console.error('DB ERROR:', error)
      return NextResponse.json({ error: 'DB error' }, { status: 500 })
    }

    // =========================
    // EMAILS
    // =========================

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const ADMIN = "hola@voarah.com"

    // 📩 MAIL INTERNO (solo a vos)
    await transporter.sendMail({
      from: `"Voarah" <${ADMIN}>`,
      to: ADMIN,
      subject: "Nueva alta de PROVEEDOR en Voarah",
      html: `
        <h2>Nueva alta de proveedor</h2>
        <p><b>Empresa:</b> ${empresa_nombre}</p>
        <p><b>Contacto:</b> ${contacto_nombre}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Teléfono:</b> ${telefono}</p>
        <p><b>Zona:</b> ${ciudad_zona}</p>
      `,
    })

    // 📩 MAIL AL PROVEEDOR
    await transporter.sendMail({
      from: `"Voarah" <${ADMIN}>`,
      to: email,
      subject: "Bienvenido a Voarah",
      html: `
        <h2>Bienvenido a Voarah</h2>
        <p>Hola ${contacto_nombre},</p>
        <p>Recibimos tu solicitud para sumarte como partner proveedor.</p>
        <p>En breve nuestro equipo se pondrá en contacto para continuar el proceso.</p>
        <br/>
        <p>Equipo Voarah</p>
      `,
    })

    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error('API ERROR:', err)
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
