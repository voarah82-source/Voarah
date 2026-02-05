// app/api/lead/route.ts
export const runtime = "nodejs";

import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// =========================
// PROVEEDORES POR INTERÉS
// =========================
const PROVIDERS: Record<string, string[]> = {
  servicios: [
    "lucas.rossello@gmail.com",
    "martinezmuerza@gmail.com",
  ],
  productos: [
    "aedevincenzi@gmail.com",
    "juancho12oddone@gmail.com",
  ],
  ambos: [
    "lucas.rossello@gmail.com",
    "martinezmuerza@gmail.com",
    "aedevincenzi@gmail.com",
    "juancho12oddone@gmail.com",
  ],
};

export async function POST(req: Request) {
  try {
    // =========================
    // BODY
    // =========================
    const body = await req.json();

    const {
      nombre,
      email,
      telefono,
      comentario,
      interes,
      origen: origenCodigo,
    } = body;

    if (!nombre || !email || !telefono) {
      return NextResponse.json(
        { error: "Datos incompletos" },
        { status: 400 }
      );
    }

    // =========================
    // SUPABASE (SERVER ONLY)
    // =========================
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error("❌ Supabase env vars missing");
      return NextResponse.json(
        { error: "Configuración del servidor incompleta" },
        { status: 500 }
      );
    }

    const supabase = createClient(
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY
    );

    // =========================
    // BUSCAR ORIGEN
    // =========================
 const { data: origen } = await supabase
  .from("origenes_comerciales")
  .select("id")
  .eq("codigo", origenCodigo)
  .maybeSingle();

    // =========================
    // INSERT LEAD
    // =========================
    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .insert({
        nombre,
        email,
        telefono,
        comentario,
        intencion: interes || "no_especificado",
        origen_id: origen ? origen.id : null,
      })
      .select()
      .single();

    if (leadError) {
      console.error("❌ Lead insert error:", leadError);
      return NextResponse.json(
        { error: "Error guardando lead" },
        { status: 500 }
      );
    }

    // =========================
    // UPDATE ORIGEN (LAST USED)
    // =========================
   if (origen) {
  await supabase
    .from("origenes_comerciales")
    .update({ last_used_at: new Date().toISOString() })
    .eq("id", origen.id);
}

    // =========================
    // EMAIL DESTINATARIOS
    // =========================
    const ADMIN = process.env.MAIL_FROM!;
    const providerRecipients =
      PROVIDERS[interes] || [];

    const recipients = [
      ADMIN,               // vos
      ...providerRecipients,
      email,               // cliente
    ];

 // =========================
// EMAIL
// =========================
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// WhatsApp (solo para partners)
const phoneClean = telefono.replace(/\D/g, "");
const whatsappLink = phoneClean
  ? `https://wa.me/${phoneClean}`
  : null;

// =========================
// MAIL A PARTNERS / PROVIDERS (+ vos)
// =========================
await transporter.sendMail({
  from: `"Voarah" <${ADMIN}>`,
  to: [ADMIN, ...providerRecipients],
  replyTo: email,
  subject: "Nuevo contacto desde Voarah",
  html: `
    <h3>Nuevo lead</h3>
    <p><b>Nombre:</b> ${nombre}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Teléfono:</b> ${telefono}</p>
    <p><b>Interés:</b> ${interes}</p>
    <p><b>Comentario:</b><br/>${comentario}</p>

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
          💬 Escribir al lead por WhatsApp
        </a>
        `
        : ""
    }
  `,
});

// =========================
// MAIL AL CLIENTE (SIN WHATSAPP)
// =========================
await transporter.sendMail({
  from: `"Voarah" <${ADMIN}>`,
  to: email,
  subject: "Recibimos tu contacto en Voarah",
  html: `
    <h3>Gracias por contactarte con Voarah</h3>
    <p>Recibimos tu solicitud y un partner se va a comunicar con vos.</p>

    <p><b>Nombre:</b> ${nombre}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Teléfono:</b> ${telefono}</p>
    <p><b>Interés:</b> ${interes}</p>
  `,
});

return NextResponse.json({ ok: true, leadId: lead.id });

  } catch (err) {
    console.error("❌ API error:", err);
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}

