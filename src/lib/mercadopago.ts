import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

const accessToken = process.env.MP_ACCESS_TOKEN;

export function getMercadoPagoClient() {
  if (!accessToken) {
    throw new Error("MP_ACCESS_TOKEN no está configurado");
  }
  return new MercadoPagoConfig({ accessToken });
}

export function createPreferenceClient() {
  const client = getMercadoPagoClient();
  return new Preference(client);
}

export function createPaymentClient() {
  const client = getMercadoPagoClient();
  return new Payment(client);
}

export function isMercadoPagoConfigured(): boolean {
  return !!accessToken;
}
