import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getServiceBySlug, getServices } from "@/lib/wordpress"
import { notFound } from "next/navigation"

export const revalidate = 60

// Generate static params for all services
export async function generateStaticParams() {
  const services = await getServices()

  return services.map((service) => ({
    slug: service.slug,
  }))
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug)

  if (!service) {
    notFound()
  }

  // Get related services (exclude current service)
  const allServices = await getServices()
  const relatedServices = allServices.filter((s) => s.id !== service.id).slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-muted dark:bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <Link href="/#services" className="inline-flex items-center text-primary mb-4 hover:underline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Link>
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                <div>
                  <h1
                    className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                    dangerouslySetInnerHTML={{ __html: service.title }}
                  />
                  <p
                    className="mt-4 text-lg text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                  <div className="mt-6">
                    <Link href="#contact">
                      <Button size="lg" className="mr-4">
                        Get Started
                      </Button>
                    </Link>
                    <Link href="#contact">
                      <Button size="lg" variant="outline">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {service.content ? (
                      <div dangerouslySetInnerHTML={{ __html: service.content }} />
                    ) : (
                      <div>
                        <h2>About This Service</h2>
                        <p>
                          Our {service.title.toLowerCase()} service is designed to help your business achieve its
                          marketing goals through proven strategies and expert execution.
                        </p>

                        <h3>What's Included</h3>
                        <ul>
                          <li>Comprehensive strategy development</li>
                          <li>Expert implementation and execution</li>
                          <li>Regular monitoring and optimization</li>
                          <li>Detailed reporting and analytics</li>
                          <li>Ongoing support and consultation</li>
                        </ul>

                        <h3>Why Choose Nxtera Digital</h3>
                        <p>
                          With years of experience and a proven track record, our team delivers results that matter. We
                          combine industry best practices with innovative approaches to ensure your success.
                        </p>

                        <h3>Get Started Today</h3>
                        <p>
                          Ready to take your {service.title.toLowerCase()} to the next level? Contact us for a free
                          consultation and let's discuss how we can help your business grow.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Contact Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Ready to Get Started?</CardTitle>
                      <CardDescription>Contact us for a free consultation</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Email</p>
                          <a
                            href="mailto:nxteradigital1@gmail.com"
                            className="text-sm text-muted-foreground hover:text-primary block"
                          >
                            nxteradigital1@gmail.com
                          </a>
                          <a
                            href="mailto:info@nxteradigital.com"
                            className="text-sm text-muted-foreground hover:text-primary block"
                          >
                            info@nxteradigital.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <a href="tel:+919871075649" className="text-sm text-muted-foreground hover:text-primary">
                            +91 98710 75649
                          </a>
                        </div>
                      </div>
                      <Link href="#contact" className="block">
                        <Button className="w-full">Contact Us</Button>
                      </Link>
                    </CardContent>
                  </Card>

                  {/* Benefits Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                          <span className="text-sm">Increased ROI and measurable results</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                          <span className="text-sm">Expert team with proven experience</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                          <span className="text-sm">Customized strategies for your business</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                          <span className="text-sm">Ongoing support and optimization</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="w-full py-12 bg-muted dark:bg-muted/20">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-2xl font-bold mb-8">Other Services</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {relatedServices.map((relatedService) => (
                    <Card key={relatedService.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={relatedService.image || "/placeholder.svg"}
                          alt={relatedService.title}
                          width={400}
                          height={300}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg" dangerouslySetInnerHTML={{ __html: relatedService.title }} />
                        <CardDescription dangerouslySetInnerHTML={{ __html: relatedService.description }} />
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <Link href={`/services/${relatedService.slug}`}>
                          <Button variant="outline" className="w-full">
                            Learn More
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section id="contact" className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-8">
                Contact us today for a free consultation and let's discuss how our {service.title.toLowerCase()} service
                can help your business grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#contact">
                  <Button size="lg">Get Free Consultation</Button>
                </Link>
                <Link href="tel:+919871075649">
                  <Button size="lg" variant="outline">
                    Call Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
