import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropertyCard from './PropertyCard'
import { properties } from '../data/property'

// Images
import build1 from './Images/img1.jpeg'
import build2 from './Images/img2.jpeg'
import build3 from './Images/img3.jpeg'
import build4 from './Images/img4.jpeg'
import build5 from './Images/img5.jpg'
import build6 from './Images/img6.jpg'

const Listing = () => {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')

  // USE GENERAL PROPERTY DATA (from property.js)
  const allProperties = properties

  // FIXED NAVIGATION
  const handleMoreInfo = (id) => {
    navigate(`/property/${id}`)
  }

  // FILTER LOGIC
  const filteredProperties =
    activeFilter === 'all'
      ? allProperties
      : allProperties.filter((property) => property.type === activeFilter)

  return (
    <div className="pt-24">

      <header className="bg-[#03302b] pt-32 pb-24 px-6 text-center">
        <span className="text-brand-yellow text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">
          Available Assets
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-white">
          Property Portfolio
        </h1>
        <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
          Discover our exclusive collection of luxury properties available for purchase or rent
        </p>
      </header>

      <section className="py-16 px-6 max-w-7xl mx-auto">

        {/* FILTERS */}
        <div className="flex flex-wrap justify-between items-center mb-16 gap-6">
          <div className="flex space-x-2 bg-white p-1 rounded-xl shadow-sm border border-gray-100 mx-auto">

            <button
              onClick={() => setActiveFilter('all')}
              className={`px-8 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#03302b] text-white'
                  : 'hover:bg-gray-50 text-gray-400'
              }`}
            >
              All Properties
            </button>

            <button
              onClick={() => setActiveFilter('buy')}
              className={`px-8 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                activeFilter === 'buy'
                  ? 'bg-[#03302b] text-white'
                  : 'hover:bg-gray-50 text-gray-400'
              }`}
            >
              Buy
            </button>

            <button
              onClick={() => setActiveFilter('rent')}
              className={`px-8 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                activeFilter === 'rent'
                  ? 'bg-[#03302b] text-white'
                  : 'hover:bg-gray-50 text-gray-400'
              }`}
            >
              Rent
            </button>

          </div>
        </div>

        {/* COUNT */}
        <div className="mb-8 text-right">
          <p className="text-sm text-gray-500">
            Showing{' '}
            <span className="font-bold text-[#03302b]">
              {filteredProperties.length}
            </span>{' '}
            properties
          </p>
        </div>

        {/* GRID */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              No properties found for this category.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProperties.map((property) => (
              <PropertyCard 
                key={property.slug}
                {...property} 
                onMoreInfo={() => navigate(`/property/${property.slug}`)}
              />
            ))}
          </div>
        )}

      </section>
    </div>
  )
}

export default Listing