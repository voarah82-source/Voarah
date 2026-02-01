import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔒 Mapeo defensivo (CLAVE)
    const email = body.email;
    const name =
      body.name ||
      body.nombre ||
      body.fullName ||
      "Contacto Web";
    const message =
      body.message ||
      body.mensaje ||
      body.msg ||
      "Sin mensaje";

    if (!email) {
      return NextResponse.json(
        { error: "Email requerido" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Voarah" <${process.env.MAIL_FROM}>`,
      to: [
        process.env.MAIL_FROM,   // vos
        // acá podés agregar partners fijos
        // "partner@empresa.com"
      ].join(","),

      replyTo: email, // 👈 responderle al cliente
      subject: "Nuevo contacto desde Voarah",
      html: `
        <h3>Nuevo contacto</h3>
        <p><b>Nombre:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mensaje:</b><br/>${message}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

