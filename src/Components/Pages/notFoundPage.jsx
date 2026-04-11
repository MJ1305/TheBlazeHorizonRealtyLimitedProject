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
    <div className="responsive-notfound min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gray-50">
      <h1 className="text-6xl font-black text-[#03302b] mb-4">
        404
      </h1>
      <h2 className="text-2xl font-bold text-[#03302b] mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-6 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-[#fa8e12] text-white px-6 py-3 rounded-xl font-black hover:scale-105 transition-all"
      >
        Go Back Home
      </button>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 640px) {
          .responsive-notfound {
            width: 100%;
            overflow-x: hidden;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .responsive-notfound h1 {
            font-size: 3rem;
          }
          
          .responsive-notfound h2 {
            font-size: 1.25rem;
          }
          
          .responsive-notfound p {
            font-size: 0.875rem;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
          
          .responsive-notfound button {
            width: 100%;
            max-width: 250px;
            padding: 0.75rem 1rem;
          }
        }
        
        @media (min-width: 641px) and (max-width: 768px) {
          .responsive-notfound {
            width: 100%;
          }
          
          .responsive-notfound h1 {
            font-size: 4rem;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .responsive-notfound {
            width: 100%;
          }
        }
        
        @media (min-width: 1025px) {
          .responsive-notfound {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default NotFound