import React, { useState, useEffect } from 'react'

const Navigation = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHomePage, setIsHomePage] = useState(currentPage === 'home')

  useEffect(() => {
    // Update isHomePage when currentPage changes
    setIsHomePage(currentPage === 'home')
  }, [currentPage])

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
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'listings', label: 'Properties' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 py-5 px-6 md:px-12 lg:px-24 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#111827] border-white/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button 
          onClick={() => setCurrentPage('home')} 
          className="text-2xl font-black tracking-tight text-white flex items-center"
        >
          <span className="text-brand-yellow">KINGDOM</span>FIRM
        </button>

        <div className="hidden md:flex items-center space-x-10">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`text-gray-300 hover:text-brand-yellow transition-all text-xs font-black uppercase tracking-widest pb-1 ${
                currentPage === item.id ? 'text-brand-yellow border-b-2 border-brand-yellow' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setCurrentPage('contact')}
          className={`hidden md:block bg-yellow-400 text-gray-900 font-black py-2.5 px-6 rounded-md text-xs uppercase tracking-widest hover:scale-105 transition-all duration-700 `}
        >
          Book a Tour
        </button>
      </div>
    </nav>
  )
}

export default Navigation