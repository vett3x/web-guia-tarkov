"use client";

import Link from "next/link"
import Image from "next/image"
import { Map, ScrollText, Shield, Home, Search, Menu, Crosshair, LogIn, User } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ThemeToggle } from "./theme-toggle"
import { useAuth } from "@/contexts/AuthContext"
import { UserMenu } from "./layout/UserMenu"

const navItems = [
  { name: "BASE", href: "/", icon: Home },
  { name: "MAPAS", href: "/mapas", icon: Map },
  { name: "MISIONES", href: "/misiones", icon: ScrollText },
  { name: "COMERCIANTES", href: "/comerciantes", icon: Shield },
]

export function Navbar() {
  const { user, isLoading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-gradient-to-b from-black/80 to-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/40 shadow-2xl">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center gap-3 text-lg font-bold tracking-wider uppercase text-primary group relative">
            <div className="relative">
              <Image 
                src="/eft-logo.webp" 
                alt="Escape from Tarkov Logo" 
                width={48} 
                height={48} 
                className="h-10 w-10 md:h-12 md:w-12 object-contain group-hover:scale-105 transition-transform duration-300 border border-primary/30"
              />
              <div className="absolute inset-0 border border-primary/20 animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <div className="text-base md:text-lg font-bold text-primary leading-tight tracking-widest">TARKOV</div>
              <div className="text-xs md:text-sm font-bold text-primary/70 leading-tight uppercase">TACTICAL GUIDE</div>
            </div>
            <Crosshair className="absolute -right-6 top-1/2 transform -translate-y-1/2 h-3 w-3 text-primary/50 group-hover:text-primary transition-colors" />
          </Link>
          
          <div className="hidden md:block h-6 w-0.5 bg-gradient-to-b from-primary/50 to-transparent mx-4"></div>
          
          <nav className="hidden md:flex items-center space-x-1 ml-4">
            {navItems.map((item) => (
              <Button key={item.name} variant="outline" asChild className="relative group/nav border-border/30 hover:border-primary/50 bg-black/30 rounded-none">
                <Link href={item.href} className="flex items-center gap-2 text-primary/80 hover:text-primary px-4 py-2 transition-all">
                  <item.icon className="h-3 w-3" />
                  <span className="font-bold text-sm tracking-wider">{item.name}</span>
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary group-hover/nav:w-3/4 transition-all duration-300"></span>
                </Link>
              </Button>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Barra de búsqueda */}
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 h-4 w-4 text-primary/50" />
            <Input 
              placeholder="BUSCAR INTEL..." 
              className="pl-10 w-64 bg-black/30 border-border/50 focus-visible:ring-primary rounded-none font-mono text-sm"
            />
          </div>
          
          {/* Indicador de estado */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-black/30 border border-primary/20 rounded-none">
            <div className="w-2 h-2 bg-green-500 animate-pulse rounded-full"></div>
            <span className="text-xs font-bold text-primary/70 uppercase tracking-wider">ONLINE</span>
          </div>
          
          {/* Toggle de tema */}
          <ThemeToggle />
          
          {/* Menú de usuario o botón de login */}
          {!isLoading && (
            <>
              {user ? (
                <UserMenu />
              ) : (
                <Button 
                  asChild
                  variant="outline"
                  className="border-primary/30 hover:border-primary hover:bg-primary/10 bg-black/30 rounded-none group"
                >
                  <Link href="/login" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                    <span className="hidden md:inline font-bold text-sm tracking-wider text-primary">ACCESO</span>
                  </Link>
                </Button>
              )}
            </>
          )}
          
          {/* Menú móvil */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="border-border/30 bg-black/30 rounded-none">
                <Menu className="h-5 w-5 text-primary" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-gradient-to-b from-black to-black/95 border-l border-border/50">
              <div className="flex flex-col space-y-2 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-none border border-transparent hover:border-primary/30 hover:bg-primary/5 transition-all"
                  >
                    <item.icon className="h-4 w-4 text-primary" />
                    <span className="font-bold text-sm tracking-wider text-primary">{item.name}</span>
                  </Link>
                ))}
                
                {/* Enlace de login en menú móvil */}
                {!isLoading && !user && (
                  <Link
                    href="/login"
                    className="flex items-center gap-3 p-3 rounded-none border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all mt-4"
                  >
                    <LogIn className="h-4 w-4 text-primary" />
                    <span className="font-bold text-sm tracking-wider text-primary">INICIAR SESIÓN</span>
                  </Link>
                )}
              </div>
              
              {/* Información de estado en menú móvil */}
              <div className="mt-8 p-4 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 animate-pulse rounded-full"></div>
                  <span className="text-xs font-bold text-primary/70 uppercase tracking-wider">SISTEMA OPERATIVO</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Acceso al sistema de control táctico
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Línea inferior de neón */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
    </header>
  )
}