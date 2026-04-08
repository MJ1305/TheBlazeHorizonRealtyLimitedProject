import React, { useState } from 'react'
import PropertyCard from './PropertyCard'

//Images
import build1 from './Images/img1.jpeg'
import build2 from './Images/img2.jpeg'
import build3 from './Images/img3.jpeg'
import build4 from './Images/img4.jpeg'
import build5 from './Images/img5.jpg'
import build6 from './Images/img6.jpg'

const ListingsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  
  // Properties data with local images
  const properties = [
    {
      title: 'The Monarch Suite',
      price: '$450,000',
      location: 'Banana Island, Lagos',
      image: build1,
      type: 'buy',
      beds: 4,
      baths: 3,
      sqft: '2,400'
    },
    {
      title: 'Sapphire Heights',
      price: '$1,200,000',
      location: 'Lekki Phase 1, Lagos',
      image: build2,
      type: 'buy',
      beds: 6,
      baths: 5,
      sqft: '4,800'
    },
    {
      title: 'Ocean View Villa',
      price: '$2,500/month',
      location: 'Victoria Island, Lagos',
      image: build3,
      type: 'rent',
      beds: 5,
      baths: 4,
      sqft: '3,500'
    },
    {
      title: 'Central Park Tower',
      price: '$3,200/month',
      location: 'Ikoyi, Lagos',
      image: build4,
      type: 'rent',
      beds: 3,
      baths: 3,
      sqft: '2,200'
    },
    {
      title: 'Golden Estate',
      price: '$850,000',
      location: 'Ajah, Lagos',
      image: build5,
      type: 'buy',
      beds: 5,
      baths: 4,
      sqft: '3,200'
    },
    {
      title: 'Pearl Gardens',
      price: '$1,800/month',
      location: 'GRA, Ikeja',
      image: build6,
      type: 'rent',
      beds: 2,
      baths: 2,
      sqft: '1,500'
    }
  ]

  // Filter properties based on active filter
  const filteredProperties = activeFilter === 'all' 
    ? properties 
    : properties.filter(property => property.type === activeFilter)

  return (
    <div className="pt-24">
      <header className="bg-gray-900 pt-32 pb-24 px-6 text-center">
        <span className="text-brand-yellow text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">Available Assets</span>
        <h1 className="text-4xl md:text-6xl font-black text-white">Property Portfolio</h1>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Discover our exclusive collection of luxury properties available for purchase or rent
        </p>
      </header>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        {/* Filters */}
        <div className="flex flex-wrap justify-between items-center mb-16 gap-6">
          <div className="flex space-x-2 bg-white p-1 rounded-xl shadow-sm border border-gray-100 mx-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-8 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                activeFilter === 'all' 
                  ? 'bg-gray-900 text-white' 
                  : 'hover:bg-gray-50 text-gray-400'
              }`}
            >
              All Properties
            </button>
            <button
              onClick={() => setActiveFilter('buy')}
              className={`px-8 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                activeFilter === 'buy' 
                  ? 'bg-gray-900 text-white' 
                  : 'hover:bg-gray-50 text-gray-400'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setActiveFilter('rent')}
              className={`px-8 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                activeFilter === 'rent' 
                  ? 'bg-gray-900 text-white' 
                  : 'hover:bg-gray-50 text-gray-400'
              }`}
            >
              Rent
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-8 text-right">
          <p className="text-sm text-gray-500">
            Showing <span className="font-bold text-gray-900">{filteredProperties.length}</span> properties
          </p>
        </div>

        {/* Listings Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No properties found for this category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProperties.map((property, index) => (
              <PropertyCard key={index} {...property} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default ListingsPage