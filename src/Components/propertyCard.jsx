import React from 'react'

const PropertyCard = ({ 
  title, 
  location, 
  image, 
  type, 
  beds, 
  baths, 
  sqft,
  onMoreInfo 
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
            ? 'bg-[#fa8e12] text-gray-900' 
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
        
        {/* More Info Button */}
        <button 
          onClick={onMoreInfo}
          className="w-full bg-[#2b4b47] text-white py-3 rounded-full flex items-center justify-center gap-2 hover:bg-brand-yellow hover:text-[#03302b] transition-all duration-300 group mt-auto"
        >
          <span className="text-xs font-black uppercase tracking-widest">More Info</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default PropertyCard