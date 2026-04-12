import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('not-found')

    return () => {
      document.body.classList.remove('not-found')
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-3 sm:px-4 md:px-6 bg-gray-50">
      {/* 404 Number */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-[#03302b] mb-2 sm:mb-3 md:mb-4">
        404
      </h1>
      
      {/* Error Message */}
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#03302b] mb-2 sm:mb-2.5 md:mb-3">
        Page Not Found
      </h2>
      
      <p className="text-gray-600 mb-5 sm:mb-6 md:mb-8 max-w-md text-xs sm:text-sm md:text-base px-3 sm:px-4">
        The page you are looking for doesn't exist or has been moved.
      </p>
      
      {/* Home Button */}
      <button
        onClick={() => navigate('/')}
        className="bg-[#fa8e12] text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-black text-[11px] sm:text-xs md:text-sm hover:scale-105 transition-all duration-300 w-full sm:w-auto max-w-[200px] sm:max-w-[220px] md:max-w-none"
      >
        Go Back Home
      </button>
    </div>
  )
}

export default NotFound