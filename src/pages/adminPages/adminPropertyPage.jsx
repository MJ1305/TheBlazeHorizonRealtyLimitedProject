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

  const filtered = filter === "all"
    ? properties
    : properties.filter((p) => p.status === filter);

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

        {/* Filters */}
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
              <p className="text-gray-400 text-sm">No properties found.</p>
              <Link
                to="/admin/properties/new"
                className="inline-block mt-4 px-5 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90"
                style={{ backgroundColor: "#1B3A2D" }}
              >
                Add Property
              </Link>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "#f9fafb" }}>
                <tr>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Property</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Location</th>
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
                        <img
                          src={p.cover_image}
                          alt={p.title}
                          className="w-12 h-10 rounded-lg object-cover flex-shrink-0"
                        />
                        <div>
                          <p className="font-medium" style={{ color: "#1B3A2D" }}>{p.title}</p>
                          <p className="text-gray-400 text-xs">{p.property_type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{p.location}</td>
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