// app/api/lead/route.ts
export const runtime = "nodejs";

import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// =========================
// PROVEEDORES POR SERVICIO
// =========================
const PROVIDERS_BY_SERVICE: Record<string, string[]> = {
  mudanza: ["lucas.rossello@gmail.com"],
  guardamuebles: ["lucas.rossello@gmail.com"],
  limpieza: ["martinezmuerza@gmail.com"],
  pintura: ["aedevincenzi@gmail.com"],
  decoracion: ["aedevincenzi@gmail.com"],
  mantenimiento: ["juancho12oddone@gmail.com"],
  otros: [
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
  origen: origenCodigo,

  // ===== SERVICIOS =====
  servicio_mudanza,
  servicio_guardamuebles,
  servicio_limpieza,
  servicio_pintura,
  servicio_decoracion,
  servicio_mantenimiento,
  servicio_otros,
  servicio_otros_texto,

  // ===== PRODUCTOS =====
  producto_pintura,
  producto_materiales_obra,
  producto_pisos_revestimientos,
  producto_electricidad_plomeria_banos,
  producto_herramientas,
  producto_electrodomesticos,
  producto_hogar_muebles_jardin,
  producto_otros,
  producto_otros_texto,
} = body;

if (!nombre || !email || !telefono) {
  return NextResponse.json(
    { error: "Datos incompletos" },
    { status: 400 }
  );
}


   // =========================
// ARMAR INTENCION
// =========================
const servicios: string[] = [];

// ===== SERVICIOS =====
if (servicio_mudanza) servicios.push("mudanza");
if (servicio_guardamuebles) servicios.push("guardamuebles");
if (servicio_limpieza) servicios.push("limpieza");
if (servicio_pintura) servicios.push("pintura");
if (servicio_decoracion) servicios.push("decoracion");
if (servicio_mantenimiento) servicios.push("mantenimiento");

if (servicio_otros) {
  servicios.push(
    servicio_otros_texto
      ? `servicio otros: ${servicio_otros_texto}`
      : "servicio otros"
  );
}

// ===== PRODUCTOS =====
if (producto_pintura) servicios.push("producto: pintura");
if (producto_materiales_obra) servicios.push("producto: materiales de obra");
if (producto_pisos_revestimientos) servicios.push("producto: pisos y revestimientos");
if (producto_electricidad_plomeria_banos)
  servicios.push("producto: electricidad, plomería y baños");
if (producto_herramientas) servicios.push("producto: herramientas");
if (producto_electrodomesticos) servicios.push("producto: electrodomésticos");
if (producto_hogar_muebles_jardin)
  servicios.push("producto: hogar, muebles y jardín");

if (producto_otros) {
  servicios.push(
    producto_otros_texto
      ? `producto otros: ${producto_otros_texto}`
      : "producto otros"
  );
}

const intencion =
  servicios.length > 0 ? servicios.join(", ") : "no_especificado";


    // =========================
    // SUPABASE
    // =========================
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // =========================
    // BUSCAR ORIGEN (OBLIGATORIO)
    // =========================
    const { data: origen } = await supabase
      .from("origenes_comerciales")
      .select("id")
      .eq("codigo", origenCodigo)
      .single();

    if (!origen) {
      return NextResponse.json(
        { error: "Origen inválido" },
        { status: 400 }
      );
    }

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
        intencion,
        origen_id: origen.id,
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
    await supabase
      .from("origenes_comerciales")
      .update({ last_used_at: new Date().toISOString() })
      .eq("id", origen.id);

  // =========================
// DESTINATARIOS POR SERVICIO
// =========================
const providerSet = new Set<string>();

servicios.forEach((s) => {
  const key = s.startsWith("servicio otros") ? "otros"
            : s.startsWith("mudanza") ? "mudanza"
            : s.startsWith("guardamuebles") ? "guardamuebles"
            : s.startsWith("limpieza") ? "limpieza"
            : s.startsWith("pintura") ? "pintura"
            : s.startsWith("decoracion") ? "decoracion"
            : s.startsWith("mantenimiento") ? "mantenimiento"
            : null;

  if (key && PROVIDERS_BY_SERVICE[key]) {
    PROVIDERS_BY_SERVICE[key].forEach((mail) => {
      providerSet.add(mail);
    });
  }
});

const providerRecipients = Array.from(providerSet);

// =========================
// EMAIL SETUP
// =========================
const ADMIN = "hola@voarah.com";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const phoneClean = telefono.replace(/\D/g, "");
const whatsappLink = phoneClean
  ? `https://wa.me/${phoneClean}`
  : null;

// =========================
// 1️⃣ MAIL A VOARAH
// =========================
await transporter.sendMail({
  from: `"Voarah" <${ADMIN}>`,
  to: ADMIN,
  subject: "🔔 Nuevo cliente en VOARAH",
  html: `
    <h2>Nuevo Lead</h2>
    <p><b>Nombre:</b> ${nombre}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Teléfono:</b> ${telefono}</p>
    <p><b>Intención:</b> ${intencion}</p>
    <p><b>Mensaje:</b><br/>${comentario || "—"}</p>
  `,
});

// =========================
// 2️⃣ MAIL AL CLIENTE
// =========================
await transporter.sendMail({
  from: `"Voarah" <${ADMIN}>`,
  to: email,
  subject: "Recibimos tu solicitud en VOARAH",
  html: `
    <h2>Gracias por confiar en VOARAH</h2>
    <p>Recibimos tu solicitud correctamente.</p>
    <p>Un proveedor se pondrá en contacto con vos a la brevedad.</p>
  `,
});

// =========================
// 3️⃣ MAIL INDIVIDUAL A CADA PROVEEDOR
// =========================
for (const providerEmail of providerRecipients) {
  await transporter.sendMail({
    from: `"Voarah" <${ADMIN}>`,
    to: providerEmail,
    subject: "Nuevo cliente interesado en tu servicio",
    replyTo: email,
    html: `
      <h2>Nuevo cliente</h2>
      <p><b>Nombre:</b> ${nombre}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Teléfono:</b> ${telefono}</p>
      <p><b>Servicios solicitados:</b> ${intencion}</p>
      <p><b>Mensaje:</b><br/>${comentario || "—"}</p>

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
              "
            >
              💬 Contactar por WhatsApp
            </a>
          `
          : ""
      }
    `,
  });
}


    return NextResponse.json({ ok: true, leadId: lead.id });
  } catch (err) {
    console.error("❌ API error:", err);
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}

