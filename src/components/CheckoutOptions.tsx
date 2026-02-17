"use client";

import { MessageCircle, CreditCard, AlertCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getWhatsAppURL, formatPrice } from "@/lib/utils";
import { useState } from "react";

export default function CheckoutOptions() {
  const { items, totalPrice } = useCart();
  const [loadingMP, setLoadingMP] = useState(false);
  const [mpError, setMpError] = useState("");

  const handleWhatsApp = () => {
    const url = getWhatsAppURL(items);
    window.open(url, "_blank");
  };

  const handleMercadoPago = async () => {
    setLoadingMP(true);
    setMpError("");
    try {
      const response = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            title: `${item.product.name} ${item.product.weight}`,
            quantity: item.quantity,
            unit_price: item.product.price,
            currency_id: "ARS",
          })),
        }),
      });

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        setMpError(data.error || "No se pudo crear el pago. Verificá la configuración de MercadoPago.");
      }
    } catch {
      setMpError("Error al conectar con MercadoPago. Intentá de nuevo más tarde.");
    } finally {
      setLoadingMP(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-600 font-medium">Total del pedido</span>
          <span className="text-2xl font-bold text-primary">
            {formatPrice(totalPrice)}
          </span>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleWhatsApp}
            className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] shadow-sm"
          >
            <MessageCircle className="w-5 h-5" />
            Enviar pedido por WhatsApp
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-400">o</span>
            </div>
          </div>

          <button
            onClick={handleMercadoPago}
            disabled={loadingMP}
            className="w-full flex items-center justify-center gap-3 bg-[#009EE3] hover:bg-[#0087C9] text-white font-semibold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CreditCard className="w-5 h-5" />
            {loadingMP ? "Creando pago..." : "Pagar con MercadoPago"}
          </button>

          {mpError && (
            <div className="flex items-start gap-2 text-amber-600 bg-amber-50 rounded-lg p-3 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{mpError}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
