import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const {
      nombre,
      email,
      telefono,
      comentario,
      interes
    } = data

    if (!nombre || !email || !telefono || !interes) {
      return NextResponse.json(
        { error: 'Datos incompletos' },
        { status: 400 }
      )
    }

    // 🔹 Transport SMTP Namecheap
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // 465 = SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    // 🔹 Destinatarios según interés
    const destinos: string[] = []

    if (interes === 'servicios' || interes === 'ambos') {
      destinos.push('servicios@voarah.com') // CAMBIAR por partner real
    }

    if (interes === 'productos' || interes === 'ambos') {
      destinos.push('productos@voarah.com') // CAMBIAR por partner real
    }

    // 🔹 Enviar mail(s)
    await Promise.all(
      destinos.map((to) =>
        transporter.sendMail({
          from: `"Voarah" <hola@voarah.com>`,
          to,
          replyTo: email,
          subject: `Nuevo lead Voarah – ${interes}`,
          html: `
            <h2>Nuevo contacto desde Voarah</h2>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
            <p><strong>Interés:</strong> ${interes}</p>
            <p><strong>Comentario:</strong><br/>${comentario || '-'}</p>
          `
        })
      )
    )

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('MAIL ERROR:', error)
    return NextResponse.json(
      { error: 'Error enviando email' },
      { status: 500 }
    )
  }
}
