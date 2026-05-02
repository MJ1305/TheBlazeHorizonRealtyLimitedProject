import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../components/Shared/propertyCard";
import { properties } from "../data/property";

const Listing = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  // FILTER STATES
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedBedrooms, setSelectedBedrooms] = useState("all");
  const [compareList, setCompareList] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // Mobile filter toggle

  const allProperties = properties;

  // TYPE FILTER (buy/rent)
  const filteredByType =
    activeFilter === "all"
      ? allProperties
      : allProperties.filter((property) => property.type === activeFilter);

  // PROPERTY TYPE FILTER
  const filteredByPropertyType =
    selectedType === "all"
      ? filteredByType
      : filteredByType.filter(
          (property) =>
            property.propertyType?.toLowerCase() === selectedType.toLowerCase(),
        );

  // BEDROOM FILTER
  const filteredByBedrooms =
    selectedBedrooms === "all"
      ? filteredByPropertyType
      : filteredByPropertyType.filter(
          (property) => Number(property.beds) === Number(selectedBedrooms),
        );

  // SEARCH FILTER
  const searchedProperties = filteredByBedrooms.filter((property) => {
    const term = search.toLowerCase().trim();
    return (
      property.location?.toLowerCase().includes(term) ||
      property.country?.toLowerCase().includes(term) ||
      property.state?.toLowerCase().includes(term) ||
      property.propertyType?.toLowerCase().includes(term) ||
      property.title?.toLowerCase().includes(term)
    );
  });

  // SUGGESTIONS
  const suggestions =
    search.length === 0
      ? []
      : allProperties
          .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
          .slice(0, 5);

  // PAGINATION
  const totalPages = Math.ceil(searchedProperties.length / itemsPerPage);
  const paginatedProperties = searchedProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // COMPARE FUNCTION
  const toggleCompare = (property) => {
    setCompareList((prev) => {
      const exists = prev.find((p) => p.slug === property.slug);
      if (exists) {
        return prev.filter((p) => p.slug !== property.slug);
      }
      if (prev.length === 3) return prev;
      return [...prev, property];
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearch("");
    setSelectedType("all");
    setSelectedBedrooms("all");
    setActiveFilter("all");
    setCurrentPage(1);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#03302b] to-[#044b44] pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 pb-10 sm:pb-12 md:pb-16 lg:pb-20 px-3 sm:px-4 md:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="white" strokeWidth="0.5"/>
          </svg>
        </div>
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mt-3 sm:mt-4 md:mt-6 px-2">
            Property Portfolio
          </h1>
          <p className="text-gray-300 mt-2 sm:mt-3 md:mt-4 max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-4">
            Discover our exclusive collection of luxury properties available for purchase or rent
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16">
        
        {/* Search Bar - Prominent on all devices */}
        <div className="relative mb-3 sm:mb-4 md:mb-6">
          <div className="relative">
            <svg className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by location, property type, or title..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 sm:pl-10 md:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-4 border border-gray-200 rounded-lg sm:rounded-xl md:rounded-2xl text-xs sm:text-sm md:text-base bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#fa8e12] focus:border-transparent transition-all"
            />
          </div>
          
          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 sm:mt-2 bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-xl z-50 max-h-56 sm:max-h-64 overflow-y-auto">
              {suggestions.map((item) => (
                <div
                  key={item.slug}
                  onClick={() => navigate(`/property/${item.slug}`)}
                  className="p-2.5 sm:p-3 md:p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-0 group"
                >
                  <p className="font-bold text-xs sm:text-sm md:text-base text-[#03302b] group-hover:text-[#fa8e12] transition-colors">
                    {item.title}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{item.location}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-3 sm:mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span className="font-semibold text-xs sm:text-sm text-gray-700">Filters & Sort</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {(selectedType !== "all" || selectedBedrooms !== "all" || itemsPerPage !== 6) && (
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#fa8e12] rounded-full"></span>
              )}
              <svg className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
        </div>

        {/* Filters Section - Responsive */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block transition-all duration-300 mb-4 sm:mb-6 md:mb-8`}>
          <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 shadow-sm border border-gray-100">
            {/* Filter Row 1 - Items Per Page & Property Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <label className="block text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-black text-gray-500 uppercase tracking-wider mb-1 sm:mb-1.5 md:mb-2">
                  Show per page
                </label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full p-2 sm:p-2.5 md:p-3 border border-gray-200 rounded-lg text-[11px] sm:text-xs md:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#fa8e12]"
                >
                  <option value={6}>6 properties</option>
                  <option value={12}>12 properties</option>
                  <option value={18}>18 properties</option>
                </select>
              </div>
              <div>
                <label className="block text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-black text-gray-500 uppercase tracking-wider mb-1 sm:mb-1.5 md:mb-2">
                  Property Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full p-2 sm:p-2.5 md:p-3 border border-gray-200 rounded-lg text-[11px] sm:text-xs md:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#fa8e12]"
                >
                  <option value="all">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="duplex">Duplex</option>
                  <option value="villa">Villa</option>
                  <option value="bungalow">Bungalow</option>
                </select>
              </div>
            </div>

            {/* Filter Row 2 - Bedrooms & Clear */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-black text-gray-500 uppercase tracking-wider mb-1 sm:mb-1.5 md:mb-2">
                  Bedrooms
                </label>
                <select
                  value={selectedBedrooms}
                  onChange={(e) => {
                    setSelectedBedrooms(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full p-2 sm:p-2.5 md:p-3 border border-gray-200 rounded-lg text-[11px] sm:text-xs md:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#fa8e12]"
                >
                  <option value="all">All Bedrooms</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4 Bedrooms</option>
                  <option value="5">5+ Bedrooms</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={clearAllFilters}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs md:text-sm text-gray-600 hover:text-[#fa8e12] transition-colors border border-gray-200 rounded-lg hover:border-[#fa8e12]"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Buy/Rent Tabs */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 mb-4 sm:mb-6 md:mb-8">
          {[
            { key: "all", label: "All Properties", icon: "🏠" },
            { key: "buy", label: "For Sale", icon: "💰" },
            { key: "rent", label: "For Rent", icon: "🔑" }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveFilter(tab.key);
                setCurrentPage(1);
              }}
              className={`flex items-center gap-1 sm:gap-1.5 md:gap-2 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full font-black text-[10px] sm:text-xs md:text-sm transition-all ${
                activeFilter === tab.key
                  ? "bg-[#03302b] text-white shadow-md scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-100 shadow-sm"
              }`}
            >
              <span className="text-xs sm:text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Compare Bar */}
        {compareList.length > 0 && (
          <div className="mb-4 sm:mb-6 p-2.5 sm:p-3 md:p-4 bg-gradient-to-r from-[#fa8e12]/10 to-transparent rounded-lg sm:rounded-xl border border-[#fa8e12]/20 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 md:gap-4">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#fa8e12]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="font-bold text-xs sm:text-sm md:text-base text-[#03302b]">
                {compareList.length} property{compareList.length !== 1 ? 's' : ''} selected for comparison
              </p>
            </div>
            <button
              onClick={() => navigate("/compare", { state: compareList })}
              className="bg-[#fa8e12] text-white px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-lg font-bold text-[11px] sm:text-xs md:text-sm hover:scale-105 transition-all duration-300 w-full sm:w-auto shadow-md"
            >
              Compare Now →
            </button>
          </div>
        )}

        {/* Results Count */}
        <div className="flex justify-between items-center mb-3 sm:mb-4 md:mb-6">
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">
            Showing <span className="font-bold text-[#03302b]">{searchedProperties.length}</span> properties
          </p>
          {searchedProperties.length > 0 && (
            <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-400 hidden sm:block">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>

        {/* Properties Grid */}
        {searchedProperties.length === 0 ? (
          <div className="text-center py-10 sm:py-12 md:py-16 lg:py-20 bg-white rounded-xl sm:rounded-2xl shadow-sm">
            <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🔍</div>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base mb-2 sm:mb-3">
              No properties found matching your filters.
            </p>
            <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm mb-4 sm:mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-[#fa8e12] text-[11px] sm:text-xs md:text-sm font-semibold hover:underline"
            >
              Clear all filters
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              {paginatedProperties.map((property) => (
                <div key={property.slug} className="relative group">
                  {/* Compare Button */}
                  <button
                    onClick={() => toggleCompare(property)}
                    className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-20 text-[8px] sm:text-[9px] md:text-[10px] font-semibold px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-lg transition-all backdrop-blur-sm ${
                      compareList.find((p) => p.slug === property.slug)
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-black/70 text-white hover:bg-[#fa8e12]"
                    }`}
                  >
                    {compareList.find((p) => p.slug === property.slug) ? "Remove" : "Compare"}
                  </button>
                  <PropertyCard
                    {...property}
                    onMoreInfo={() => navigate(`/property/${property.slug}`)}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 flex justify-center">
                <nav className="flex flex-wrap justify-center gap-1 sm:gap-1.5 md:gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs md:text-sm font-medium transition-all ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm"
                    }`}
                  >
                    ← Previous
                  </button>
                  
                  {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = index + 1;
                    } else if (currentPage <= 3) {
                      pageNum = index + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + index;
                    } else {
                      pageNum = currentPage - 2 + index;
                    }
                    
                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`min-w-[2rem] sm:min-w-[2.25rem] md:min-w-[2.5rem] px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs md:text-sm font-bold transition-all ${
                          currentPage === pageNum
                            ? "bg-[#fa8e12] text-white shadow-md scale-105"
                            : "bg-white text-gray-600 hover:bg-gray-50 shadow-sm"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs md:text-sm font-medium transition-all ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm"
                    }`}
                  >
                    Next →
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Listing;