"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { testWordPressAPI, getPosts, getServices, getTestimonials } from "@/lib/wordpress"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function DebugPage() {
  const [apiTests, setApiTests] = useState<any[]>([])
  const [posts, setPosts] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const runTests = async () => {
    setLoading(true)
    try {
      console.log("🚀 Starting WordPress API tests...")

      // Test API endpoints
      const testResults = await testWordPressAPI()
      setApiTests(testResults)

      // Test data fetching
      const postsData = await getPosts(1, 5)
      setPosts(postsData)

      const servicesData = await getServices()
      setServices(servicesData)

      const testimonialsData = await getTestimonials()
      setTestimonials(testimonialsData)

      console.log("✅ All tests completed")
    } catch (error) {
      console.error("❌ Test error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    runTests()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold">WordPress Integration Debug</h1>
              <p className="text-muted-foreground mt-2">This page helps diagnose WordPress API connectivity issues</p>
              <Button onClick={runTests} disabled={loading} className="mt-4">
                {loading ? "Running Tests..." : "Run Tests Again"}
              </Button>
            </div>

            {/* Current WordPress URLs */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>WordPress Configuration</CardTitle>
                <CardDescription>Current WordPress API endpoints being used</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <strong>WordPress Admin:</strong>{" "}
                    <a
                      href="https://nxteradigital.com/wp/wp-admin"
                      target="_blank"
                      className="text-blue-600 hover:underline"
                      rel="noreferrer"
                    >
                      https://nxteradigital.com/wp/wp-admin
                    </a>
                  </div>
                  <div>
                    <strong>API Base URL:</strong>{" "}
                    <a
                      href="https://nxteradigital.com/wp/wp-json/wp/v2"
                      target="_blank"
                      className="text-blue-600 hover:underline"
                      rel="noreferrer"
                    >
                      https://nxteradigital.com/wp/wp-json/wp/v2
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API Endpoint Tests */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>API Endpoint Tests</CardTitle>
                <CardDescription>Testing WordPress REST API endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiTests.map((test, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        test.ok ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{test.name}</h3>
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            test.ok ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {test.ok ? "✅ Success" : "❌ Failed"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{test.url}</p>
                      {test.error && <p className="text-sm text-red-600 mt-2">Error: {test.error}</p>}
                      {test.data && <p className="text-sm text-green-600 mt-2">Data: {test.data}</p>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Testimonials Data */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Testimonials Data ({testimonials.length})</CardTitle>
                <CardDescription>Testimonials loaded from WordPress or fallback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="p-4 border rounded-lg">
                      <h3 className="font-medium">{testimonial.author}</h3>
                      <p className="text-sm text-muted-foreground mt-1">"{testimonial.quote}"</p>
                      <div className="text-xs text-muted-foreground mt-2">
                        ID: {testimonial.id} | Position: {testimonial.position}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Posts Data */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Blog Posts ({posts.length})</CardTitle>
                <CardDescription>Posts loaded from WordPress or fallback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="p-4 border rounded-lg">
                      <h3 className="font-medium">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {post.excerpt.replace(/<[^>]*>/g, "").substring(0, 100)}...
                      </p>
                      <div className="text-xs text-muted-foreground mt-2">
                        ID: {post.id} | Slug: {post.slug} | Author: {post.author}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <a href="https://nxteradigital.com/wp/wp-admin" target="_blank" rel="noreferrer" className="block">
                    <Button className="w-full">Open WordPress Admin</Button>
                  </a>
                  <a
                    href="https://nxteradigital.com/wp/wp-json/wp/v2/testimonials"
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full">
                      Test Testimonials API
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
