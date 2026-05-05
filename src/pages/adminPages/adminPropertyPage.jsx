import { useState, useEffect } from "react";
import AdminLayout from "../adminPages/adminsidebar";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const statusColors = {
  available: { bg: "#e6f4ed", color: "#1B3A2D" },
  sold: { bg: "#fdecea", color: "#c0392b" },
  rented: { bg: "#fff4e0", color: "#b7770d" },
  "off-market": { bg: "#f0f0f0", color: "#555" },
};

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => { fetchProperties(); }, []);

  const fetchProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
    if (!error) setProperties(data || []);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (!error) setProperties((prev) => prev.filter((p) => p.id !== id));
    else alert("Failed to delete property.");
  };

  const clearFilters = () => { setSearch(""); setLocationFilter(""); setStateFilter(""); setCountryFilter(""); setFilter("all"); };

  const uniqueLocations = [...new Set(properties.map((p) => p.location).filter(Boolean))].sort();
  const uniqueStates = [...new Set(properties.map((p) => p.state).filter(Boolean))].sort();
  const uniqueCountries = [...new Set(properties.map((p) => p.country).filter(Boolean))].sort();

  const filtered = properties.filter((p) => {
    const matchesStatus = filter === "all" || p.status === filter;
    const matchesSearch = !search || p.title?.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = !locationFilter || p.location === locationFilter;
    const matchesState = !stateFilter || p.state === stateFilter;
    const matchesCountry = !countryFilter || p.country === countryFilter;
    return matchesStatus && matchesSearch && matchesLocation && matchesState && matchesCountry;
  });

  const hasActiveFilters = search || locationFilter || stateFilter || countryFilter || filter !== "all";

  return (
    <AdminLayout>
      <div className="space-y-4 sm:space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold" style={{ color: "#1B3A2D" }}>Properties</h1>
            <p className="text-gray-500 mt-0.5 text-xs sm:text-sm">Manage all your property listings.</p>
          </div>
          <Link
            to="/admin/properties/new"
            className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium text-white hover:opacity-90"
            style={{ backgroundColor: "#1B3A2D" }}
          >
            <span className="hidden sm:inline">+ Add Property</span>
            <span className="sm:hidden">+ Add</span>
          </Link>
        </div>

        {/* Status Filters — scrollable on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
          {["all", "available", "sold", "rented", "off-market"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium capitalize transition-all flex-shrink-0"
              style={{
                backgroundColor: filter === f ? "#1B3A2D" : "#fff",
                color: filter === f ? "#fff" : "#1B3A2D",
                border: "1px solid #d1d5db",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4 space-y-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search by property title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 sm:pl-9 pr-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-800"
            />
          </div>

          {/* Toggle filters on mobile */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-xs font-medium sm:hidden"
            style={{ color: "#1B3A2D" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            {showFilters ? "Hide filters" : "Show filters"}
          </button>

          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 ${showFilters ? "block" : "hidden sm:grid"}`}>
            {[
              { label: "Location", value: locationFilter, setter: setLocationFilter, options: uniqueLocations },
              { label: "State", value: stateFilter, setter: setStateFilter, options: uniqueStates },
              { label: "Country", value: countryFilter, setter: setCountryFilter, options: uniqueCountries },
            ].map((f) => (
              <div key={f.label} className="space-y-1">
                <label className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide" style={{ color: "#1B3A2D" }}>{f.label}</label>
                <select
                  value={f.value}
                  onChange={(e) => f.setter(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 sm:py-2.5 text-xs sm:text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-800"
                >
                  <option value="">All {f.label}s</option>
                  {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>

          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-1">
              <p className="text-[10px] sm:text-xs text-gray-400">
                Showing <span className="font-semibold" style={{ color: "#1B3A2D" }}>{filtered.length}</span> of {properties.length} properties
              </p>
              <button onClick={clearFilters} className="text-[10px] sm:text-xs font-medium hover:opacity-70" style={{ color: "#F5A623" }}>
                Clear all ×
              </button>
            </div>
          )}
        </div>

        {/* Table — scrollable on mobile */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 sm:p-16 text-center">
              <svg className="animate-spin mx-auto mb-3 opacity-40" width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#1B3A2D" strokeWidth="4"/>
                <path className="opacity-75" fill="#1B3A2D" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              <p className="text-gray-400 text-sm">Loading properties...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 sm:p-16 text-center">
              <p className="text-gray-400 text-sm">No properties match your filters.</p>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="inline-block mt-4 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-white hover:opacity-90" style={{ backgroundColor: "#1B3A2D" }}>
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm min-w-[600px]">
                <thead style={{ backgroundColor: "#f9fafb" }}>
                  <tr>
                    <th className="text-left px-3 sm:px-6 py-3 text-gray-500 font-medium">Property</th>
                    <th className="text-left px-3 sm:px-6 py-3 text-gray-500 font-medium hidden sm:table-cell">Location</th>
                    <th className="text-left px-3 sm:px-6 py-3 text-gray-500 font-medium hidden md:table-cell">State / Country</th>
                    <th className="text-left px-3 sm:px-6 py-3 text-gray-500 font-medium hidden sm:table-cell">Type</th>
                    <th className="text-left px-3 sm:px-6 py-3 text-gray-500 font-medium">Status</th>
                    <th className="text-left px-3 sm:px-6 py-3 text-gray-500 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          {p.cover_image ? (
                            <img src={p.cover_image} alt={p.title} className="w-10 h-8 sm:w-12 sm:h-10 rounded-lg object-cover flex-shrink-0" />
                          ) : (
                            <div className="w-10 h-8 sm:w-12 sm:h-10 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: "#f0f0f0" }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9DB8A8" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                              </svg>
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-medium truncate max-w-[100px] sm:max-w-none" style={{ color: "#1B3A2D" }}>{p.title}</p>
                            <p className="text-gray-400 text-[10px] sm:text-xs capitalize">{p.property_type}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-500 hidden sm:table-cell">{p.location || "—"}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell">
                        <p className="text-gray-500 text-xs sm:text-sm">{p.state || "—"}</p>
                        <p className="text-gray-400 text-[10px] sm:text-xs">{p.country || "—"}</p>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-500 capitalize hidden sm:table-cell">{p.type}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <span className="px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium capitalize" style={statusColors[p.status]}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <Link to={`/admin/properties/edit/${p.id}`} className="text-xs sm:text-sm font-medium hover:opacity-70" style={{ color: "#1B3A2D" }}>Edit</Link>
                          <button onClick={() => handleDelete(p.id)} className="text-xs sm:text-sm font-medium text-red-500 hover:opacity-70">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}