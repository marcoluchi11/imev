import Image from "next/image";
import Link from "next/link";
import {
  Nut,
  Cherry,
  Candy,
  Droplets,
  Amphora,
  Wheat,
  Cookie,
  Flame,
  CakeSlice,
  IceCreamCone,
  Popcorn,
  Salad,
  Bean,
  Leaf,
  FlaskConical,
  Package,
  Croissant,
  CircleDot,
  Star,
  Sandwich,
  type LucideIcon,
} from "lucide-react";
import { getCategoryImage } from "@/lib/utils";

const categoryIcons: Record<string, LucideIcon> = {
  "Frutas Secas": Nut,
  "Frutas Desecadas": Cherry,
  "Frutas Azucaradas y Glaseadas": Candy,
  "Aceite y Salsa": Droplets,
  "Productos La Carmelina": Amphora,
  "Cereales en Copos / Inflados": Wheat,
  "Lasfor S.R.L": Cookie,
  Especias: Flame,
  "Productos de Repostería": CakeSlice,
  "Productos Con Chocolate y Confites": IceCreamCone,
  "Maní y Palitos Zyma": Popcorn,
  "Productos Copetín Zyma / Criskey": Salad,
  "Productos Envasados Zyma": Package,
  Semillas: Bean,
  Legumbres: Leaf,
  Deshidratados: FlaskConical,
  Harinas: CircleDot,
  Otros: Star,
  "Productos Patagonia Grains": Croissant,
  "Galletitas Secas": Sandwich,
  "Galletitas Dulces": Cookie,
  "Panificadora Sarmiento": Croissant,
};

interface CategoryCardProps {
  name: string;
  count: number;
}

export default function CategoryCard({ name, count }: CategoryCardProps) {
  const Icon = categoryIcons[name] || Nut;

  return (
    <Link
      href={`/productos?categoria=${encodeURIComponent(name)}`}
      className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100 overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={getCategoryImage(name)}
          alt={name}
          fill
          className="object-cover opacity-10 group-hover:opacity-20 transition-opacity"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <div className="relative z-10">
        <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-light/10 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="font-semibold text-gray-800 mb-1 text-sm">{name}</h3>
        <p className="text-xs text-gray-500">{count} productos</p>
      </div>
    </Link>
  );
}
