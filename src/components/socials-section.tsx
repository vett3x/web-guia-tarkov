import Link from "next/link";
import { Twitch, Instagram, X, MessageCircle, Youtube, MonitorPlay } from "lucide-react";
import { ThemedContainer } from "./themed-container";
import { cn } from "@/lib/utils";

interface SocialLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  className?: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon: Icon, label, className }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "inline-flex items-center justify-start w-full px-4 py-2 text-sm font-medium transition-colors rounded-md border border-input bg-secondary text-secondary-foreground hover:bg-secondary/80",
      className
    )}
  >
    <Icon className="h-5 w-5 mr-2" />
    {label}
  </a>
);

export function SocialsSection() {
  // Reemplaza estos con tus enlaces reales
  const socialLinks = [
    { href: "#", icon: Twitch, label: "Twitch (Streams)" },
    { href: "#", icon: MonitorPlay, label: "Kick (Streams)" },
    { href: "#", icon: Instagram, label: "Instagram" },
    { href: "#", icon: X, label: "X (Twitter)" },
    { href: "#", icon: MessageCircle, label: "Discord Oficial" },
  ];

  return (
    <div className="space-y-6">
      <ThemedContainer title="Redes Sociales y Streams">
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground">Sígueme en:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {socialLinks.map((link) => (
              <SocialLink key={link.label} {...link} />
            ))}
          </div>
        </div>
      </ThemedContainer>

      <ThemedContainer title="Últimos Streams">
        <div className="aspect-video bg-black/50 flex items-center justify-center text-white text-center border border-border rounded-sm">
          <Youtube className="h-10 w-10 mr-2 text-red-500" />
          <p className="text-sm text-muted-foreground">
            Placeholder para el último stream. <br /> (Integración de API necesaria)
          </p>
        </div>
        <p className="mt-2 text-xs text-muted-foreground text-center">
          Aquí se mostraría automáticamente el último video o stream destacado.
        </p>
      </ThemedContainer>
    </div>
  );
}