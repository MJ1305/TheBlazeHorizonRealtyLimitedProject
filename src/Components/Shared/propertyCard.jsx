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
    <div className="group bg-grey-200 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-full w-full">
      {/* Image Container - Responsive heights */}
      <div className="h-44 sm:h-52 md:h-60 lg:h-64 xl:h-72 overflow-hidden relative">
        <img 
          src={image} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
          alt={title}
        />
        {/* Type Badge - Responsive positioning and sizing */}
        <div className={`absolute top-2 sm:top-3 md:top-4 lg:top-6 left-2 sm:left-3 md:left-4 lg:left-6 px-1.5 sm:px-2 md:px-3 lg:px-4 py-0.5 sm:py-1 md:py-1.5 rounded-full text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-black uppercase tracking-widest ${
          type === 'buy' 
            ? 'bg-[#fa8e12] text-gray-900' 
            : 'bg-gray-900 text-white'
        }`}>
          {type === 'buy' ? 'For Sale' : 'For Rent'}
        </div>
      </div>
      
      {/* Content Container - Responsive padding */}
      <div className="p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 flex-grow flex flex-col">
        {/* Title - Responsive text size */}
        <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black mb-1 sm:mb-2 line-clamp-1">
          {title}
        </h4>
        
        {/* Location - Responsive text size */}
        <p className="text-gray-400 text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-bold uppercase tracking-widest mb-2 sm:mb-3 md:mb-4 truncate">
          {location}
        </p>
        
        {/* Property specs - CHANGED: only show beds/baths if they exist */}
        <div className="flex gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 text-gray-400 text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-bold uppercase tracking-widest mb-3 sm:mb-4 md:mb-5 lg:mb-6 flex-wrap">
          {beds && (
            <>
              <span>{beds} Beds</span>
              <span>•</span>
            </>
          )}
          {baths && (
            <>
              <span>{baths} Baths</span>
              <span>•</span>
            </>
          )}
          {sqft && <span>{Number(sqft).toLocaleString()} sqft</span>}
        </div>
        
        {/* More Info Button - Responsive padding and icon size */}
        <button 
          onClick={onMoreInfo}
          className="w-full bg-[#2b4b47] text-white py-2 sm:py-2.5 md:py-3 rounded-full flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-brand-yellow hover:text-[#03302b] transition-all duration-300 group mt-auto"
        >
          <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-black uppercase tracking-widest">More Info</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4 transition-transform group-hover:translate-x-1" 
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