"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatPrice, getProductImage, formatWeight, calculateItemPrice } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const unitPrice = calculateItemPrice(item.product.price, item.selectedWeight);
  const weightInfo = item.selectedWeight
    ? formatWeight(item.selectedWeight)
    : item.product.weight;

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100">
      {/* Fila superior: imagen + nombre + eliminar */}
      <div className="flex items-start gap-3 mb-3">
        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
          <Image
            src={getProductImage(item.product.name, item.product.category)}
            alt={item.product.name}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <h3 className="flex-1 font-semibold text-gray-800 text-sm leading-snug">
          {item.product.name}
        </h3>
        <button
          onClick={() => removeItem(item.id)}
          className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0 ml-1"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Fila inferior: peso/precio unitario + controles + total */}
      <div className="flex items-center justify-between gap-2 pl-15">
        <p className="text-xs text-gray-500">
          {weightInfo} &middot; {formatPrice(unitPrice)} c/u
        </p>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-6 text-center font-semibold text-sm">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        <p className="font-bold text-primary text-sm w-20 text-right">
          {formatPrice(unitPrice * item.quantity)}
        </p>
      </div>
    </div>
  );
}
