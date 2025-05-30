import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getPosts } from "@/lib/wordpress"

export const revalidate = 60 // Revalidate this page every 60 seconds

export default async function BlogPage() {
  const blogPosts = await getPosts(1, 10) // Get first page, 10 posts
  const featuredPost = blogPosts[0] || {
    title: "No posts found",
    excerpt: "Please check back later for new content.",
    image: "/placeholder.svg",
    date: "",
    author: "",
    slug: "",
  }
  const regularPosts = blogPosts.slice(1)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted dark:bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Nxtera Digital Blog</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Insights, strategies, and trends to help you excel in digital marketing
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search articles..."
                    className="w-full bg-background rounded-md border border-input pl-8 pr-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter mb-8">Featured Article</h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="aspect-video overflow-hidden rounded-lg">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold" dangerouslySetInnerHTML={{ __html: featuredPost.title }} />
                  <div className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: featuredPost.excerpt }} />
                </div>
                <div>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <Button className="group">
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Posts */}
        <section className="w-full py-12 bg-muted dark:bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <h2 className="text-2xl font-bold tracking-tighter">Latest Articles</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  All
                </Button>
                <Button variant="ghost" size="sm">
                  SEO
                </Button>
                <Button variant="ghost" size="sm">
                  Social Media
                </Button>
                <Button variant="ghost" size="sm">
                  Content
                </Button>
              </div>
            </div>
            <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
              {regularPosts.length > 0 ? (
                regularPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
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
                      <CardTitle className="text-xl" dangerouslySetInnerHTML={{ __html: post.title }} />
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                      <CardDescription className="text-base" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
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
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-muted-foreground">No articles found. Please check back later.</p>
                </div>
              )}
            </div>
            <div className="flex justify-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Subscribe to Our Newsletter</h2>
              <p className="mt-4 mb-8 text-muted-foreground md:text-xl">
                Get the latest marketing insights delivered directly to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
