import React, { useState, useEffect } from 'react'

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page scrolls down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    
    // Cleanup event listener
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  // Custom smooth scroll function with adjustable speed
  const smoothScrollToTop = (duration = 1500) => { // duration in milliseconds (1500 = 1.5 seconds)
    const startPosition = window.scrollY
    const startTime = performance.now()
    
    if (startPosition === 0) return
    
    const scrollAnimation = (currentTime) => {
      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / duration, 1)
      
      // Easing function for smoother acceleration/deceleration
      const easeInOutCubic = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2
      
      window.scrollTo(0, startPosition * (1 - easeInOutCubic))
      
      if (progress < 1) {
        requestAnimationFrame(scrollAnimation)
      }
    }
    
    requestAnimationFrame(scrollAnimation)
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={() => smoothScrollToTop(1500)} // 1500ms = 1.5 seconds (slower)
          className="fixed bottom-8 right-8 z-50 bg-[#111827] text-white w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center group focus:outline-none"
          aria-label="Back to top"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 group-hover:-translate-y-1 transition-transform duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </button>
      )}
    </>
  )
}

export default BackToTop