"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
import { useState } from "react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prevent multiple submissions
    if (isSubmitting || hasSubmitted) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setHasSubmitted(true)

    try {
      // Import EmailJS dynamically
      const emailjs = await import('@emailjs/browser')
      
      console.log('Initializing EmailJS...')
      
      // Initialize EmailJS with your public key
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'ZvrnwhhaVfOor3MMp')
      
      console.log('Sending contact form email...')
      
      // Send contact form email to you
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_rel23wq',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_c07guav',
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }
      )
      
      console.log('Contact email sent successfully:', result)

      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset submission flag after 5 seconds to allow new submissions
      setTimeout(() => {
        setHasSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error('Error sending email:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      setSubmitStatus('error')
      setHasSubmitted(false) // Allow retry on error
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 px-6 section-professional">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Get In <span className="text-gradient">Touch</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-600 rounded-full">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Email</div>
                  <div className="text-white">anand.firm.dev@gmail.com</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-600 rounded-full">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Phone</div>
                  <div className="text-white">+91 82359230XX</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-600 rounded-full">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Location</div>
                  <div className="text-white">Ranchi, India</div>
                </div>
              </div>
            </div>

            <Card className="professional-card p-8">
            <CardContent className="p-0">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-white">Send Message</h3>
                <Badge variant="outline" className="border-green-400/30 text-green-400">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Available
                </Badge>
              </div>
              <Alert className="mb-6 bg-blue-900/20 border-blue-400/30">
                <Mail className="h-4 w-4" />
                <AlertDescription className="text-blue-300">
                  I typically respond within 24 hours. Let's discuss your project!
                </AlertDescription>
              </Alert>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Project Discussion"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-300">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 resize-none"
                  />
                </div>
                
                {submitStatus === 'success' && (
                    <div className="text-green-400 text-sm bg-green-400/10 border border-green-400/20 rounded-lg p-3">
                      ✅ Thanks for connecting! Your message has been sent successfully. I'll get back to you soon.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="text-red-400 text-sm">
                      Failed to send message. Please try again.
                    </div>
                  )}
                  
                <Separator className="bg-gray-700" />
                <Button 
                    type="submit"
                    disabled={isSubmitting || hasSubmitted}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : hasSubmitted ? 'Message Sent!' : 'Send Message'}
                  </Button>
              </form>
            </CardContent>
          </Card>
          </div>

          <div className="h-96 bg-gray-800 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.1234567890123!2d85.4376761!3d23.4126761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e11c7c4c0001%3A0x1c4c0001c4c0001!2sBirmesra%2C%20Ranchi%2C%20Jharkhand%2C%20India!5e0!3m2!1sen!2sin!4v1673000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale"
            />
          </div>
        </div>
      </div>
    </section>
  )
}