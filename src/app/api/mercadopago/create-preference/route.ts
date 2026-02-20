import { NextRequest, NextResponse } from "next/server";
import { createPreferenceClient, isMercadoPagoConfigured } from "@/lib/mercadopago";
import products from "@/data/products.json";
import { calculateItemPrice } from "@/lib/utils";

interface OrderItem {
  productRef: string;
  selectedWeight?: number;
  quantity: number;
}

export async function POST(request: NextRequest) {
  if (!isMercadoPagoConfigured()) {
    return NextResponse.json(
      { error: "MercadoPago no está configurado. Agregá MP_ACCESS_TOKEN en .env.local" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { items }: { items: OrderItem[] } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No hay items en el pedido" },
        { status: 400 }
      );
    }

    // Validate and resolve prices from server-side catalog — never trust client prices
    const resolvedItems = [];
    for (const item of items) {
      const product = (products as { ref: string; name: string; weight: string; category: string; price: number }[])
        .find((p) => p.ref === item.productRef);

      if (!product) {
        return NextResponse.json(
          { error: `Producto no encontrado: ${item.productRef}` },
          { status: 400 }
        );
      }

      const quantity = Math.max(1, Math.floor(Number(item.quantity)));
      if (!Number.isFinite(quantity) || quantity < 1 || quantity > 100) {
        return NextResponse.json(
          { error: "Cantidad inválida" },
          { status: 400 }
        );
      }

      const unitPrice = calculateItemPrice(product.price, item.selectedWeight);
      const weightLabel = item.selectedWeight
        ? `${item.selectedWeight >= 1000 ? item.selectedWeight / 1000 + " kg" : item.selectedWeight + " g"}`
        : product.weight;

      resolvedItems.push({
        id: item.selectedWeight ? `${product.ref}-${item.selectedWeight}` : product.ref,
        title: `${product.name} (${weightLabel})`,
        quantity,
        unit_price: unitPrice,
        currency_id: "ARS",
      });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const isLocalhost = siteUrl.includes("localhost");

    const preference = await createPreferenceClient().create({
      body: {
        items: resolvedItems,
        back_urls: {
          success: `${siteUrl}/carrito?status=approved`,
          failure: `${siteUrl}/carrito?status=failure`,
          pending: `${siteUrl}/carrito?status=pending`,
        },
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
