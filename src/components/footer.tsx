import Link from "next/link";
import { Map, ScrollText, Shield, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground mt-12">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Navegación</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/mapas" className="hover:text-primary transition-colors flex items-center gap-2"><Map className="h-4 w-4" /> Mapas</Link></li>
              <li><Link href="/misiones" className="hover:text-primary transition-colors flex items-center gap-2"><ScrollText className="h-4 w-4" /> Encargos</Link></li>
              <li><Link href="/comerciantes" className="hover:text-primary transition-colors flex items-center gap-2"><Shield className="h-4 w-4" /> Comerciantes</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Recursos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Armas</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Munición</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Objetos de Intercambio</a></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-primary">Comunidad</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><Github className="h-4 w-4" /> Contribuir (GitHub)</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Tarkov Guía ES. Esta es una guía no oficial.
        </div>
      </div>
    </footer>
  );
}