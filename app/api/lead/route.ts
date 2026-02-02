// app/api/lead/route.ts
export const runtime = "nodejs";

import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const nombre = body.nombre;
    const email = body.email;
    const telefono = body.telefono;
    const comentario = body.comentario || "";
    const interes = body.interes || "no_especificado";
    const origenCodigo = body.origen || "";

    if (!nombre || !email || !telefono) {
      return NextResponse.json(
        { error: "Datos incompletos" },
        { status: 400 }
      );
    }

    // =========================
    // SUPABASE (runtime safe)
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

    // 🔎 Buscar origen
    const { data: origen, error: origenError } = await supabase
      .from("origenes_comerciales")
      .select("id")
      .eq("codigo", origenCodigo)
      .single();

    if (origenError || !origen) {
      return NextResponse.json(
        { error: "Origen inválido" },
        { status: 400 }
      );
    }

    // 🧾 Insert lead
    const { error: leadError } = await supabase
      .from("leads")
      .insert({
        nombre,
        email,
        telefono,
        comentario,
        intencion: interes,
        origen_id: origen.id,
      });

    if (leadError) {
      console.error("❌ Insert lead error:", leadError);
      return NextResponse.json(
        { error: "Error guardando lead" },
        { status: 500 }
      );
    }

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

    await transporter.sendMail({
      from: `"Voarah" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_FROM,
      replyTo: email,
      subject: "Nuevo contacto desde Voarah",
      html: `
        <h3>Nuevo contacto</h3>
        <p><b>Nombre:</b> ${nombre}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Teléfono:</b> ${telefono}</p>
        <p><b>Interés:</b> ${interes}</p>
        <p><b>Origen:</b> ${origenCodigo}</p>
        <p><b>Mensaje:</b><br/>${comentario}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("❌ API error:", err);
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}

