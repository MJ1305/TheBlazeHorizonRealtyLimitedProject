import AdminLayout from "../adminPages/adminsidebar";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#1B3A2D" }}>Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's an overview of your properties.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Properties", value: "0", bg: "#1B3A2D", color: "#fff" },
            { label: "Available", value: "0", bg: "#F5A623", color: "#1B3A2D" },
            { label: "Sold", value: "0", bg: "#fff", color: "#1B3A2D" },
            { label: "Rented", value: "0", bg: "#fff", color: "#1B3A2D" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl p-6 shadow-sm border border-gray-100" style={{ backgroundColor: stat.bg }}>
              <p className="text-sm font-medium mb-1" style={{ color: stat.color, opacity: 0.75 }}>{stat.label}</p>
              <p className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-base font-semibold mb-4" style={{ color: "#1B3A2D" }}>Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <a href="/admin/properties/new" className="px-5 py-2.5 rounded-lg text-sm font-medium text-white hover:opacity-90" style={{ backgroundColor: "#1B3A2D" }}>Add New Property</a>
            <a href="/admin/properties" className="px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-200 hover:opacity-90" style={{ color: "#1B3A2D", backgroundColor: "#fff" }}>View All Properties</a>
            <a href="/admin/admins" className="px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-200 hover:opacity-90" style={{ color: "#1B3A2D", backgroundColor: "#fff" }}>Manage Admins</a>
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-4" style={{ color: "#1B3A2D" }}>Recent Properties</h2>
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
            <p className="text-gray-400 text-sm">No properties yet. Add your first one!</p>
            <a href="/admin/properties/new" className="inline-block mt-4 px-5 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90" style={{ backgroundColor: "#1B3A2D" }}>
              Add Property
            </a>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}