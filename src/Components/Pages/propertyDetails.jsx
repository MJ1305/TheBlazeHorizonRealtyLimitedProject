import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { properties } from '../../data/property'

const PropertyDetails = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(0)
  const [property, setProperty] = useState(null)

  useEffect(() => {
    const found = properties.find((p) => p.slug === slug)
    setProperty(found || null)
  }, [slug])

  // Redirect invalid slugs to 404
  useEffect(() => {
    if (property === null) {
      const exists = properties.some(p => p.slug === slug)
      if (!exists) {
        navigate('/404')
      }
    }
  }, [property, slug, navigate])

  const handleBookTour = () => {
    navigate('/book-tour', { state: { property } })
  }

  if (!property) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center px-4">
        <div className="animate-pulse text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin mx-auto mb-3 sm:mb-4"></div>
          <p className="text-gray-500 text-xs sm:text-sm">Loading property details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-14 sm:pt-16 md:pt-20 lg:pt-24">
      {/* Hero Section with Main Image */}
      <div className="relative bg-black">
        {/* Main Image Container */}
        <div className="relative h-[45vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] xl:h-[65vh]">
          <img
            src={property.images[selectedImage]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          
          {/* Property Type Badge - Floating on image */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 z-10">
            <span className={`inline-block px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-black uppercase tracking-widest shadow-lg ${
              property.type === 'buy' 
                ? 'bg-[#fa8e12] text-[#03302b]' 
                : 'bg-[#03302b] text-white'
            }`}>
              {property.type === 'buy' ? 'FOR SALE' : 'FOR RENT'}
            </span>
          </div>
        </div>

        {/* Thumbnail Gallery - Scrollable on mobile */}
        <div className="absolute -bottom-5 sm:-bottom-6 left-0 right-0 z-20">
          <div className="flex justify-center items-center">
            <div className="flex gap-1.5 sm:gap-2 md:gap-3 overflow-x-auto px-3 sm:px-4 pb-2 max-w-full scrollbar-thin">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 overflow-hidden rounded-md sm:rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                    selectedImage === idx
                      ? 'border-[#fa8e12] scale-105 shadow-lg'
                      : 'border-white/60 hover:border-[#fa8e12]/50'
                  }`}
                  style={{ width: 'clamp(45px, 15vw, 70px)', height: 'clamp(45px, 15vw, 70px)' }}
                >
                  <img 
                    src={img} 
                    className="w-full h-full object-cover" 
                    alt={`Thumbnail ${idx + 1}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 mt-10 sm:mt-12 md:mt-16 lg:mt-20 pb-10 sm:pb-12 md:pb-16 lg:pb-20">
        <div className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl overflow-hidden">
          
          {/* Main Content Padding */}
          <div className="p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10">
            
            {/* Title & Location */}
            <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-[#03302b] leading-tight mb-2 sm:mb-2.5 md:mb-3">
                {property.title}
              </h1>
              <div className="flex items-start gap-1.5 sm:gap-2 text-gray-500">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-[11px] sm:text-xs md:text-sm break-words">{property.fullAddress}</p>
              </div>
            </div>

            {/* Key Specifications - Responsive Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 py-3 sm:py-4 md:py-5 lg:py-6 border-y border-gray-100">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-gray-400 mb-1">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-wider">Bedrooms</span>
                </div>
                <p className="font-black text-base sm:text-lg md:text-xl lg:text-2xl text-[#03302b]">{property.beds}</p>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-gray-400 mb-1">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-wider">Bathrooms</span>
                </div>
                <p className="font-black text-base sm:text-lg md:text-xl lg:text-2xl text-[#03302b]">{property.baths}</p>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-gray-400 mb-1">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-wider">Square Feet</span>
                </div>
                <p className="font-black text-base sm:text-lg md:text-xl lg:text-2xl text-[#03302b]">{property.sqft.toLocaleString()}</p>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-gray-400 mb-1">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-wider">Year Built</span>
                </div>
                <p className="font-black text-base sm:text-lg md:text-xl lg:text-2xl text-[#03302b]">{property.yearBuilt}</p>
              </div>
            </div>

            {/* Description Section */}
            <div className="mt-5 sm:mt-6 md:mt-7 lg:mt-8">
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-[#03302b] mb-2 sm:mb-3 md:mb-4 flex items-center gap-1.5 sm:gap-2">
                <span className="text-sm sm:text-base">📋</span> Description
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Amenities Section */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="mt-5 sm:mt-6 md:mt-7 lg:mt-8">
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-[#03302b] mb-2 sm:mb-3 md:mb-4 flex items-center gap-1.5 sm:gap-2">
                  <span className="text-sm sm:text-base">✨</span> Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-2 md:gap-3">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#fa8e12] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 text-[11px] sm:text-xs md:text-sm capitalize">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-7 md:mt-8 lg:mt-10 xl:mt-12 pt-5 sm:pt-6 md:pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4">
                <button
                  onClick={() => navigate('/listings')}
                  className="order-2 sm:order-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-black rounded-lg sm:rounded-xl transition-all duration-300 text-[10px] sm:text-xs md:text-sm uppercase tracking-widest"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Properties
                </button>
                <button
                  onClick={handleBookTour}
                  className="order-1 sm:order-2 flex items-center justify-center gap-1.5 sm:gap-2 px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-[#fa8e12] hover:bg-[#e07d0a] text-white font-black rounded-lg sm:rounded-xl transition-all duration-300 text-[10px] sm:text-xs md:text-sm uppercase tracking-widest shadow-md hover:shadow-lg"
                >
                  Schedule a Tour
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles for Thumbnail Gallery */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
      `}</style>
    </div>
  )
}

export default PropertyDetails