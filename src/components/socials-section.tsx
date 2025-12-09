import Link from "next/link";
import { Twitch, Instagram, X, MessageCircle, Youtube, MonitorPlay, ExternalLink, Heart, Star, Users, AlertCircle } from "lucide-react";
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
  isLive?: boolean;
}

const SocialLink: React.FC<SocialLinkProps> = ({ 
  href, 
  icon: Icon, 
  label, 
  description, 
  className,
  followers,
  isPrimary = false,
  isLive = false
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "group flex items-start justify-between p-6 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden",
      isPrimary 
        ? "border-primary hover:border-primary bg-gradient-to-br from-primary/15 to-primary/5 hover:shadow-2xl hover:shadow-primary/30"
        : "border-border/50 hover:border-primary/30 bg-gradient-to-br from-card to-secondary/30",
      className
    )}
  >
    {isLive && (
      <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 animate-pulse">
        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        LIVE
      </div>
    )}
    
    <div className="flex items-start space-x-4 flex-1">
      <div className="relative">
        <div className={cn(
          "absolute inset-0 rounded-full blur-sm group-hover:blur-md transition-all duration-300",
          isPrimary ? "bg-primary/30" : "bg-primary/20"
        )}></div>
        <Icon className={cn(
          "relative z-10 transition-transform duration-300 group-hover:scale-110",
          isPrimary ? "h-12 w-12 text-primary" : "h-8 w-8 text-primary"
        )} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className={cn(
            "font-bold tracking-wider",
            isPrimary ? "text-2xl text-primary" : "text-lg font-semibold text-primary"
          )}>{label}</div>
          {isPrimary && (
            <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full font-bold">
              PRIORIDAD
            </span>
          )}
        </div>
        {description && (
          <div className={cn(
            "mt-2",
            isPrimary ? "text-primary/90 font-medium text-base" : "text-sm text-muted-foreground"
          )}>{description}</div>
        )}
        {followers && (
          <div className={cn(
            "mt-3 font-bold flex items-center",
            isPrimary ? "text-primary/90 text-base" : "text-xs text-primary/70"
          )}>
            <Users className="inline h-4 w-4 mr-2 fill-current" />
            {followers} seguidores
          </div>
        )}
      </div>
    </div>
    <ExternalLink className={cn(
      "transition-all mt-4",
      isPrimary 
        ? "h-6 w-6 text-primary group-hover:translate-x-1" 
        : "h-5 w-5 text-muted-foreground group-hover:text-primary"
    )} />
  </a>
);

export function SocialsSection() {
  const primarySocialLinks = [
    { 
      href: "https://twitch.tv/tu_canal", 
      icon: Twitch, 
      label: "TWITCH", 
      description: "Streams diarios de Tarkov • Guías en vivo • Comunidad activa",
      followers: "3,500+ SEGUIDORES",
      isPrimary: true,
      isLive: true
    },
    { 
      href: "https://kick.com/tu_canal", 
      icon: MonitorPlay, 
      label: "KICK", 
      description: "Streams alternativos • Contenido exclusivo • Sin restricciones",
      followers: "1,200+ SEGUIDORES",
      isPrimary: true,
      isLive: false
    }
  ];

  const secondarySocialLinks = [
    { 
      href: "https://youtube.com/tu_canal", 
      icon: Youtube, 
      label: "YouTube", 
      description: "Guías completas y gameplays en video",
      followers: "5,800+ SUSCRIPTORES" 
    },
    { 
      href: "https://discord.gg/tu_invitacion", 
      icon: MessageCircle, 
      label: "Discord Oficial", 
      description: "Comunidad activa y ayuda en directo",
      followers: "2,100+ MIEMBROS" 
    },
    { 
      href: "https://instagram.com/tu_perfil", 
      icon: Instagram, 
      label: "Instagram", 
      description: "Contenido diario y behind the scenes",
      followers: "8,900+ SEGUIDORES" 
    },
    { 
      href: "https://x.com/tu_perfil", 
      icon: X, 
      label: "X (Twitter)", 
      description: "Actualizaciones y noticias al instante",
      followers: "5,400+ SEGUIDORES" 
    },
  ];

  return (
    <div className="space-y-8">
      {/* CABECERA DESTACADA */}
      <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 border-4 border-primary/40 rounded-2xl p-8 text-center shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
          <div className="bg-primary/20 p-4 rounded-full">
            <Star className="h-12 w-12 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">¡SÍGUEME EN MIS REDES!</h1>
            <p className="text-xl text-primary/80 font-medium">
              Todo el contenido de Tarkov en español • Streams diarios • Guías exclusivas
            </p>
          </div>
          <div className="bg-primary/20 p-4 rounded-full">
            <Users className="h-12 w-12 text-primary" />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
            <AlertCircle className="h-5 w-5 text-primary" />
            <span className="font-bold text-primary">ESTRATEGIA PRINCIPAL: SIGUE EN TWITCH Y KICK</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Tu apoyo directo en estas plataformas me ayuda a crear más contenido
          </div>
        </div>
      </div>

      {/* PLATAFORMAS PRINCIPALES */}
      <ThemedContainer title="PLATAFORMAS PRINCIPALES" className="border-4 border-primary/40 shadow-xl">
        <div className="space-y-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-primary mb-4">¡DONDE HAGO STREAM DIARIO!</h3>
            <p className="text-lg text-muted-foreground">
              Estas son mis plataformas principales donde hago contenido en vivo regularmente
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {primarySocialLinks.map((link) => (
              <SocialLink key={link.label} {...link} />
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 border-t border-border/50">
            <Button className="bg-purple-600 hover:bg-purple-700 px-10 py-4 text-xl font-bold shadow-lg">
              <Twitch className="mr-3 h-6 w-6" />
              SEGUIR EN TWITCH
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 px-10 py-4 text-xl font-bold shadow-lg">
              <MonitorPlay className="mr-3 h-6 w-6" />
              SEGUIR EN KICK
            </Button>
          </div>
          
          <div className="mt-8 p-6 bg-primary/10 rounded-xl border-2 border-primary/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold text-primary mb-2">¡CONÉCTATE AHORA MISMO!</h4>
                <p className="text-primary/80">
                  Estoy probablemente en vivo ahora mismo. ¡Únete a la comunidad!
                </p>
              </div>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 px-8 py-3 text-lg font-bold">
                <Twitch className="mr-2 h-5 w-5" />
                VER STREAM EN VIVO
              </Button>
            </div>
          </div>
        </div>
      </ThemedContainer>

      {/* OTRAS PLATAFORMAS */}
      <ThemedContainer title="OTRAS REDES SOCIALES" className="border-2 border-border/50">
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground mb-6 text-center">
            También puedes seguirme en estas plataformas para contenido adicional:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondarySocialLinks.map((link) => (
              <SocialLink key={link.label} {...link} />
            ))}
          </div>
        </div>
      </ThemedContainer>

      {/* HORARIOS DE STREAM */}
      <ThemedContainer title="HORARIOS DE STREAM" className="border-4 border-primary/30">
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-primary/20 to-primary/10 border-2 border-primary/30 rounded-xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-2xl font-bold text-primary">EN VIVO AHORA</span>
                </div>
                <h4 className="text-3xl font-bold text-primary mb-3">Wipe Day Strategies - Guía Completa</h4>
                <p className="text-xl text-primary/80 mb-4">
                  Estrategias para el primer día de wipe con loot routes y builds económicas
                </p>
                <div className="flex items-center gap-4 text-primary/70">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span className="font-bold">245 ESPECTADORES</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                    <span className="font-bold">89 LIKES</span>
                  </div>
                </div>
              </div>
              <Button className="bg-red-600 hover:bg-red-700 px-10 py-4 text-xl font-bold">
                <Twitch className="mr-3 h-6 w-6" />
                UNIRME AHORA
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-primary/20 rounded-xl p-6 hover:border-primary/50 transition-colors">
              <div className="text-lg text-primary font-bold mb-2">PRÓXIMO STREAM</div>
              <h5 className="text-xl font-bold text-primary mb-3">Guía Completa de Customs 2024</h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-primary/70">Hoy</span>
                  <span className="font-bold text-primary">19:00 UTC</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary/70">Duración</span>
                  <span className="font-bold text-primary">3 horas aprox.</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4 border-primary text-primary hover:bg-primary/10">
                <span className="font-bold">AGENDAR RECORDATORIO</span>
              </Button>
            </div>
            
            <div className="border-2 border-primary/20 rounded-xl p-6 hover:border-primary/50 transition-colors">
              <div className="text-lg text-primary font-bold mb-2">STREAM MAÑANA</div>
              <h5 className="text-xl font-bold text-primary mb-3">Torneo Arena Tarkov</h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-primary/70">Mañana</span>
                  <span className="font-bold text-primary">18:00 UTC</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary/70">Premio</span>
                  <span className="font-bold text-primary">500K Rublos</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4 border-primary text-primary hover:bg-primary/10">
                <span className="font-bold">AGENDAR RECORDATORIO</span>
              </Button>
            </div>
          </div>
        </div>
      </ThemedContainer>
    </div>
  );
}