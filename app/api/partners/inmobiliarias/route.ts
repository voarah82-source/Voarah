import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      inmobiliaria_nombre,
      contacto_nombre,
      email,
      telefono,
      ciudad_zona
    } = body

    if (
      !inmobiliaria_nombre ||
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
      .from('partners_inmobiliarias')
      .insert({
        inmobiliaria_nombre,
        contacto_nombre,
        email,
        telefono,
        ciudad_zona
      })

    if (error) {
      console.error(error)
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

    // 📩 MAIL INTERNO
    await transporter.sendMail({
      from: `"Voarah" <${ADMIN}>`,
      to: ADMIN,
      subject: "Nueva alta de INMOBILIARIA en Voarah",
      html: `
        <h2>Nueva alta de inmobiliaria</h2>
        <p><b>Inmobiliaria:</b> ${inmobiliaria_nombre}</p>
        <p><b>Contacto:</b> ${contacto_nombre}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Teléfono:</b> ${telefono}</p>
        <p><b>Zona:</b> ${ciudad_zona}</p>
      `,
    })

    // 📩 MAIL A LA INMOBILIARIA
    await transporter.sendMail({
      from: `"Voarah" <${ADMIN}>`,
      to: email,
      subject: "Bienvenido a Voarah",
      html: `
        <h2>Bienvenido a Voarah</h2>
        <p>Hola ${contacto_nombre},</p>
        <p>Recibimos tu solicitud para sumar tu inmobiliaria a nuestra red.</p>
        <p>En breve nuestro equipo se pondrá en contacto.</p>
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
