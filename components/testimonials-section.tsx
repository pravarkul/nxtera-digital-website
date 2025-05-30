"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

// Fallback testimonials
const FALLBACK_TESTIMONIALS = [
  {
    id: 1,
    quote:
      "We're excited to work with Nxtera Digital and look forward to sharing our success stories with you soon. Their professional approach and expertise give us confidence in achieving our marketing goals.",
    author: "Future Client",
    position: "Business Owner",
    avatar: "/testimonial-1.png",
  },
  {
    id: 2,
    quote:
      "Nxtera Digital's comprehensive approach to digital marketing aligns perfectly with our business objectives. We're eager to see the results of our partnership.",
    author: "Prospective Partner",
    position: "Marketing Director",
    avatar: "/testimonial-2.png",
  },
  {
    id: 3,
    quote:
      "The team at Nxtera Digital has shown exceptional knowledge in the digital marketing space. Their strategic insights are exactly what we've been looking for.",
    author: "Potential Customer",
    position: "CEO",
    avatar: "/testimonial-3.png",
  },
  {
    id: 4,
    quote:
      "We appreciate Nxtera Digital's transparent approach to marketing. Their focus on measurable results and data-driven strategies is refreshing.",
    author: "Industry Colleague",
    position: "Marketing Manager",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(FALLBACK_TESTIMONIALS)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadTestimonials() {
      try {
        setIsLoading(true)

        // Try to fetch from WordPress (client-side only)
        const response = await fetch("https://nxteradigital.com/wp/wp-json/wp/v2/testimonials?_embed&per_page=10", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        })

        if (response.ok) {
          const wpTestimonials = await response.json()
          if (Array.isArray(wpTestimonials) && wpTestimonials.length > 0) {
            const formattedTestimonials = wpTestimonials.map((testimonial) => ({
              id: testimonial.id,
              quote: testimonial.content.rendered.replace(/<[^>]*>/g, ""),
              author: testimonial.title.rendered,
              position: testimonial.acf?.position || "Valued Client",
              avatar: testimonial.acf?.avatar || "/testimonial-1.png",
            }))
            setTestimonials(formattedTestimonials)
          }
        }
      } catch (error) {
        console.log("Using fallback testimonials:", error)
        // Keep fallback testimonials
      } finally {
        setIsLoading(false)
      }
    }

    loadTestimonials()
  }, [])

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Clients Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't just take our word for it - hear from some of our satisfied clients
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 pt-12 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="transition-all duration-500 translate-y-0 opacity-100"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    width={60}
                    height={60}
                    alt={testimonial.author}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.author}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-muted-foreground">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
