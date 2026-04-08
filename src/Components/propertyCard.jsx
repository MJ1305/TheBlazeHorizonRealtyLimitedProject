import React from 'react'

const PropertyCard = ({ 
  title, 
  price, 
  location, 
  image, 
  type, 
  beds, 
  baths, 
  sqft 
}) => {
  return (
    <div className="group bg-grey-200 rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
      <div className="h-72 overflow-hidden relative">
        <img 
          src={image} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
          alt={title}
        />
        <div className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
          type === 'buy' 
            ? 'bg-brand-yellow text-gray-900' 
            : 'bg-gray-900 text-white'
        }`}>
          {type === 'buy' ? 'For Sale' : 'For Rent'}
        </div>
      </div>
      <div className="p-8 flex-grow flex flex-col">
        <h4 className="text-2xl font-black mb-2">{title}</h4>
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4">{location}</p>
        
        {/* Property specs */}
        <div className="flex gap-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-6">
          <span>{beds} Beds</span>
          <span>•</span>
          <span>{baths} Baths</span>
          <span>•</span>
          <span>{sqft} sqft</span>
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="text-2xl font-black text-gray-900 tracking-tighter">{price}</span>
          <button className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-brand-yellow hover:text-gray-900 transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard