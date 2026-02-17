import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-primary-light/30 blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            IMEV
            <br />
            <span className="text-primary-light">Frutos Secos</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Frutos secos, especias y más desde Armstrong, Santa Fe. Calidad y
            variedad al mejor precio.
          </p>
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 bg-primary-light hover:bg-primary-light/90 text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
          >
            Ver productos
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
