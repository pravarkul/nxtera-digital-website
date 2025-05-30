import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import CursorGlow from "@/components/cursor-glow"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nxtera Digital - Strategic Marketing Solutions | SEO, PPC, Social Media",
  description:
    "Elevate your brand with Nxtera Digital's comprehensive marketing solutions. Expert SEO, PPC advertising, social media marketing, video editing, graphic design, and performance marketing services.",
  keywords:
    "digital marketing, SEO, PPC advertising, social media marketing, video editing, graphic design, performance marketing, Nxtera Digital",
  authors: [{ name: "Nxtera Digital" }],
  creator: "Nxtera Digital",
  publisher: "Nxtera Digital",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nxteradigital.com",
    title: "Nxtera Digital - Strategic Marketing Solutions",
    description: "Elevate your brand with data-driven marketing strategies that deliver measurable results.",
    siteName: "Nxtera Digital",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nxtera Digital - Strategic Marketing Solutions",
    description: "Elevate your brand with data-driven marketing strategies that deliver measurable results.",
  },
  verification: {
    google: "your-google-verification-code", // Add your Google verification code
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CursorGlow />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
