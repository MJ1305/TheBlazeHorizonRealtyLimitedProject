import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../Images/imglogo.jpeg"

const Footer = () => {
  const navigate = useNavigate()

  const handleFaqClick = () => {
    navigate('/')
    setTimeout(() => {
      const faqSection = document.getElementById('faq-section')
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  return (
    <footer className="bg-[#03302b] text-gray-500 py-10 sm:py-12 md:py-16 px-5 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Grid - 1 column on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          
          {/* Logo & Description - Full width on mobile, spans 2 on desktop */}
          <div className="sm:col-span-2 text-center sm:text-left">
            <Link to="/" className="inline-block">
              <img 
                className='w-[7rem] sm:w-[8rem] h-[3rem] sm:h-[3.5rem] rounded-xl object-contain mx-auto sm:mx-0' 
                src={Logo} 
                alt="logo" 
              />
            </Link>
            <p className="max-w-sm mt-4 sm:mt-6 leading-relaxed text-gray-400 text-sm sm:text-base mx-auto sm:mx-0">
              Securing your future through strategic real estate acquisitions and luxury development management.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="text-center sm:text-left">
            <h5 className="text-brand-yellow font-black text-[10px] sm:text-[11px] uppercase tracking-[0.3em] mb-4 sm:mb-6">
              Navigation
            </h5>
            <ul className="space-y-3 sm:space-y-3 text-sm sm:text-base font-medium">
              <li><Link to="/" className="hover:text-brand-yellow transition-colors inline-block">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-yellow transition-colors inline-block">About Us</Link></li>
              <li><Link to="/listings" className="hover:text-brand-yellow transition-colors inline-block">Properties</Link></li>
              <li><Link to="/contact" className="hover:text-brand-yellow transition-colors inline-block">Contact</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="text-center sm:text-left">
            <h5 className="text-brand-yellow font-black text-[10px] sm:text-[11px] uppercase tracking-[0.3em] mb-4 sm:mb-6">
              Support
            </h5>
            <ul className="space-y-3 sm:space-y-3 text-sm sm:text-base font-medium">
              <li><a href="#" className="hover:text-brand-yellow transition-colors inline-block">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-yellow transition-colors inline-block">Legal Terms</a></li>
              <li>
                <button 
                  onClick={handleFaqClick}
                  className="hover:text-brand-yellow transition-colors cursor-pointer inline-block"
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 text-center">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-semibold text-gray-500">
            © 2024 BlazeHorizon Realty. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer