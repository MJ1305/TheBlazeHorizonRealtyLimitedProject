import { useState, useEffect } from "react";
import AdminLayout from "../adminPages/adminsidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const generatePassword = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#!";
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

export default function AdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ display_name: "", email: "" });
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  useEffect(() => {
    fetchAdmins();
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

  const fetchAdmins = async () => {
    setFetching(true);
    const { data, error } = await supabase
      .from("admins")
      .select("*")
      .order("created_at", { ascending: true });
    if (!error) setAdmins(data || []);
    setFetching(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const password = generatePassword();

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { data, error } = await supabase.rpc("create_admin_user", {
        admin_email: form.email,
        admin_password: password,
        admin_display_name: form.display_name,
        created_by_id: user.id,
      });

      if (error) {
        alert("Error creating admin: " + error.message);
        setLoading(false);
        return;
      }

      setGeneratedPassword(password);

      // Optimistically add the new admin to the list immediately
      setAdmins((prev) => [...prev, {
        id: data,
        email: form.email,
        display_name: form.display_name,
        role: "admin",
        must_change_password: true,
      }]);

    } catch (err) {
      alert("Something went wrong: " + err.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("admins").delete().eq("id", id);
      if (error) { alert("Error deleting admin: " + error.message); return; }
      setAdmins((prev) => prev.filter((a) => a.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      alert("Something went wrong.");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#1B3A2D" }}>Admins</h1>
            <p className="text-gray-400 text-sm mt-0.5">Manage who has access to this portal</p>
          </div>
          <Button
            onClick={() => { setShowForm(true); setGeneratedPassword(""); setForm({ display_name: "", email: "" }); }}
            className="text-white font-medium rounded-xl hover:opacity-90"
            style={{ backgroundColor: "#1B3A2D" }}
          >
            + New Admin
          </Button>
        </div>

        {/* Create admin form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-100" style={{ backgroundColor: "#f9faf9" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#1B3A2D" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <line x1="20" y1="8" x2="20" y2="14"/>
                  <line x1="23" y1="11" x2="17" y2="11"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: "#1B3A2D" }}>Create New Admin</p>
                <p className="text-xs text-gray-400">A password will be auto-generated and must be changed on first login</p>
              </div>
            </div>

            {generatedPassword ? (
              <div className="p-6 space-y-4">
                <div className="rounded-xl p-4 border" style={{ backgroundColor: "#f0f9f4", borderColor: "#1B3A2D" }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: "#1B3A2D" }}>✅ Admin created successfully!</p>
                  <p className="text-xs text-gray-500 mb-3">Share these credentials securely. The admin must change their password on first login.</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-gray-200">
                      <span className="text-xs text-gray-400">Email</span>
                      <span className="text-sm font-medium" style={{ color: "#1B3A2D" }}>{form.email}</span>
                    </div>
                    <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-gray-200">
                      <span className="text-xs text-gray-400">Temp Password</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono font-medium" style={{ color: "#1B3A2D" }}>{generatedPassword}</span>
                        <button
                          onClick={() => navigator.clipboard.writeText(generatedPassword)}
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ backgroundColor: "#F5A623", color: "#1B3A2D" }}
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      setShowForm(false);
                      setGeneratedPassword("");
                      fetchAdmins(); // ← refetch on Done to confirm accuracy
                    }}
                    className="rounded-xl text-white"
                    style={{ backgroundColor: "#1B3A2D" }}
                  >
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreate} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#1B3A2D" }}>Display Name</label>
                    <Input
                      value={form.display_name}
                      onChange={(e) => setForm((p) => ({ ...p, display_name: e.target.value }))}
                      placeholder="e.g. John Doe"
                      required
                      className="rounded-xl bg-gray-50 border-gray-200"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#1B3A2D" }}>Email Address</label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      placeholder="admin@blazehorizon.com"
                      required
                      className="rounded-xl bg-gray-50 border-gray-200"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button type="submit" disabled={loading} className="rounded-xl text-white font-medium hover:opacity-90" style={{ backgroundColor: "#1B3A2D" }}>
                    {loading ? "Creating..." : "Create Admin"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="rounded-xl">Cancel</Button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Admins list */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100" style={{ backgroundColor: "#f9faf9" }}>
            <p className="font-semibold text-sm" style={{ color: "#1B3A2D" }}>All Admins ({admins.length})</p>
          </div>

          {fetching ? (
            <div className="p-12 text-center">
              <svg className="animate-spin mx-auto mb-3 opacity-40" width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#1B3A2D" strokeWidth="4"/>
                <path className="opacity-75" fill="#1B3A2D" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              <p className="text-gray-400 text-sm">Loading admins...</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {admins.map((admin) => (
                <div key={admin.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{
                        backgroundColor: admin.role === "super_admin" ? "#1B3A2D" : "#F5A623",
                        color: admin.role === "super_admin" ? "#F5A623" : "#1B3A2D"
                      }}
                    >
                      {admin.display_name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-sm" style={{ color: "#1B3A2D" }}>{admin.display_name}</p>
                      <p className="text-xs text-gray-400">{admin.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: admin.role === "super_admin" ? "#1B3A2D" : "#f0f0f0",
                        color: admin.role === "super_admin" ? "#F5A623" : "#555",
                      }}
                    >
                      {admin.role === "super_admin" ? "Super Admin" : "Admin"}
                    </span>
                    {admin.role !== "super_admin" && currentAdmin?.role === "super_admin" && (
                      deleteConfirm === admin.id ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">Sure?</span>
                          <button onClick={() => handleDelete(admin.id)} className="text-xs font-medium text-red-500 hover:opacity-70">Yes, delete</button>
                          <button onClick={() => setDeleteConfirm(null)} className="text-xs font-medium text-gray-400 hover:opacity-70">Cancel</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(admin.id)}
                          className="text-xs font-medium text-red-400 hover:text-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}