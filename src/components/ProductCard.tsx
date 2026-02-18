"use client";

import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import {
  formatPrice,
  getProductImage,
  BULK_CATEGORIES,
  WEIGHT_OPTIONS,
  calculateItemPrice,
} from "@/lib/utils";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const isBulk = BULK_CATEGORIES.has(product.category);
  const [selectedWeight, setSelectedWeight] = useState(500); // default 500g

  const handleAdd = () => {
    addItem(product, isBulk ? selectedWeight : undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const itemPrice = isBulk
    ? calculateItemPrice(product.price, selectedWeight)
    : product.price;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col overflow-hidden">
      <div className="relative w-full aspect-[4/3] bg-gray-100">
        <Image
          src={getProductImage(product.name, product.category)}
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
        {product.weight && !isBulk && (
          <p className="text-xs text-gray-500 mt-1">{product.weight}</p>
        )}
        <span className="inline-block mt-2 text-xs bg-cream text-primary px-2 py-1 rounded-full">
          {product.category}
        </span>

        {isBulk && (
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-1.5">Cantidad:</p>
            <div className="flex flex-wrap gap-1">
              {WEIGHT_OPTIONS.map((opt) => (
                <button
                  key={opt.grams}
                  onClick={() => setSelectedWeight(opt.grams)}
                  className={`text-xs px-2 py-1 rounded-full border transition-all ${
                    selectedWeight === opt.grams
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-600 border-gray-200 hover:border-primary"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-50 px-4 pb-4">
        <div>
          <span className="text-lg font-bold text-primary">
            {formatPrice(itemPrice)}
          </span>
          {isBulk && (
            <p className="text-xs text-gray-400 leading-none mt-0.5">
              {formatPrice(product.price)}/kg
            </p>
          )}
        </div>
        <button
          onClick={handleAdd}
          className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-all ${
            added
              ? "bg-green-500 text-white"
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
