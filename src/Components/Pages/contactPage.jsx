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
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    setFormStatus({ type: '', message: '' })
    
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
    
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    
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
      
      setFormStatus({ 
        type: 'success', 
        message: '✓ Message sent successfully! We will get back to you soon.' 
      })
      
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        interest: 'Luxury Residential',
        message: ''
      })
      
      setTimeout(() => {
        setFormStatus({ type: '', message: '' })
      }, 5000)
      
    } catch (error) {
      console.error('Error sending email:', error)
      
      setFormStatus({ 
        type: 'error', 
        message: '✗ Failed to send message. Please try again or contact us directly via email.' 
      })
      
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

  const handleEmailClick = (emailAddress, subject = '') => {
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodeURIComponent(subject)}`
    window.open(gmailLink, '_blank')
  }

  const handleAddressClick = () => {
    const address = encodeURIComponent('41, diya street, Gbagada Lagos, Nigeria')
    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${address}`
    window.open(googleMapsLink, '_blank')
  }

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16">
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-white w-full">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
          
          {/* Left Side - Contact Info */}
          <div className="order-2 lg:order-1">
            <span className="text-brand-yellow text-[8px] sm:text-[9px] md:text-[10px] font-black tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-3 sm:mb-4 block">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">
              Let's Secure <br className="hidden sm:block"/> Your <span className="text-brand-yellow">Future</span>
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 md:mb-10 leading-relaxed text-sm sm:text-base">
              Ready to take the next step? Our consultants are standing by to guide you through our portfolio and investment options.
            </p>
            
            <div className="space-y-6 sm:space-y-8">
              {/* Corporate Office */}
              <button className="flex items-start text-left w-full group" onClick={handleAddressClick}>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 rounded-full flex items-center justify-center mr-3 sm:mr-5 flex-shrink-0 group-hover:bg-brand-yellow/10 transition-colors">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-[10px] sm:text-xs uppercase tracking-widest mb-1 sm:mb-2 text-gray-900">Corporate Office</h4>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed hover:text-brand-yellow transition-colors">
                    Level 12, Kingdom Towers, <br /> Lekki Phase 1, Lagos, Nigeria.
                  </p>
                </div>
              </button>

              {/* Call Us */}
              <div className="flex items-start">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 rounded-full flex items-center justify-center mr-3 sm:mr-5 flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-[10px] sm:text-xs uppercase tracking-widest mb-1 sm:mb-2 text-gray-900">Call Us</h4>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    <a href="tel:+2348123209188" className="hover:text-brand-yellow transition-colors">
                      +234 812 320 9188
                    </a>                    
                  </p>
                </div>
              </div>

              {/* Email Us */}
              <button className="flex items-start w-full group" onClick={() => handleEmailClick('blazehorizonrealty@gmail.com', 'Property Inquiry')}>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 rounded-full flex items-center justify-center mr-3 sm:mr-5 flex-shrink-0 group-hover:bg-brand-yellow/10 transition-colors">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-[10px] sm:text-xs uppercase tracking-widest mb-1 sm:mb-2 text-gray-900">Email Us</h4>
                  <p className="text-gray-500 text-xs sm:text-sm group-hover:text-brand-yellow transition-colors">
                    blazehorizonrealty@gmail.com
                  </p>
                </div>
              </button>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 sm:mt-10 bg-gray-100 h-40 sm:h-48 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Interactive Map View
              </div>
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=40" 
                className="w-full h-full object-cover opacity-30 grayscale" 
                alt="Map"
              />
            </div>
          </div>

          {/* Right Side - Contact Form WITH BACKGROUND IMAGE PRESERVED */}
          <div className="order-1 lg:order-2 bg-gray-50 p-5 sm:p-6 md:p-8 lg:p-12 rounded-2xl bg-Background02 bg-no-repeat bg-cover items-center flex flex-col">
            <h3 className="text-xl sm:text-2xl font-black mb-6 sm:mb-10 md:mb-16 lg:mb-20 text-gray-900 underline-offset-2 underline text-center sm:text-left">
              Send a Message
            </h3>
            
            {/* Status Message Display */}
            {formStatus.message && (
              <div className={`mb-5 sm:mb-6 p-3 sm:p-4 rounded-xl w-full text-sm ${
                formStatus.type === 'success' 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : formStatus.type === 'error'
                  ? 'bg-red-100 text-red-700 border border-red-200'
                  : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
              }`}>
                {formStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-[13px] sm:text-[15px] text-[#fa8e12] font-black uppercase tracking-wider mb-1 sm:mb-2">
                    First Name *
                  </label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John" 
                    className="w-full bg-white outline-none shadow-md py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[13px] sm:text-[15px] text-[#fa8e12] font-black uppercase tracking-wider mb-1 sm:mb-2">
                    Last Name *
                  </label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe" 
                    className="w-full bg-white outline-none shadow-md py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all text-sm sm:text-base"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[13px] sm:text-[15px] text-[#fa8e12] font-black uppercase tracking-wider mb-1 sm:mb-2">
                  Email Address *
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com" 
                  className="w-full bg-white outline-none shadow-md py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all text-sm sm:text-base"
                  required
                />
              </div>
              
              <div>
                <label className="block text-[13px] sm:text-[15px] text-[#fa8e12] font-black uppercase tracking-wider mb-1 sm:mb-2">
                  Interest Type
                </label>
                <select 
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full bg-white outline-none shadow-md py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all appearance-none cursor-pointer text-sm sm:text-base"
                >
                  <option>Luxury Residential</option>
                  <option>Commercial Land</option>
                  <option>Investment Advisory</option>
                  <option>Property Management</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[13px] sm:text-[15px] text-[#fa8e12] font-black uppercase tracking-wider mb-1 sm:mb-2">
                  Message *
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4" 
                  placeholder="How can we help you?" 
                  className="w-full bg-white outline-none shadow-md py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all resize-none text-sm sm:text-base"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full mt-6 sm:mt-8 md:mt-10 text-white font-black uppercase tracking-widest py-3.5 sm:py-4 rounded-xl transition-all duration-300 ${
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