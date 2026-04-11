import React, { useState } from 'react'
import emailjs from '@emailjs/browser'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    interest: 'Luxury Residential',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState({ type: '', message: '' }) // 'success', 'error', 'warning'

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Clear previous status
    setFormStatus({ type: '', message: '' })
    
    // Validate required fields
    if (!formData.firstName.trim()) {
      setFormStatus({ type: 'error', message: 'Please enter your first name' })
      return
    }
    
    if (!formData.lastName.trim()) {
      setFormStatus({ type: 'error', message: 'Please enter your last name' })
      return
    }
    
    if (!formData.email.trim()) {
      setFormStatus({ type: 'error', message: 'Please enter your email address' })
      return
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setFormStatus({ type: 'error', message: 'Please enter a valid email address' })
      return
    }
    
    if (!formData.message.trim()) {
      setFormStatus({ type: 'error', message: 'Please enter your message' })
      return
    }
    
    setIsSubmitting(true)
    
    //From .env file
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    
    //Template parameters
    const templateParams = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      interest: formData.interest,
      message: formData.message,
      to_email: 'blazehorizonrealty@gmail.com'
    }
    
    try {
      const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      console.log('Email sent successfully:', response)
      
      // Show success message
      setFormStatus({ 
        type: 'success', 
        message: '✓ Message sent successfully! We will get back to you soon.' 
      })
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        interest: 'Luxury Residential',
        message: ''
      })
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus({ type: '', message: '' })
      }, 5000)
      
    } catch (error) {
      console.error('Error sending email:', error)
      
      // Show error message
      setFormStatus({ 
        type: 'error', 
        message: '✗ Failed to send message. Please try again or contact us directly via email.' 
      })
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setFormStatus({ type: '', message: '' })
      }, 5000)
      
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Email click handler - Opens Gmail web directly
  const handleEmailClick = (emailAddress, subject = '') => {
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodeURIComponent(subject)}`
    window.open(gmailLink, '_blank')
  }

  // Address click handler - Opens Google Maps
  const handleAddressClick = () => {
    const address = encodeURIComponent('Level 12, Kingdom Towers, Lekki Phase 1, Lagos, Nigeria')
    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${address}`
    window.open(googleMapsLink, '_blank')
  }

  return (
    <div className="min-h-screen pt-24 flex items-center ">
      <section className="py-16 px-6 bg-white w-full ">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center ">
          
          {/* Left Side - Contact Info */}
          <div>
            <span className="text-brand-yellow text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Let's Secure <br/> Your <span className="text-brand-yellow">Future</span>
            </h2>
            <p className="text-gray-600 mb-10 leading-relaxed">
              Ready to take the next step? Our consultants are standing by to guide you through our portfolio and investment options.
            </p>
            
            <div className="space-y-8">
              {/* Corporate Office - Now clickable */}
              <button className="flex items-start text-left w-full" onClick={handleAddressClick}>
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mr-5 flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-widest mb-2 text-gray-900">Corporate Office</h4>
                  <p className="text-gray-500 text-sm leading-relaxed hover:text-brand-yellow transition-colors">
                    Level 12, Kingdom Towers, <br /> Lekki Phase 1, Lagos, Nigeria.
                  </p>
                </div>
              </button>

              {/* Call Us */}
              <button className="flex items-start">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mr-5 flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-start font-black text-xs uppercase tracking-widest mb-2 text-gray-900">Call Us</h4>
                  <p className="text-gray-500 text-sm">
                    <a href="tel:+234 812 320 9188" className="hover:text-brand-yellow transition-colors">
                      +234 812 320 9188
                    </a>                    
                  </p>
                </div>
              </button>

              {/* Email Us - Opens Gmail directly */}
              <button className="flex items-start" onClick={() => handleEmailClick('blazehorizonrealty@gmail.com', 'Property Inquiry')}>
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mr-5 flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-start font-black text-xs uppercase tracking-widest mb-2 text-gray-900">Email Us</h4>
                  <p className="text-gray-500 text-sm">
                    <button                       
                      className="hover:text-brand-yellow transition-colors cursor-pointer block text-left"
                    >
                      blazehorizonrealty@gmail.com
                    </button>
                  </p>
                </div>
              </button>
            </div>

            {/* Map Placeholder */}
            <div className="mt-10 bg-gray-100 h-48 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Interactive Map View
              </div>
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=40" 
                className="w-full h-full object-cover opacity-30 grayscale" 
                alt="Map"
              />
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-gray-50 p-8 lg:p-12 rounded-2xl bg-Background02 bg-no-repeat bg-cover items-center flex flex-col">
            <h3 className="text-2xl font-black mb-20 text-gray-900 underline-offset-2 underline">Send a Message</h3>
            
            {/* Status Message Display */}
            {formStatus.message && (
              <div className={`mb-6 p-4 rounded-xl w-full ${
                formStatus.type === 'success' 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : formStatus.type === 'error'
                  ? 'bg-red-100 text-red-700 border border-red-200'
                  : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
              }`}>
                {formStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5 w-full">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[15px] text-[#fa8e12] font-black uppercase tracking-wides mb-2">First Name *</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John" 
                    className="w-full bg-white outline-none shadow-lg py-3 px-5 rounded-xl focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[15px] text-[#fa8e12] font-black uppercase tracking-widest mb-2">Last Name *</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe" 
                    className="w-full shadow-lg bg-white outline-none py-3 px-5 rounded-xl focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-[15px] text-[#fa8e12] font-black uppercase tracking-widest mb-2">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com" 
                  className="w-full shadow-lg bg-white outline-none py-3 px-5 rounded-xl focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-[15px] text-[#fa8e12] font-black uppercase tracking-widest mb-2">Interest Type</label>
                <select 
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full shadow-lg bg-white outline-none py-3 px-5 rounded-xl focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all appearance-none cursor-pointer"
                >
                  <option>Luxury Residential</option>
                  <option>Commercial Land</option>
                  <option>Investment Advisory</option>
                  <option>Property Management</option>
                </select>
              </div>
              <div>
                <label className="block text-[15px] text-[#fa8e12] font-black uppercase tracking-widest mb-2">Message *</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4" 
                  placeholder="How can we help you?" 
                  className="w-full shadow-lg outline-none bg-white border py-3 px-5 rounded-xl focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all resize-none"
                  required
                ></textarea>
              </div>              
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full mt-10 text-white font-black uppercase tracking-widest py-4 rounded-xl transition-all duration-300 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-orange-400 hover:scale-[1.02]'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Request a Callback'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage