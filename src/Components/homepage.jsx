import React, { useState } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import PropertyCard from './PropertyCard'

import build4 from './Images/img4.jpeg'
import build2 from './Images/img2.jpeg'
import build3 from './Images/img3.jpeg'

const HomePage = ({ setCurrentPage }) => {
  // State for FAQ accordion
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // Featured properties - WITH IDs and proper fields
const featuredProperties = [
  {
    id: 1,
    title: 'The Monarch Suite',
    location: 'Banana Island, Lagos',
    fullAddress: '123 Banana Island Way, Ikoyi, Lagos',
    state: 'Lagos',
    country: 'Nigeria',
    image: build3,
    images: [build3, build2, build4],
    type: 'buy',
    beds: 4,
    baths: 3,
    sqft: '2,400',
    yearBuilt: '2022',
    parking: '2 spaces',
    description: 'Experience luxury living at its finest in The Monarch Suite. This stunning 4-bedroom apartment features premium finishes and breathtaking views.',
    amenities: ['Swimming Pool', 'Gym', '24/7 Security', 'Parking', 'Elevator'],
    nearby: ['Banana Island Club (5 min)', 'Lekki Conservation Centre (10 min)']
  },
  {
    id: 2,
    title: 'Sapphire Heights',
    location: 'Lekki Phase 1, Lagos',
    fullAddress: '45 Admiralty Way, Lekki Phase 1, Lagos',
    state: 'Lagos',
    country: 'Nigeria',
    image: build2,
    images: [build2, build3, build4],
    type: 'buy',
    beds: 6,
    baths: 5,
    sqft: '4,800',
    yearBuilt: '2023',
    parking: '3 spaces',
    description: 'Sapphire Heights is a masterpiece of modern architecture with smart home features and luxurious interiors.',
    amenities: ['Private Cinema', 'Wine Cellar', 'Gym', 'Pool'],
    nearby: ['Novare Mall (3 min)', 'Lagos Business School (8 min)']
  },
  {
    id: 3,
    title: 'Ocean View Villa',
    location: 'Victoria Island, Lagos',
    fullAddress: '78 Ahmadu Bello Way, Victoria Island, Lagos',
    state: 'Lagos',
    country: 'Nigeria',
    image: build4,
    images: [build4, build3, build2],
    type: 'rent',
    beds: 5,
    baths: 4,
    sqft: '3,500',
    yearBuilt: '2021',
    parking: '2 spaces',
    description: 'Wake up to stunning ocean views every morning in this beautiful beachfront villa.',
    amenities: ['Beach Access', 'Infinity Pool', 'Private Gym'],
    nearby: ['Landmark Beach (2 min)', 'Eko Atlantic (7 min)']
  }
]

  // Testimonials
  const testimonials = [
    {
      name: 'John Doe',
      rating: 5,
      text: '"Blaze Horizon made our home buying experience incredibly smooth. Their professionalism and transparency are unmatched."',
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
    <div>
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover scale-105" 
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#03302b]/80"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto animate-fade-in">
          <div className="inline-block px-4 py-1.5 bg-brand-yellow/10 border border-brand-yellow/20 rounded-full mb-6">
            <span className="text-brand-yellow text-[10px] text-white font-black tracking-[0.4em] uppercase">Premium Real Estate Solutions</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter">
           MAKING YOUR DREAM HOME A REALITY
          </h1>
          <div className="flex flex-col sm:flex-row gap-5 justify-around">            
            <ScrollLink
              to="home-about-summary"
              smooth={true}
              duration={1200}
              offset={-80}
              spy={true}
              hashSpy={true}
              className="bg-white/5 backdrop-blur-xl text-white border border-white/10 px-10 py-5 rounded-lg font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all cursor-pointer"
            >
              Our Story
            </ScrollLink>
            <button 
              onClick={() => setCurrentPage('listings')}
              className="bg-white/5 backdrop-blur-xl text-white border border-white/10 px-10 py-5 rounded-lg font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
            >
              Explore Collections
            </button>
          </div>
        </div>
      </header>

      {/* About Summary */}
      <section id="home-about-summary" className="py-24 px-6 bg-[#03302b] text-white border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-brand-yellow text-[20px] font-black tracking-[0.3em] uppercase mb-4 block">Who We Are</span>
            <h2 className="text-4xl font-black mb-6">Redefining Real Estate <br/> Across Borders</h2>
            <p className="text-gray-300 leading-relaxed mb-8 max-w-lg">Blaze Horizon is a leading investment partner, helping individuals and corporations secure high-value land and residential assets with absolute transparency.</p>
            <button 
              onClick={() => setCurrentPage('about')}
              className="bg-[#fa8e12] text-[#03302b] hover:scale-105 transition-all duration-700 px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest"
            >
              Learn More About Us
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 p-6 rounded-2xl text-center border border-white/5">
              <h3 className="text-3xl font-black text-brand-yellow">10+</h3>
              <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Years</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl text-center border border-white/5">
              <h3 className="text-3xl font-black text-brand-yellow">200+</h3>
              <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Happy Clients</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl text-center border border-white/5">
              <h3 className="text-3xl font-black text-brand-yellow">50+</h3>
              <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Sold</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-yellow text-[50px] font-black tracking-[0.3em] uppercase mb-4 block">Why Choose Us?</span>
            <h2 className="text-2xl md:text-1xl font-black text-[#03302b] mb-4">
              Blaze <span className="text-[#fa8e12]">Horizon</span> Advantages
            </h2>
            <p className="text-[#03302b]/70 max-w-2xl mx-auto">
              We secure suitable homes and profitable investment deals tailored to your income level,
              And we treat every client with the reverence befitting royalty. Our pursuit of excellence ensures that every detail—from discerning property selection to seamless legal execution—is orchestrated with meticulous care and refined precision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div 
                key={index}
                className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[#fa8e12] group-hover:scale-110`}>
                  <span className="text-3xl transition-all duration-300 group-hover:scale-110">{item.icon}</span>
                </div>
                <h3 className="text-xl font-black text-[#03302b] mb-3 transition-all duration-300 group-hover:text-[#fa8e12] group-hover:underline group-hover:underline-offset-4">
                  {item.title}
                </h3>
                <p className="text-[#03302b]/60 leading-relaxed transition-all duration-300 group-hover:text-[#03302b]/80">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 px-6 bg-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-brand-yellow text-[15px] text-[#fa8e12] font-black tracking-[0.3em] uppercase mb-4 block">New Arrivals</span>
              <h2 className="text-4xl font-black text-[#03302b]">Featured Properties</h2>
            </div>
            <button 
              onClick={() => setCurrentPage('listings')}
              className="bg-[#fa8e12] text-[#03302b] tracking-wider font-black py-2.5 px-6 rounded-md text-xs uppercase hover:scale-105 transition-all duration-300"
            >
              Browse All
            </button>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-10 custom-scrollbar -mx-6 px-6">
            {featuredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                {...property} 
                onMoreInfo={() => setCurrentPage('property-details', property)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-24 px-6 bg-[#fa8e12]">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <span className="text-brand-yellow text-[15px] font-black text-[#fa8e12] tracking-[0.3em] uppercase mb-4 block">Testimonials</span>
          <h2 className="text-4xl font-black text-[#03302b]">What Our Clients Say</h2>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`${testimonial.bgColor} p-10 rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}>
              <div className="text-[#fa8e12] mb-4">★★★★★</div>
              <p className={`${testimonial.textColor} italic mb-6`}>{testimonial.text}</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                  <img src={testimonial.avatar} alt={testimonial.name} />
                </div>
                <span className="font-bold text-xs uppercase bg-[#fa8e12] px-3 py-1 rounded-md text-white tracking-widest">{testimonial.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>      

      {/* FAQs Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-yellow text-[10px] font-black tracking-[0.3em] uppercase mb-4 block">Got Questions?</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#03302b] mb-4">
              Frequently Asked <span className="text-[#fa8e12]">Questions</span>
            </h2>
            <p className="text-[#03302b]/60 max-w-2xl mx-auto">
              Find answers to common questions about our properties, process, and services
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-300"
                >
                  <span className="font-black text-[#03302b] text-lg pr-4">{faq.question}</span>
                  <span className="text-[#fa8e12] text-2xl flex-shrink-0">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-6 pt-2">
                    <p className="text-[#03302b]/70 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions? */}
          <div className="text-center mt-12 p-8 bg-gray-50 rounded-2xl">
            <p className="text-[#03302b]/70 mb-4">Still have questions?</p>
            <button 
              onClick={() => setCurrentPage('contact')}
              className="bg-[#fa8e12] text-[#03302b] font-black py-3 px-8 rounded-lg text-xs uppercase tracking-widest hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
            >
              Contact Us
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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