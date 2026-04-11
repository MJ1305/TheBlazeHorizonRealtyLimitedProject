import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { properties } from '../../data/property'

const PropertyDetails = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(0)
  const [property, setProperty] = useState(null)

  useEffect(() => {
    const found = properties.find(
      (p) => p.slug === slug
    )

    setProperty(found || null)
  }, [slug])

  // ✅ ADDED: redirect invalid slugs to 404
  useEffect(() => {
    if (property === null) {
      const exists = properties.some(p => p.slug === slug)

      if (!exists) {
        navigate('*') // sends to NotFound page
      }
    }
  }, [property, slug, navigate])

  const handleBookTour = () => {
    navigate('/book-tour', { state: { property } })
  }

  if (!property) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <p className="text-gray-500">Loading property...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">

      {/* HERO */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={property.images[selectedImage]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Thumbnail Gallery with Hover Effects */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          {property.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`w-20 h-20 overflow-hidden rounded-lg border-2 transition-all duration-300 hover:scale-110 hover:shadow-xl ${
                selectedImage === idx
                  ? 'border-brand-yellow scale-110'
                  : 'border-white/50 hover:border-brand-yellow'
              }`}
            >
              <img 
                src={img} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
                alt={`Thumbnail ${idx + 1}`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* DETAILS */}
      <div className="max-w-7xl mx-auto px-6 -mt-5 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8">

          {/* HEADER */}
          <div className="flex justify-between flex-wrap gap-4 mb-8">
            <div>
              <div className="px-4 py-1 bg-brand-yellow text-xs font-black inline-block rounded-full mb-3">
                {property.type === 'buy' ? 'FOR SALE' : 'FOR RENT'}
              </div>

              <h1 className="text-4xl font-black text-[#03302b]">
                {property.title}
              </h1>

              <p className="text-gray-500 mt-2">
                {property.fullAddress}
              </p>
            </div>          
          </div>

          {/* SPECS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y py-6">
            <div>
              <p className="text-xs text-gray-400">Beds</p>
              <p className="font-black">{property.beds}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Baths</p>
              <p className="font-black">{property.baths}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Sqft</p>
              <p className="font-black">{property.sqft}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Year</p>
              <p className="font-black">{property.yearBuilt}</p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-8">
            <h2 className="text-xl font-black mb-2">Description</h2>
            <p className="text-gray-600">{property.description}</p>
          </div>

          {/* AMENITIES */}
          {property.amenities && (
            <div className="mt-8">
              <h2 className="text-xl font-black mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

         <div className='flex border border-[red] justify-between text-center'>
          {/* BACK BUTTON */}
          <div className="my-4 flex justify-center">
            <button
              onClick={() => navigate('/listings')}
              className="px-6 py-3 bg-gray-900 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[#03302b] transition-all duration-300"
            >
              ← Back to All Properties
            </button>
          </div>
          
           {/* BOOK TOUR BUTTON */}
          <div className="my-4 flex justify-center">
            <button
              onClick={handleBookTour}
              className="bg-[#fa8e12] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all duration-300"
            >
              Schedule a Tour
            </button>
          </div>          
         </div>

        </div>
      </div>
    </div>
  )
}

export default PropertyDetails