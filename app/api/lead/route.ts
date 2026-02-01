import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    await transporter.sendMail({
      from: `"Voarah" <${process.env.MAIL_FROM}>`,
      to: 'hola@voarah.com',
      subject: 'Nuevo lead Voarah',
      html: `
        <h2>Nuevo contacto</h2>
        <p><b>Nombre:</b> ${data.nombre}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Teléfono:</b> ${data.telefono}</p>
        <p><b>Interés:</b> ${data.interes}</p>
        <p><b>Comentario:</b> ${data.comentario || '-'}</p>
      `
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Mail error' }, { status: 500 })
  }
}
