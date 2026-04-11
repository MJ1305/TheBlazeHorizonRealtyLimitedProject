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
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gray-50">
      
      <h1 className="text-6xl font-black text-[#03302b] mb-4">
        404
      </h1>

      <h2 className="text-2xl font-bold text-[#03302b] mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-600 mb-6 max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <button
        onClick={() => navigate('/')}
        className="bg-[#fa8e12] text-white px-6 py-3 rounded-xl font-black hover:scale-105 transition-all"
      >
        Go Back Home
      </button>

    </div>
  )
}

export default NotFound