import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'



//CURRENTLY NOT IN USE SHA......

const BackButton = () => {
  const navigate = useNavigate()
  const location = useLocation()

  //Hides Button on Certain Pages...xoxomj
  const isHidden =
    location.pathname === '/' ||
    location.pathname === '/contact' ||
    location.pathname.startsWith('/property') ||
    document.body.classList.contains('not-found')

  if (isHidden) return null

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <button
      onClick={handleBack}
      className="fixed bottom-24 left-6 bg-[#03302b] text-white px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 z-50"
    >
      ← Back
    </button>
  )
}

export default BackButton