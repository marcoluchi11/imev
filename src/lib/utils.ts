import { CartItem } from "@/types";

const WHATSAPP_NUMBER = "5493471526765";

// Categorías vendidas por peso (granel)
export const BULK_CATEGORIES = new Set([
  "Frutas Secas",
  "Frutas Desecadas",
  "Frutas Azucaradas y Glaseadas",
  "Semillas",
  "Legumbres",
  "Harinas",
  "Cereales en Copos / Inflados",
  "Deshidratados",
  "Especias",
]);

// Opciones de peso disponibles en gramos
export const WEIGHT_OPTIONS = [
  { grams: 250, label: "250 g" },
  { grams: 500, label: "500 g" },
  { grams: 750, label: "750 g" },
  { grams: 1000, label: "1 kg" },
  { grams: 1500, label: "1.5 kg" },
  { grams: 2000, label: "2 kg" },
];

export function formatWeight(grams: number): string {
  if (grams >= 1000) {
    const kg = grams / 1000;
    return `${kg} kg`;
  }
  return `${grams} g`;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function calculateItemPrice(basePrice: number, selectedWeight?: number): number {
  if (selectedWeight) {
    return basePrice * (selectedWeight / 1000);
  }
  return basePrice;
}

export function generateWhatsAppMessage(items: CartItem[]): string {
  const lines = items.map((item) => {
    const unitPrice = calculateItemPrice(item.product.price, item.selectedWeight);
    const weightInfo = item.selectedWeight
      ? formatWeight(item.selectedWeight)
      : item.product.weight;
    return `- ${item.quantity}x ${item.product.name} (${weightInfo}) - ${formatPrice(unitPrice * item.quantity)}`;
  });

  const total = items.reduce((sum, item) => {
    const unitPrice = calculateItemPrice(item.product.price, item.selectedWeight);
    return sum + unitPrice * item.quantity;
  }, 0);

  return `Hola! Quiero hacer un pedido:\n\n${lines.join("\n")}\n\nTotal: ${formatPrice(total)}`;
}

export function getWhatsAppURL(items: CartItem[]): string {
  const message = generateWhatsAppMessage(items);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const unitPrice = calculateItemPrice(item.product.price, item.selectedWeight);
    return sum + unitPrice * item.quantity;
  }, 0);
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

// p() = helper para imágenes en /images/products/
const p = (name: string) => `/images/products/${name}`;
// c() = helper para imágenes en /images/categories/
const c = (name: string) => `/images/categories/${name}`;

// Mapa de palabras clave → imagen específica del producto.
// Las claves más largas se evalúan primero (más específicas ganan).
const productImageMap: [string, string][] = [
  // ── Frutas Secas ──────────────────────────────────────────────────────────
  ["maní con cáscara",           p("mani-cascara.jpg")],
  ["mani con cascara",           p("mani-cascara.jpg")],
  ["pistach",                    p("pistachos.jpg")],
  ["cajú",                       p("caju.jpg")],
  ["caju",                       p("caju.jpg")],
  ["avellana",                   p("avellanas.jpg")],
  ["castaña",                    p("caju.jpg")],        // castañas de cajú = caju
  ["almendra con chocolate",     p("almendras-chocolate.jpg")],
  ["almendra",                   c("almendras.jpg")],
  ["nuez con chocolate",         p("nuez-chocolate.jpg")],
  ["nuez",                       c("nueces.jpg")],
  ["maní crudo",                 p("mani-crudo.jpg")],
  ["mani crudo",                 p("mani-crudo.jpg")],
  ["mix de frutos secos premium", p("mix-premium.jpg")],
  ["mix premium",                p("mix-premium.jpg")],
  ["mix",                        p("mix-frutos-secos.jpg")],

  // ── Frutas Desecadas ──────────────────────────────────────────────────────
  ["arándano",                   p("arandanos.jpg")],
  ["arandano",                   p("arandanos.jpg")],
  ["ciruela",                    p("ciruelas.jpg")],
  ["dátil",                      p("datiles.jpg")],
  ["datil",                      p("datiles.jpg")],
  ["higo",                       p("higos.jpg")],
  ["durazno",                    p("durazno-desecado.jpg")],
  ["pasa de uva",                p("pasas-uva.jpg")],
  ["pasas de uva",               p("pasas-uva.jpg")],
  ["pera",                       p("peras-desecadas.jpg")],
  ["tropical",                   p("mix-tropical.jpg")],
  ["compota",                    p("mix-compota.jpg")],

  // ── Frutas Azucaradas ─────────────────────────────────────────────────────
  ["banana chip",                p("banana-chips.jpg")],
  ["banana con chocolate",       p("banana-chocolate.jpg")],
  ["papaya",                     p("papaya.jpg")],
  ["fruta nevada",               p("fruta-nevada.jpg")],
  ["fruta glaseada",             p("fruta-glaseada.jpg")],

  // ── Semillas ──────────────────────────────────────────────────────────────
  ["chía",                       p("chia.jpg")],
  ["chia",                       p("chia.jpg")],
  ["girasol",                    p("girasol.jpg")],
  ["lino",                       p("lino.jpg")],
  ["quinoa inflada",             p("quinoa-inflada.jpg")],
  ["quinoa",                     p("quinoa.jpg")],
  ["sésamo negro",               p("sesamo-negro.jpg")],
  ["sesamo negro",               p("sesamo-negro.jpg")],
  ["sésamo",                     p("sesamo-blanco.jpg")],
  ["sesamo",                     p("sesamo-blanco.jpg")],
  ["amaranto",                   p("amaranto.jpg")],
  ["zapallo",                    p("zapallo-semillas.jpg")],
  ["mijo",                       p("mijo.jpg")],
  ["amapola",                    p("amapola.jpg")],

  // ── Legumbres y Arroces ───────────────────────────────────────────────────
  ["arroz negro",                p("arroz-negro.jpg")],
  ["arroz inflado",              p("arroz-inflado.jpg")],
  ["arroz",                      p("arroz-integral.jpg")],
  ["lenteja",                    p("lentejas.jpg")],
  ["lentejón",                   p("lentejas.jpg")],
  ["garbanzo",                   p("garbanzos.jpg")],
  ["arveja",                     p("arveja.jpg")],
  ["cebada",                     p("cebada.jpg")],
  ["lupine",                     p("lupines.jpg")],
  ["maíz pisingallo",            p("maiz-pisingallo.jpg")],
  ["poroto",                     p("porotos.jpg")],
  ["trigo sarraceno",            p("trigo-sarraceno.jpg")],

  // ── Especias ──────────────────────────────────────────────────────────────
  ["cúrcuma",                    p("curcuma.jpg")],
  ["curcuma",                    p("curcuma.jpg")],
  ["canela",                     p("canela.jpg")],
  ["curry",                      p("curry.jpg")],
  ["orégano",                    p("oregano.jpg")],
  ["oregano",                    p("oregano.jpg")],
  ["paprika",                    p("paprika.jpg")],
  ["pimentón",                   p("paprika.jpg")],
  ["pimienta",                   p("pimienta-negra.jpg")],
  ["ají molido",                 p("aji-molido.jpg")],
  ["aji molido",                 p("aji-molido.jpg")],
  ["jengibre",                   p("jengibre.jpg")],
  ["comino",                     p("comino.jpg")],
  ["nuez moscada",               p("nuez-moscada.jpg")],
  ["sal del himalaya",           p("sal-himalaya.jpg")],
  ["sal himalaya",               p("sal-himalaya.jpg")],
  ["sal marina",                 p("sal-marina.jpg")],
  ["romero",                     p("romero.jpg")],
  ["tomillo",                    p("tomillo.jpg")],
  ["albahaca",                   p("albahaca.jpg")],

  // ── Harinas y Cereales ────────────────────────────────────────────────────
  ["harina de almendras",        p("harina-almendras.jpg")],
  ["harina almendra",            p("harina-almendras.jpg")],
  ["harina de coco",             p("harina-coco.jpg")],
  ["harina de garbanzo",         p("harina-garbanzo.jpg")],
  ["harina de arroz",            p("harina-arroz.jpg")],
  ["harina de centeno",          p("harina-centeno.jpg")],
  ["harina integral",            p("harina-integral.jpg")],
  ["salvado de trigo",           p("salvado-trigo.jpg")],
  ["salvado de avena",           p("avena.jpg")],
  ["salvado",                    p("salvado-trigo.jpg")],
  ["avena",                      p("avena.jpg")],
  ["germen de trigo",            p("germen-trigo.jpg")],
  ["coco rallado",               p("coco-rallado.jpg")],
  ["coco en escamas",            p("coco-rallado.jpg")],
  ["soja texturizada",           p("soja-texturizada.jpg")],
  ["copos de maíz",              p("copos-maiz.jpg")],
  ["copos de maiz",              p("copos-maiz.jpg")],
  ["maíz inflado",               p("copos-maiz.jpg")],
  ["maiz inflado",               p("copos-maiz.jpg")],

  // ── Repostería ────────────────────────────────────────────────────────────
  ["cacao",                      p("cacao.jpg")],
  ["azúcar integral",            p("azucar-integral.jpg")],
  ["azucar integral",            p("azucar-integral.jpg")],

  // ── Chocolates y Confites ─────────────────────────────────────────────────
  ["maní con chocolate",         p("mani-chocolate.jpg")],
  ["mani con chocolate",         p("mani-chocolate.jpg")],
  ["maní japones",               p("mani-chocolate.jpg")],
  ["garrapiñada",                p("garrapinada.jpg")],
  ["garrapinada",                p("garrapinada.jpg")],
  ["lentejas de chocolate",      p("lentejas-chocolate.jpg")],

  // ── Aceites y Otros ───────────────────────────────────────────────────────
  ["aceite de coco",             p("aceite-coco.jpg")],
  ["aceite de oliva",            p("aceite-oliva.jpg")],
  ["aceite de oliva",            p("aceite-oliva.jpg")],
  ["aceituna negra",             p("aceitunas-negras.jpg")],
  ["aceitunas negras",           p("aceitunas-negras.jpg")],
  ["aceituna verde",             p("aceitunas-verdes.jpg")],
  ["aceitunas verdes",           p("aceitunas-verdes.jpg")],
  ["miel",                       p("miel.jpg")],
  ["pasta maní",                 p("pasta-mani.jpg")],
  ["pasta mani",                 p("pasta-mani.jpg")],
  ["hongos secos",               p("hongos-secos.jpg")],
  ["tomates secos",              p("tomates-secos.jpg")],
  ["granola",                    p("granola.jpg")],
];

export function getProductImage(productName: string, category: string): string {
  const nameLower = productName.toLowerCase();
  // Las entradas ya están ordenadas de más específica a menos específica
  for (const [keyword, image] of productImageMap) {
    if (nameLower.includes(keyword.toLowerCase())) {
      return image;
    }
  }
  return getCategoryImage(category);
}
