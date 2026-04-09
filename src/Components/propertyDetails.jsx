import React, { useState } from 'react'

import BackButton from './backButton'

// Inside the component, before the content:

const PropertyDetails = ({ property, setCurrentPage, setSelectedProperty }) => {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!property) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6">
            <BackButton setCurrentPage={setCurrentPage} customPath="listings" />            
        </div>

        <div className="text-center">
          <p className="text-gray-500">Property not found</p>
          <button 
            onClick={() => setCurrentPage('listings')}
            className="mt-4 bg-brand-yellow text-gray-900 px-6 py-3 rounded-lg font-black"
          >
            Back to Listings
          </button>
        </div>
      </div>
    )
  }

  const handleBookTour = () => {
    setSelectedProperty(property)
    setCurrentPage('book-tour')
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Image Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={property.images[selectedImage]} 
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Thumbnail Gallery */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
          {property.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === idx ? 'border-brand-yellow scale-110' : 'border-white/50'
              }`}
            >
              <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          {/* Title and Type */}
          <div className="flex flex-wrap justify-between items-start mb-8 gap-4">
            <div>
              <div className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 ${
                property.type === 'buy' 
                  ? 'bg-brand-yellow text-gray-900' 
                  : 'bg-gray-900 text-white'
              }`}>
                {property.type === 'buy' ? 'For Sale' : 'For Rent'}
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-[#03302b] mb-2">{property.title}</h1>
              <p className="text-gray-500 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {property.fullAddress}
              </p>
            </div>
            <button
              onClick={handleBookTour}
              className="bg-[#fa8e12] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all duration-300"
            >
              Schedule a Tour
            </button>
          </div>

          {/* Quick Specs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-gray-100 mb-8">
            <div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Bedrooms</p>
              <p className="text-2xl font-black text-[#03302b]">{property.beds}</p>
            </div>
            <div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Bathrooms</p>
              <p className="text-2xl font-black text-[#03302b]">{property.baths}</p>
            </div>
            <div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Square Feet</p>
              <p className="text-2xl font-black text-[#03302b]">{property.sqft}</p>
            </div>
            <div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Year Built</p>
              <p className="text-2xl font-black text-[#03302b]">{property.yearBuilt}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-10">
            <h2 className="text-2xl font-black text-[#03302b] mb-4">Property Description</h2>
            <p className="text-gray-600 leading-relaxed">{property.description}</p>
          </div>

          {/* Amenities */}
          <div className="mb-10">
            <h2 className="text-2xl font-black text-[#03302b] mb-4">Amenities & Features</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Locations */}
          <div className="mb-10">
            <h2 className="text-2xl font-black text-[#03302b] mb-4">Nearby Landmarks</h2>
            <div className="space-y-2">
              {property.nearby.map((place, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>{place}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location Map Placeholder */}
          <div className="mb-10">
            <h2 className="text-2xl font-black text-[#03302b] mb-4">Location</h2>
            <div className="bg-gray-200 h-64 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm">{property.fullAddress}</p>
                  <button 
                    onClick={() => {
                      const address = encodeURIComponent(property.fullAddress)
                      window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank')
                    }}
                    className="mt-2 text-brand-yellow text-xs font-black uppercase tracking-widest hover:underline"
                  >
                    View on Google Maps
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setCurrentPage('listings')}
              className="px-8 py-3 bg-gray-900 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[#03302b] transition-all"
            >
              ← Back to All Properties
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails