import { Link } from "wouter";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search, Menu, User } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="border-b dark:border-gray-800 sticky top-0 bg-background z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center space-x-2">
              <img
                src="/logo-light.png"
                alt="FOKIS Now"
                className="h-8 dark:hidden"
              />
              <img
                src="/logo-dark.png"
                alt="FOKIS Now"
                className="h-8 hidden dark:block"
              />
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Blog Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-poppins">Blog</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="p-4 w-64 font-open-sans">
                      <li><Link href="/category/devlopman"><a className="block p-2 hover:bg-accent">Devlopman Pèsonèl</a></Link></li>
                      <li><Link href="/category/peyi"><a className="block p-2 hover:bg-accent">Sitiyasyon Peyi</a></Link></li>
                      <li><Link href="/category/ekonomi"><a className="block p-2 hover:bg-accent">Ekonomi</a></Link></li>
                      <li><Link href="/category/espirityalite"><a className="block p-2 hover:bg-accent">Espirityalite</a></Link></li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Video Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-poppins">Videyo</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="p-4 w-64 font-open-sans">
                      <li><Link href="/video/analiz"><a className="block p-2 hover:bg-accent">Analiz</a></Link></li>
                      <li><Link href="/video/entevyou"><a className="block p-2 hover:bg-accent">Entèvyou</a></Link></li>
                      <li><Link href="/video/teyori"><a className="block p-2 hover:bg-accent">Teyori</a></Link></li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Photo Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-poppins">Foto</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="p-4 w-64 font-open-sans">
                      <li><Link href="/foto/pwoje"><a className="block p-2 hover:bg-accent">Pwojè Kominotè</a></Link></li>
                      <li><Link href="/foto/manifestasyon"><a className="block p-2 hover:bg-accent">Manifestasyon</a></Link></li>
                      <li><Link href="/foto/personalite"><a className="block p-2 hover:bg-accent">Pèsonalite</a></Link></li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Best of the Week */}
                <NavigationMenuItem>
                  <Link href="/best-of-week">
                    <a className="font-poppins px-4 py-2 hover:text-primary transition-colors">
                      Best of the Week
                    </a>
                  </Link>
                </NavigationMenuItem>

                {/* Contact */}
                <NavigationMenuItem>
                  <Link href="/contact">
                    <a className="font-poppins px-4 py-2 hover:text-primary transition-colors">
                      Kontakte Nou
                    </a>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>
              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-2 w-72">
                  <Input
                    type="search"
                    placeholder="Chèche..."
                    className="w-full"
                  />
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Login */}
            <Button variant="outline" size="icon">
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 space-y-4">
                  <Link href="/category/devlopman">
                    <a className="block py-2 hover:text-primary">Devlopman Pèsonèl</a>
                  </Link>
                  <Link href="/category/peyi">
                    <a className="block py-2 hover:text-primary">Sitiyasyon Peyi</a>
                  </Link>
                  <Link href="/category/ekonomi">
                    <a className="block py-2 hover:text-primary">Ekonomi</a>
                  </Link>
                  <Link href="/category/espirityalite">
                    <a className="block py-2 hover:text-primary">Espirityalite</a>
                  </Link>
                  <Link href="/best-of-week">
                    <a className="block py-2 hover:text-primary">Best of the Week</a>
                  </Link>
                  <Link href="/contact">
                    <a className="block py-2 hover:text-primary">Kontakte Nou</a>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}