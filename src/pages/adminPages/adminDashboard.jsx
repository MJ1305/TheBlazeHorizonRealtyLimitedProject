import { useState, useEffect } from "react";
import AdminLayout from "../adminPages/adminsidebar";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, available: 0, sold: 0, rented: 0 });
  const [recentProperties, setRecentProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    getCurrentAdmin();
  }, []);

  const getCurrentAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase
      .from("admins")
      .select("*")
      .eq("id", user.id)
      .single();
    setCurrentAdmin(data);
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const { data: properties, error } = await supabase
        .from("properties")
        .select("id, title, status, created_at, images")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setStats({
        total: properties.length,
        available: properties.filter((p) => p.status === "available").length,
        sold: properties.filter((p) => p.status === "sold").length,
        rented: properties.filter((p) => p.status === "rented").length,
      });

      setRecentProperties(properties.slice(0, 3));
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err.message);
    }
    setLoading(false);
  };

  const statCards = [
    { label: "Total Properties", value: stats.total, bg: "#1B3A2D", color: "#fff" },
    { label: "Available", value: stats.available, bg: "#F5A623", color: "#1B3A2D" },
    { label: "Sold", value: stats.sold, bg: "#fff", color: "#1B3A2D" },
    { label: "Rented", value: stats.rented, bg: "#fff", color: "#1B3A2D" },
  ];

  const statusStyles = {
    available: { bg: "#f0f9f4", color: "#1B3A2D" },
    sold: { bg: "#fdecea", color: "#c0392b" },
    rented: { bg: "#fff4e0", color: "#b7770d" },
    "off-market": { bg: "#f0f0f0", color: "#555" },
  };

  return (
    <AdminLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#1B3A2D" }}>Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's an overview of your properties.</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-6 shadow-sm border border-gray-100"
              style={{ backgroundColor: stat.bg }}
            >
              <p className="text-sm font-medium mb-1" style={{ color: stat.color, opacity: 0.75 }}>
                {stat.label}
              </p>
              {loading ? (
                <div className="h-9 w-12 rounded-lg animate-pulse mt-1" style={{ backgroundColor: stat.color, opacity: 0.15 }} />
              ) : (
                <p className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-base font-semibold mb-4" style={{ color: "#1B3A2D" }}>Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href="/admin/properties/new"
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-white hover:opacity-90"
              style={{ backgroundColor: "#1B3A2D" }}
            >
              Add New Property
            </a>
            <a
              href="/admin/properties"
              className="px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-200 hover:opacity-90"
              style={{ color: "#1B3A2D", backgroundColor: "#fff" }}
            >
              View All Properties
            </a>
            {currentAdmin?.role === "super_admin" && (
              <a
                href="/admin/admins"
                className="px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-200 hover:opacity-90"
                style={{ color: "#1B3A2D", backgroundColor: "#fff" }}
              >
                Manage Admins
              </a>
            )}
          </div>
        </div>

        {/* Recent Properties */}
        <div>
          <h2 className="text-base font-semibold mb-4" style={{ color: "#1B3A2D" }}>Recent Properties</h2>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 animate-pulse">
                  <div className="w-14 h-14 rounded-lg bg-gray-200 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-3 bg-gray-100 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentProperties.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
              <p className="text-gray-400 text-sm">No properties yet. Add your first one!</p>
              <a
                href="/admin/properties/new"
                className="inline-block mt-4 px-5 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90"
                style={{ backgroundColor: "#1B3A2D" }}
              >
                Add Property
              </a>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="divide-y divide-gray-100">
                {recentProperties.map((property) => {
                  const style = statusStyles[property.status] || statusStyles["off-market"];
                  const thumb = property.images?.[0] || null;
                  return (
                    <div key={property.id} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        {thumb ? (
                          <img src={thumb} alt={property.title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: "#f0f0f0" }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9DB8A8" strokeWidth="2">
                              <rect x="3" y="3" width="18" height="18" rx="2"/>
                              <path d="M3 9l4-4 4 4 4-4 4 4"/>
                            </svg>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-sm" style={{ color: "#1B3A2D" }}>{property.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {new Date(property.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium capitalize" style={{ backgroundColor: style.bg, color: style.color }}>
                          {property.status}
                        </span>
                        <a href={`/admin/properties/edit/${property.id}`} className="text-xs font-medium hover:opacity-70" style={{ color: "#1B3A2D" }}>
                          Edit
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="px-5 py-3 border-t border-gray-100">
                <a href="/admin/properties" className="text-xs font-medium hover:opacity-70" style={{ color: "#F5A623" }}>
                  View all properties →
                </a>
              </div>
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}