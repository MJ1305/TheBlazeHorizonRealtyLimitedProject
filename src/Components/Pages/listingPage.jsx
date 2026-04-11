import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../Shared/propertyCard";
import { properties } from "../../data/property";

const Listing = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  // FILTER STATES
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedType, setSelectedType] = useState("all");
  const [selectedBedrooms, setSelectedBedrooms] = useState("all");

  //COMPARE STATE (ADDED)
  const [compareList, setCompareList] = useState([]);

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

  //SEARCH FILTER
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

  //SUGGESTIONS (ADDED)
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

  //COMPARE FUNCTION
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
          Discover our exclusive collection of luxury properties available for
          purchase or rent
        </p>
      </header>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        {/* SEARCH + CONTROLS */}
        <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-between items-center mb-10 relative">
          <input
            type="text"
            placeholder="Search by location, country or type..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="p-3 border rounded-xl w-full md:w-1/3"
          />

          {/* 🆕 SUGGESTION DROPDOWN */}
          {suggestions.length > 0 && (
            <div className="absolute top-14 left-0 w-full md:w-1/3 bg-white border rounded-xl shadow-lg z-50">
              {suggestions.map((item) => (
                <div
                  key={item.slug}
                  onClick={() => navigate(`/property/${item.slug}`)}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                >
                  <p className="font-bold">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.location}</p>
                </div>
              ))}
            </div>
          )}

          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="p-3 border rounded-xl"
          >
            <option value={6}>6 per page</option>
            <option value={12}>12 per page</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setCurrentPage(1);
            }}
            className="p-3 border rounded-xl"
          >
            <option value="all">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="duplex">Duplex</option>
            <option value="villa">Villa</option>
            <option value="bungalow">Bungalow</option>
          </select>

          <select
            value={selectedBedrooms}
            onChange={(e) => {
              setSelectedBedrooms(e.target.value);
              setCurrentPage(1);
            }}
            className="p-3 border rounded-xl"
          >
            <option value="all">All Bedrooms</option>
            <option value="1">1 Bed</option>
            <option value="2">2 Beds</option>
            <option value="3">3 Beds</option>
            <option value="4">4 Beds</option>
            <option value="5">5+ Beds</option>
          </select>
        </div>

        {/*COMPARE BAR */}
        {compareList.length > 0 && (
          <div className="mb-6 p-4 bg-gray-100 rounded-xl flex justify-between items-center">
            <p className="font-bold ">Compare ({compareList.length}/3)</p>

            <button
              onClick={() => navigate("/compare", { state: compareList })}
              className="bg-[#fa8e12] text-white px-4 py-2 rounded-lg font-bold"
            >
              Compare Now
            </button>
          </div>
        )}

        {/* BUY / RENT FILTER */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={() => {
              setActiveFilter("all");
              setCurrentPage(1);
            }}
            className={`px-6 py-3 rounded-lg font-black ${
              activeFilter === "all" ? "bg-[#03302b] text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>

          <button
            onClick={() => {
              setActiveFilter("buy");
              setCurrentPage(1);
            }}
            className={`px-6 py-3 rounded-lg font-black ${
              activeFilter === "buy" ? "bg-[#03302b] text-white" : "bg-gray-200"
            }`}
          >
            Buy
          </button>

          <button
            onClick={() => {
              setActiveFilter("rent");
              setCurrentPage(1);
            }}
            className={`px-6 py-3 rounded-lg font-black ${
              activeFilter === "rent"
                ? "bg-[#03302b] text-white"
                : "bg-gray-200"
            }`}
          >
            Rent
          </button>
        </div>

        {/* COUNT */}
        <div className="text-right mb-6">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-bold text-[#03302b]">
              {searchedProperties.length}
            </span>{" "}
            properties
          </p>
        </div>

        {/* GRID */}
        {searchedProperties.length === 0 ? (
          <p className="text-center text-gray-400 py-20">
            No properties found matching your filters.
          </p>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {paginatedProperties.map((property) => (
                <div key={property.slug} className="relative">
                  {/* 🆕 COMPARE BUTTON */}
                  <button
                    onClick={() => toggleCompare(property)}
                    className="absolute top-2 right-2 bg-black text-white text-xs px-3 py-1 rounded z-10"
                  >
                    {compareList.find((p) => p.slug === property.slug)
                      ? "Remove"
                      : "Compare"}
                  </button>

                  <PropertyCard
                    {...property}
                    onMoreInfo={() => navigate(`/property/${property.slug}`)}
                  />
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 rounded-lg font-bold ${
                    currentPage === index + 1
                      ? "bg-[#fa8e12] text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Listing;
