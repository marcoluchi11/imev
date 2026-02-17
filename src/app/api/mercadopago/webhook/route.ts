import { NextRequest, NextResponse } from "next/server";
import { createPaymentClient } from "@/lib/mercadopago";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.type === "payment") {
      const paymentId = body.data?.id;

      if (paymentId) {
        const payment = await createPaymentClient().get({ id: paymentId });

        if (payment.status === "approved") {
          const items = payment.additional_info?.items || [];
          const total = payment.transaction_amount;

          console.log("=== PAGO APROBADO ===");
          console.log(`ID de pago: ${paymentId}`);
          console.log(`Total: $${total}`);
          console.log("Items:", items.map((i: { title: string; quantity: number }) => `${i.quantity}x ${i.title}`).join(", "));
          console.log("====================");
        }
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ status: "ok" });
  }
}
