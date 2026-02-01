import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    const destinos = {
      servicios: ['servicios@voarah.com'],
      productos: ['productos@voarah.com'],
      ambos: ['servicios@voarah.com', 'productos@voarah.com']
    }

    const to =
      destinos[data.interes as 'servicios' | 'productos' | 'ambos'] ??
      [process.env.MAIL_FROM]

    await transporter.sendMail({
      from: `"Voarah" <${process.env.MAIL_FROM}>`,
      to,
      subject: `Nuevo lead Voarah — ${data.interes}`,
      html: `
        <h2>Nuevo contacto</h2>
        <p><strong>Nombre:</strong> ${data.nombre}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Teléfono:</strong> ${data.telefono}</p>
        <p><strong>Interés:</strong> ${data.interes}</p>
        <p><strong>Comentario:</strong><br/>${data.comentario || '-'}</p>
      `
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error enviando email' }, { status: 500 })
  }
}
