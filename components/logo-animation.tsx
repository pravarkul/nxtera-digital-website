"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"

interface LogoAnimationProps {
  className?: string
  imageSize?: number
  displaySize?: string
  href?: string
}

export default function LogoAnimation({
  className = "",
  imageSize = 5000,
  displaySize = "h-20 w-auto", // Made 10x bigger (was h-8)
  href = "/",
}: LogoAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Small delay to ensure animation runs after component mount
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const Logo = (
    <div className={`transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
      {mounted ? (
        <Image
          src="/logo-transparent.png"
          alt="Nxtera Digital"
          width={imageSize}
          height={imageSize}
          className={`${displaySize} ${resolvedTheme === "light" ? "invert" : ""}`}
          priority
          style={{
            filter: resolvedTheme === "light" ? "invert(1) brightness(0)" : "none",
          }}
        />
      ) : (
        <div className={`${displaySize} bg-transparent`} />
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className={className}>
        {Logo}
      </Link>
    )
  }

  return <div className={className}>{Logo}</div>
}
