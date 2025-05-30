"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, Twitter } from "lucide-react"
import LogoAnimation from "@/components/logo-animation"
import { getCompanyInfo } from "@/lib/wordpress"

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const [companyInfo, setCompanyInfo] = useState({
    name: "Nxtera Digital",
    email: "nxteradigital1@gmail.com",
    phone: "+91 98710 75649",
  })

  useEffect(() => {
    setIsVisible(true)

    async function loadCompanyInfo() {
      try {
        const info = await getCompanyInfo()
        setCompanyInfo(info)
      } catch (error) {
        console.error("Failed to load company info:", error)
      }
    }

    loadCompanyInfo()
  }, [])

  return (
    <footer className="w-full border-t bg-background py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <div className="mb-4">
              <LogoAnimation href={undefined} />
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">
              Elevating brands through strategic marketing solutions that deliver measurable results.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/1ZQCA8WpxY/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://x.com/NxteraDigital"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://www.instagram.com/nxteradigital/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/company/nxtera-digital/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#home" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-muted-foreground hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-muted-foreground hover:text-primary">
                  Testimonial
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/website-optimization" className="text-muted-foreground hover:text-primary">
                  Website Optimization
                </Link>
              </li>
              <li>
                <Link href="/services/social-media-management" className="text-muted-foreground hover:text-primary">
                  Social Media Management
                </Link>
              </li>
              <li>
                <Link href="/services/performance-marketing" className="text-muted-foreground hover:text-primary">
                  Performance Marketing
                </Link>
              </li>
              <li>
                <Link href="/services/email-marketing" className="text-muted-foreground hover:text-primary">
                  Email Marketing
                </Link>
              </li>
              <li>
                <Link href="/services/video-editing" className="text-muted-foreground hover:text-primary">
                  Video Editing
                </Link>
              </li>
              <li>
                <Link href="/services/local-seo" className="text-muted-foreground hover:text-primary">
                  Local SEO
                </Link>
              </li>
              <li>
                <Link href="/services/graphic-designing" className="text-muted-foreground hover:text-primary">
                  Graphic Designing
                </Link>
              </li>
              <li>
                <Link href="/services/content-marketing" className="text-muted-foreground hover:text-primary">
                  Content Marketing
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Email: {companyInfo.email}</li>
              <li className="text-muted-foreground">Info: info@nxteradigital.com</li>
              <li className="text-muted-foreground">Phone: {companyInfo.phone}</li>
              <li className="text-muted-foreground">Phone: {companyInfo.phone2 || "+91 96502 97063"}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Link
                href={`mailto:${companyInfo.email}`}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                {companyInfo.email}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
