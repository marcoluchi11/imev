import { NextRequest, NextResponse } from "next/server";
import { createPaymentClient } from "@/lib/mercadopago";
import { createHmac } from "crypto";

function verifyWebhookSignature(request: NextRequest, rawBody: string): boolean {
  const webhookSecret = process.env.MP_WEBHOOK_SECRET;
  if (!webhookSecret) {
    // If no secret is configured, skip verification (dev mode)
    return true;
  }

  const xSignature = request.headers.get("x-signature");
  const xRequestId = request.headers.get("x-request-id");

  if (!xSignature || !xRequestId) {
    return false;
  }

  // Parse ts and v1 from x-signature header
  const parts = Object.fromEntries(
    xSignature.split(",").map((part) => part.split("=") as [string, string])
  );
  const ts = parts["ts"];
  const v1 = parts["v1"];

  if (!ts || !v1) {
    return false;
  }

  // Build the manifest string as specified by MercadoPago
  let dataId: string | undefined;
  try {
    const body = JSON.parse(rawBody);
    dataId = body?.data?.id;
  } catch {
    return false;
  }

  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
  const expectedSignature = createHmac("sha256", webhookSecret)
    .update(manifest)
    .digest("hex");

  return expectedSignature === v1;
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();

    if (!verifyWebhookSignature(request, rawBody)) {
      return NextResponse.json({ status: "unauthorized" }, { status: 401 });
    }

    const body = JSON.parse(rawBody);

    if (body.type === "payment") {
      const paymentId = body.data?.id;

      if (paymentId) {
        const payment = await createPaymentClient().get({ id: paymentId });

        if (payment.status === "approved") {
          // Order fulfilled — add your fulfillment logic here
          // Avoid logging sensitive payment data in production
        }
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ status: "ok" });
  }
}
