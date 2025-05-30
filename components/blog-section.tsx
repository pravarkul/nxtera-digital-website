"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Fallback blog posts
const FALLBACK_POSTS = [
  {
    id: 1,
    title: "Welcome to Nxtera Digital Blog",
    slug: "welcome-to-nxtera-digital-blog",
    excerpt:
      "Stay tuned for the latest insights and strategies in digital marketing. We'll be sharing valuable content to help your business grow.",
    date: "December 26, 2024",
    author: "Nxtera Digital Team",
    image: "/hero-dashboard.png",
  },
  {
    id: 2,
    title: "5 SEO Strategies for 2025",
    slug: "seo-strategies-2025",
    excerpt:
      "Discover the top SEO strategies that will help your business rank higher in search results and drive more organic traffic in 2025.",
    date: "December 28, 2024",
    author: "SEO Specialist",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Social Media Trends to Watch",
    slug: "social-media-trends",
    excerpt:
      "Stay ahead of the curve with these emerging social media trends that are reshaping how brands connect with their audiences.",
    date: "December 30, 2024",
    author: "Social Media Manager",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState(FALLBACK_POSTS)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      try {
        setIsLoading(true)
        console.log("🔍 Loading posts from WordPress...")

        const response = await fetch("https://nxteradigital.com/wp/wp-json/wp/v2/posts?_embed&per_page=3", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          cache: "no-store", // Force fresh data
        })

        console.log("📡 WordPress response status:", response.status)

        if (response.ok) {
          const posts = await response.json()
          console.log("📝 Posts received:", posts.length)

          if (Array.isArray(posts) && posts.length > 0) {
            const formattedPosts = posts.map((post) => ({
              id: post.id,
              title: post.title.rendered,
              slug: post.slug,
              excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
              date: new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              author: post._embedded?.["author"]?.[0]?.name || "Nxtera Digital Team",
              image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.svg?height=400&width=600",
            }))

            console.log("✅ Setting WordPress posts:", formattedPosts)
            setBlogPosts(formattedPosts)
          } else {
            console.log("⚠️ No posts found in WordPress")
          }
        } else {
          console.log("❌ WordPress API error:", response.status)
        }
      } catch (error) {
        console.error("❌ Error loading posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPosts()
  }, [])

  return (
    <section id="blog" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Our Blog</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Latest Marketing Insights</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Stay updated with the latest trends and strategies in digital marketing
            </p>
          </div>
        </div>

        <div className="grid gap-6 pt-12 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Card
              key={post.id}
              className="overflow-hidden transition-all duration-500 hover:shadow-md translate-y-0 opacity-100"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  width={600}
                  height={400}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                </div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <CardDescription className="text-base">{post.excerpt}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link href={`/blog/${post.slug}`}>
                  <Button variant="link" className="group p-0">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link href="/blog">
            <Button variant="outline" size="lg">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
