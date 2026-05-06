import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const BookTour = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const selectedProperty = location.state?.property

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

  useEffect(() => {
    if (selectedProperty) {
      setFormData(prev => ({
        ...prev,
        propertyName: selectedProperty.title || '',
        propertyLocation: selectedProperty.location || '',
        propertyAddress: selectedProperty.full_address || '',
      }))
    }
  }, [selectedProperty])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({ type: '', message: '' })

    if (!formData.firstName.trim()) { setFormStatus({ type: 'error', message: 'Please enter your first name' }); return }
    if (!formData.lastName.trim()) { setFormStatus({ type: 'error', message: 'Please enter your last name' }); return }
    if (!formData.email.trim()) { setFormStatus({ type: 'error', message: 'Please enter your email address' }); return }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) { setFormStatus({ type: 'error', message: 'Please enter a valid email address' }); return }
    if (!formData.phone.trim()) { setFormStatus({ type: 'error', message: 'Please enter your phone number' }); return }
    if (!formData.preferredDate) { setFormStatus({ type: 'error', message: 'Please select your preferred tour date' }); return }
    if (!formData.preferredTime) { setFormStatus({ type: 'error', message: 'Please select your preferred tour time' }); return }

    setIsSubmitting(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        access_key: import.meta.env.VITE_WEB3FORMS_TOUR_TEMPLATE_ID,
        subject: `Tour Request: ${formData.propertyName}`,
        from_name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        message: `
        A user with the name ${formData.firstName} ${formData.lastName} would like to schedule a tour concerning the property "${formData.propertyName}", located at ${formData.propertyAddress}, ${formData.propertyLocation}. The requested visit is scheduled for ${formData.preferredDate} at ${formData.preferredTime}.

        ${formData.message ? `The user has also left the following note: "${formData.message}"` : 'No additional notes were provided.'}

        Contact Details:
          - Email: ${formData.email}
          - Phone: ${formData.phone}

        Please reach out to the user at your earliest convenience to confirm their appointment.

        — Blaze Horizon Realty Booking System    
          `.trim()
        }),
        to_email: 'blazehorizonrealty@gmail.com',
      })

      const result = await response.json()

      if (result.success) {
        console.log('Tour request sent successfully:', result)
        setFormStatus({
          type: 'success',
          message: '✓ Tour request sent successfully! We will contact you within 24 hours to confirm your appointment.'
        })
        setFormData(prev => ({
          firstName: '', lastName: '', email: '', phone: '',
          propertyName: prev.propertyName,
          propertyLocation: prev.propertyLocation,
          propertyAddress: prev.propertyAddress,
          preferredDate: '', preferredTime: '', message: ''
        }))
        setTimeout(() => setFormStatus({ type: '', message: '' }), 5000)
      } else {
        throw new Error(result.message || 'Submission failed')
      }
    } catch (error) {
      console.error('Error sending tour request:', error)
      setFormStatus({
        type: 'error',
        message: '✗ Failed to send tour request. Please try again or contact us directly.'
      })
      setTimeout(() => setFormStatus({ type: '', message: '' }), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ]

  const today = new Date().toISOString().split('T')[0]
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 3)
  const maxDateStr = maxDate.toISOString().split('T')[0]

  const propertyImage = selectedProperty?.cover_image
    || (Array.isArray(selectedProperty?.images) && selectedProperty.images[0])
    || null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#fa8e12]/10 rounded-full mb-3 sm:mb-4">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#fa8e12]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="inline-block text-[#fa8e12] text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-black tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-2 sm:mb-3 px-3 py-1 bg-white rounded-full shadow-sm">
            Schedule a Visit
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-[#03302b] mt-3 sm:mt-4 mb-2 sm:mb-3 md:mb-4 px-2">
            Book a Property Tour
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-4">
            Fill out the form below and our team will contact you within 24 hours to confirm your appointment.
          </p>
        </div>

        {/* Selected Property Card */}
        {selectedProperty && (
          <div className="mb-6 sm:mb-8 bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-[#03302b] to-[#044b44] px-4 sm:px-6 py-2 sm:py-2.5">
              <p className="text-white text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-wider flex items-center gap-2">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                SELECTED PROPERTY
              </p>
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-xl overflow-hidden flex-shrink-0 shadow-md bg-gray-100">
                  {propertyImage ? (
                    <img src={propertyImage} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt={selectedProperty.title} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="font-black text-base sm:text-lg md:text-xl text-[#03302b] mb-1">{selectedProperty.title}</h3>
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-gray-500 text-[11px] sm:text-xs md:text-sm mb-2">
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span>{selectedProperty.location}</span>
                  </div>
                  <p className="text-gray-400 text-[9px] sm:text-[10px] md:text-xs break-words">📍 {selectedProperty.full_address}</p>
                </div>
                <button
                  onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/')}
                  className="flex items-center gap-1.5 bg-[#fa8e12] text-[#033630] px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-xl font-black text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs uppercase tracking-widest transition-all duration-500 hover:scale-95 flex-shrink-0 mt-2 sm:mt-0 shadow-md hover:shadow-lg"
                >
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Change Property
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gray-50 px-4 sm:px-5 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#fa8e12]/10 rounded-lg flex items-center justify-center">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#fa8e12]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="font-black text-sm sm:text-base md:text-lg text-[#03302b]">Tour Request Form</h2>
            </div>
          </div>

          <div className="p-4 sm:p-5 md:p-6 lg:p-8">
            {formStatus.message && (
              <div className={`mb-4 sm:mb-5 md:mb-6 p-3 sm:p-3.5 md:p-4 rounded-xl text-xs sm:text-sm flex items-start gap-3 ${
                formStatus.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {formStatus.type === 'success' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
                <span className="flex-1">{formStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">

              {/* Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                <div>
                  <label className="block text-[8px] sm:text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1 sm:mb-1.5 md:mb-2">
                    First Name <span className="text-[#fa8e12]">*</span>
                  </label>
                  <input name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 md:px-5 text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#fa8e12] focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-[8px] sm:text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1 sm:mb-1.5 md:mb-2">
                    Last Name <span className="text-[#fa8e12]">*</span>
                  </label>
                  <input name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 md:px-5 text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#fa8e12] focus:border-transparent transition-all" />
                </div>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                <div>
                  <label className="block text-[8px] sm:text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1 sm:mb-1.5 md:mb-2">
                    Email Address <span className="text-[#fa8e12]">*</span>
                  </label>
                  <input name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 md:px-5 text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#fa8e12] focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-[8px] sm:text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1 sm:mb-1.5 md:mb-2">
                    Phone Number <span className="text-[#fa8e12]">*</span>
                  </label>
                  <input name="phone" placeholder="+123 456 7890" value={formData.phone} onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 md:px-5 text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#fa8e12] focus:border-transparent transition-all" />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                <div>
                  <label className="block text-[8px] sm:text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1 sm:mb-1.5 md:mb-2">
                    Preferred Date <span className="text-[#fa8e12]">*</span>
                  </label>
                  <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} min={today} max={maxDateStr}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 md:px-5 text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#fa8e12] focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-[8px] sm:text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1 sm:mb-1.5 md:mb-2">
                    Preferred Time <span className="text-[#fa8e12]">*</span>
                  </label>
                  <select name="preferredTime" value={formData.preferredTime} onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 md:px-5 text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#fa8e12] focus:border-transparent transition-all appearance-none">
                    <option value="">Select a time slot</option>
                    {timeSlots.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[8px] sm:text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1 sm:mb-1.5 md:mb-2">
                  Additional Message <span className="text-gray-400">(Optional)</span>
                </label>
                <textarea name="message" placeholder="Any specific questions or requests for the tour?" value={formData.message} onChange={handleChange} rows="4"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 sm:py-3 px-3 sm:px-4 md:px-5 text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#fa8e12] focus:border-transparent transition-all resize-none" />
              </div>

              {/* Submit */}
              <button type="submit" disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#fa8e12] to-[#f59e0b] text-white py-3 sm:py-3.5 md:py-4 rounded-xl font-black text-xs sm:text-sm md:text-base uppercase tracking-wider hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg">
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Sending Request...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Schedule Tour
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                )}
              </button>

              <p className="text-center text-[9px] sm:text-[10px] md:text-xs text-gray-400 mt-4">
                By submitting this form, you agree to our{' '}
                <button type="button" className="text-[#fa8e12] hover:underline">Terms of Service</button>{' '}
                and{' '}
                <button type="button" className="text-[#fa8e12] hover:underline">Privacy Policy</button>.
                We'll contact you within 24 hours to confirm your tour.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookTour