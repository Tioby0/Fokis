import { Link } from "wouter";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="border-b dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center space-x-2">
            <img
              src="/logo-light.svg"
              alt="FOKIS Now"
              className="h-8 dark:hidden"
            />
            <img
              src="/logo-dark.svg"
              alt="FOKIS Now"
              className="h-8 hidden dark:block"
            />
          </a>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/category/devlopman">
            <a className="text-sm font-medium hover:text-primary">Devlopman Pèsonèl</a>
          </Link>
          <Link href="/category/peyi">
            <a className="text-sm font-medium hover:text-primary">Sitiyasyon Peyi</a>
          </Link>
          <Link href="/category/espirityalite">
            <a className="text-sm font-medium hover:text-primary">Espirityalite</a>
          </Link>
          <Link href="/category/ekonomi">
            <a className="text-sm font-medium hover:text-primary">Ekonomi</a>
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link href="/admin">
            <Button variant="outline">Admin</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
