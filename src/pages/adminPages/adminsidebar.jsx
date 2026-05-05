import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import PasswordChangeModal from "../../components/ui/passwordChangeModal";

const navItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    label: "Properties",
    path: "/admin/properties",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    label: "Add Property",
    path: "/admin/properties/new",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="16"/>
        <line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    ),
  },
  {
    label: "Admins",
    path: "/admin/admins",
    superAdminOnly: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
];

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);

  useEffect(() => {
    const getAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/admin/login"); return; }
      const { data } = await supabase.from("admins").select("*").eq("id", user.id).single();
      setAdmin(data);
      const { data: draft } = await supabase.from("property_drafts").select("id").eq("admin_id", user.id).maybeSingle();
      if (draft) setHasDraft(true);
    };
    getAdmin();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#F5F5F5" }}>

      {admin?.must_change_password && (
        <PasswordChangeModal admin={admin} onSuccess={() => setAdmin((prev) => ({ ...prev, must_change_password: false }))} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-56 sm:w-64 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ backgroundColor: "#1B3A2D" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-5 sm:py-6 border-b border-white/10">
          <div className="w-1.5 sm:w-2 h-7 sm:h-8 rounded-full flex-shrink-0" style={{ backgroundColor: "#F5A623" }} />
          <div className="min-w-0">
            <p className="text-white font-semibold text-xs sm:text-sm truncate">Blaze Horizon Realty Limited</p>
            <p className="text-[10px] sm:text-xs" style={{ color: "#9DB8A8" }}>Admin Portal</p>
          </div>
        </div>

        {/* Draft banner */}
        {hasDraft && (
          <Link
            to="/admin/properties/new"
            onClick={() => setSidebarOpen(false)}
            className="mx-3 sm:mx-4 mt-3 sm:mt-4 flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] sm:text-xs font-medium"
            style={{ backgroundColor: "#F5A623", color: "#1B3A2D" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Unfinished property — continue
          </Link>
        )}

        {/* Nav */}
        <nav className="flex-1 px-3 sm:px-4 py-5 sm:py-6 space-y-1">
          {navItems.map((item) => {
            if (item.superAdminOnly && admin?.role !== "super_admin") return null;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all"
                style={{ backgroundColor: active ? "#F5A623" : "transparent", color: active ? "#1B3A2D" : "#9DB8A8" }}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Admin info + logout */}
        <div className="px-3 sm:px-4 py-3 sm:py-4 border-t border-white/10">
          {admin && (
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 px-2 sm:px-3">
              <div
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: "#F5A623", color: "#1B3A2D" }}
              >
                {admin.display_name?.[0]?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-white text-xs sm:text-sm font-medium truncate">{admin.display_name}</p>
                <p className="text-[10px] sm:text-xs truncate" style={{ color: "#9DB8A8" }}>
                  {admin.role === "super_admin" ? "Super Admin" : "Admin"}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm transition-all"
            style={{ color: "#9DB8A8" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white border-b border-gray-200">
          <button className="lg:hidden p-1.5 sm:p-2 rounded-lg" style={{ color: "#1B3A2D" }} onClick={() => setSidebarOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500" />
            <span className="text-xs sm:text-sm text-gray-500">System online</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-3 sm:p-6">{children}</main>
      </div>
    </div>
  );
}