import React, { useState } from 'react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    interest: 'Luxury Residential',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      interest: 'Luxury Residential',
      message: ''
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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
              {/* Corporate Office */}
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mr-5 flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-widest mb-2 text-gray-900">Corporate Office</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Level 12, Kingdom Towers, <br /> Lekki Phase 1, Lagos, Nigeria.
                  </p>
                </div>
              </div>

              {/* Call Us */}
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mr-5 flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-widest mb-2 text-gray-900">Call Us</h4>
                  <p className="text-gray-500 text-sm">
                    +234 (0) 800 KINGDOM <br /> 
                    +234 (0) 900 123 4567
                  </p>
                </div>
              </div>

              {/* Email Us */}
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mr-5 flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase tracking-widest mb-2 text-gray-900">Email Us</h4>
                  <p className="text-gray-500 text-sm">
                    invest@kingdomfirm.com <br /> 
                    support@kingdomfirm.com
                  </p>
                </div>
              </div>
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
          <div className="bg-gray-50 p-8 lg:p-12 rounded-3xl border border-gray-100 bg-Background01 bg-no-repeat bg-contain">
            <h3 className="text-2xl font-black mb-6 text-gray-900">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John" 
                    className="w-full bg-white border border-gray-200 py-3 px-5 rounded-xl focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe" 
                    className="w-full bg-white border border-gray-200 py-3 px-5 rounded-xl focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com" 
                  className="w-full bg-white border border-gray-200 py-3 px-5 rounded-xl focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Interest Type</label>
                <select 
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 py-3 px-5 rounded-xl focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all appearance-none cursor-pointer"
                >
                  <option>Luxury Residential</option>
                  <option>Commercial Land</option>
                  <option>Investment Advisory</option>
                  <option>Property Management</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4" 
                  placeholder="How can we help you?" 
                  className="w-full bg-white border border-gray-200 py-3 px-5 rounded-xl focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all resize-none"
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-brand-yellow text-gray-900 font-black uppercase tracking-widest py-4 rounded-xl hover:bg-brand-yellow/80 hover:scale-[1.02] transition-all duration-300"
              >
                Request a Callback
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage