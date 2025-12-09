import Link from "next/link";
import { Twitch, Instagram, X, MessageCircle, Youtube, MonitorPlay, ExternalLink, Heart } from "lucide-react";
import { ThemedContainer } from "./themed-container";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface SocialLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  description?: string;
  className?: string;
  followers?: string;
  isPrimary?: boolean;
}

const SocialLink: React.FC<SocialLinkProps> = ({ 
  href, 
  icon: Icon, 
  label, 
  description, 
  className,
  followers,
  isPrimary = false
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "group flex items-start justify-between p-6 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden",
      isPrimary 
        ? "border-primary/50 hover:border-primary bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-2xl hover:shadow-primary/20"
        : "border-border/50 hover:border-primary/30 bg-gradient-to-br from-card to-secondary/30",
      className
    )}
  >
    {isPrimary && (
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent"></div>
    )}
    
    <div className="flex items-start space-x-4 flex-1">
      <div className="relative">
        <div className={cn(
          "absolute inset-0 rounded-full blur-sm group-hover:blur-md transition-all duration-300",
          isPrimary ? "bg-primary/20" : "bg-primary/10"
        )}></div>
        <Icon className={cn(
          "relative z-10 transition-transform duration-300 group-hover:scale-110",
          isPrimary ? "h-10 w-10 text-primary" : "h-8 w-8 text-primary"
        )} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className={cn(
            "font-bold",
            isPrimary ? "text-xl text-primary" : "text-lg font-semibold text-primary"
          )}>{label}</div>
          {isPrimary && (
            <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full font-bold">
              EN VIVO
            </span>
          )}
        </div>
        {description && (
          <div className={cn(
            "mt-1",
            isPrimary ? "text-primary/80 font-medium" : "text-sm text-muted-foreground"
          )}>{description}</div>
        )}
        {followers && (
          <div className={cn(
            "mt-2 font-medium",
            isPrimary ? "text-primary/70" : "text-xs text-primary/60"
          )}>
            <Heart className="inline h-3 w-3 mr-1 fill-current" />
            {followers} seguidores
          </div>
        )}
      </div>
    </div>
    <ExternalLink className={cn(
      "transition-all",
      isPrimary 
        ? "h-5 w-5 text-primary group-hover:translate-x-1" 
        : "h-4 w-4 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100"
    )} />
  </a>
);

export function SocialsSection() {
  const primarySocialLinks = [
    { 
      href: "https://twitch.tv/tu_canal", 
      icon: Twitch, 
      label: "TWITCH", 
      description: "Streams en vivo de Tarkov todos los días",
      followers: "3,500+",
      isPrimary: true
    },
    { 
      href: "https://kick.com/tu_canal", 
      icon: MonitorPlay, 
      label: "KICK", 
      description: "Streams alternativos y contenido exclusivo",
      followers: "1,200+",
      isPrimary: true
    }
  ];

  const secondarySocialLinks = [
    { 
      href: "https://youtube.com/tu_canal", 
      icon: Youtube, 
      label: "YouTube", 
      description: "Guías completas y gameplays",
      followers: "5,800+" 
    },
    { 
      href: "https://discord.gg/tu_invitacion", 
      icon: MessageCircle, 
      label: "Discord Oficial", 
      description: "Comunidad activa y ayuda en directo",
      followers: "2,100+" 
    },
    { 
      href: "https://instagram.com/tu_perfil", 
      icon: Instagram, 
      label: "Instagram", 
      description: "Contenido diario y behind the scenes",
      followers: "8,900+" 
    },
    { 
      href: "https://x.com/tu_perfil", 
      icon: X, 
      label: "X (Twitter)", 
      description: "Actualizaciones y noticias al instante",
      followers: "5,400+" 
    },
  ];

  return (
    <div className="space-y-8">
      <ThemedContainer title="SÍGUEME EN VIVO" className="border-4 border-primary/30">
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-primary mb-2">¡Conéctate conmigo en directo!</h3>
            <p className="text-muted-foreground">
              Streams diarios de Tarkov, guías en vivo, y la mejor comunidad en español.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {primarySocialLinks.map((link) => (
              <SocialLink key={link.label} {...link} />
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-border/50">
            <Button className="bg-primary hover:bg-primary/90 px-8 py-3 text-lg font-bold">
              <Twitch className="mr-2 h-5 w-5" />
              Seguir en Twitch
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-3 text-lg font-bold">
              <MonitorPlay className="mr-2 h-5 w-5" />
              Seguir en Kick
            </Button>
          </div>
        </div>
      </ThemedContainer>

      <ThemedContainer title="MÁS REDES SOCIALES" className="border-2 border-border/50">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            También puedes encontrarme en estas plataformas:
          </p>
          <div className="space-y-3">
            {secondarySocialLinks.map((link) => (
              <SocialLink key={link.label} {...link} />
            ))}
          </div>
        </div>
      </ThemedContainer>

      <ThemedContainer title="PRÓXIMOS STREAMS" className="border-2 border-primary/20">
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20 rounded-lg p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="font-bold text-primary">EN VIVO AHORA</span>
                </div>
                <h4 className="text-xl font-bold text-primary">Wipe Day Strategies - Guía Completa</h4>
                <p className="text-muted-foreground mt-2">
                  Estrategias para el primer día de wipe con loot routes y builds económicas
                </p>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                <Twitch className="mr-2 h-4 w-4" />
                Ver Ahora
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-border/50 rounded-lg p-4 hover:border-primary/30 transition-colors">
              <div className="text-sm text-muted-foreground">Próximo Stream</div>
              <div className="font-bold text-primary mt-1">Guía Customs 2024</div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-primary/70">Hoy • 19:00 UTC</span>
                <Button variant="outline" size="sm" className="text-xs">
                  Recordatorio
                </Button>
              </div>
            </div>
            <div className="border border-border/50 rounded-lg p-4 hover:border-primary/30 transition-colors">
              <div className="text-sm text-muted-foreground">Mañana</div>
              <div className="font-bold text-primary mt-1">Arena Tarkov Tournament</div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-primary/70">18:00 UTC</span>
                <Button variant="outline" size="sm" className="text-xs">
                  Recordatorio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ThemedContainer>
    </div>
  );
}