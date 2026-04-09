import React, { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'

const BookTour = ({ setCurrentPage, selectedProperty }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyName: '',
    propertyLocation: '',
    propertyAddress: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })

  // Set property data when component mounts or selectedProperty changes
  useEffect(() => {
    if (selectedProperty) {
      setFormData(prev => ({
        ...prev,
        propertyName: selectedProperty.title || '',
        propertyLocation: selectedProperty.location || '',
        propertyAddress: selectedProperty.fullAddress || ''
      }))
    }
  }, [selectedProperty])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

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
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setFormStatus({ type: 'error', message: 'Please enter a valid email address' })
      return
    }
    
    if (!formData.phone.trim()) {
      setFormStatus({ type: 'error', message: 'Please enter your phone number' })
      return
    }
    
    if (!formData.preferredDate) {
      setFormStatus({ type: 'error', message: 'Please select your preferred tour date' })
      return
    }
    
    if (!formData.preferredTime) {
      setFormStatus({ type: 'error', message: 'Please select your preferred tour time' })
      return
    }
    
    setIsSubmitting(true)
    
    // Get credentials from .env file
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    
    // Prepare template parameters for email
    const templateParams = {
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      phone: formData.phone,
      property_name: formData.propertyName,
      property_location: formData.propertyLocation,
      property_address: formData.propertyAddress,
      preferred_date: formData.preferredDate,
      preferred_time: formData.preferredTime,
      message: formData.message,
      to_email: 'blazehorizonrealty@gmail.com',
      subject: `Tour Request: ${formData.propertyName}`
    }
    
    try {
      const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      console.log('Tour request sent successfully:', response)
      
      setFormStatus({ 
        type: 'success', 
        message: '✓ Tour request sent successfully! We will contact you within 24 hours to confirm your appointment.' 
      })
      
      // Reset form but keep property info
      setFormData(prev => ({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        propertyName: prev.propertyName,
        propertyLocation: prev.propertyLocation,
        propertyAddress: prev.propertyAddress,
        preferredDate: '',
        preferredTime: '',
        message: ''
      }))
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus({ type: '', message: '' })
      }, 5000)
      
    } catch (error) {
      console.error('Error sending tour request:', error)
      
      setFormStatus({ 
        type: 'error', 
        message: '✗ Failed to send tour request. Please try again or contact us directly via email or phone.' 
      })
      
      setTimeout(() => {
        setFormStatus({ type: '', message: '' })
      }, 5000)
      
    } finally {
      setIsSubmitting(false)
    }
  }

  // Generate available time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ]

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0]
  
  // Get maximum date (3 months from now)
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 3)
  const maxDateStr = maxDate.toISOString().split('T')[0]

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-brand-yellow text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">Schedule a Visit</span>
          <h1 className="text-4xl md:text-5xl font-black text-[#03302b] mb-4">
            Book a Property Tour
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill out the form below to schedule a private tour of your selected property. 
            Our team will confirm your appointment within 24 hours.
          </p>
        </div>

        {/* Property Preview Card */}
        {selectedProperty && (
          <div className="mb-8 bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden">
                <img 
                  src={selectedProperty.image} 
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-black text-lg text-[#03302b]">Selected Property</h3>
                <p className="text-gray-800 font-bold">{selectedProperty.title}</p>
                <p className="text-gray-500 text-sm">{selectedProperty.location}</p>
                <p className="text-gray-400 text-xs mt-1">{selectedProperty.fullAddress}</p>
                <div className="flex gap-3 mt-2 text-xs text-gray-400">
                  <span>{selectedProperty.beds} Beds</span>
                  <span>•</span>
                  <span>{selectedProperty.baths} Baths</span>
                  <span>•</span>
                  <span>{selectedProperty.sqft} sqft</span>
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('property-details')}
                className="text-brand-yellow text-xs font-black uppercase tracking-widest hover:underline"
              >
                Back to Details
              </button>
            </div>
          </div>
        )}

        {/* Tour Request Form */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">
          {/* Status Message */}
          {formStatus.message && (
            <div className={`mb-6 p-4 rounded-xl ${
              formStatus.type === 'success' 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {formStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#fa8e12] text-xs font-black uppercase tracking-widest mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-5 focus:outline-none focus:ring-0 focus:border-brand-yellow transition-all"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label className="block text-[#fa8e12] text-xs font-black uppercase tracking-widest mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-5 focus:outline-none focus:ring-0 focus:border-brand-yellow transition-all"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#fa8e12] text-xs font-black uppercase tracking-widest mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-5 focus:outline-none focus:ring-0 focus:border-brand-yellow transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-[#fa8e12] text-xs font-black uppercase tracking-widest mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-5 focus:outline-none focus:ring-0 focus:border-brand-yellow transition-all"
                  placeholder="+234 812 320 9188"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#fa8e12] text-xs font-black uppercase tracking-widest mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  min={today}
                  max={maxDateStr}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-5 focus:outline-none focus:ring-0 focus:border-brand-yellow transition-all"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">Available dates: Today to {maxDateStr}</p>
              </div>
              <div>
                <label className="block text-[#fa8e12] text-xs font-black uppercase tracking-widest mb-2">
                  Preferred Time *
                </label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-5 focus:outline-none focus:ring-0 focus:border-brand-yellow transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select a time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-400 mt-1">Monday - Saturday, 9AM - 5PM</p>
              </div>
            </div>

            <div>
              <label className="block text-[#fa8e12] text-xs font-black uppercase tracking-widest mb-2">
                Property Name
              </label>
              <input
                type="text"
                name="propertyName"
                value={formData.propertyName}
                onChange={handleChange}
                className="w-full bg-gray-100 border border-gray-200 rounded-xl py-3 px-5 cursor-not-allowed text-gray-600"
                disabled
              />
            </div>

            <div>
              <label className="block text-[#fa8e12] text-xs font-black uppercase tracking-widest mb-2">
                Property Address
              </label>
              <input
                type="text"
                name="propertyAddress"
                value={formData.propertyAddress}
                onChange={handleChange}
                className="w-full bg-gray-100 border border-gray-200 rounded-xl py-3 px-5 cursor-not-allowed text-gray-600"
                disabled
              />
            </div>

            <div>
              <label className="block text-[#fa8e12] text-xs font-black uppercase tracking-widest mb-2">
                Additional Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-5 focus:outline-none focus:ring-0 focus:border-brand-yellow transition-all resize-none"
                placeholder="Any specific questions or requirements for the tour? (e.g., accessibility needs, preferred language, etc.)"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl text-white font-black uppercase tracking-widest transition-all duration-300 ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-[#fa8e12] hover:scale-[1.02]'
              }`}
            >
              {isSubmitting ? 'Sending Request...' : 'Schedule Tour'}
            </button>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>📞 Need immediate assistance? Call us at <a href="tel:+2348123209188" className="text-brand-yellow hover:underline">+234 812 320 9188</a></p>
          <p className="mt-2">✉️ Or email us at <button onClick={() => {
            const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=blazehorizonrealty@gmail.com&su=Tour%20Inquiry`
            window.open(gmailLink, '_blank')
          }} className="text-brand-yellow hover:underline cursor-pointer">blazehorizonrealty@gmail.com</button></p>
        </div>

        {/* Guarantee Box */}
        <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-center gap-4 text-center">
            <div>
              <div className="text-2xl mb-2">🔒</div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Secure Booking</p>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div>
              <div className="text-2xl mb-2">✓</div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Free Cancellation</p>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div>
              <div className="text-2xl mb-2">🕐</div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">24hr Confirmation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookTour