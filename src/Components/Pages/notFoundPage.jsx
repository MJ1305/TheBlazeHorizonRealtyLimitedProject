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
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 bg-gray-50">
      {/* 404 Number */}
      <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#03302b] mb-3 sm:mb-4">
        404
      </h1>
      
      {/* Error Message */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#03302b] mb-2 sm:mb-3">
        Page Not Found
      </h2>
      
      <p className="text-gray-600 mb-6 sm:mb-8 max-w-md text-sm sm:text-base px-4">
        The page you are looking for doesn't exist or has been moved.
      </p>
      
      {/* Home Button */}
      <button
        onClick={() => navigate('/')}
        className="bg-[#fa8e12] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-black hover:scale-105 transition-all duration-300 w-full sm:w-auto max-w-[220px] sm:max-w-none"
      >
        Go Back Home
      </button>
    </div>
  )
}

export default NotFound