import React, { useState } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { useNavigate } from 'react-router-dom'
import PropertyCard from '../Shared/propertyCard'
import { properties } from '../../data/property'

const HomePage = () => {
  const navigate = useNavigate()
  
  // State for FAQ accordion
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // Featured properties - WITH IDs and proper fields
  const featuredProperties = properties.slice(0, 3)

  // Testimonials
  const testimonials = [
    {
      name: 'John Doe',
      rating: 5,
      text: '"Blaze Horizon Realty made our home buying experience incredibly smooth. Their professionalism and transparency are unmatched."',
      bgColor: 'bg-white',
      textColor: 'text-[#03302b]',
      avatar: 'https://i.pravatar.cc/100?u=1'
    },
    {
      name: 'Sarah Smith',
      rating: 5,
      text: '"As an investor, I value speed and accuracy. The team at Blaze Horizon provides both consistently."',
      bgColor: 'bg-[#03302b]',
      textColor: 'text-gray-300',
      avatar: 'https://i.pravatar.cc/100?u=2'
    },
    {
      name: 'Michael Lee',
      rating: 5,
      text: '"Found my dream penthouse through their exclusive portfolio."',
      bgColor: 'bg-white',
      textColor: 'text-[#03302b]',
      avatar: 'https://i.pravatar.cc/100?u=3'
    }
  ]

  const whyChooseUs = [
    {
      title: 'Expert Team',
      description: 'Years of combined experience in real estate',
      icon: '👥',
      color: 'bg-brand-yellow/10'
    },
    {
      title: 'Best Locations',
      description: 'Prime properties in premium neighborhoods',
      icon: '📍',
      color: 'bg-[#fa8e12]/10'
    },
    {
      title: 'Transparent Process',
      description: 'No hidden fees, clear documentation',
      icon: '🔍',
      color: 'bg-brand-yellow/10'
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock customer service',
      icon: '🕐',
      color: 'bg-[#03302b]/5'
    },
    {
      title: 'Best Prices',
      description: 'Competitive rates and flexible payment plans',
      icon: '💰',
      color: 'bg-brand-yellow/10'
    },
    {
      title: 'Legal Assurance',
      description: 'Proper documentation and title verification',
      icon: '⚖️',
      color: 'bg-[#03302b]/5'
    }
  ]

  // FAQ Data
  const faqs = [
    {
      question: 'What types of properties do you offer?',
      answer: 'We offer a wide range of properties including luxury apartments, commercial spaces, residential homes, and undeveloped land for investment. Our portfolio spans across prime locations to suit various budgets and preferences.'
    },
    {
      question: 'How do I schedule a property viewing?',
      answer: 'You can schedule a property viewing by clicking the "Book a Tour" button on our navigation bar, or by visiting our Contact page. Our team will reach out within 24 hours to arrange a convenient time for your viewing.'
    },
    {
      question: 'Do you offer financing options?',
      answer: 'Yes, we partner with reputable financial institutions to offer flexible financing options. Our team can guide you through mortgage options, payment plans, and investment financing tailored to your financial situation.'
    },
    {
      question: 'What documents do I need to purchase a property?',
      answer: 'Typically, you\'ll need a valid government-issued ID, proof of income, bank statements, and tax identification number. Our legal team will guide you through all documentation requirements specific to your chosen property.'
    },
    {
      question: 'Are your properties verified and legal?',
      answer: 'Absolutely! Every property in our portfolio undergoes thorough due diligence, including title verification, legal checks, and survey validation. We ensure all documentation is authentic and legally binding before listing.'
    },
    {
      question: 'Can non-Nigerians invest in your properties?',
      answer: 'Yes, we welcome international investors. Our team specializes in guiding foreign investors through the legal requirements, including obtaining necessary permits and understanding local real estate laws.'
    }
  ]

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center text-center px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover scale-105" 
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#03302b]/80"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto animate-fade-in px-4">
          <div className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-brand-yellow/10 border border-brand-yellow/20 rounded-full mb-4 sm:mb-6">
            <span className="text-brand-yellow text-[8px] sm:text-[9px] md:text-[10px] font-black tracking-[0.3em] sm:tracking-[0.4em] uppercase">
              Premium Real Estate Solutions
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black text-white mb-4 sm:mb-6 md:mb-8 tracking-tighter leading-[1.2] px-2">
            MAKING YOUR DREAM HOME A REALITY
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-around items-center">            
            <ScrollLink
              to="home-about-summary"
              smooth={true}
              duration={1200}
              offset={-80}
              spy={true}
              hashSpy={true}
              className="bg-white/5 backdrop-blur-xl text-white border border-white/10 px-5 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 lg:py-5 rounded-lg font-black uppercase tracking-widest text-[10px] sm:text-xs hover:bg-white/10 transition-all cursor-pointer w-full sm:w-auto"
            >
              Our Story
            </ScrollLink>
            <button 
              onClick={() => navigate('/listings')}
              className="bg-white/5 backdrop-blur-xl text-white border border-white/10 px-5 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 lg:py-5 rounded-lg font-black uppercase tracking-widest text-[10px] sm:text-xs hover:bg-white/10 transition-all w-full sm:w-auto"
            >
              Explore Collections
            </button>
          </div>
        </div>
      </header>

      {/* About Summary */}
      <section id="home-about-summary" className="py-10 sm:py-14 md:py-18 lg:py-24 px-4 sm:px-6 bg-[#03302b] text-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <span className="text-brand-yellow text-base sm:text-lg md:text-[20px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2 sm:mb-3 md:mb-4 block">
              Who We Are
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 md:mb-6">
              Redefining Real Estate <br className="hidden sm:block"/> Across Borders
            </h2>
            <p className="text-gray-300 leading-relaxed mb-5 sm:mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0 text-sm sm:text-base">
              Blaze Horizon is a leading investment partner, helping individuals and corporations secure high-value land and residential assets with absolute transparency.
            </p>
            <button 
              onClick={() => navigate('/about')}
              className="bg-[#fa8e12] text-[#03302b] hover:scale-105 transition-all duration-700 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest"
            >
              Learn More About Us
            </button>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            <div className="bg-white/5 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl text-center border border-white/5">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-brand-yellow">10+</h3>
              <p className="text-[7px] sm:text-[8px] md:text-[9px] text-gray-400 uppercase font-black tracking-widest">Years</p>
            </div>
            <div className="bg-white/5 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl text-center border border-white/5">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-brand-yellow">200+</h3>
              <p className="text-[7px] sm:text-[8px] md:text-[9px] text-gray-400 uppercase font-black tracking-widest">Happy Clients</p>
            </div>
            <div className="bg-white/5 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl text-center border border-white/5">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-brand-yellow">50+</h3>
              <p className="text-[7px] sm:text-[8px] md:text-[9px] text-gray-400 uppercase font-black tracking-widest">Sold</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-10 sm:py-14 md:py-18 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-14 lg:mb-16">
            <span className="text-brand-yellow text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2 sm:mb-3 md:mb-4 block">
              Why Choose Us?
            </span>
            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#03302b] mb-2 sm:mb-3 md:mb-4">
              Blaze Horizon <span className="text-[#fa8e12]">Realty</span>  Advantages
            </h2>
            <p className="text-[#03302b]/70 max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-4">
              We secure suitable homes and profitable investment deals tailored to your income level.
              And we treat every client with the reverence befitting royalty. Our pursuit of excellence ensures that every detail—from discerning property selection to seamless legal execution—is orchestrated with meticulous care and refined precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {whyChooseUs.map((item, index) => (
              <div 
                key={index}
                className="group bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 ${item.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-5 lg:mb-6 transition-all duration-300 group-hover:bg-[#fa8e12] group-hover:scale-110`}>
                  <span className="text-xl sm:text-2xl md:text-3xl transition-all duration-300 group-hover:scale-110">{item.icon}</span>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-black text-[#03302b] mb-1.5 sm:mb-2 md:mb-3 transition-all duration-300 group-hover:text-[#fa8e12] group-hover:underline group-hover:underline-offset-4">
                  {item.title}
                </h3>
                <p className="text-[#03302b]/60 leading-relaxed text-xs sm:text-sm md:text-base transition-all duration-300 group-hover:text-[#03302b]/80">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-10 sm:py-14 md:py-18 lg:py-24 px-4 sm:px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-6 sm:mb-8 md:mb-10 lg:mb-12 gap-3 sm:gap-4 md:gap-6">
            <div className="text-center sm:text-left">
              <span className="text-brand-yellow text-[10px] sm:text-[11px] md:text-[13px] lg:text-[15px] text-[#fa8e12] font-black tracking-[0.3em] uppercase mb-1 sm:mb-2 md:mb-4 block">
                New Arrivals
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#03302b]">Featured Properties</h2>
            </div>
            <button 
              onClick={() => navigate('/listings')}
              className="bg-[#fa8e12] text-[#03302b] tracking-wider font-black py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 md:px-6 rounded-md text-[9px] sm:text-[10px] md:text-xs uppercase hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              Browse All
            </button>
          </div>

          <div className="flex overflow-x-auto gap-3 sm:gap-4 md:gap-5 lg:gap-6 pb-4 sm:pb-6 md:pb-8 lg:pb-10 -mx-4 sm:-mx-6 px-4 sm:px-6 snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:overflow-visible">
            {featuredProperties.map((property) => (
              <div key={property.slug} className="min-w-[260px] sm:min-w-[280px] md:min-w-[300px] lg:min-w-0 snap-start">
                <PropertyCard 
                  {...property} 
                  onMoreInfo={() => navigate(`/property/${property.slug}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-10 sm:py-14 md:py-18 lg:py-24 px-4 sm:px-6 bg-[#fa8e12]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <span className="text-brand-yellow text-[10px] sm:text-[11px] md:text-[13px] lg:text-[15px] font-black tracking-[0.3em] uppercase mb-2 sm:mb-3 md:mb-4 block">
              Testimonials
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#03302b]">What Our Clients Say</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`${testimonial.bgColor} p-5 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl md:rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}>
                <div className="text-[#fa8e12] mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">★★★★★</div>
                <p className={`${testimonial.textColor} italic mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base leading-relaxed`}>{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gray-200 mr-2 sm:mr-3 overflow-hidden">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-bold text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs uppercase bg-[#fa8e12] px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-md text-white tracking-widest">
                    {testimonial.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>      

      {/* FAQs Section */}
      <section id="faq-section" className="py-10 sm:py-14 md:py-18 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <span className="text-brand-yellow text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-black tracking-[0.3em] uppercase mb-2 sm:mb-3 md:mb-4 block">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#03302b] mb-2 sm:mb-3 md:mb-4">
              Frequently Asked <span className="text-[#fa8e12]">Questions</span>
            </h2>
            <p className="text-[#03302b]/60 max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-4">
              Find answers to common questions about our properties, process, and services
            </p>
          </div>

          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-300 gap-2"
                >
                  <span className="font-black text-[#03302b] text-xs sm:text-sm md:text-base lg:text-lg pr-2 flex-1">
                    {faq.question}
                  </span>
                  <span className="text-[#fa8e12] text-lg sm:text-xl md:text-2xl flex-shrink-0">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6 pt-1 sm:pt-2">
                    <p className="text-[#03302b]/70 leading-relaxed text-xs sm:text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions? */}
          <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 p-4 sm:p-6 md:p-8 bg-gray-50 rounded-lg sm:rounded-xl md:rounded-2xl">
            <p className="text-[#03302b]/70 mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">Still have questions?</p>
            <button 
              onClick={() => navigate('/contact')}
              className="bg-[#fa8e12] text-[#03302b] font-black py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-8 rounded-lg text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest hover:scale-105 transition-all duration-300 inline-flex items-center gap-1.5 sm:gap-2"
            >
              Contact Us
              <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage