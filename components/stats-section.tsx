"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"

export default function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const stats = [
    { value: "500+", label: "Clients Worldwide" },
    { value: "94%", label: "Client Retention" },
    { value: "1.2B", label: "Ad Impressions" },
    { value: "15+", label: "Industry Awards" },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 border-y">
      <div className="container px-4 md:px-6">
        <div ref={ref} className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center space-y-2 transition-all duration-700 ${
                isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl font-bold sm:text-4xl md:text-5xl">{stat.value}</div>
              <div className="text-center text-sm font-medium text-muted-foreground md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
