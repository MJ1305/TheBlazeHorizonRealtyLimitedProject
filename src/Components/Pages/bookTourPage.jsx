import React, { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
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

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TOUR_TEMPLATE_ID
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    const templateParams = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      property_name: formData.propertyName,
      property_location: formData.propertyLocation,
      property_address: formData.propertyAddress,
      preferred_date: formData.preferredDate,
      preferred_time: formData.preferredTime,
      message: formData.message,
      to_email: 'blazehorizonrealty@gmail.com',
      intreast: `${formData.propertyName}`
    }

    try {
      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      )

      console.log('Tour request sent successfully:', response)

      setFormStatus({
        type: 'success',
        message: '✓ Tour request sent successfully! We will contact you within 24 hours to confirm your appointment.'
      })

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

      setTimeout(() => {
        setFormStatus({ type: '', message: '' })
      }, 5000)

    } catch (error) {
      console.error('Error sending tour request:', error)

      setFormStatus({
        type: 'error',
        message: '✗ Failed to send tour request. Please try again or contact us directly.'
      })

      setTimeout(() => {
        setFormStatus({ type: '', message: '' })
      }, 5000)

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

  return (
    <div className="responsive-tour min-h-screen pt-24 pb-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-brand-yellow text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">
            Schedule a Visit
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[#03302b] mb-4">
            Book a Property Tour
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill out the form below to schedule a private tour.
          </p>
        </div>

        {selectedProperty && (
          <div className="mb-8 bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
            <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={selectedProperty.image}
                  className="w-full h-full object-cover"
                  alt={selectedProperty.title}
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-black text-lg text-[#03302b]">
                  Selected Property
                </h3>
                <p className="text-gray-800 font-bold">
                  {selectedProperty.title}
                </p>
                <p className="text-gray-500 text-sm">
                  {selectedProperty.location}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {selectedProperty.fullAddress}
                </p>
              </div>
              <button
                onClick={() => {
                  if (window.history.length > 1) {
                    navigate(-1)
                  } else {
                    navigate('/')
                  }
                }}
                className="text-brand-yellow text-xs font-black uppercase tracking-widest hover:underline flex-shrink-0"
              >
                Back
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">
          {formStatus.message && (
            <div className={`mb-6 p-4 rounded-xl ${
              formStatus.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {formStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-gray-50 border rounded-xl py-3 px-5"
              />
              <input
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-gray-50 border rounded-xl py-3 px-5"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-50 border rounded-xl py-3 px-5"
              />
              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-gray-50 border rounded-xl py-3 px-5"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                min={today}
                max={maxDateStr}
                className="w-full bg-gray-50 border rounded-xl py-3 px-5"
              />
              <select
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full bg-gray-50 border rounded-xl py-3 px-5"
              >
                <option value="">Select Time</option>
                {timeSlots.map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-gray-50 border rounded-xl py-3 px-5"
              rows="4"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#fa8e12] text-white py-4 rounded-xl font-black"
            >
              {isSubmitting ? 'Sending...' : 'Schedule Tour'}
            </button>
          </form>
        </div>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 640px) {
          .responsive-tour {
            width: 100%;
            overflow-x: hidden;
          }
          
          .responsive-tour h1 {
            font-size: 1.75rem;
            text-align: center;
          }
          
          .responsive-tour .grid {
            gap: 1rem;
          }
          
          .responsive-tour input,
          .responsive-tour select,
          .responsive-tour textarea {
            font-size: 16px;
          }
        }
        
        @media (min-width: 641px) and (max-width: 768px) {
          .responsive-tour {
            width: 100%;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .responsive-tour {
            width: 100%;
          }
        }
        
        @media (min-width: 1025px) {
          .responsive-tour {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default BookTour