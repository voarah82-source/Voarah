// app/api/lead/route.ts
export const runtime = "nodejs";

import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// =========================
// HELPERS
// =========================
const safe = (v: any) => (v ? String(v).trim() : "");

// =========================
// EMAILS
// =========================
const ADMIN = "hola@voarah.com";
const PARTNERS = ["hola@voarah.com", "lucas.rossello@gmail.com"];

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const nombre = safe(body.nombre);
    const email = safe(body.email);
    const telefono = safe(body.telefono);
    const comentario = safe(body.comentario);
    const origenCodigo = safe(body.origen);

    if (!nombre || !email || !telefono) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    // =========================
    // INTENCION (ACTUALIZADA)
    // =========================
    const servicios: string[] = [];

    // SERVICIOS
    if (body.servicio_mudanza) servicios.push("mudanza");
    if (body.servicio_guardamuebles) servicios.push("guardamuebles");
    if (body.servicio_limpieza) servicios.push("limpieza");
    if (body.servicio_pintura) servicios.push("pintura");
    if (body.servicio_decoracion) servicios.push("decoracion");
    if (body.servicio_mantenimiento) servicios.push("mantenimiento");

    // PRODUCTOS
    if (body.producto_pintura) servicios.push("producto pintura");
    if (body.producto_materiales_obra) servicios.push("materiales de obra");
    if (body.producto_pisos_revestimientos) servicios.push("pisos y revestimientos");
    if (body.producto_electricidad_plomeria_banos) servicios.push("electricidad y plomería");
    if (body.producto_herramientas) servicios.push("herramientas");
    if (body.producto_electrodomesticos) servicios.push("electrodomésticos");
    if (body.producto_hogar_muebles_jardin) servicios.push("muebles y jardín");
    if (body.producto_bienes_usados) servicios.push("bienes usados");

    const intencion =
      servicios.length > 0 ? servicios.join(", ") : "no_especificado";

    // =========================
    // SUPABASE
    // =========================
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const codigoFinal = origenCodigo || "ORGANICO";

    const { data: origen } = await supabase
      .from("origenes_comerciales")
      .select("id")
      .eq("codigo", codigoFinal)
      .single();

    if (!origen) {
      return NextResponse.json({ error: "Origen inválido" }, { status: 400 });
    }

    const { data: lead } = await supabase
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

    const phoneClean = telefono.replace(/\D/g, "");
    const whatsappLink = phoneClean
      ? `https://wa.me/${phoneClean}`
      : null;

    // =========================
    // 1. ADMIN
    // =========================
    await transporter.sendMail({
      from: `"Voarah" <${ADMIN}>`,
      to: ADMIN,
      subject: "🔔 Nuevo cliente",
      html: `
        <h2>Nuevo Lead</h2>
        <p><b>Nombre:</b> ${nombre}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Teléfono:</b> ${telefono}</p>
        <p><b>Intención:</b> ${intencion}</p>
        <p>${comentario || ""}</p>
      `,
    });

    // =========================
    // 2. CLIENTE
    // =========================
    await transporter.sendMail({
      from: `"Voarah" <${ADMIN}>`,
      to: email,
      subject: "Recibimos tu solicitud",
      html: `<p>Gracias, te contactamos pronto.</p>`,
    });

    // =========================
    // 3. PARTNERS (FIJO)
    // =========================
    for (const partner of PARTNERS) {
      await transporter.sendMail({
        from: `"Voarah" <${ADMIN}>`,
        to: partner,
        replyTo: email,
        subject: "Nuevo cliente",
        html: `
          <p><b>${nombre}</b></p>
          <p>${telefono}</p>
          <p>${intencion}</p>
          ${
            whatsappLink
              ? `<a href="${whatsappLink}">WhatsApp</a>`
              : ""
          }
        `,
      });
    }

    return NextResponse.json({ ok: true, leadId: lead.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

