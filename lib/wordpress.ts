/**
 * WordPress API utilities - FIXED VERSION
 * Properly handles subdirectory WordPress installation
 */

// WordPress API URL - CORRECTED for subdirectory
const WORDPRESS_API_URL = "https://nxteradigital.com/wp-json/wp/v2"

// Hardcoded services for main page display
const HARDCODED_SERVICES = [
  {
    id: 1,
    title: "Website Optimization",
    description:
      "Improve your website's performance, speed, and user experience to increase conversions and search rankings.",
    image: "/placeholder.svg?height=400&width=600",
    icon: "Search",
    slug: "website-optimization",
  },
  {
    id: 2,
    title: "Social Media Management",
    description:
      "Comprehensive social media strategy and management across all platforms to build your brand presence.",
    image: "/placeholder.svg?height=400&width=600",
    icon: "Share2",
    slug: "social-media-management",
  },
  {
    id: 3,
    title: "Performance Marketing",
    description: "Data-driven marketing campaigns focused on measurable results and maximum return on investment.",
    image: "/placeholder.svg?height=400&width=600",
    icon: "TrendingUp",
    slug: "performance-marketing",
  },
  {
    id: 4,
    title: "Email Marketing",
    description: "Strategic email campaigns that nurture leads, engage customers, and drive conversions.",
    image: "/placeholder.svg?height=400&width=600",
    icon: "Mail",
    slug: "email-marketing",
  },
  {
    id: 5,
    title: "Video Editing",
    description:
      "Professional video editing services to create compelling visual content for your marketing campaigns.",
    image: "/placeholder.svg?height=400&width=600",
    icon: "Video",
    slug: "video-editing",
  },
  {
    id: 6,
    title: "Local SEO",
    description:
      "Optimize your local search presence to attract customers in your area and dominate local search results.",
    image: "/placeholder.svg?height=400&width=600",
    icon: "Search",
    slug: "local-seo",
  },
  {
    id: 7,
    title: "Graphic Designing",
    description:
      "Creative graphic design solutions for all your marketing materials, from brochures to digital assets.",
    image: "/placeholder.svg?height=400&width=600",
    icon: "PenTool",
    slug: "graphic-designing",
  },
  {
    id: 8,
    title: "Content Marketing",
    description: "Strategic content creation and distribution to attract, engage, and convert your target audience.",
    image: "/placeholder.svg?height=400&width=600",
    icon: "Globe",
    slug: "content-marketing",
  },
]

// Fallback data
const FALLBACK_POSTS = [
  {
    id: 1,
    title: "Welcome to Nxtera Digital Blog",
    slug: "welcome-to-nxtera-digital-blog",
    excerpt:
      "Stay tuned for the latest insights and strategies in digital marketing. We'll be sharing valuable content to help your business grow.",
    content: `
      <p>Welcome to the Nxtera Digital blog! We're excited to share our expertise and insights with you.</p>
      
      <h2>What You Can Expect</h2>
      <p>Our blog will feature:</p>
      <ul>
        <li>Latest digital marketing trends and strategies</li>
        <li>SEO tips and best practices</li>
        <li>Social media marketing insights</li>
        <li>Case studies from successful campaigns</li>
        <li>Industry news and updates</li>
      </ul>
      
      <h2>Stay Connected</h2>
      <p>Subscribe to our newsletter to get the latest updates delivered directly to your inbox.</p>
    `,
    date: "December 26, 2024",
    author: "Nxtera Digital Team",
    authorImage: "/testimonial-1.png",
    image: "/hero-dashboard.png",
    category: "Company News",
    readTime: "3 min read",
  },
]

const FALLBACK_TESTIMONIALS = [
  {
    id: 1,
    quote: "We're excited to work with Nxtera Digital and look forward to sharing our success stories with you soon.",
    author: "Future Client",
    position: "Business Owner",
    avatar: "/testimonial-1.png",
  },
  {
    id: 2,
    quote:
      "Nxtera Digital's comprehensive approach to digital marketing aligns perfectly with our business objectives.",
    author: "Prospective Partner",
    position: "Marketing Director",
    avatar: "/testimonial-2.png",
  },
]

/**
 * Enhanced fetch with proper error handling
 */
async function fetchFromWordPress(endpoint: string, options: RequestInit = {}) {
  const url = `${WORDPRESS_API_URL}${endpoint}`

  console.log(`🔍 Fetching from WordPress: ${url}`)

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": "Nxtera-Digital-Website/1.0",
        ...options.headers,
      },
      // Add timeout
      signal: AbortSignal.timeout ? AbortSignal.timeout(15000) : undefined,
    })

    console.log(`📡 WordPress API Response: ${response.status} ${response.statusText}`)

    if (!response.ok) {
      throw new Error(`WordPress API Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log(`✅ WordPress data received:`, {
      endpoint,
      dataType: Array.isArray(data) ? "array" : typeof data,
      length: Array.isArray(data) ? data.length : "N/A",
    })

    return data
  } catch (error) {
    console.error(`❌ WordPress API Error for ${endpoint}:`, error)
    throw error
  }
}

/**
 * Get services for main page (hardcoded)
 */
export async function getServices() {
  console.log("📋 Loading services for main page (hardcoded)")
  return HARDCODED_SERVICES
}

/**
 * Get service details from WordPress
 */
export async function getServiceBySlug(slug: string) {
  console.log("🔍 Fetching service details from WordPress for slug:", slug)

  try {
    const services = await fetchFromWordPress(`/services?slug=${slug}&_embed&status=publish`)

    if (!Array.isArray(services) || services.length === 0) {
      console.log("⚠️ Service not found in WordPress, using hardcoded fallback")
      const hardcodedService = HARDCODED_SERVICES.find((service) => service.slug === slug)
      if (hardcodedService) {
        return {
          ...hardcodedService,
          content: `
            <h2>About ${hardcodedService.title}</h2>
            <p>${hardcodedService.description}</p>
            
            <h3>What's Included</h3>
            <ul>
              <li>Comprehensive strategy development</li>
              <li>Expert implementation and execution</li>
              <li>Regular monitoring and optimization</li>
              <li>Detailed reporting and analytics</li>
              <li>Ongoing support and consultation</li>
            </ul>
            
            <h3>Why Choose Nxtera Digital</h3>
            <p>With years of experience and a proven track record, our team delivers results that matter.</p>
            
            <p><strong>Note:</strong> This content can be customized by creating a service with the slug "${slug}" in your WordPress admin.</p>
          `,
        }
      }
      return null
    }

    return formatService(services[0])
  } catch (error) {
    console.warn("❌ Error fetching service from WordPress:", error)
    const hardcodedService = HARDCODED_SERVICES.find((service) => service.slug === slug)
    if (hardcodedService) {
      return {
        ...hardcodedService,
        content: `
          <h2>About ${hardcodedService.title}</h2>
          <p>${hardcodedService.description}</p>
          
          <p><strong>Note:</strong> WordPress content not available. Please check your WordPress setup.</p>
        `,
      }
    }
    return null
  }
}

/**
 * Fetch posts from WordPress
 */
export async function getPosts(page = 1, perPage = 10) {
  console.log("🔍 Fetching posts from WordPress...")

  try {
    const posts = await fetchFromWordPress(`/posts?_embed&page=${page}&per_page=${perPage}&status=publish`)

    if (!Array.isArray(posts) || posts.length === 0) {
      console.log("⚠️ No posts found, using fallback")
      return FALLBACK_POSTS.slice(0, perPage)
    }

    return posts.map(formatPost)
  } catch (error) {
    console.warn("❌ Error fetching posts from WordPress, using fallback:", error)
    return FALLBACK_POSTS.slice(0, perPage)
  }
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string) {
  console.log("🔍 Fetching post by slug:", slug)

  try {
    const posts = await fetchFromWordPress(`/posts?slug=${slug}&_embed&status=publish`)

    if (!Array.isArray(posts) || posts.length === 0) {
      console.log("⚠️ Post not found, using fallback")
      return FALLBACK_POSTS.find((post) => post.slug === slug) || null
    }

    return formatPost(posts[0])
  } catch (error) {
    console.warn("❌ Error fetching post from WordPress, using fallback:", error)
    return FALLBACK_POSTS.find((post) => post.slug === slug) || null
  }
}

/**
 * Fetch testimonials from WordPress
 */
export async function getTestimonials() {
  console.log("🔍 Fetching testimonials from WordPress...")

  try {
    const testimonials = await fetchFromWordPress(`/testimonials?_embed&per_page=100&status=publish`)

    if (!Array.isArray(testimonials) || testimonials.length === 0) {
      console.log("⚠️ No testimonials found in WordPress, using fallback testimonials")
      return FALLBACK_TESTIMONIALS
    }

    const formattedTestimonials = testimonials.map(formatTestimonial)
    console.log("✅ Formatted testimonials:", formattedTestimonials.length)
    return formattedTestimonials
  } catch (error) {
    console.warn("❌ Error fetching testimonials from WordPress:", error)
    console.log("🔄 Using fallback testimonials")
    return FALLBACK_TESTIMONIALS
  }
}

/**
 * Format WordPress post data
 */
function formatPost(post: any) {
  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0]

  return {
    id: post.id,
    title: post.title.rendered,
    slug: post.slug,
    excerpt: post.excerpt.rendered,
    content: post.content.rendered,
    date: new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    author: post._embedded?.["author"]?.[0]?.name || "Nxtera Digital Team",
    authorImage: post._embedded?.["author"]?.[0]?.avatar_urls?.["96"] || "/testimonial-1.png",
    image: featuredMedia?.source_url || "/hero-dashboard.png",
    category: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Digital Marketing",
    readTime: `${Math.ceil(post.content.rendered.split(" ").length / 200)} min read`,
  }
}

/**
 * Format WordPress service data
 */
function formatService(service: any) {
  const featuredMedia = service._embedded?.["wp:featuredmedia"]?.[0]
  const acfFields = service.acf || {}

  return {
    id: service.id,
    title: service.title.rendered,
    slug: service.slug,
    description: service.excerpt?.rendered
      ? service.excerpt.rendered.replace(/<\/?p>/g, "")
      : service.content.rendered.replace(/<[^>]*>/g, "").substring(0, 200) + "...",
    content: service.content.rendered,
    image: featuredMedia?.source_url || "/placeholder.svg",
    icon: acfFields.icon || "Search",
  }
}

/**
 * Format WordPress testimonial data
 */
function formatTestimonial(testimonial: any) {
  const acfFields = testimonial.acf || {}

  return {
    id: testimonial.id,
    quote: testimonial.content.rendered.replace(/<\/?p>/g, ""),
    author: testimonial.title.rendered,
    position: acfFields.position || "Valued Client",
    avatar: acfFields.avatar || "/testimonial-1.png",
  }
}

/**
 * Fetch company information
 */
export async function getCompanyInfo() {
  const fallbackInfo = {
    name: "Nxtera Digital",
    email: "nxteradigital1@gmail.com",
    phone: "+91 98710 75649",
    phone2: "+91 96502 97063",
  }

  try {
    const data = await fetchFromWordPress(`/company-info`)
    return { ...fallbackInfo, ...data }
  } catch (error) {
    console.warn("❌ Error fetching company info from WordPress, using fallback:", error)
    return fallbackInfo
  }
}

/**
 * Test WordPress API connectivity
 */
export async function testWordPressAPI() {
  const tests = [
    { name: "WordPress API Root", url: "" },
    { name: "Posts Endpoint", url: "/posts" },
    { name: "Services Endpoint", url: "/services" },
    { name: "Testimonials Endpoint", url: "/testimonials" },
  ]

  const results = []

  for (const test of tests) {
    try {
      const data = await fetchFromWordPress(test.url)
      results.push({
        name: test.name,
        url: `${WORDPRESS_API_URL}${test.url}`,
        ok: true,
        data: Array.isArray(data) ? `Array with ${data.length} items` : typeof data,
      })
    } catch (error) {
      results.push({
        name: test.name,
        url: `${WORDPRESS_API_URL}${test.url}`,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      })
    }
  }

  return results
}
