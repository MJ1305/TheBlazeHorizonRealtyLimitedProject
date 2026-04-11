import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ComparePage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const properties = location.state || []

  if (properties.length === 0) {
    return (
      <div className="responsive-compare min-h-screen flex items-center justify-center">
        <button
          onClick={() => navigate('/listings')}
          className="bg-[#03302b] text-white px-6 py-3 rounded-lg"
        >
          Go Back to Listings
        </button>
      </div>
    )
  }

  return (
    <div className="responsive-compare min-h-screen pt-32 px-6">
      <h1 className="text-3xl font-black mb-10">
        Compare Properties
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {properties.map((p) => (
          <div key={p.slug} className="border rounded-xl p-4">
            <img
              src={p.image}
              className="w-full h-40 object-cover rounded-lg"
              alt={p.title}
            />
            <h2 className="font-black mt-3">{p.title}</h2>
            <p>{p.location}</p>
            <p className="mt-2 text-sm">
              🛏 {p.beds} Beds | 🛁 {p.baths} Baths
            </p>
            <p className="text-sm">
              📏 {p.sqft} sqft
            </p>
            <p className="text-sm">
              🏠 {p.propertyType}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/listings')}
        className="mt-10 bg-gray-800 text-white px-6 py-3 rounded-lg"
      >
        Back
      </button>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 640px) {
          .responsive-compare {
            width: 100%;
            overflow-x: hidden;
          }
          
          .responsive-compare .grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .responsive-compare h1 {
            font-size: 1.5rem;
            text-align: center;
          }
          
          .responsive-compare button {
            width: 100%;
            text-align: center;
          }
        }
        
        @media (min-width: 641px) and (max-width: 768px) {
          .responsive-compare {
            width: 100%;
          }
          
          .responsive-compare .grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .responsive-compare {
            width: 100%;
          }
          
          .responsive-compare .grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }
        
        @media (min-width: 1025px) {
          .responsive-compare {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default ComparePage