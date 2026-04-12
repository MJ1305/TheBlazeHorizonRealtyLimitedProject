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
    <div className="group bg-grey-200 rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-full w-full">
      {/* Image Container - Responsive heights */}
      <div className="h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden relative">
        <img 
          src={image} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
          alt={title}
        />
        {/* Type Badge - Responsive positioning and sizing */}
        <div className={`absolute top-3 sm:top-4 md:top-6 left-3 sm:left-4 md:left-6 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-widest ${
          type === 'buy' 
            ? 'bg-[#fa8e12] text-gray-900' 
            : 'bg-gray-900 text-white'
        }`}>
          {type === 'buy' ? 'For Sale' : 'For Rent'}
        </div>
      </div>
      
      {/* Content Container - Responsive padding */}
      <div className="p-4 sm:p-5 md:p-6 lg:p-8 flex-grow flex flex-col">
        {/* Title - Responsive text size */}
        <h4 className="text-lg sm:text-xl md:text-2xl font-black mb-1 sm:mb-2 line-clamp-1">
          {title}
        </h4>
        
        {/* Location - Responsive text size */}
        <p className="text-gray-400 text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-3 sm:mb-4 truncate">
          {location}
        </p>
        
        {/* Property specs - Responsive spacing and wrapping */}
        <div className="flex gap-2 sm:gap-3 md:gap-4 text-gray-400 text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-4 sm:mb-5 md:mb-6 flex-wrap">
          <span>{beds} Beds</span>
          <span>•</span>
          <span>{baths} Baths</span>
          <span>•</span>
          <span>{sqft} sqft</span>
        </div>
        
        {/* More Info Button - Responsive padding and icon size */}
        <button 
          onClick={onMoreInfo}
          className="w-full bg-[#2b4b47] text-white py-2.5 sm:py-3 rounded-full flex items-center justify-center gap-2 hover:bg-brand-yellow hover:text-[#03302b] transition-all duration-300 group mt-auto"
        >
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">More Info</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default PropertyCard