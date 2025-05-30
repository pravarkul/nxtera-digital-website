"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import LogoAnimation from "@/components/logo-animation"
import ThemeToggle from "@/components/theme-toggle"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <LogoAnimation className="flex items-center gap-2" />
        <nav className="hidden md:flex gap-6">
          <Link href="#home" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">
            About Us
          </Link>
          <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact Us
          </Link>
          <Link href="#services" className="text-sm font-medium transition-colors hover:text-primary">
            Services
          </Link>
          <Link href="#blog" className="text-sm font-medium transition-colors hover:text-primary">
            Blog
          </Link>
          <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
            Testimonial
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="#contact" className="hidden md:block">
            <Button>Get Started</Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-10">
                <div className="flex items-center justify-between">
                  <LogoAnimation className="block" />
                  <ThemeToggle />
                </div>
                <Link href="#home" className="text-lg font-medium transition-colors hover:text-primary">
                  Home
                </Link>
                <Link href="#about" className="text-lg font-medium transition-colors hover:text-primary">
                  About Us
                </Link>
                <Link href="#contact" className="text-lg font-medium transition-colors hover:text-primary">
                  Contact Us
                </Link>
                <Link href="#services" className="text-lg font-medium transition-colors hover:text-primary">
                  Services
                </Link>
                <Link href="#blog" className="text-lg font-medium transition-colors hover:text-primary">
                  Blog
                </Link>
                <Link href="#testimonials" className="text-lg font-medium transition-colors hover:text-primary">
                  Testimonial
                </Link>
                <Link href="#contact">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
