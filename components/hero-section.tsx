"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      id="home"
      className="w-full py-4 md:py-6 lg:py-12 xl:py-16 bg-gradient-to-b from-background to-muted dark:from-background dark:to-background/70"
    >
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-8 xl:grid-cols-[1fr_550px]">
          <div
            className={`flex flex-col justify-center space-y-4 transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Elevate Your Brand with Strategic Marketing Solutions
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Nxtera Digital helps businesses grow through data-driven marketing strategies that deliver measurable
                results. Let's transform your digital presence together.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="#contact">
                <Button size="lg" className="group">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#services">
                <Button size="lg" variant="outline" className="group">
                  Explore Services
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex -space-x-2">
                <Image
                  src="/testimonial-1.png"
                  width={40}
                  height={40}
                  alt="Client"
                  className="rounded-full border-2 border-background dark:border-gray-800"
                />
                <Image
                  src="/testimonial-2.png"
                  width={40}
                  height={40}
                  alt="Client"
                  className="rounded-full border-2 border-background dark:border-gray-800"
                />
                <Image
                  src="/testimonial-3.png"
                  width={40}
                  height={40}
                  alt="Client"
                  className="rounded-full border-2 border-background dark:border-gray-800"
                />
              </div>
              <div className="text-muted-foreground">
                Ready to join <span className="font-medium text-foreground">500+</span> successful businesses
              </div>
            </div>
          </div>
          <div
            className={`relative transition-all duration-700 delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="absolute -top-12 -left-12 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <Image
              src="/hero-dashboard.png"
              width={600}
              height={600}
              alt="Digital marketing dashboard showcasing analytics and growth metrics"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
