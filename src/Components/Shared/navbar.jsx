import React, { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
import Logo from "../Images/imglogo.jpeg"

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
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

  const navItems = [
    { path: '/', label: 'Home', id: 'home' },
    { path: '/about', label: 'About Us', id: 'about' },
    { path: '/listings', label: 'Properties', id: 'listings' }
  ]

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 py-5 px-6 md:px-12 lg:px-24 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#03302b] border-white/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-black tracking-tight text-white flex items-center"
        >
          <img className='w-[8rem] h-[3.5rem] rounded-xl' src={Logo} alt="logo" />
        </Link>

        <div className="hidden md:flex items-center space-x-10">
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
        
        <Link           
          to="/contact"
          className={`hidden md:block bg-[#fa8e12] text-gray-900 font-black py-2.5 px-6 rounded-md text-xs uppercase tracking-widest hover:scale-105 transition-all duration-700`}
        >
          Contact
        </Link>      
      </div>
    </nav>
  )
}

export default Navigation