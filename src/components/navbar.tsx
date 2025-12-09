import Link from "next/link"
import Image from "next/image"
import { Map, ScrollText, Shield, Home, Search, Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const navItems = [
  { name: "Inicio", href: "/", icon: Home },
  { name: "Mapas", href: "/mapas", icon: Map },
  { name: "Misiones", href: "/misiones", icon: ScrollText },
  { name: "Comerciantes", href: "/comerciantes", icon: Shield },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center gap-0 text-lg font-bold tracking-tight text-primary group">
            <Image 
              src="/eft-logo.webp" 
              alt="Escape from Tarkov Logo" 
              width={64} 
              height={64} 
              className="h-16 w-16 object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <div className="hidden md:flex flex-col ml-2">
              <span className="text-xl font-bold text-primary">TARKOV</span>
              <span className="text-xs text-muted-foreground -mt-1">GUÍA ESPAÑOL</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1 ml-8">
            {navItems.map((item) => (
              <Button key={item.name} variant="ghost" asChild className="relative group/nav">
                <Link href={item.href} className="flex items-center gap-2 text-primary hover:text-primary/90 hover:bg-primary/10 px-4 py-2 rounded-md transition-all">
                  <item.icon className="h-4 w-4" />
                  <span className="font-medium">{item.name}</span>
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary group-hover/nav:w-3/4 transition-all duration-300"></span>
                </Link>
              </Button>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Barra de búsqueda */}
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar guías, mapas, misiones..." 
              className="pl-10 w-64 bg-secondary/50 border-border focus-visible:ring-primary"
            />
          </div>
          
          {/* Menú móvil */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary"
                  >
                    <item.icon className="h-5 w-5 text-primary" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}