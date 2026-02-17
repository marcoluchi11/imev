import { CartItem } from "@/types";

const WHATSAPP_NUMBER = "5493471526765";

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function generateWhatsAppMessage(items: CartItem[]): string {
  const lines = items.map(
    (item) =>
      `- ${item.quantity}x ${item.product.name} x ${item.product.weight} - ${formatPrice(item.product.price * item.quantity)}`
  );

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return `Hola! Quiero hacer un pedido:\n\n${lines.join("\n")}\n\nTotal: ${formatPrice(total)}`;
}

export function getWhatsAppURL(items: CartItem[]): string {
  const message = generateWhatsAppMessage(items);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getCartTotal(items: CartItem[]): number {
  return items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
}

const categorySlugMap: Record<string, string> = {
  "Frutas Secas": "frutas-secas",
  "Frutas Desecadas": "frutas-desecadas",
  "Frutas Azucaradas y Glaseadas": "frutas-azucaradas",
  "Aceite y Salsa": "aceite-y-salsa",
  "Productos La Carmelina": "la-carmelina",
  "Cereales en Copos / Inflados": "cereales",
  "Lasfor S.R.L": "lasfor",
  "Especias": "especias",
  "Productos de Repostería": "reposteria",
  "Productos Con Chocolate y Confites": "chocolate-confites",
  "Maní y Palitos Zyma": "mani-palitos",
  "Productos Copetín Zyma / Criskey": "copetin",
  "Productos Envasados Zyma": "envasados-zyma",
  "Semillas": "semillas",
  "Legumbres": "legumbres",
  "Deshidratados": "deshidratados",
  "Harinas": "harinas",
  "Otros": "otros",
  "Productos Patagonia Grains": "patagonia-grains",
  "Galletitas Secas": "galletitas-secas",
  "Galletitas Dulces": "galletitas-dulces",
  "Panificadora Sarmiento": "panificadora",
};

export function getCategoryImage(category: string): string {
  const slug = categorySlugMap[category] || "otros";
  return `/images/categories/${slug}.jpg`;
}
