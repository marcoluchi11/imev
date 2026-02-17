"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, Nut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Header() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Nut className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-primary">
              IMEV <span className="font-normal text-gray-600">Frutos Secos</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              Inicio
            </Link>
            <Link
              href="/productos"
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              Productos
            </Link>
            <Link
              href="/carrito"
              className="relative text-gray-600 hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-light text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            <Link href="/carrito" className="relative text-gray-600">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-light text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            <nav className="flex flex-col gap-2 pt-4">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-primary hover:bg-cream rounded-lg transition-colors"
              >
                Inicio
              </Link>
              <Link
                href="/productos"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-primary hover:bg-cream rounded-lg transition-colors"
              >
                Productos
              </Link>
              <Link
                href="/carrito"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-primary hover:bg-cream rounded-lg transition-colors"
              >
                Carrito
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
