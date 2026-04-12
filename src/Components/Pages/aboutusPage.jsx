import React from 'react'

//Images
import build3 from '../Images/img7.jpeg'

const AboutPage = () => {
  // Core values
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
      bgColor: 'bg-[#fa8e12] text-white'
    },
    {
      number: '03',
      title: 'Commitment',
      description: 'We don\'t just sell and walk away. We partner with you through the entire lifecycle of your property asset.',
      bgColor: 'bg-brand-yellow'
    }
  ]

  // What We Do services 
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
      bgColor: 'bg-[#03302b] text-white'
    },
    {
      title: 'Real Estate Investment',
      description: 'Strategic investment opportunities with guaranteed returns. We help you build wealth through smart property investments.',
      icon: '📈',
      bgColor: 'bg-white'
    }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section - Fixed white spacing issue */}
      <section className="relative min-h-[80vh] sm:min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-Background03 bg-no-repeat bg-cover bg-center text-white flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        
        <div className="relative z-10">
          <span className="inline-block text-brand-yellow text-xl sm:text-[25px] border border-white/30 rounded-lg w-[15rem] sm:w-[20rem] font-black tracking-[0.2em] sm:tracking-[0.4em] text-[#fa8e12] uppercase mb-4 sm:mb-6 mx-auto px-4 py-2 bg-black/20 backdrop-blur-sm">
            Since 2014
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 md:mb-8 leading-tight px-2">
            Elevating Global <br className="hidden sm:block"/> <span className="text-brand-yellow">Real Estate Standards</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-200 leading-relaxed text-sm sm:text-base md:text-lg px-4">
            We didn't just build a real estate firm; we built a kingdom of trust where every investor is royalty. From luxury apartments to expansive commercial land, we handle your vision with royal care.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="inline-block text-brand-yellow text-[11px] sm:text-[13px] md:text-[15px] text-[#fa8e12] font-black tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-3 sm:mb-4">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#03302b] mb-3 sm:mb-4">
              What We Do
            </h2>
            <p className="text-[#03302b]/70 max-w-2xl mx-auto text-sm sm:text-base px-4">
              We secure suitable homes and profitable investment deals tailored to your income level.
            </p>
          </div>

          {/* Grid: 1 column mobile, 2 columns tablet, 3 columns desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`${service.bgColor} p-6 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group ${
                  service.bgColor === 'bg-[#03302b] text-white' ? 'hover:bg-brand-yellow hover:text-[#03302b]' : 'hover:bg-brand-yellow/5'
                }`}
              >
                <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className={`text-xl sm:text-2xl font-black mb-3 sm:mb-4 ${
                  service.bgColor === 'bg-[#03302b] text-white' ? 'text-white group-hover:text-white' : 'text-[#03302b]'
                }`}>
                  {service.title}
                </h3>
                <p className={`text-sm sm:text-base ${
                  service.bgColor === 'bg-[#03302b] text-white' ? 'text-gray-300 group-hover:text-white' : 'text-[#03302b]/60'
                } leading-relaxed`}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-[#03302b]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">
          <div className="space-y-8 sm:space-y-10 md:space-y-12 text-center lg:text-left">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#fa8e12] mb-3 sm:mb-4">Our Mission</h3>
              <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                To democratize high-value real estate investment by providing transparent, legal, and verified property assets to individuals and organizations globally.
              </p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#fa8e12] mb-3 sm:mb-4">Our Vision</h3>
              <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                To be the most trusted name in premium property solutions across the African continent and beyond, recognized for integrity and architectural excellence.
              </p>
            </div>
          </div>
          
          <div className="rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
            <img 
              src={build3} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
              alt="Office building"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="inline-block text-[#fa8e12] text-[11px] sm:text-[13px] md:text-[15px] font-black tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-3 sm:mb-4">
              Core Values
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#03302b] px-2">
              The Blaze Horizon Realty <span className='text-[#fa8e12]'>Code</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${value.bgColor} rounded-xl mb-4 sm:mb-6 flex items-center justify-center font-black text-sm sm:text-base transition-all duration-300 group-hover:scale-110 group-hover:text-white group-hover:bg-[#03302b]`}>
                  {value.number}
                </div>
                <h4 className="text-lg sm:text-xl font-black mb-3 sm:mb-4 text-[#03302b] group-hover:text-[#fa8e12] group-hover:underline transition-colors duration-300">
                  {value.title}
                </h4>
                <p className="text-[#03302b]/60 text-xs sm:text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage