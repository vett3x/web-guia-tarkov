"use client";

import { useState, useEffect } from "react";
import { Play, Eye, Calendar, Clock, Users, ExternalLink } from "lucide-react";
import { ThemedContainer } from "./themed-container";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Badge } from "./ui/badge";

interface TwitchStream {
  id: string;
  title: string;
  thumbnail_url: string;
  viewer_count: number;
  started_at: string;
  type: "live" | "offline";
}

interface TwitchVod {
  id: string;
  title: string;
  thumbnail_url: string;
  duration: string;
  view_count: number;
  published_at: string;
  url: string;
}

export function TwitchStreams() {
  const [streams, setStreams] = useState<TwitchStream[]>([]);
  const [vods, setVods] = useState<TwitchVod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const channelName = "vett3x";

  // Datos de ejemplo mientras no haya API configurada
  const exampleStreams: TwitchStream[] = [
    {
      id: "1",
      title: "Wipe Day Strategies - Guía Completa para Principiantes",
      thumbnail_url: "https://static-cdn.jtvnw.net/previews-ttv/live_user_vett3x-320x180.jpg",
      viewer_count: 245,
      started_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // Hace 2 horas
      type: "live"
    },
    {
      id: "2",
      title: "Torneo Arena Tarkov - Competitivo",
      thumbnail_url: "https://static-cdn.jtvnw.net/previews-ttv/live_user_vett3x-320x180.jpg",
      viewer_count: 189,
      started_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // Hace 5 horas
      type: "live"
    }
  ];

  const exampleVods: TwitchVod[] = [
    {
      id: "vod1",
      title: "Guía Completa de Customs 2024 - Todos los Loot Spots",
      thumbnail_url: "https://static-cdn.jtvnw.net/cf_vods/d1m7jfoe9zms1h/thumb/thumb0-320x180.jpg",
      duration: "3:42:15",
      view_count: 1245,
      published_at: "2024-01-15T19:00:00Z",
      url: "https://www.twitch.tv/videos/1234567890"
    },
    {
      id: "vod2",
      title: "Misiones Prapor Nivel 1-20 - Rápido y Eficiente",
      thumbnail_url: "https://static-cdn.jtvnw.net/cf_vods/d1m7jfoe9zms1h/thumb/thumb0-320x180.jpg",
      duration: "2:18:30",
      view_count: 892,
      published_at: "2024-01-14T18:30:00Z",
      url: "https://www.twitch.tv/videos/1234567891"
    },
    {
      id: "vod3",
      title: "Loadout Económico para Early Wipe",
      thumbnail_url: "https://static-cdn.jtvnw.net/cf_vods/d1m7jfoe9zms1h/thumb/thumb0-320x180.jpg",
      duration: "1:45:10",
      view_count: 1567,
      published_at: "2024-01-13T20:15:00Z",
      url: "https://www.twitch.tv/videos/1234567892"
    },
    {
      id: "vod4",
      title: "Interchange Loot Run - 500K por Raid",
      thumbnail_url: "https://static-cdn.jtvnw.net/cf_vods/d1m7jfoe9zms1h/thumb/thumb0-320x180.jpg",
      duration: "2:05:45",
      view_count: 1034,
      published_at: "2024-01-12T17:45:00Z",
      url: "https://www.twitch.tv/videos/1234567893"
    }
  ];

  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setStreams(exampleStreams);
      setVods(exampleVods);
      setLoading(false);
      setError("Para mostrar datos reales de Twitch, configura las variables de entorno de la API.");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
    if (diffHours > 0) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    if (diffMins > 0) return `Hace ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
    return "Justo ahora";
  };

  return (
    <div className="space-y-8">
      {/* Streams en vivo */}
      <ThemedContainer title="TRANSMISIONES EN VIVO" className="border-2 border-primary/30">
        <div className="space-y-6">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          ) : streams.length > 0 ? (
            streams.map((stream) => (
              <div 
                key={stream.id}
                className="border-2 border-primary/20 rounded-lg overflow-hidden bg-gradient-to-r from-black/30 to-black/10 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-1/3 flex-shrink-0">
                    <div className="aspect-video relative overflow-hidden">
                      <div 
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                        style={{ 
                          backgroundImage: `url(${stream.thumbnail_url.replace('{width}', '320').replace('{height}', '180')})`,
                          backgroundColor: '#1f2937'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        {stream.type === "live" && (
                          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 animate-pulse">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            EN VIVO
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-4">
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-lg text-primary group-hover:text-primary/80 transition-colors line-clamp-2">
                            {stream.title}
                          </h3>
                          <Badge variant="outline" className="border-primary/30 text-primary">
                            {stream.type === "live" ? "EN DIRECTO" : "OFFLINE"}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3 mt-4">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Eye className="h-4 w-4" />
                              <span className="font-bold text-primary">{stream.viewer_count.toLocaleString()} espectadores</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{formatDate(stream.started_at)}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-xs">
                              <Users className="h-3 w-3" />
                              <span className="text-muted-foreground">Canal:</span>
                              <span className="font-bold text-primary">vett3x</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-border/30 mt-4">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">
                            Click para unirte a la transmisión
                          </div>
                          <Button 
                            size="sm" 
                            variant="tactical"
                            onClick={() => window.open(`https://twitch.tv/${channelName}`, '_blank')}
                            className="group/btn"
                          >
                            <Play className="mr-2 h-4 w-4 group-hover/btn:animate-pulse" />
                            {stream.type === "live" ? "UNIRME AHORA" : "VER CANAL"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                No hay transmisiones en vivo actualmente
              </p>
              <Button 
                variant="outline"
                onClick={() => window.open(`https://twitch.tv/${channelName}`, '_blank')}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Visitar canal de Twitch
              </Button>
            </div>
          )}
        </div>
      </ThemedContainer>

      {/* VODs recientes */}
      <ThemedContainer title="VODS RECIENTES" className="border-2 border-primary/30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-64" />
            ))
          ) : vods.length > 0 ? (
            vods.map((vod) => (
              <div 
                key={vod.id}
                className="border border-border/50 rounded-lg overflow-hidden bg-gradient-to-b from-black/30 to-black/10 hover:border-primary/50 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => window.open(vod.url, '_blank')}
              >
                <div className="aspect-video relative overflow-hidden bg-gray-900">
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ 
                      backgroundImage: `url(${vod.thumbnail_url})`,
                      backgroundColor: '#1f2937'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-black/80 text-white border-none">
                        <Play className="h-3 w-3 mr-1" />
                        VOD
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {vod.duration}
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="font-bold text-primary mb-2 line-clamp-2 group-hover:text-primary/80 transition-colors">
                    {vod.title}
                  </h4>
                  
                  <div className="space-y-2 mt-3">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        <span>{vod.view_count.toLocaleString()} vistas</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(vod.published_at)}</span>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-border/30">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Click para ver</span>
                        <ExternalLink className="h-3 w-3 text-primary/50 group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground mb-4">
                No hay VODs disponibles
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-8 pt-6 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold text-primary mb-2">¿Quieres ver más contenido?</h4>
              <p className="text-sm text-muted-foreground">
                Explora todos mis VODs y clips en Twitch
              </p>
            </div>
            <Button 
              variant="tactical"
              onClick={() => window.open(`https://twitch.tv/${channelName}/videos`, '_blank')}
              className="group/btn"
            >
              <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              Ver todos los VODs en Twitch
            </Button>
          </div>
        </div>
      </ThemedContainer>

      {/* Nota sobre la configuración de la API */}
      {error && (
        <div className="border-2 border-yellow-500/30 bg-yellow-500/10 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-yellow-500 font-bold text-sm">NOTA:</div>
            <div className="text-sm text-yellow-500/90">
              <p className="mb-2">Actualmente se muestran datos de ejemplo. Para conectar con la API real de Twitch:</p>
              <ol className="list-decimal pl-4 space-y-1">
                <li>Crea una aplicación en <a href="https://dev.twitch.tv/console" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-400">dev.twitch.tv</a></li>
                <li>Obtén tu Client ID y Access Token</li>
                <li>Añade las variables de entorno en tu proyecto</li>
                <li>Crea un endpoint de API en <code>/api/twitch</code> para obtener los datos reales</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}