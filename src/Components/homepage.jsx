import React from 'react'
import PropertyCard from './PropertyCard'

import build4 from './Images/img4.jpeg'
import build2 from './Images/img2.jpeg'
import build3 from './Images/img3.jpeg'

const HomePage = ({ setCurrentPage }) => {
  // Featured properties
  const featuredProperties = [
    {
      title: 'The Monarch Suite',
      price: '$450k',
      beds: 4,
      baths: 3,
      sqft: '2,400',
      image: build3,
      badge: 'Featured',
      badgeColor: 'bg-gray-900 text-white'
    },
    {
      title: 'Sapphire Heights',
      price: '$1.2M',
      beds: 6,
      baths: 5,
      sqft: '4,800',
      image: build3,
      badge: 'New',
      badgeColor: 'bg-brand-yellow text-gray-900'
    },
    {
      title: 'Sapphire Heights',
      price: '$1.2M',
      beds: 6,
      baths: 5,
      sqft: '4,800',
      image: build3,
      badge: 'New',
      badgeColor: 'bg-brand-yellow text-gray-900'
    }
  ]

  // Testimonials
  const testimonials = [
    {
      name: 'John Doe',
      rating: 5,
      text: '"Kingdom Firm made our home buying experience incredibly smooth. Their professionalism and transparency are unmatched."',
      bgColor: 'bg-white',
      textColor: 'text-gray-600',
      avatar: 'https://i.pravatar.cc/100?u=1'
    },
    {
      name: 'Sarah Smith',
      rating: 5,
      text: '"As an investor, I value speed and accuracy. The team at Kingdom Firm provides both consistently."',
      bgColor: 'bg-gray-900',
      textColor: 'text-gray-300',
      avatar: 'https://i.pravatar.cc/100?u=2'
    },
    {
      name: 'Michael Lee',
      rating: 5,
      text: '"Found my dream penthouse through their exclusive portfolio."',
      bgColor: 'bg-white',
      textColor: 'text-gray-600',
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
      color: 'bg-gray-900/5'
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
      color: 'bg-gray-900/5'
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
      color: 'bg-gray-900/5'
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-gray-900"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto animate-fade-in">
          <div className="inline-block px-4 py-1.5 bg-brand-yellow/10 border border-brand-yellow/20 rounded-full mb-6">
            <span className="text-brand-yellow text-[10px] text-white font-black tracking-[0.4em] uppercase">Premium Real Estate Solutions</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tighter">
            EXPERIENCE <br/> <span className="text-brand-yellow uppercase">Royal</span> LIVING
          </h1>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button 
              onClick={() => setCurrentPage('listings')}
              className="bg-brand-yellow text-gray-900 px-10 py-5 rounded-lg font-black uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(255,209,59,0.3)] transition-all"
            >
              Explore Collections
            </button>
            <button 
              onClick={() => document.getElementById('home-about-summary').scrollIntoView({behavior:'smooth'})}
              className="bg-white/5 backdrop-blur-xl text-white border border-white/10 px-10 py-5 rounded-lg font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
            >
              Our Story
            </button>
          </div>
        </div>
      </header>

      {/* About Summary */}
      <section id="home-about-summary" className="py-24 px-6 bg-gray-900 text-white border-b border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-brand-yellow text-[10px] font-black tracking-[0.3em] uppercase mb-4 block">Who We Are</span>
            <h2 className="text-4xl font-black mb-6">Redefining Real Estate <br/> Across Borders</h2>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-lg">Kingdom Firm Properties is a leading investment partner, helping individuals and corporations secure high-value land and residential assets with absolute transparency.</p>
            <button 
              onClick={() => setCurrentPage('about')}
              className="bg-brand-yellow text-gray-900 hover:bg-white/20 px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
            >
              Learn More About Us
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 p-6 rounded-2xl text-center border border-white/5">
              <h3 className="text-3xl font-black text-brand-yellow">10+</h3>
              <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Years</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl text-center border border-white/5">
              <h3 className="text-3xl font-black text-brand-yellow">200+</h3>
              <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Happy Clients</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl text-center border border-white/5">
              <h3 className="text-3xl font-black text-brand-yellow">50+</h3>
              <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Sold</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-yellow text-[50px] font-black tracking-[0.3em] uppercase mb-4 block">Why Choose Us?</span>
            <h2 className="text-3xl md:text-1xl font-black text-gray-900 mb-4">
              The <span className="text-brand-yellow">Kingdom</span> Advantage
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We secure suitable homes and profitable investment deals tailored to your income level,
              And we treat every client with the reverence befitting royalty. Our pursuit of excellence ensures that every detail—from discerning property selection to seamless legal execution—is orchestrated with meticulous care and refined precision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div 
                key={index}
                className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 px-6 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-brand-yellow text-[10px] font-black tracking-[0.3em] uppercase mb-4 block">New Arrivals</span>
              <h2 className="text-4xl font-black text-gray-900">Featured Properties</h2>
            </div>
            <button 
              onClick={() => setCurrentPage('listings')}
              className="bg-brand-yellow text-gray-900 font-black py-2.5 px-6 rounded-md text-xs uppercase hover:scale-105 transition-all duration-300"
            >
              Browse All
            </button>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-10 custom-scrollbar -mx-6 px-6">
            {featuredProperties.map((property, index) => (
              <PropertyCard key={index} {...property} />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <span className="text-brand-yellow text-[10px] font-black tracking-[0.3em] uppercase mb-4 block">Testimonials</span>
          <h2 className="text-4xl font-black text-gray-900">What Our Clients Say</h2>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`${testimonial.bgColor} p-10 rounded-3xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}>
              <div className="text-brand-yellow mb-4">★★★★★</div>
              <p className={`${testimonial.textColor} italic mb-6`}>{testimonial.text}</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                  <img src={testimonial.avatar} alt={testimonial.name} />
                </div>
                <span className="font-bold text-xs uppercase tracking-widest">{testimonial.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage