import React, { useState } from 'react'
import PropertyCard from './propertyCard'

//Images
import build1 from './Images/img1.jpeg'
import build2 from './Images/img2.jpeg'
import build3 from './Images/img3.jpeg'
import build4 from './Images/img4.jpeg'
import build5 from './Images/img5.jpg'
import build6 from './Images/img6.jpg'

const Listing = ({ setCurrentPage, setSelectedProperty }) => {
  const [activeFilter, setActiveFilter] = useState('all')
  
  // Properties data with FULL details
  const properties = [
    {
      id: 1,
      title: 'The Monarch Suite',
      location: 'Banana Island, Lagos',
      fullAddress: '123 Banana Island Way, Ikoyi, Lagos',
      state: 'Lagos',
      country: 'Nigeria',
      image: build1,
      images: [build1, build2, build3, build4],
      type: 'buy',
      beds: 4,
      baths: 3,
      sqft: '2,400',
      yearBuilt: '2022',
      parking: '2 spaces',
      description: 'Experience luxury living at its finest in The Monarch Suite. This stunning 4-bedroom apartment features floor-to-ceiling windows, marble flooring, and breathtaking views of the Lagos skyline. The property includes a private elevator, 24/7 concierge service, and access to a rooftop infinity pool.',
      amenities: ['Swimming Pool', 'Gym', '24/7 Security', 'Parking', 'Elevator', 'Concierge', 'Backup Generator', 'Central AC'],
      nearby: ['Banana Island Club (5 min)', 'Lekki Conservation Centre (10 min)', 'Mega Plaza (15 min)']
    },
    {
      id: 2,
      title: 'Sapphire Heights',
      location: 'Lekki Phase 1, Lagos',
      fullAddress: '45 Admiralty Way, Lekki Phase 1, Lagos',
      state: 'Lagos',
      country: 'Nigeria',
      image: build2,
      images: [build2, build3, build4, build5],
      type: 'buy',
      beds: 6,
      baths: 5,
      sqft: '4,800',
      yearBuilt: '2023',
      parking: '3 spaces',
      description: 'Sapphire Heights is a masterpiece of modern architecture. This magnificent 6-bedroom mansion boasts high ceilings, smart home technology, and premium finishes throughout. The property features a private cinema, wine cellar, and landscaped gardens.',
      amenities: ['Private Cinema', 'Wine Cellar', 'Gym', 'Pool', 'Smart Home', 'Landscaped Garden', 'Staff Quarters'],
      nearby: ['Novare Mall (3 min)', 'Lagos Business School (8 min)', 'Lekki Toll Gate (12 min)']
    },
    {
      id: 3,
      title: 'Ocean View Villa',
      location: 'Victoria Island, Lagos',
      fullAddress: '78 Ahmadu Bello Way, Victoria Island, Lagos',
      state: 'Lagos',
      country: 'Nigeria',
      image: build3,
      images: [build3, build4, build5, build6],
      type: 'rent',
      beds: 5,
      baths: 4,
      sqft: '3,500',
      yearBuilt: '2021',
      parking: '2 spaces',
      description: 'Wake up to stunning ocean views every morning in this magnificent villa. Ocean View Villa offers direct beach access, a private infinity pool, and spacious outdoor entertaining areas. Perfect for those seeking a tranquil coastal lifestyle.',
      amenities: ['Beach Access', 'Infinity Pool', 'Private Gym', 'Garden', 'Outdoor Kitchen', 'Security System'],
      nearby: ['Landmark Beach (2 min)', 'Eko Atlantic (7 min)', 'Shoprite (5 min)']
    },
    {
      id: 4,
      title: 'Central Park Tower',
      location: 'Ikoyi, Lagos',
      fullAddress: '22 Bourdillon Road, Ikoyi, Lagos',
      state: 'Lagos',
      country: 'Nigeria',
      image: build4,
      images: [build4, build5, build6, build1],
      type: 'rent',
      beds: 3,
      baths: 3,
      sqft: '2,200',
      yearBuilt: '2022',
      parking: '2 spaces',
      description: 'Central Park Tower offers contemporary urban living in the heart of Ikoyi. This elegant apartment features modern finishes, large balconies, and access to world-class amenities. The property is within walking distance to top restaurants and shopping centers.',
      amenities: ['Rooftop Lounge', 'Pool', 'Gym', 'Co-working Space', 'Concierge', 'Visitor Parking'],
      nearby: ['Parkview Estate (3 min)', 'Ikoyi Club (8 min)', 'The Palms Mall (12 min)']
    },
    {
      id: 5,
      title: 'Golden Estate',
      location: 'Ajah, Lagos',
      fullAddress: '15 Abraham Adesanya Estate, Ajah, Lagos',
      state: 'Lagos',
      country: 'Nigeria',
      image: build5,
      images: [build5, build6, build1, build2],
      type: 'buy',
      beds: 5,
      baths: 4,
      sqft: '3,200',
      yearBuilt: '2023',
      parking: '3 spaces',
      description: 'Golden Estate is a newly developed luxury compound featuring spacious 5-bedroom homes with modern amenities. Each unit comes with a private garden, solar panels, and high-speed fiber internet.',
      amenities: ['Solar Panels', 'Fiber Internet', 'Private Garden', 'Playground', 'Clubhouse', 'Security Gate'],
      nearby: ['Ajah Market (5 min)', 'Novare Mall (10 min)', 'Abraham Adesanya Polyclinic (3 min)']
    },
    {
      id: 6,
      title: 'Pearl Gardens',
      location: 'GRA, Ikeja',
      fullAddress: '8 Mobolaji Bank Anthony Way, Ikeja, Lagos',
      state: 'Lagos',
      country: 'Nigeria',
      image: build6,
      images: [build6, build1, build2, build3],
      type: 'rent',
      beds: 2,
      baths: 2,
      sqft: '1,500',
      yearBuilt: '2022',
      parking: '1 space',
      description: 'Pearl Gardens offers cozy yet luxurious 2-bedroom apartments in the heart of Ikeja GRA. Perfect for professionals and small families, this property combines comfort with convenience.',
      amenities: ['Swimming Pool', 'Gym', 'Backup Power', 'Water Treatment', 'CCTV', 'Intercom'],
      nearby: ['Ikeja City Mall (5 min)', 'MMIA Airport (12 min)', 'Government House (8 min)']
    }
  ]

  // Handle "More Info" click - pass full property to details page
  const handleMoreInfo = (property) => {
    console.log(`Viewing details for: ${property.title}`)
    setSelectedProperty(property)
    setCurrentPage('property-details')
  }

  // Filter properties based on active filter
  const filteredProperties = activeFilter === 'all' 
    ? properties 
    : properties.filter(property => property.type === activeFilter)

  return (
    <div className="pt-24">
      <header className="bg-[#03302b] pt-32 pb-24 px-6 text-center">
        <span className="text-brand-yellow text-[10px] font-black tracking-[0.4em] uppercase mb-4 block">Available Assets</span>
        <h1 className="text-4xl md:text-6xl font-black text-white">Property Portfolio</h1>
        <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
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

        {/* Results count */}
        <div className="mb-8 text-right">
          <p className="text-sm text-gray-500">
            Showing <span className="font-bold text-[#03302b]">{filteredProperties.length}</span> properties
          </p>
        </div>

        {/* Listings Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No properties found for this category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                title={property.title}
                location={property.location}
                image={property.image}
                type={property.type}
                beds={property.beds}
                baths={property.baths}
                sqft={property.sqft}
                onMoreInfo={() => handleMoreInfo(property)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Listing