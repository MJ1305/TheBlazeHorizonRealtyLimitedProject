import React, { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
import Logo from "../Images/imglogo.jpeg"

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const currentPath = location.pathname
  
  // Check if current page is home
  const isHomePage = currentPath === '/'

  useEffect(() => {
    const handleScroll = () => {
      // Only trigger scroll effect on homepage
      if (isHomePage) {
        setIsScrolled(window.scrollY > 50)
      } else {
        // On other pages, always keep the solid background
        setIsScrolled(true)
      }
    }

    // Set initial state
    handleScroll()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll)
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navItems = [
    { path: '/', label: 'Home', id: 'home' },
    { path: '/about', label: 'About Us', id: 'about' },
    { path: '/listings', label: 'Properties', id: 'listings' }
  ]

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 md:px-12 lg:px-24 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#03302b] shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-black tracking-tight text-white flex items-center"
          >
            <img 
              className='w-[7rem] sm:w-[8rem] h-[3rem] sm:h-[3.5rem] rounded-xl object-contain' 
              src={Logo} 
              alt="logo" 
            />
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
            {navItems.map(item => (
              <Link
                key={item.id}
                to={item.path}
                className={`text-gray-300 hover:text-brand-yellow transition-all text-xs font-black uppercase tracking-widest pb-1 ${
                  currentPath === item.path ? 'text-brand-yellow border-b-2 border-brand-yellow' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Desktop Contact Button - Hidden on mobile */}
          <Link           
            to="/contact"
            className={`hidden md:block bg-[#fa8e12] text-gray-900 font-black py-2.5 px-5 lg:px-6 rounded-md text-xs uppercase tracking-widest hover:scale-105 transition-all duration-700`}
          >
            Contact
          </Link>

          {/* Hamburger Menu Button - Only visible on mobile/tablet */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg focus:outline-none z-50"
            aria-label="Menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white my-1.5 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Full screen overlay */}
      <div 
        className={`fixed inset-0 bg-[#03302b] z-40 transition-all duration-300 md:hidden ${
          isMobileMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ top: '72px' }}
      >
        <div className="flex flex-col items-center justify-start pt-8 px-6 pb-12 h-full overflow-y-auto">
          {/* Mobile Navigation Links */}
          <div className="flex flex-col items-center space-y-6 w-full">
            {navItems.map(item => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-gray-300 hover:text-brand-yellow transition-all text-lg font-black uppercase tracking-widest py-2 w-full text-center ${
                  currentPath === item.path ? 'text-brand-yellow border-b-2 border-brand-yellow' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Contact Button */}
            <Link           
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-[#fa8e12] text-gray-900 font-black py-3 px-8 rounded-md text-sm uppercase tracking-widest hover:scale-105 transition-all duration-700 mt-6 inline-block"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation