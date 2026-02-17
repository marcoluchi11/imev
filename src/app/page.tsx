import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import { ShoppingCart, Package, Truck } from "lucide-react";
import products from "@/data/products.json";
import { Product } from "@/types";

const typedProducts = products as Product[];

function getCategoryCounts() {
  const counts: Record<string, number> = {};
  for (const product of typedProducts) {
    if (product.price > 0) {
      counts[product.category] = (counts[product.category] || 0) + 1;
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
}

const steps = [
  {
    icon: ShoppingCart,
    title: "Elegí tus productos",
    description: "Explorá nuestro catálogo y agregá lo que necesites al carrito",
  },
  {
    icon: Package,
    title: "Armá tu pedido",
    description: "Revisá tu carrito, ajustá cantidades y confirmá tu pedido",
  },
  {
    icon: Truck,
    title: "Te lo enviamos",
    description: "Recibí tu pedido en tu domicilio o retiralo en Armstrong",
  },
];

export default function Home() {
  const categories = getCategoryCounts();

  return (
    <>
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
          Nuestras Categorías
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map(({ name, count }) => (
            <CategoryCard key={name} name={name} count={count} />
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 text-center">
            ¿Cómo comprar?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
