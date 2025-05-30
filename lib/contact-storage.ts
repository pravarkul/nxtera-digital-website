/**
 * Contact form storage utilities
 */

export interface ContactSubmission {
  id?: string
  name: string
  email: string
  company?: string
  message: string
  submittedAt: string
  status: "new" | "read" | "replied"
}

/**
 * Store contact submission in WordPress
 */
export async function storeInWordPress(formData: ContactSubmission) {
  try {
    const wpApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL
    if (!wpApiUrl) {
      throw new Error("WordPress API not configured")
    }

    const response = await fetch(`${wpApiUrl}/contact-submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `Contact: ${formData.name} - ${formData.email}`,
        content: formatContactContent(formData),
        status: "publish",
        meta: {
          contact_name: formData.name,
          contact_email: formData.email,
          contact_company: formData.company,
          contact_status: formData.status,
          submitted_at: formData.submittedAt,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`)
    }

    const result = await response.json()
    return { success: true, id: result.id }
  } catch (error) {
    console.error("WordPress storage error:", error)
    throw error
  }
}

/**
 * Store contact submission in local storage (fallback)
 */
export function storeInLocalStorage(formData: ContactSubmission) {
  try {
    const submissions = getLocalSubmissions()
    const newSubmission = {
      ...formData,
      id: Date.now().toString(),
    }

    submissions.push(newSubmission)
    localStorage.setItem("contact_submissions", JSON.stringify(submissions))

    return { success: true, id: newSubmission.id }
  } catch (error) {
    console.error("Local storage error:", error)
    throw error
  }
}

/**
 * Get submissions from local storage
 */
export function getLocalSubmissions(): ContactSubmission[] {
  try {
    const stored = localStorage.getItem("contact_submissions")
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error reading local storage:", error)
    return []
  }
}

/**
 * Format contact content for WordPress
 */
function formatContactContent(formData: ContactSubmission): string {
  return `
    <div class="contact-submission">
      <h3>Contact Form Submission</h3>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
      <p><strong>Company:</strong> ${formData.company || "Not provided"}</p>
      <p><strong>Submitted:</strong> ${formData.submittedAt}</p>
      <h4>Message:</h4>
      <div class="message-content">
        ${formData.message.replace(/\n/g, "<br>")}
      </div>
    </div>
  `
}

/**
 * Send email notification
 */
export async function sendEmailNotification(formData: ContactSubmission) {
  // Using Formspree for email notifications
  const formspreeEndpoint = "https://formspree.io/f/YOUR_FORM_ID"

  try {
    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
        _subject: `New Contact Form Submission from ${formData.name}`,
        _replyto: formData.email,
      }),
    })

    if (!response.ok) {
      throw new Error("Email notification failed")
    }

    return { success: true }
  } catch (error) {
    console.error("Email notification error:", error)
    throw error
  }
}
