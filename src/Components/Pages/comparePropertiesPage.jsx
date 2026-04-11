import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ComparePage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const properties = location.state || []

  if (properties.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
    <div className="min-h-screen pt-32 px-6">

      <h1 className="text-3xl font-black mb-10">
        Compare Properties
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {properties.map((p) => (
          <div key={p.slug} className="border rounded-xl p-4">

            <img
              src={p.image}
              className="w-full h-40 object-cover rounded-lg"
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

    </div>
  )
}

export default ComparePage