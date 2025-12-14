import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Send } from "lucide-react"
import { Link } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileMenu } from "@/components/MobileMenu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

export function ContactForm() {
  const [formData, setFormData] = useState({
    spaType: "",
    companySize: "",
    companyName: "",
    contactName: "",
    contactEmail: "",
    existingWebsite: "",
    companyUrl: "",
    existingGHAccount: "",
    githubUsername: "",
    domainDNSAccess: "",
    projectTimeline: "",
    budget: "",
    additionalInfo: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.spaType || !formData.companySize || !formData.companyName || 
        !formData.contactName || !formData.contactEmail || !formData.existingWebsite ||
        !formData.existingGHAccount || !formData.domainDNSAccess || 
        !formData.projectTimeline || !formData.budget) {
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Get Formspree endpoint from environment variable
      const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/YOUR_FORM_ID"
      
      // Send all fields individually so Formspree can use them in email templates
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Standard Formspree fields
          email: formData.contactEmail,
          name: formData.contactName,
          subject: `New Site Request: ${formData.spaType}`,
          _replyto: formData.contactEmail,
          
          // Custom form fields (Formspree will include all of these in the email)
          spaType: formData.spaType,
          companySize: formData.companySize,
          companyName: formData.companyName,
          contactEmail: formData.contactEmail,
          existingWebsite: formData.existingWebsite,
          companyUrl: formData.companyUrl || "",
          existingGHAccount: formData.existingGHAccount,
          githubUsername: formData.githubUsername || "",
          domainDNSAccess: formData.domainDNSAccess,
          projectTimeline: formData.projectTimeline,
          budget: formData.budget,
          additionalInfo: formData.additionalInfo || "",
        }),
      })

      if (response.ok || response.status === 204) {
        setSubmitStatus("success")
        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitStatus("idle")
          setFormData({
            spaType: "",
            companySize: "",
            companyName: "",
            contactName: "",
            contactEmail: "",
            existingWebsite: "",
            companyUrl: "",
            existingGHAccount: "",
            githubUsername: "",
            domainDNSAccess: "",
            projectTimeline: "",
            budget: "",
            additionalInfo: "",
          })
        }, 3000)
      } else {
        const errorText = await response.text()
        console.error("GitHub API error:", response.status, errorText)
        throw new Error("Failed to submit form")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
      setTimeout(() => {
        setSubmitStatus("idle")
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Navigation */}
      <motion.nav 
        className="container mx-auto px-4 py-3 sm:py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="brand-wrapper flex-shrink-0">
            <img 
              src="/logo.svg" 
              alt="Unstacked Apps" 
              className="brand-logo"
            />
            <div className="brand-container">
              <span className="brand-name">
                <span className="brand-name-thin">un</span>stacked
              </span>
              <span className="brand-subtitle">apps</span>
            </div>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Button variant="outline" size="sm" className="sm:size-default whitespace-nowrap" asChild>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
            <div className="md:hidden flex items-center gap-2">
              <MobileMenu />
              <Button variant="outline" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Header */}
      <motion.section 
        className="container mx-auto px-4 py-8 sm:py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1 
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/60 to-foreground/30"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            Request a Custom Site
          </motion.h1>
          <motion.p 
            className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground px-2"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            Tell us about your project and we'll get back to you soon
          </motion.p>
        </div>
      </motion.section>

      {/* Form */}
      <motion.section 
        className="container mx-auto px-4 pb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Project Details</CardTitle>
              <CardDescription>
                Fill out the form below and we'll reach out to discuss your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* SPA Type */}
                <div className="space-y-2">
                  <Label htmlFor="spaType">What type of site are you looking for? *</Label>
                  <Select value={formData.spaType} onValueChange={(value) => handleChange("spaType", value)}>
                    <SelectTrigger id="spaType">
                      <SelectValue placeholder="Select a site type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="company-landing">Company Landing Page</SelectItem>
                      <SelectItem value="professional-resume">Professional Résumé</SelectItem>
                      <SelectItem value="portfolio">Portfolio</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Company Size */}
                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size *</Label>
                  <Select value={formData.companySize} onValueChange={(value) => handleChange("companySize", value)}>
                    <SelectTrigger id="companySize">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual / Freelancer</SelectItem>
                      <SelectItem value="startup">Startup (1-10 employees)</SelectItem>
                      <SelectItem value="small">Small Business (11-50 employees)</SelectItem>
                      <SelectItem value="medium">Medium Business (51-200 employees)</SelectItem>
                      <SelectItem value="large">Large Business (200+ employees)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company / Organization Name *</Label>
                  <Input
                    id="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleChange("companyName", e.target.value)}
                    placeholder="Your company or organization name"
                    required
                  />
                </div>

                {/* Contact Name */}
                <div className="space-y-2">
                  <Label htmlFor="contactName">Your Name *</Label>
                  <Input
                    id="contactName"
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => handleChange("contactName", e.target.value)}
                    placeholder="Full name"
                    required
                  />
                </div>

                {/* Contact Email */}
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Your Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleChange("contactEmail", e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                {/* Existing Website */}
                <div className="space-y-3">
                  <Label>Do you have an existing website? *</Label>
                  <RadioGroup 
                    value={formData.existingWebsite} 
                    onValueChange={(value) => handleChange("existingWebsite", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="website-yes" />
                      <Label htmlFor="website-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="website-no" />
                      <Label htmlFor="website-no" className="font-normal cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Company URL (conditional) */}
                {formData.existingWebsite === "yes" && (
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="companyUrl">Current Website URL</Label>
                    <Input
                      id="companyUrl"
                      type="url"
                      value={formData.companyUrl}
                      onChange={(e) => handleChange("companyUrl", e.target.value)}
                      placeholder="https://example.com"
                    />
                  </motion.div>
                )}

                {/* Existing GitHub Account */}
                <div className="space-y-3">
                  <Label>Do you have an existing GitHub account? *</Label>
                  <RadioGroup 
                    value={formData.existingGHAccount} 
                    onValueChange={(value) => handleChange("existingGHAccount", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="gh-yes" />
                      <Label htmlFor="gh-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="gh-no" />
                      <Label htmlFor="gh-no" className="font-normal cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* GitHub Username (conditional) */}
                {formData.existingGHAccount === "yes" && (
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="githubUsername">GitHub Username</Label>
                    <Input
                      id="githubUsername"
                      type="text"
                      value={formData.githubUsername}
                      onChange={(e) => handleChange("githubUsername", e.target.value)}
                      placeholder="your-github-username"
                    />
                  </motion.div>
                )}

                {/* Domain DNS Access */}
                <div className="space-y-2">
                  <Label htmlFor="domainDNSAccess">Do you have access to your domain's DNS settings? *</Label>
                  <Select value={formData.domainDNSAccess} onValueChange={(value) => handleChange("domainDNSAccess", value)}>
                    <SelectTrigger id="domainDNSAccess">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, I have full access</SelectItem>
                      <SelectItem value="limited">Limited access (I can request changes)</SelectItem>
                      <SelectItem value="no">No access</SelectItem>
                      <SelectItem value="unsure">I'm not sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Project Timeline */}
                <div className="space-y-2">
                  <Label htmlFor="projectTimeline">Project Timeline *</Label>
                  <Select value={formData.projectTimeline} onValueChange={(value) => handleChange("projectTimeline", value)}>
                    <SelectTrigger id="projectTimeline">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">ASAP / Urgent</SelectItem>
                      <SelectItem value="1-month">Within 1 month</SelectItem>
                      <SelectItem value="2-3-months">2-3 months</SelectItem>
                      <SelectItem value="3-6-months">3-6 months</SelectItem>
                      <SelectItem value="flexible">Flexible / No rush</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range *</Label>
                  <Select value={formData.budget} onValueChange={(value) => handleChange("budget", value)}>
                    <SelectTrigger id="budget">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-5k">Under $5,000</SelectItem>
                      <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                      <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                      <SelectItem value="50k-plus">$50,000+</SelectItem>
                      <SelectItem value="discuss">Prefer to discuss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Additional Info */}
                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={(e) => handleChange("additionalInfo", e.target.value)}
                    placeholder="Tell us more about your project, specific requirements, or any questions you have..."
                    rows={5}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full sm:w-auto"
                    disabled={isSubmitting || submitStatus === "success"}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2">Sending...</span>
                      </>
                    ) : submitStatus === "success" ? (
                      <>
                        <span className="mr-2">✓</span>
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Request
                      </>
                    )}
                  </Button>
                  {submitStatus === "success" && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-green-600 dark:text-green-400 flex items-center"
                    >
                      We'll be in touch soon!
                    </motion.p>
                  )}
                  {submitStatus === "error" && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-600 dark:text-red-400 flex items-center"
                    >
                      Something went wrong. Please try again or email us directly.
                    </motion.p>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.section>
    </div>
  )
}

