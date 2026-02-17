"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatPrice, getCategoryImage } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100">
      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
        <Image
          src={getCategoryImage(item.product.category)}
          alt={item.product.category}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 text-sm truncate">
          {item.product.name}
        </h3>
        <p className="text-xs text-gray-500">
          {item.product.weight} &middot; {formatPrice(item.product.price)} c/u
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.product.ref, item.quantity - 1)}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="w-8 text-center font-semibold text-sm">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.product.ref, item.quantity + 1)}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      <div className="text-right">
        <p className="font-bold text-primary text-sm">
          {formatPrice(item.product.price * item.quantity)}
        </p>
      </div>

      <button
        onClick={() => removeItem(item.product.ref)}
        className="text-gray-400 hover:text-red-500 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
