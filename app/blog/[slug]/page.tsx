import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, Share2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getPostBySlug, getPosts } from "@/lib/wordpress"
import { notFound } from "next/navigation"

export const revalidate = 60 // Revalidate this page every 60 seconds

// Generate static params for common blog posts
export async function generateStaticParams() {
  const posts = await getPosts(1, 10)

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts (this is simplified - in a real app you might want to get posts with similar tags/categories)
  const allPosts = await getPosts(1, 6)
  const relatedPosts = allPosts.filter((relatedPost) => relatedPost.id !== post.id).slice(0, 2)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-muted dark:bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <Link href="/blog" className="inline-flex items-center text-primary mb-4 hover:underline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
              <h1
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                dangerouslySetInnerHTML={{ __html: post.title }}
              />
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="w-full py-8">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <div className="aspect-video overflow-hidden rounded-lg">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={1200}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="w-full py-8">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center gap-4 mb-8">
                <Image
                  src={post.authorImage || "/placeholder.svg"}
                  alt={post.author}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-medium">{post.author}</h3>
                  <p className="text-sm text-muted-foreground">Content Marketing Specialist</p>
                </div>
                <div className="ml-auto">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>

              <article className="prose prose-lg dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>

              <div className="mt-12 flex flex-wrap gap-3">
                <span className="text-sm font-medium">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {post.category}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Marketing
                  </span>
                  <span className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Digital
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="w-full py-12 bg-muted dark:bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={relatedPost.image || "/placeholder.svg"}
                          alt={relatedPost.title}
                          width={600}
                          height={400}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3
                          className="font-semibold text-lg line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: relatedPost.title }}
                        />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-muted-foreground mb-6">
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
