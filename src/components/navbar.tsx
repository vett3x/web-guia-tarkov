import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "./theme-toggle"
import { Map, ScrollText, Shield, Home } from "lucide-react"
import { Button } from "./ui/button"

const navItems = [
  { name: "Inicio", href: "/", icon: Home },
  { name: "Mapas", href: "/mapas", icon: Map },
  { name: "Misiones", href: "/misiones", icon: ScrollText },
  { name: "Comerciantes", href: "/comerciantes", icon: Shield },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-primary">
            <Image 
              src="/eft-logo.webp" 
              alt="Escape from Tarkov Logo" 
              width={32} 
              height={32} 
              className="h-8 w-8 object-contain"
            />
            <span className="hidden sm:inline">Tarkov Guía ES</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button key={item.name} variant="ghost" asChild>
                <Link href={item.href} className="flex items-center gap-2 text-primary hover:bg-primary/10">
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}