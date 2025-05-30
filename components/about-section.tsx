"use client"

import { useRef } from "react"
import { CheckCircle } from "lucide-react"
import { useInView } from "framer-motion"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted dark:bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">About Us</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Who We Are</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Nxtera Digital is a team of passionate marketing experts dedicated to helping businesses grow
            </p>
          </div>
        </div>

        <div ref={ref} className="grid gap-6 pt-12 lg:grid-cols-2 lg:gap-12">
          <div
            className={`space-y-4 transition-all duration-500 ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h3 className="text-2xl font-bold">Our Mission</h3>
            <p className="text-muted-foreground">
              At Nxtera Digital, our mission is to empower businesses with innovative marketing strategies that drive
              measurable results. We believe in combining data-driven insights with creative excellence to help our
              clients stand out in today's competitive landscape.
            </p>

            <h3 className="text-2xl font-bold pt-4">Our Values</h3>
            <ul className="grid gap-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Excellence in everything we do</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Transparency and integrity in our relationships</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Innovation that drives results</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Client success is our success</span>
              </li>
            </ul>
          </div>

          <div
            className={`space-y-4 transition-all duration-500 delay-200 ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h3 className="text-2xl font-bold">Our Story</h3>
            <p className="text-muted-foreground">
              Founded in 2025, Nxtera Digital began with a simple idea: marketing should deliver real, measurable
              results for businesses. What started as a small team of three has grown into a full-service marketing
              agency with specialists across digital marketing disciplines.
            </p>
            <p className="text-muted-foreground">
              Today, we're proud to have helped over 500 businesses across various industries achieve their marketing
              goals and grow their brands.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
