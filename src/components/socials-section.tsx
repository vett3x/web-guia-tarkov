import Link from "next/link";
import { Twitch, Instagram, X, MessageCircle, Youtube, MonitorPlay, ExternalLink } from "lucide-react";
import { ThemedContainer } from "./themed-container";
import { cn } from "@/lib/utils";

interface SocialLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  description?: string;
  className?: string;
  followers?: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ 
  href, 
  icon: Icon, 
  label, 
  description, 
  className,
  followers 
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "group flex items-start justify-between p-4 rounded-lg border-2 border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card to-secondary/30",
      className
    )}
  >
    <div className="flex items-start space-x-3">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
        <Icon className="h-8 w-8 text-primary relative z-10 group-hover:scale-110 transition-transform" />
      </div>
      <div>
        <div className="font-semibold text-primary group-hover:text-primary/90">{label}</div>
        {description && (
          <div className="text-xs text-muted-foreground mt-1">{description}</div>
        )}
        {followers && (
          <div className="text-xs text-primary/70 mt-1 font-medium">{followers} seguidores</div>
        )}
      </div>
    </div>
    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
  </a>
);

export function SocialsSection() {
  const socialLinks = [
    { 
      href: "https://twitch.tv/tu_canal", 
      icon: Twitch, 
      label: "Twitch", 
      description: "Streams en vivo de Tarkov",
      followers: "3.5K" 
    },
    { 
      href: "https://kick.com/tu_canal", 
      icon: MonitorPlay, 
      label: "Kick", 
      description: "Streams alternativos",
      followers: "1.2K" 
    },
    { 
      href: "https://instagram.com/tu_perfil", 
      icon: Instagram, 
      label: "Instagram", 
      description: "Contenido diario y tips",
      followers: "8.9K" 
    },
    { 
      href: "https://x.com/tu_perfil", 
      icon: X, 
      label: "X (Twitter)", 
      description: "Actualizaciones y noticias",
      followers: "5.4K" 
    },
    { 
      href: "https://discord.gg/tu_invitacion", 
      icon: MessageCircle, 
      label: "Discord Oficial", 
      description: "Comunidad y ayuda en directo",
      followers: "2.1K" 
    },
  ];

  return (
    <div className="space-y-6">
      <ThemedContainer title="REDES SOCIALES Y COMUNIDAD">
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground mb-2">Conéctate con la comunidad</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Síguenos en nuestras redes para contenido exclusivo, streams en vivo y la mejor comunidad de Tarkov en español.
          </p>
          <div className="space-y-3">
            {socialLinks.map((link) => (
              <SocialLink key={link.label} {...link} />
            ))}
          </div>
        </div>
      </ThemedContainer>

      <ThemedContainer title="CONTENIDO DESTACADO">
        <div className="space-y-4">
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/20 rounded-lg overflow-hidden group hover:border-primary/40 transition-all duration-300">
            <div className="h-2/3 bg-gradient-to-r from-primary/30 to-primary/10 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Youtube className="h-16 w-16 text-red-500/80 group-hover:text-red-500 transition-colors" />
              </div>
              <div className="absolute bottom-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                EN VIVO
              </div>
            </div>
            <div className="p-4">
              <h5 className="font-bold text-primary">Stream en vivo: Wipe Day Strategies</h5>
              <p className="text-xs text-muted-foreground mt-1">
                Estrategias para el primer día de wipe con loot routes y builds económicas
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-primary/70">Hoy • 19:00 UTC</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Próximo</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-border/50 rounded-lg p-3 hover:border-primary/30 transition-colors">
              <div className="text-xs text-muted-foreground">Video más visto</div>
              <div className="font-medium text-sm mt-1">Guía Customs 2024</div>
              <div className="flex items-center gap-1 text-xs text-primary/70 mt-1">
                <Youtube className="h-3 w-3" />
                15K vistas
              </div>
            </div>
            <div className="border border-border/50 rounded-lg p-3 hover:border-primary/30 transition-colors">
              <div className="text-xs text-muted-foreground">Último tutorial</div>
              <div className="font-medium text-sm mt-1">Aim Training</div>
              <div className="flex items-center gap-1 text-xs text-primary/70 mt-1">
                <MonitorPlay className="h-3 w-3" />
                8K vistas
              </div>
            </div>
          </div>
        </div>
      </ThemedContainer>
    </div>
  );
}