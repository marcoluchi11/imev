import { MapPin, Phone, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">IMEV Frutos Secos</h3>
            <p className="text-white/80 text-sm">
              Frutos secos, especias, harinas y mucho más. Calidad y variedad
              desde Armstrong, Santa Fe.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <div className="space-y-3">
              <a
                href="https://wa.me/5493471526765"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                +54 9 3471 52-6765
              </a>
              <a
                href="tel:+5493471526765"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                +54 9 3471 52-6765
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Ubicación</h3>
            <div className="flex items-start gap-2 text-white/80 text-sm">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Armstrong, Santa Fe, Argentina</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
          <p>&copy; {new Date().getFullYear()} IMEV Frutos Secos. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
