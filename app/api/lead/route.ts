import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const PROVIDERS: Record<string, string[]> = {
  servicios: [
    "lucas.rosello@gmail.com",
    "martinezmuerza@gmail.com",
  ],
  productos: [
    "aedevincenzi@gmail.com",
    "juancho12oddone@gmail.com",
  ],
  ambos: [
    "lucas.rosello@gmail.com",
    "martinezmuerza@gmail.com",
    "aedevincenzi@gmail.com",
    "juancho12oddone@gmail.com",
  ],
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔒 Mapeo defensivo de datos
    const email = body.email;
    const name =
      body.name ||
      body.nombre ||
      body.fullName ||
      "Contacto Web";

    const message =
      body.message ||
      body.mensaje ||
      body.comentario ||
      "Sin mensaje";

    const interes: string = body.interes || "";

    // 📞 Teléfono (defensivo)
    const phoneRaw =
      body.telefono ||
      body.phone ||
      body.celular ||
      "";

    const cleanPhone = phoneRaw.replace(/\D/g, "");

    // WhatsApp link (sin duplicar país)
    const whatsappLink =
      cleanPhone.length >= 10
        ? `https://wa.me/${cleanPhone}`
        : null;

    if (!email) {
      return NextResponse.json(
        { error: "Email requerido" },
        { status: 400 }
      );
    }

    // 📬 ADMIN (siempre)
    const ADMIN = process.env.MAIL_FROM || "hola@voarah.com";

    // 🎯 Destinatarios (nunca vacío)
    let recipients: string[] = [ADMIN];

    if (interes && PROVIDERS[interes]) {
      recipients.push(...PROVIDERS[interes]);
    }

    // 🧠 deduplicamos mails
    recipients = Array.from(new Set(recipients));

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
      from: `"Voarah" <${ADMIN}>`,
      to: recipients,
      replyTo: email,
      subject: "Nuevo contacto desde Voarah",
      html: `
        <h3>Nuevo contacto</h3>

        <p><b>Nombre:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Teléfono:</b> ${phoneRaw || "No informado"}</p>
        <p><b>Interés:</b> ${interes || "no especificado"}</p>

        <p><b>Mensaje:</b><br/>${message}</p>

        ${
          whatsappLink
            ? `
              <hr/>
              <a
                href="${whatsappLink}"
                target="_blank"
                style="
                  display:inline-block;
                  margin-top:16px;
                  padding:12px 20px;
                  background:#25D366;
                  color:#ffffff;
                  text-decoration:none;
                  border-radius:6px;
                  font-weight:bold;
                  font-family:Arial,sans-serif;
                "
              >
                💬 Escribir al cliente por WhatsApp
              </a>
            `
            : ""
        }
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
