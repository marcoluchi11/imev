import { NextRequest, NextResponse } from "next/server";
import { createPreferenceClient, isMercadoPagoConfigured } from "@/lib/mercadopago";

export async function POST(request: NextRequest) {
  if (!isMercadoPagoConfigured()) {
    return NextResponse.json(
      { error: "MercadoPago no está configurado. Agregá MP_ACCESS_TOKEN en .env.local" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { items } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No hay items en el pedido" },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const isLocalhost = siteUrl.includes("localhost");

    const preference = await createPreferenceClient().create({
      body: {
        items: items.map((item: { title: string; quantity: number; unit_price: number; currency_id: string }) => ({
          title: item.title,
          quantity: item.quantity,
          unit_price: item.unit_price,
          currency_id: item.currency_id || "ARS",
        })),
        back_urls: {
          success: `${siteUrl}/carrito?status=approved`,
          failure: `${siteUrl}/carrito?status=failure`,
          pending: `${siteUrl}/carrito?status=pending`,
        },
        // auto_return requiere una URL pública (no funciona con localhost)
        ...(!isLocalhost && { auto_return: "approved" }),
        ...(!isLocalhost && { notification_url: `${siteUrl}/api/mercadopago/webhook` }),
      },
    });

    return NextResponse.json({
      id: preference.id,
      init_point: preference.init_point,
    });
  } catch (error) {
    console.error("Error creating MercadoPago preference:", error);
    return NextResponse.json(
      { error: "Error al crear la preferencia de pago" },
      { status: 500 }
    );
  }
}
