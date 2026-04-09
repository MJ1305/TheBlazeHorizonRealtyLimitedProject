import React from 'react'

const BackButton = ({ customPath, setCurrentPage, label = 'Back' }) => {
  const handleBack = () => {
    if (customPath && setCurrentPage) {
      // Go to custom path if provided
      setCurrentPage(customPath)
    } else if (window.history.length > 2) {
      // Go back in browser history if available
      window.history.back()
    } else if (setCurrentPage) {
      // Default fallback to home page
      setCurrentPage('home')
    }
  }

  return (
    <button
      onClick={handleBack}
      className="group inline-flex items-center gap-2 text-gray-500 hover:text-brand-yellow transition-all duration-300 mb-6"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-4 w-4 transition-transform group-hover:-translate-x-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <span className="text-xs font-black uppercase tracking-widest">{label}</span>
    </button>
  )
}

export default BackButton