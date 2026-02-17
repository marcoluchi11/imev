"use client";

import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatPrice, getCategoryImage } from "@/lib/utils";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col overflow-hidden">
      <div className="relative w-full aspect-[4/3] bg-gray-100">
        <Image
          src={getCategoryImage(product.category)}
          alt={product.category}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <div className="flex-1 p-4">
        <span className="text-xs text-gray-400 font-mono">#{product.ref}</span>
        <h3 className="font-semibold text-gray-800 mt-1 text-sm leading-tight">
          {product.name}
        </h3>
        {product.weight && (
          <p className="text-xs text-gray-500 mt-1">{product.weight}</p>
        )}
        <span className="inline-block mt-2 text-xs bg-cream text-primary px-2 py-1 rounded-full">
          {product.category}
        </span>
      </div>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50 px-4 pb-4">
        <span className="text-lg font-bold text-primary">
          {formatPrice(product.price)}
        </span>
        <button
          onClick={handleAdd}
          className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-all ${
            added
              ? "bg-primary-light text-white"
              : "bg-primary text-white hover:bg-primary/90 hover:scale-105"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              Agregado
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Agregar
            </>
          )}
        </button>
      </div>
    </div>
  );
}
