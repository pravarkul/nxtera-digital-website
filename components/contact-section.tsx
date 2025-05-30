"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log("Submitting form data:", formData)

      // Submit to Google Sheets
      await submitToGoogleSheets(formData)

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      })

      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      })
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly at nxteradigital1@gmail.com",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Contact Us
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Ready to take your marketing to the next level? Contact us today for a free consultation.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and our team will get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Your company name"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project and how we can help..."
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-[120px]"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </CardContent>
          </Card>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Reach out to us directly using the information below.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Email</h3>
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
                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <a href="tel:+919871075649" className="text-sm text-muted-foreground hover:text-primary block">
                      +91 98710 75649
                    </a>
                    <a href="tel:+919650297063" className="text-sm text-muted-foreground hover:text-primary block">
                      +91 96502 97063
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
                <CardDescription>We're available during the following hours.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Monday - Friday</span>
                  <span className="text-sm text-muted-foreground">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Saturday</span>
                  <span className="text-sm text-muted-foreground">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Sunday</span>
                  <span className="text-sm text-muted-foreground">Closed</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

// Function to submit to Google Sheets with your updated URL
async function submitToGoogleSheets(formData: any) {
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzDFMAagH97EwoIfrSDAuRM4NFhUh9eyakkNnzHLp8yssXY9MUE6AoXGHKcWIedhEU/exec"

  try {
    console.log("Submitting to Google Sheets:", GOOGLE_SCRIPT_URL)

    // Create URL-encoded form data
    const params = new URLSearchParams()
    params.append("name", formData.name)
    params.append("email", formData.email)
    params.append("company", formData.company || "Not provided")
    params.append("message", formData.message)
    params.append("timestamp", new Date().toISOString())

    console.log("Form params:", params.toString())

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
      mode: "no-cors", // Important for Google Apps Script
    })

    console.log("Google Sheets response received")

    // With no-cors mode, we can't check response status
    // We assume success if no error is thrown
    return { success: true }
  } catch (error) {
    console.error("Google Sheets submission error:", error)
    throw error
  }
}
