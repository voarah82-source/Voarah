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

// =========================
// PROVEEDORES POR PRODUCTO
// =========================
const PROVIDERS_BY_PRODUCT: Record<string, string[]> = {
  producto_pintura: ["aedevincenzi@gmail.com"],
  producto_materiales_obra: ["lucas.rossello@gmail.com"],
  producto_pisos_revestimientos: ["lucas.rossello@gmail.com"],
  producto_electricidad_plomeria_banos: ["juancho12oddone@gmail.com"],
  producto_herramientas: ["lucas.rossello@gmail.com"],
  producto_electrodomesticos: ["martinezmuerza@gmail.com"],
  producto_hogar_muebles_jardin: ["aedevincenzi@gmail.com"],
  producto_otros: [
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
// DESTINATARIOS (SERVICIOS + PRODUCTOS)
// =========================
const providerSet = new Set<string>();

// ===== SERVICIOS =====
if (servicio_mudanza)
  PROVIDERS_BY_SERVICE.mudanza?.forEach(m => providerSet.add(m));

if (servicio_guardamuebles)
  PROVIDERS_BY_SERVICE.guardamuebles?.forEach(m => providerSet.add(m));

if (servicio_limpieza)
  PROVIDERS_BY_SERVICE.limpieza?.forEach(m => providerSet.add(m));

if (servicio_pintura)
  PROVIDERS_BY_SERVICE.pintura?.forEach(m => providerSet.add(m));

if (servicio_decoracion)
  PROVIDERS_BY_SERVICE.decoracion?.forEach(m => providerSet.add(m));

if (servicio_mantenimiento)
  PROVIDERS_BY_SERVICE.mantenimiento?.forEach(m => providerSet.add(m));

if (servicio_otros)
  PROVIDERS_BY_SERVICE.otros?.forEach(m => providerSet.add(m));


// ===== PRODUCTOS =====
if (producto_pintura)
  PROVIDERS_BY_PRODUCT.producto_pintura?.forEach(m => providerSet.add(m));

if (producto_materiales_obra)
  PROVIDERS_BY_PRODUCT.producto_materiales_obra?.forEach(m => providerSet.add(m));

if (producto_pisos_revestimientos)
  PROVIDERS_BY_PRODUCT.producto_pisos_revestimientos?.forEach(m => providerSet.add(m));

if (producto_electricidad_plomeria_banos)
  PROVIDERS_BY_PRODUCT.producto_electricidad_plomeria_banos?.forEach(m => providerSet.add(m));

if (producto_herramientas)
  PROVIDERS_BY_PRODUCT.producto_herramientas?.forEach(m => providerSet.add(m));

if (producto_electrodomesticos)
  PROVIDERS_BY_PRODUCT.producto_electrodomesticos?.forEach(m => providerSet.add(m));

if (producto_hogar_muebles_jardin)
  PROVIDERS_BY_PRODUCT.producto_hogar_muebles_jardin?.forEach(m => providerSet.add(m));

if (producto_otros)
  PROVIDERS_BY_PRODUCT.producto_otros?.forEach(m => providerSet.add(m));

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
    
    ${
      servicio_otros_texto
        ? `<p><b>Texto libre servicio:</b> ${servicio_otros_texto}</p>`
        : ""
    }

    ${
      producto_otros_texto
        ? `<p><b>Texto libre producto:</b> ${producto_otros_texto}</p>`
        : ""
    }

    <p><b>Mensaje general:</b><br/>${comentario || "—"}</p>
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
    subject: "Nuevo cliente interesado en tu servicio / producto",
    replyTo: email,
    html: `
      <h2>Nuevo cliente</h2>
      <p><b>Nombre:</b> ${nombre}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Teléfono:</b> ${telefono}</p>
      <p><b>Solicitud:</b> ${intencion}</p>

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

