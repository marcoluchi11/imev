"use client";

import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import CheckoutOptions from "@/components/CheckoutOptions";

export default function CarritoPage() {
  const { items, clearCart } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Tu Carrito</h1>
          <p className="text-gray-500">
            {items.length === 0
              ? "No hay productos en tu carrito"
              : `${items.length} producto${items.length > 1 ? "s" : ""} en tu carrito`}
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Vaciar carrito
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-6">
            Tu carrito está vacío
          </p>
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Ver productos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-3">
            {items.map((item) => (
              <CartItem key={item.product.ref} item={item} />
            ))}
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mt-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Seguir comprando
            </Link>
          </div>
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <CheckoutOptions />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
