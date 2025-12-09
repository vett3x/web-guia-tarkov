import Link from "next/link";
import { Map, ScrollText, Shield, Github, Heart, Mail, Users, Globe, LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

interface FooterLink {
  name: string;
  href: string;
  icon?: LucideIcon;
}

export function Footer() {
  const footerLinks: Record<string, FooterLink[]> = {
    Guías: [
      { name: "Mapas", href: "/mapas", icon: Map },
      { name: "Misiones", href: "/misiones", icon: ScrollText },
      { name: "Comerciantes", href: "/comerciantes", icon: Shield },
    ],
    Recursos: [
      { name: "Armas y Munición", href: "#" },
      { name: "Equipamiento", href: "#" },
      { name: "Balística", href: "#" },
      { name: "Salud", href: "#" },
      { name: "Escondite", href: "#" },
    ],
    Comunidad: [
      { name: "Discord", href: "#", icon: Users },
      { name: "Contribuir (GitHub)", href: "#", icon: Github },
      { name: "Reportar Error", href: "#" },
      { name: "Sugerir Guía", href: "#" },
    ],
    Legal: [
      { name: "Aviso Legal", href: "#" },
      { name: "Política de Privacidad", href: "#" },
      { name: "Términos de Uso", href: "#" },
      { name: "Cookies", href: "#" },
    ]
  };

  return (
    <footer className="border-t bg-card/50 backdrop-blur-sm mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-lg font-bold mb-4 text-primary flex items-center gap-2">
                {category === "Comunidad" && <Users className="h-4 w-4" />}
                {category === "Guías" && <Map className="h-4 w-4" />}
                {category === "Legal" && <Shield className="h-4 w-4" />}
                {category === "Recursos" && <Globe className="h-4 w-4" />}
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      {link.icon && <link.icon className="h-3 w-3" />}
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Newsletter */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="text-lg font-bold mb-4 text-primary">Suscríbete</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Recibe actualizaciones de guías, parches y contenido exclusivo.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background"
              />
              <Button className="w-full bg-primary hover:bg-primary/90">
                Suscribirse
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-primary">TARKOV</div>
              <div className="text-xs text-muted-foreground">GUÍA EN ESPAÑOL</div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-1">
              Hecho con <Heart className="h-3 w-3 text-red-500 fill-red-500" /> por la comunidad de Tarkov en español
            </p>
            <p className="mt-2">
              &copy; {new Date().getFullYear()} Tarkov Guía ES. Esta es una guía no oficial para Escape from Tarkov. 
              Todas las marcas y derechos pertenecen a sus respectivos propietarios.
            </p>
            <p className="mt-2 text-xs">
              BattleState Games Limited no respalda ni está afiliado a este proyecto.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}