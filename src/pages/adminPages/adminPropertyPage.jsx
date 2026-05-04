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

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setProperties(data || []);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (!error) setProperties((prev) => prev.filter((p) => p.id !== id));
    else alert("Failed to delete property.");
  };

  const clearFilters = () => {
    setSearch("");
    setLocationFilter("");
    setStateFilter("");
    setCountryFilter("");
    setFilter("all");
  };

  // Unique values for dropdowns
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
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#1B3A2D" }}>Properties</h1>
            <p className="text-gray-500 mt-1">Manage all your property listings.</p>
          </div>
          <Link
            to="/admin/properties/new"
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-white hover:opacity-90"
            style={{ backgroundColor: "#1B3A2D" }}
          >
            + Add Property
          </Link>
        </div>

        {/* Status Filters */}
        <div className="flex gap-2 flex-wrap">
          {["all", "available", "sold", "rented", "off-market"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all"
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

        {/* Search & Location Filters */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
          {/* Search by title */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search by property title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-800"
            />
          </div>

          {/* Location / State / Country dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#1B3A2D" }}>Location</label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-800"
              >
                <option value="">All Locations</option>
                {uniqueLocations.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#1B3A2D" }}>State</label>
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-800"
              >
                <option value="">All States</option>
                {uniqueStates.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#1B3A2D" }}>Country</label>
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-800"
              >
                <option value="">All Countries</option>
                {uniqueCountries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active filter summary + clear */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-1">
              <p className="text-xs text-gray-400">
                Showing <span className="font-semibold" style={{ color: "#1B3A2D" }}>{filtered.length}</span> of {properties.length} properties
              </p>
              <button
                onClick={clearFilters}
                className="text-xs font-medium hover:opacity-70"
                style={{ color: "#F5A623" }}
              >
                Clear all filters ×
              </button>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-16 text-center">
              <svg className="animate-spin mx-auto mb-3 opacity-40" width="32" height="32" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#1B3A2D" strokeWidth="4"/>
                <path className="opacity-75" fill="#1B3A2D" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              <p className="text-gray-400 text-sm">Loading properties...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center">
              <svg className="mx-auto mb-3 opacity-20" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1B3A2D" strokeWidth="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <p className="text-gray-400 text-sm">No properties match your filters.</p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-block mt-4 px-5 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90"
                  style={{ backgroundColor: "#1B3A2D" }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "#f9fafb" }}>
                <tr>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Property</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Location</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">State / Country</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Type</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Status</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {p.cover_image ? (
                          <img
                            src={p.cover_image}
                            alt={p.title}
                            className="w-12 h-10 rounded-lg object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-10 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: "#f0f0f0" }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9DB8A8" strokeWidth="2">
                              <rect x="3" y="3" width="18" height="18" rx="2"/>
                              <circle cx="8.5" cy="8.5" r="1.5"/>
                              <polyline points="21 15 16 10 5 21"/>
                            </svg>
                          </div>
                        )}
                        <div>
                          <p className="font-medium" style={{ color: "#1B3A2D" }}>{p.title}</p>
                          <p className="text-gray-400 text-xs capitalize">{p.property_type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{p.location || "—"}</td>
                    <td className="px-6 py-4">
                      <p className="text-gray-500 text-sm">{p.state || "—"}</p>
                      <p className="text-gray-400 text-xs">{p.country || "—"}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-500 capitalize">{p.type}</td>
                    <td className="px-6 py-4">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-medium capitalize"
                        style={statusColors[p.status]}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Link
                          to={`/admin/properties/edit/${p.id}`}
                          className="text-sm font-medium hover:opacity-70"
                          style={{ color: "#1B3A2D" }}
                        >
                          Edit
                        </Link>
                        <button
                          className="text-sm font-medium text-red-500 hover:opacity-70"
                          onClick={() => handleDelete(p.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}