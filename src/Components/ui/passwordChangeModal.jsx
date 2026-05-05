import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/Components/ui/button";

const EyeIcon = ({ open }) => open ? (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

export default function PasswordChangeModal({ admin, onSuccess }) {
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      const { error: authError } = await supabase.auth.updateUser({ password: form.password });
      if (authError) { setError("Failed to update password: " + authError.message); setLoading(false); return; }
      const { error: dbError } = await supabase.from("admins").update({ must_change_password: false }).eq("id", admin.id);
      if (dbError) { setError("Password updated but profile not synced: " + dbError.message); setLoading(false); return; }
      onSuccess();
    } catch { setError("Something went wrong. Please try again."); }
    setLoading(false);
  };

  const inputClass = "w-full h-10 sm:h-11 rounded-xl border border-gray-200 bg-gray-50 px-3 pr-10 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-800";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md overflow-hidden">

        {/* Header */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100" style={{ backgroundColor: "#1B3A2D" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#F5A623" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B3A2D" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-xs sm:text-sm">Change Your Password</p>
              <p className="text-[10px] sm:text-xs" style={{ color: "#9DB8A8" }}>You must set a new password before continuing</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-5">
          <div className="rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm" style={{ backgroundColor: "#fff4e0", color: "#b7770d" }}>
            👋 Welcome, <strong>{admin?.display_name}</strong>! Your account was created with a temporary password. Please set a new one now.
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide" style={{ color: "#1B3A2D" }}>New Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="At least 8 characters" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} required className={inputClass} />
                <button type="button" onClick={() => setShowPassword((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide" style={{ color: "#1B3A2D" }}>Confirm Password</label>
              <div className="relative">
                <input type={showConfirm ? "text" : "password"} placeholder="Repeat your new password" value={form.confirm} onChange={(e) => setForm((p) => ({ ...p, confirm: e.target.value }))} required className={inputClass} />
                <button type="button" onClick={() => setShowConfirm((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-sm" style={{ backgroundColor: "#fdecea", color: "#c0392b" }}>{error}</div>
            )}

            {/* Password strength */}
            <div className="space-y-1">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-1 flex-1 rounded-full transition-colors" style={{
                    backgroundColor:
                      form.password.length === 0 ? "#e5e7eb" :
                      form.password.length < 6 && i === 1 ? "#ef4444" :
                      form.password.length >= 6 && form.password.length < 8 && i <= 2 ? "#F5A623" :
                      form.password.length >= 8 && form.password.length < 12 && i <= 3 ? "#1B3A2D" :
                      form.password.length >= 12 && i <= 4 ? "#1B3A2D" : "#e5e7eb",
                  }} />
                ))}
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400">
                {form.password.length === 0 ? "Enter a password" : form.password.length < 6 ? "Too short" : form.password.length < 8 ? "Almost there" : form.password.length < 12 ? "Good" : "Strong"}
              </p>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-10 sm:h-11 rounded-xl text-white font-semibold hover:opacity-90 text-xs sm:text-sm" style={{ backgroundColor: "#1B3A2D" }}>
              {loading ? "Updating..." : "Set New Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}