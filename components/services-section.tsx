"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  BarChart3,
  Globe,
  Mail,
  MessageSquare,
  PenTool,
  Search,
  Share2,
  TrendingUp,
  Video,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Map of icon names to Lucide components
const iconMap: Record<string, React.ReactNode> = {
  Search: <Search className="h-10 w-10 text-primary" />,
  BarChart3: <BarChart3 className="h-10 w-10 text-primary" />,
  Share2: <Share2 className="h-10 w-10 text-primary" />,
  Mail: <Mail className="h-10 w-10 text-primary" />,
  Globe: <Globe className="h-10 w-10 text-primary" />,
  MessageSquare: <MessageSquare className="h-10 w-10 text-primary" />,
  Video: <Video className="h-10 w-10 text-primary" />,
  PenTool: <PenTool className="h-10 w-10 text-primary" />,
  TrendingUp: <TrendingUp className="h-10 w-10 text-primary" />,
}

// Hardcoded services data - always available
const SERVICES_DATA = [
  {
    id: 1,
    title: "Website Optimization",
    description:
      "Improve your website's performance, speed, and user experience to increase conversions and search rankings.",
    image: "/placeholder.svg?height=400&width=600",
    icon: "Search",
    slug: "website-optimization",
  },
  {
    id: 2,
    title: "Social Media Management",
    description:
      "Comprehensive social media strategy and management across all platforms to build your brand presence.",
    image: "/placeholder.svg?height=400&width=600",
    icon: "Share2",
    slug: "social-media-management",
  },
  {
    id: 3,
    title: "Performance Marketing",
    description: "Data-driven marketing campaigns focused on measurable results and maximum return on investment.",
    image: "/placeholder.svg?height=400&width=600",
    icon: "TrendingUp",
    slug: "performance-marketing",
  },
  {
    id: 4,
    title: "Email Marketing",
    description: "Strategic email campaigns that nurture leads, engage customers, and drive conversions.",
    image: "/placeholder.svg?height=400&width=600",
    icon: "Mail",
    slug: "email-marketing",
  },
  {
    id: 5,
    title: "Video Editing",
    description:
      "Professional video editing services to create compelling visual content for your marketing campaigns.",
    image: "/placeholder.svg?height=400&width=600",
    icon: "Video",
    slug: "video-editing",
  },
  {
    id: 6,
    title: "Local SEO",
    description:
      "Optimize your local search presence to attract customers in your area and dominate local search results.",
    image: "/placeholder.svg?height=400&width=600",
    icon: "Search",
    slug: "local-seo",
  },
  {
    id: 7,
    title: "Graphic Designing",
    description:
      "Creative graphic design solutions for all your marketing materials, from brochures to digital assets.",
    image: "/placeholder.svg?height=400&width=600",
    icon: "PenTool",
    slug: "graphic-designing",
  },
  {
    id: 8,
    title: "Content Marketing",
    description: "Strategic content creation and distribution to attract, engage, and convert your target audience.",
    image: "/placeholder.svg?height=400&width=600",
    icon: "Globe",
    slug: "content-marketing",
  },
]

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Simple visibility trigger
    setIsVisible(true)
  }, [])

  console.log("ServicesSection rendering with", SERVICES_DATA.length, "services")

  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Our Services
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Comprehensive Marketing Solutions</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We offer a full range of digital marketing services to help your business grow
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES_DATA.map((service, index) => (
            <Card
              key={service.id}
              className={`group overflow-hidden transition-all duration-500 hover:shadow-lg dark:hover:shadow-primary/5 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader className="p-6">
                <div className="mb-2 transition-transform duration-300 group-hover:scale-110">
                  {iconMap[service.icon] || <Search className="h-10 w-10 text-primary" />}
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link href={`/services/${service.slug}`}>
                  <Button variant="link" className="group p-0">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
