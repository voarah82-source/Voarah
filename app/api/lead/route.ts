import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const PROVIDERS: Record<string, string[]> = {
  proveedor1: [
    "lucas.rosello@gmail.com",
    "martinezmuerza@gmail.com",
    //"ventas@proveedor1.com",
   // "operaciones@proveedor1.com",
  ],
  proveedor2: [
    "aedevincenzi@gmail.com",
    "juancho12oddone@gmail.com",
   // "contacto@proveedor2.com",
  ],
  proveedor3: [
   // "martinezmuerza@gmail.com",
  //  "admin@proveedor3.com",
  //  "backoffice@proveedor3.com",
  ],
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔒 Mapeo defensivo
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

    const interes = body.interes; 
    // valores esperados:
    // "proveedor1" | "proveedor2" | "ambos"

    if (!email) {
      return NextResponse.json(
        { error: "Email requerido" },
        { status: 400 }
      );
    }

    // 📬 Emails fijos
    const ADMIN = process.env.MAIL_FROM; // vos

    const PROVEEDOR_1 = "lucas.rosello@gmail.com";
    const PROVEEDOR_2 = "aedevincenzi@gmail.com";

    // 🎯 Decisión invisible para el cliente
    let recipients: string[] = [];

    // siempre vos
    if (ADMIN) recipients.push(ADMIN);

    if (interes === "proveedor1") {
      recipients.push(PROVEEDOR_1);
    }

    if (interes === "proveedor2") {
      recipients.push(PROVEEDOR_2);
    }

    if (interes === "ambos") {
      recipients.push(PROVEEDOR_1, PROVEEDOR_2);
    }

    // fallback de seguridad
    if (recipients.length === 0 && ADMIN) {
      recipients.push(ADMIN);
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

   // 📞 teléfono del cliente (defensivo)
const phoneRaw =
  body.telefono ||
  body.phone ||
  body.celular ||
  "";

// limpiamos todo lo que no sea número
const cleanPhone = phoneRaw.replace(/\D/g, "");

// link whatsapp (Argentina por defecto, ajustá si querés)
const whatsappLink = cleanPhone
  ? `https://wa.me/54${cleanPhone}`
  : null;

await transporter.sendMail({
  from: `"Voarah" <${process.env.MAIL_FROM}>`,
  to: recipients, // vos + proveedores según interés
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

