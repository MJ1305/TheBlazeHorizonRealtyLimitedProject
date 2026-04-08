import React from 'react'

import build3 from './Images/img3.jpeg'

const AboutPage = () => {
  // Core values - NO IDs needed!
  const values = [
    {
      number: '01',
      title: 'Transparency',
      description: 'No hidden fees, no ambiguous titles. We provide all legal documentation upfront for your peace of mind.',
      bgColor: 'bg-brand-yellow'
    },
    {
      number: '02',
      title: 'Excellence',
      description: 'From the materials used in our developments to the service in our office, we aim for nothing but the best.',
      bgColor: 'bg-gray-900 text-white'
    },
    {
      number: '03',
      title: 'Commitment',
      description: 'We don\'t just sell and walk away. We partner with you through the entire lifecycle of your property asset.',
      bgColor: 'bg-brand-yellow'
    }
  ]

  // What We Do services - NO IDs needed!
  const services = [
    {
      title: 'Land Development',
      description: 'We transform raw land into premium residential and commercial spaces with modern infrastructure and strategic planning.',
      icon: '🏗️',
      bgColor: 'bg-white'
    },
    {
      title: 'Property Management',
      description: 'Full-service property management including tenant screening, maintenance, rent collection, and 24/7 support.',
      icon: '🏢',
      bgColor: 'bg-gray-900 text-white'
    },
    {
      title: 'Real Estate Investment',
      description: 'Strategic investment opportunities with guaranteed returns. We help you build wealth through smart property investments.',
      icon: '📈',
      bgColor: 'bg-white'
    }
  ]

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-24 px-6 bg-gray-900 text-white text-center">
        <span className="text-brand-yellow text-[15px] font-black tracking-[0.4em] uppercase mb-4 block">Since 2014</span>
        <h2 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
          Elevating Global <br/> <span className="text-brand-yellow">Real Estate Standards</span>
        </h2>
        <p className="max-w-2xl mx-auto text-gray-400 leading-relaxed text-lg">
          We didn't just build a real estate firm; we built a kingdom of trust where every investor is royalty. From luxury apartments to expansive commercial land, we handle your vision with royal care.
        </p>
      </section>

      {/* What We Do Section - NEW! */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-yellow text-[15px] font-black tracking-[0.4em] uppercase mb-4 block">Our Services</span>
            <h2 className="text-6xl md:text-5xl font-black text-gray-900 mb-4">What We Do</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We secure suitable homes and profitable investment deals tailored to your income level.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`${service.bgColor} p-10 rounded-[2.5rem] shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group ${
                  service.bgColor === 'bg-gray-900 text-white' ? 'hover:bg-brand-yellow hover:text-gray-900' : 'hover:bg-brand-yellow/5'
                }`}
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className={`text-2xl font-black mb-4 ${service.bgColor === 'bg-gray-900 text-white' ? 'text-white group-hover:text-gray-900' : 'text-gray-900'}`}>
                  {service.title}
                </h3>
                <p className={`${service.bgColor === 'bg-gray-900 text-white' ? 'text-gray-300 group-hover:text-gray-700' : 'text-gray-600'} leading-relaxed`}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Website Link */}
          {/* <div className="text-center mt-12">
            <a 
              href="https://www.kingdomfirmpropertiesng.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-yellow hover:text-gray-900 transition-colors text-sm font-black uppercase tracking-widest"
            >
              www.kingdomfirmpropertiesng.com
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div> */}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div>
              <h3 className="text-3xl font-black mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To democratize high-value real estate investment by providing transparent, legal, and verified property assets to individuals and organizations globally.
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-black mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the most trusted name in premium property solutions across the African continent and beyond, recognized for integrity and architectural excellence.
              </p>
            </div>
          </div>
          <div className="bg-gray-100 rounded-[3rem] overflow-hidden">
            <img 
              src={build3} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
              alt="Office building"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-yellow text-[15px] font-black tracking-[0.4em] uppercase mb-4 block">Core Values</span>
            <h2 className="text-6xl font-black text-gray-900">The Horizon Code</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className={`w-12 h-12 ${value.bgColor} rounded-xl mb-6 flex items-center justify-center font-black`}>
                  {value.number}
                </div>
                <h4 className="text-xl font-black mb-4 text-gray-900">{value.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage