"use client"

import { useRef } from "react"
import Image from "next/image"
import { Instagram, Linkedin, Twitter } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useInView } from "framer-motion"

export default function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const team = [
    {
      name: "Alex Morgan",
      position: "CEO & Founder",
      bio: "With over 15 years of experience in digital marketing, Alex leads our team with vision and expertise.",
      image: "/placeholder.svg?height=400&width=300",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      name: "Jamie Chen",
      position: "Chief Marketing Officer",
      bio: "Jamie brings strategic insight and creative thinking to every campaign we develop.",
      image: "/placeholder.svg?height=400&width=300",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      name: "Taylor Williams",
      position: "Head of SEO",
      bio: "Taylor's analytical approach to SEO has helped countless clients achieve top rankings.",
      image: "/placeholder.svg?height=400&width=300",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      name: "Jordan Smith",
      position: "Creative Director",
      bio: "Jordan's innovative designs and concepts have won multiple industry awards.",
      image: "/placeholder.svg?height=400&width=300",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
      },
    },
  ]

  return (
    <section id="team" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Our Team</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Meet the Experts</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our talented team of marketing professionals is dedicated to your success
            </p>
          </div>
        </div>
        <div ref={ref} className="grid grid-cols-1 gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <Card
              key={index}
              className={`overflow-hidden transition-all duration-500 ${
                isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  width={300}
                  height={400}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.position}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
              <CardFooter className="flex justify-start gap-4 p-4">
                <a
                  href={member.social.linkedin}
                  aria-label="LinkedIn"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={member.social.twitter}
                  aria-label="Twitter"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href={member.social.instagram}
                  aria-label="Instagram"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
