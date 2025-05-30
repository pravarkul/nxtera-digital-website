/**
 * WordPress API utilities - Hybrid approach
 * - Services list: Hardcoded for main page
 * - Service details: From WordPress
 * - Blog posts: From WordPress
 * - Testimonials: From WordPress
 */

// Create a timeout signal for fetch requests
function createTimeoutSignal(timeoutMs: number): AbortSignal {
  const controller = new AbortController()
  setTimeout(() => controller.abort(), timeoutMs)
  return controller.signal
}

// WordPress API URL
const WORDPRESS_API_URL = "https://nxteradigital.com/wp/wp-json/wp/v2"

// Hardcoded services for main page display only
const HARDCODED_SERVICES = [
  {
    id: 1,
    title: "Website Optimization",
    description:
      "Improve your website's performance, speed, and user experience to increase conversions and search rankings.",
    image: "/website-optimization.png",
    icon: "Search",
    slug: "website-optimization",
  },
  {
    id: 2,
    title: "Social Media Management",
    description:
      "Comprehensive social media strategy and management across all platforms to build your brand presence.",
    image: "/social-media.png",
    icon: "Share2",
    slug: "social-media-management",
  },
  {
    id: 3,
    title: "Performance Marketing",
    description: "Data-driven marketing campaigns focused on measurable results and maximum return on investment.",
    image: "/performance-marketing.png",
    icon: "TrendingUp",
    slug: "performance-marketing",
  },
  {
    id: 4,
    title: "Email Marketing",
    description: "Strategic email campaigns that nurture leads, engage customers, and drive conversions.",
    image: "/email-marketing.png",
    icon: "Mail",
    slug: "email-marketing",
  },
  {
    id: 5,
    title: "Video Editing",
    description:
      "Professional video editing services to create compelling visual content for your marketing campaigns.",
    image: "/video-editing.png",
    icon: "Video",
    slug: "video-editing",
  },
  {
    id: 6,
    title: "Local SEO",
    description:
      "Optimize your local search presence to attract customers in your area and dominate local search results.",
    image: "/local-seo.png",
    icon: "Search",
    slug: "local-seo",
  },
  {
    id: 7,
    title: "Graphic Designing",
    description:
      "Creative graphic design solutions for all your marketing materials, from brochures to digital assets.",
    image: "/graphic-design.png",
    icon: "PenTool",
    slug: "graphic-designing",
  },
  {
    id: 8,
    title: "Content Marketing",
    description: "Strategic content creation and distribution to attract, engage, and convert your target audience.",
    image: "/content-marketing.png",
    icon: "Globe",
    slug: "content-marketing",
  },
]

// Fallback data for when WordPress is not available
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
      <p>Subscribe to our newsletter to get the latest updates delivered directly to your inbox. We're committed to providing valuable content that helps your business succeed in the digital landscape.</p>
      
      <p>Have questions or topics you'd like us to cover? Feel free to reach out to us!</p>
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
    quote:
      "We're excited to work with Nxtera Digital and look forward to sharing our success stories with you soon. Their professional approach and expertise give us confidence in achieving our marketing goals.",
    author: "Future Client",
    position: "Business Owner",
    avatar: "/testimonial-1.png",
  },
  {
    id: 2,
    quote:
      "Nxtera Digital's comprehensive approach to digital marketing aligns perfectly with our business objectives. We're eager to see the results of our partnership.",
    author: "Prospective Partner",
    position: "Marketing Director",
    avatar: "/testimonial-2.png",
  },
]

/**
 * Fetch with proper error handling and CORS support
 */
async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 2): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...options.headers,
        },
      })

      if (response.ok) {
        return response
      }

      if (i === retries - 1) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      if (i === retries - 1) {
        throw error
      }
      // Wait before retry
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)))
    }
  }

  throw new Error("Max retries exceeded")
}

/**
 * Get services for main page display (always returns hardcoded data)
 */
export async function getServices() {
  console.log("📋 Loading services for main page (hardcoded)")
  return HARDCODED_SERVICES
}

/**
 * Get service details from WordPress for individual service pages
 */
export async function getServiceBySlug(slug: string) {
  console.log("🔍 Fetching service details from WordPress for slug:", slug)

  try {
    const url = `${WORDPRESS_API_URL}/services?slug=${slug}&_embed&status=publish&_=${Date.now()}`
    console.log("📡 Service URL:", url)

    const response = await fetchWithRetry(url, {
      signal: createTimeoutSignal(10000),
    })

    const services = await response.json()
    console.log("✅ Service search result:", services.length > 0 ? "Found" : "Not found")

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
            <p>With years of experience and a proven track record, our team delivers results that matter. We combine industry best practices with innovative approaches to ensure your success.</p>
            
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
          
          <h3>What's Included</h3>
          <ul>
            <li>Comprehensive strategy development</li>
            <li>Expert implementation and execution</li>
            <li>Regular monitoring and optimization</li>
            <li>Detailed reporting and analytics</li>
            <li>Ongoing support and consultation</li>
          </ul>
          
          <h3>Why Choose Nxtera Digital</h3>
          <p>With years of experience and a proven track record, our team delivers results that matter. We combine industry best practices with innovative approaches to ensure your success.</p>
          
          <p><strong>Note:</strong> This content can be customized by creating a service with the slug "${slug}" in your WordPress admin.</p>
        `,
      }
    }
    return null
  }
}

/**
 * Fetch posts from WordPress with fallback
 */
export async function getPosts(page = 1, perPage = 10) {
  console.log("🔍 Fetching posts from WordPress...")

  try {
    const url = `${WORDPRESS_API_URL}/posts?_embed&page=${page}&per_page=${perPage}&status=publish&_=${Date.now()}`
    console.log("📡 Posts URL:", url)

    const response = await fetchWithRetry(url, {
      signal: createTimeoutSignal(10000),
    })

    const posts = await response.json()
    console.log("✅ Posts fetched successfully:", posts.length, "posts")

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
 * Fetch a single post by slug with fallback
 */
export async function getPostBySlug(slug: string) {
  console.log("🔍 Fetching post by slug:", slug)

  try {
    const url = `${WORDPRESS_API_URL}/posts?slug=${slug}&_embed&status=publish&_=${Date.now()}`
    console.log("📡 Post URL:", url)

    const response = await fetchWithRetry(url, {
      signal: createTimeoutSignal(10000),
    })

    const posts = await response.json()
    console.log("✅ Post search result:", posts.length > 0 ? "Found" : "Not found")

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
 * Fetch testimonials from WordPress with fallback
 */
export async function getTestimonials() {
  console.log("🔍 Fetching testimonials from WordPress...")

  try {
    const url = `${WORDPRESS_API_URL}/testimonials?_embed&per_page=100&status=publish&_=${Date.now()}`
    console.log("📡 Testimonials URL:", url)

    const response = await fetchWithRetry(url, {
      signal: createTimeoutSignal(10000),
    })

    const testimonials = await response.json()
    console.log("✅ Testimonials API response:", {
      isArray: Array.isArray(testimonials),
      length: Array.isArray(testimonials) ? testimonials.length : 0,
    })

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

  console.log("🔧 Formatting service:", {
    id: service.id,
    title: service.title?.rendered,
    acf: acfFields,
    featuredMedia: featuredMedia?.source_url,
  })

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

  console.log("🔧 Formatting testimonial:", {
    id: testimonial.id,
    title: testimonial.title?.rendered,
    acf: acfFields,
  })

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
    const response = await fetchWithRetry(`${WORDPRESS_API_URL}/company-info`, {
      signal: createTimeoutSignal(5000),
    })

    const data = await response.json()
    return { ...fallbackInfo, ...data }
  } catch (error) {
    console.warn("❌ Error fetching company info from WordPress, using fallback:", error)
    return fallbackInfo
  }
}
