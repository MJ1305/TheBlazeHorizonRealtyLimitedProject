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
    <footer className="bg-[#03302b] text-gray-400">
      {/* Main Footer Content */}
      <div className="px-5 py-10 sm:px-6 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Logo Section - Centered on mobile */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <Link to="/" className="inline-block">
              <img 
                className='w-[7rem] sm:w-[8rem] h-[3rem] sm:h-[3.5rem] rounded-xl object-contain mx-auto' 
                src={Logo} 
                alt="logo" 
              />
            </Link>
          </div>

          {/* Description - Centered on mobile */}
          <div className="text-center max-w-md mx-auto mb-10 sm:mb-12">
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Securing your future through strategic real estate acquisitions and luxury development management.
            </p>
          </div>

          {/* Links Grid - Better for mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
            
            {/* Navigation Links */}
            <div className="text-center sm:text-left">
              <h5 className="text-brand-yellow font-black text-[11px] sm:text-[12px] uppercase tracking-[0.3em] mb-4 sm:mb-5">
                Navigation
              </h5>
              <ul className="space-y-3 sm:space-y-3 text-sm sm:text-base font-medium">
                <li><Link to="/" className="text-gray-400 hover:text-brand-yellow transition-colors inline-block">Home</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-brand-yellow transition-colors inline-block">About Us</Link></li>
                <li><Link to="/listings" className="text-gray-400 hover:text-brand-yellow transition-colors inline-block">Properties</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-brand-yellow transition-colors inline-block">Contact</Link></li>
              </ul>
            </div>

            {/* Support Links */}
            <div className="text-center sm:text-left">
              <h5 className="text-brand-yellow font-black text-[11px] sm:text-[12px] uppercase tracking-[0.3em] mb-4 sm:mb-5">
                Support
              </h5>
              <ul className="space-y-3 sm:space-y-3 text-sm sm:text-base font-medium">
                <li><a href="#" className="text-gray-400 hover:text-brand-yellow transition-colors inline-block">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-brand-yellow transition-colors inline-block">Legal Terms</a></li>
                <li>
                  <button 
                    onClick={handleFaqClick}
                    className="text-gray-400 hover:text-brand-yellow transition-colors cursor-pointer"
                  >
                    FAQs
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info - New section for mobile */}
            <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
              <h5 className="text-brand-yellow font-black text-[11px] sm:text-[12px] uppercase tracking-[0.3em] mb-4 sm:mb-5">
                Contact
              </h5>
              <ul className="space-y-3 text-sm sm:text-base">
                <li className="flex items-center justify-center sm:justify-start gap-2 text-gray-400">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+2348123209188" className="hover:text-brand-yellow transition-colors">+234 812 320 9188</a>
                </li>
                <li className="flex items-center justify-center sm:justify-start gap-2 text-gray-400">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:blazehorizonrealty@gmail.com" className="hover:text-brand-yellow transition-colors break-all">blazehorizonrealty@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar - Clean and simple */}
      <div className="border-t border-white/10 py-5 sm:py-6">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <p className="text-center text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-gray-500">
            © 2024 BlazeHorizon Realty. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer