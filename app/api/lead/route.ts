import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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

    // 🔒 Datos defensivos
    const nombre = body.nombre || body.name || "Contacto Web";
    const email = body.email;
    const telefono = body.telefono || "";
    const comentario = body.comentario || body.message || "";
    const interes = body.interes || "";
    const origenCodigo = body.origen || "";

    if (!email) {
      return NextResponse.json(
        { error: "Email requerido" },
        { status: 400 }
      );
    }

    // 🔎 1) BUSCAR ORIGEN
    let origen_id: string | null = null;

    if (origenCodigo) {
      const { data: origen, error } = await supabase
        .from("origenes_comerciales")
        .select("id")
        .eq("codigo", origenCodigo)
        .single();

      if (!error && origen) {
        origen_id = origen.id;
      }
    }

    // fallback opcional (si querés bloquear sin origen, avisame)
    if (!origen_id) {
      return NextResponse.json(
        { error: "Origen inválido o inexistente" },
        { status: 400 }
      );
    }

    // 🧾 2) INSERT LEAD
    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .insert({
        nombre,
        email,
        telefono,
        comentario,
        intencion: interes || "no_especificado",
        origen_id,
      })
      .select()
      .single();

    if (leadError) {
      console.error("Error insert lead:", leadError);
      return NextResponse.json(
        { error: "Error guardando lead" },
        { status: 500 }
      );
    }

    // 📬 MAIL
    const ADMIN = process.env.MAIL_FROM || "hola@voarah.com";

    let recipients: string[] = [ADMIN];
    if (interes && PROVIDERS[interes]) {
      recipients.push(...PROVIDERS[interes]);
    }
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
      bcc: ADMIN,
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

    return NextResponse.json({ ok: true, lead_id: lead.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

