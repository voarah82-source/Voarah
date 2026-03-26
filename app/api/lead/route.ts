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
// INTENCION REAL (JSON)
// =========================
const intencion = {
  servicio_mudanza: !!body.servicio_mudanza,
  servicio_guardamuebles: !!body.servicio_guardamuebles,
  servicio_limpieza: !!body.servicio_limpieza,
  servicio_pintura: !!body.servicio_pintura,
  servicio_decoracion: !!body.servicio_decoracion,
  servicio_mantenimiento: !!body.servicio_mantenimiento,
  servicio_diseno_interior: !!body.servicio_diseno_interior,
  servicio_fotografia_video_dron: !!body.servicio_fotografia_video_dron,
  servicio_juridicos: !!body.servicio_juridicos,
  servicio_seguros: !!body.servicio_seguros,
  servicio_jardinero_piletero: !!body.servicio_jardinero_piletero,
  servicio_seguridad: !!body.servicio_seguridad,

  servicio_mudanza_embalaje: !!body.servicio_mudanza_embalaje,
  servicio_mudanza_desembalaje: !!body.servicio_mudanza_desembalaje,
  servicio_mudanza_solo_transporte: !!body.servicio_mudanza_solo_transporte,

  servicio_guardamuebles_recogida: !!body.servicio_guardamuebles_recogida,
  servicio_guardamuebles_entrega: !!body.servicio_guardamuebles_entrega,
  servicio_guardamuebles_embalaje: !!body.servicio_guardamuebles_embalaje,
  servicio_guardamuebles_bauleras: !!body.servicio_guardamuebles_bauleras,

  servicio_limpieza_hogares: !!body.servicio_limpieza_hogares,
  servicio_limpieza_locales: !!body.servicio_limpieza_locales,
  servicio_limpieza_oficinas: !!body.servicio_limpieza_oficinas,
  servicio_limpieza_edificios: !!body.servicio_limpieza_edificios,
  servicio_limpieza_fin_obra: !!body.servicio_limpieza_fin_obra,
  servicio_limpieza_fachadas: !!body.servicio_limpieza_fachadas,
  servicio_limpieza_tejados: !!body.servicio_limpieza_tejados,
  servicio_limpieza_tapizados: !!body.servicio_limpieza_tapizados,
  servicio_limpieza_piletas: !!body.servicio_limpieza_piletas,
  servicio_limpieza_poda_arboles: !!body.servicio_limpieza_poda_arboles,

  servicio_diseno_disenos: !!body.servicio_diseno_disenos,
  servicio_diseno_proyectos: !!body.servicio_diseno_proyectos,
  servicio_diseno_planos: !!body.servicio_servicio_diseno_planos,
  servicio_diseno_certificaciones: !!body.servicio_diseno_certificaciones,

  servicio_mantenimiento_pintura: !!body.servicio_mantenimiento_pintura,
  servicio_mantenimiento_plomeria: !!body.servicio_mantenimiento_plomeria,
  servicio_mantenimiento_electricidad: !!body.servicio_mantenimiento_electricidad,
  servicio_mantenimiento_pisos: !!body.servicio_mantenimiento_pisos,
  servicio_mantenimiento_banos: !!body.servicio_mantenimiento_banos,
  servicio_mantenimiento_humedades: !!body.servicio_mantenimiento_humedades,
  servicio_mantenimiento_refacciones: !!body.servicio_mantenimiento_refacciones,

  servicio_juridico_civil: !!body.servicio_juridico_civil,
  servicio_juridico_contratos: !!body.servicio_juridico_contratos,
  servicio_juridico_sucesiones: !!body.servicio_juridico_sucesiones,
  servicio_juridico_divisiones_propiedad: !!body.servicio_juridico_divisiones_propiedad,
  servicio_juridico_mediaciones: !!body.servicio_juridico_mediaciones,

  servicio_seguro_hogar: !!body.servicio_seguro_hogar,
  servicio_seguro_comercio: !!body.servicio_seguro_comercio,
  servicio_seguro_autos: !!body.servicio_seguro_autos,
  servicio_seguro_cauciones: !!body.servicio_seguro_cauciones,
  servicio_seguro_proteccion_alquiler: !!body.servicio_seguro_proteccion_alquiler,

  servicio_seguridad_camaras: !!body.servicio_seguridad_camaras,
  servicio_seguridad_alarmas: !!body.servicio_seguridad_alarmas,

  producto_materiales_obra: !!body.producto_materiales_obra,
  producto_pintura: !!body.producto_pintura,
  producto_pisos_revestimientos: !!body.producto_pisos_revestimientos,
  producto_electricidad_plomeria_banos: !!body.producto_electricidad_plomeria_banos,
  producto_herramientas: !!body.producto_herramientas,
  producto_electrodomesticos: !!body.producto_electrodomesticos,
  producto_hogar_muebles_jardin: !!body.producto_hogar_muebles_jardin,
  producto_muebles_decoracion: !!body.producto_muebles_decoracion,
  producto_compra_venta_muebles_decoracion_usados: !!body.producto_compra_venta_muebles_decoracion_usados,
  producto_bienes_usados: !!body.producto_bienes_usados,
  producto_compra_venta_productos_usados: !!body.producto_compra_venta_productos_usados,

  producto_termotanques: !!body.producto_termotanques,
  producto_calefaccion_aire: !!body.producto_calefaccion_aire,
  producto_piletas: !!body.producto_piletas,

  producto_usado_laptops: !!body.producto_usado_laptops,
  producto_usado_celulares: !!body.producto_usado_celulares,
  producto_usado_videoconsolas: !!body.producto_usado_videoconsolas,
  producto_usado_relojes: !!body.producto_usado_relojes,
  producto_usado_camaras_fotos: !!body.producto_usado_camaras_fotos,
  producto_usado_bicicletas: !!body.producto_usado_bicicletas,
  producto_usado_raquetas: !!body.producto_usado_raquetas,
  producto_usado_motos: !!body.producto_usado_motos,
};

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

   const serviciosSeleccionados = Object.entries(intencion)
  .filter(([_, value]) => value === true)
  .map(([key]) =>
    key
      .replace("servicio_", "")
      .replace("producto_", "")
      .replace(/_/g, " ")
  );

const serviciosHTML =
  serviciosSeleccionados.length > 0
    ? `<ul>${serviciosSeleccionados.map(s => `<li>${s}</li>`).join("")}</ul>`
    : "<p>No especificado</p>";

await transporter.sendMail({
  from: `"Voarah" <${ADMIN}>`,
  to: ADMIN,
  bcc: "lucas.rossello@gmail.com",
  subject: "🔔 Nuevo cliente",
  html: `
    <h2>Nuevo Lead</h2>
    <p><b>Nombre:</b> ${nombre}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Teléfono:</b> ${telefono}</p>

    <h3>Qué necesita:</h3>
    ${serviciosHTML}

    <p>${comentario || ""}</p>
  `,
});

    await transporter.sendMail({
      from: `"Voarah" <${ADMIN}>`,
      to: email,
      subject: "Recibimos tu solicitud",
      html: `<p>Gracias, te contactamos pronto.</p>`,
    });

    for (const partner of PARTNERS) {
      await transporter.sendMail({
        from: `"Voarah" <${ADMIN}>`,
        to: partner,
        replyTo: email,
        subject: "Nuevo cliente",
        html: `
          <p><b>${nombre}</b></p>
          <p>${telefono}</p>
          <pre>${JSON.stringify(intencion, null, 2)}</pre>
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

