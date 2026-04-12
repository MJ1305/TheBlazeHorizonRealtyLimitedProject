import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ComparePage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const properties = location.state || []
  const [removingId, setRemovingId] = useState(null)

  // Remove property from comparison
  const removeProperty = (slugToRemove) => {
    setRemovingId(slugToRemove)
    setTimeout(() => {
      const updatedProperties = properties.filter(p => p.slug !== slugToRemove)
      if (updatedProperties.length === 0) {
        navigate('/listings')
      } else {
        // Update the location state
        navigate('/compare', { state: updatedProperties, replace: true })
      }
      setRemovingId(null)
    }, 300)
  }

  if (properties.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="text-5xl sm:text-6xl md:text-7xl mb-3 sm:mb-4">🔍</div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#03302b] mb-2">No Properties to Compare</h2>
          <p className="text-gray-500 mb-5 sm:mb-6 max-w-md text-xs sm:text-sm md:text-base">
            Select properties from the listings page to compare them side by side.
          </p>
          <button
            onClick={() => navigate('/listings')}
            className="bg-[#03302b] text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-xl font-black text-xs sm:text-sm md:text-base hover:bg-[#044b44] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Browse Properties →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-10 sm:pb-12 md:pb-16 px-3 sm:px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header with count */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 mb-5 sm:mb-6 md:mb-8 lg:mb-10">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-[#fa8e12]/10 rounded-xl flex items-center justify-center">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#fa8e12]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-[#03302b]">
                Compare Properties
              </h1>
            </div>
            <p className="text-gray-500 text-[11px] sm:text-xs md:text-sm lg:text-base ml-9 sm:ml-10 md:ml-12">
              Comparing {properties.length} property{properties.length !== 1 ? 'ies' : ''}
            </p>
          </div>
          
          {/* Add More Button */}
          {properties.length < 3 && (
            <button
              onClick={() => navigate('/listings')}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 bg-white border-2 border-[#fa8e12] text-[#fa8e12] rounded-xl font-bold text-[11px] sm:text-xs md:text-sm hover:bg-[#fa8e12] hover:text-white transition-all duration-300"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add More ({properties.length}/3)
            </button>
          )}
        </div>

        {/* Comparison Grid */}
        <div className={`grid gap-3 sm:gap-4 md:gap-5 lg:gap-6 ${
          properties.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
          properties.length === 2 ? 'grid-cols-1 sm:grid-cols-2' :
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {properties.map((p, index) => (
            <div 
              key={p.slug} 
              className={`group relative bg-white rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-fadeIn ${
                removingId === p.slug ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Remove Button */}
              <button
                onClick={() => removeProperty(p.slug)}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 w-7 h-7 sm:w-8 sm:h-8 bg-black/70 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm hover:scale-110"
                aria-label="Remove property"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Property Image */}
              <div className="relative h-44 sm:h-52 md:h-56 lg:h-64 overflow-hidden bg-gray-200">
                <img
                  src={p.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={p.title}
                />
                {/* Property Type Badge */}
                <div className={`absolute bottom-2 left-2 sm:bottom-3 sm:left-3 px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-full text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-black uppercase tracking-wider shadow-lg ${
                  p.type === 'buy' 
                    ? 'bg-[#fa8e12] text-[#03302b]' 
                    : 'bg-[#03302b] text-white'
                }`}>
                  {p.type === 'buy' ? 'For Sale' : 'For Rent'}
                </div>
              </div>

              {/* Property Details */}
              <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                {/* Title */}
                <h2 className="font-black text-sm sm:text-base md:text-lg lg:text-xl text-[#03302b] mb-1 line-clamp-2">
                  {p.title}
                </h2>
                
                {/* Location */}
                <div className="flex items-start gap-1 sm:gap-1.5 mb-2 sm:mb-3">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-500 text-[11px] sm:text-xs md:text-sm flex-1">{p.location}</p>
                </div>

                {/* Specifications Section */}
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 mb-3 sm:mb-4">
                  <h3 className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-black text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2 md:mb-3">
                    Key Features
                  </h3>
                  <div className="space-y-1.5 sm:space-y-2 md:space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-[10px] sm:text-xs md:text-sm">🛏 Bedrooms</span>
                      <span className="font-bold text-[#03302b] text-xs sm:text-sm md:text-base">{p.beds}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-[10px] sm:text-xs md:text-sm">🛁 Bathrooms</span>
                      <span className="font-bold text-[#03302b] text-xs sm:text-sm md:text-base">{p.baths}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-[10px] sm:text-xs md:text-sm">📏 Square Feet</span>
                      <span className="font-bold text-[#03302b] text-xs sm:text-sm md:text-base">{p.sqft.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-[10px] sm:text-xs md:text-sm">🏠 Property Type</span>
                      <span className="font-bold text-[#03302b] text-xs sm:text-sm md:text-base capitalize">{p.propertyType}</span>
                    </div>
                    {p.yearBuilt && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-[10px] sm:text-xs md:text-sm">📅 Year Built</span>
                        <span className="font-bold text-[#03302b] text-xs sm:text-sm md:text-base">{p.yearBuilt}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/property/${p.slug}`)}
                    className="flex-1 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg sm:rounded-xl font-bold text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs uppercase tracking-wider transition-all duration-300"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => navigate('/book-tour', { state: { property: p } })}
                    className="flex-1 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 bg-[#fa8e12] hover:bg-[#e07d0a] text-white rounded-lg sm:rounded-xl font-bold text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs uppercase tracking-wider transition-all duration-300"
                  >
                    Tour
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 flex flex-col sm:flex-row justify-center gap-2.5 sm:gap-3 md:gap-4">
          <button
            onClick={() => navigate('/listings')}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg sm:rounded-xl font-bold text-[11px] sm:text-xs md:text-sm transition-all duration-300"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Listings
          </button>
          <button
            onClick={() => {
              const firstProperty = properties[0]
              if (firstProperty) {
                navigate('/book-tour', { state: { property: firstProperty } })
              }
            }}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 bg-[#fa8e12] hover:bg-[#e07d0a] text-white rounded-lg sm:rounded-xl font-bold text-[11px] sm:text-xs md:text-sm transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Schedule a Tour
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default ComparePage