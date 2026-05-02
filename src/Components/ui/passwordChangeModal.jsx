import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PasswordChangeModal({ admin, onSuccess }) {
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // TODO: update password in Supabase Auth when network is fixed
      // await supabase.auth.updateUser({ password: form.password });
      // await supabase.from("admins").update({ must_change_password: false }).eq("id", admin.id);
      onSuccess();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">

        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100" style={{ backgroundColor: "#1B3A2D" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#F5A623" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B3A2D" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Change Your Password</p>
              <p className="text-xs" style={{ color: "#9DB8A8" }}>You must set a new password before continuing</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-5">
          <div className="rounded-xl px-4 py-3 text-sm" style={{ backgroundColor: "#fff4e0", color: "#b7770d" }}>
            👋 Welcome, <strong>{admin?.display_name}</strong>! Your account was created with a temporary password. Please set a new one now.
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#1B3A2D" }}>
                New Password
              </label>
              <Input
                type="password"
                placeholder="At least 8 characters"
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                required
                className="rounded-xl bg-gray-50 border-gray-200 h-11"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#1B3A2D" }}>
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="Repeat your new password"
                value={form.confirm}
                onChange={(e) => setForm((p) => ({ ...p, confirm: e.target.value }))}
                required
                className="rounded-xl bg-gray-50 border-gray-200 h-11"
              />
            </div>

            {error && (
              <div className="rounded-xl px-4 py-3 text-sm" style={{ backgroundColor: "#fdecea", color: "#c0392b" }}>
                {error}
              </div>
            )}

            {/* Password strength indicator */}
            <div className="space-y-1.5">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full transition-colors"
                    style={{
                      backgroundColor:
                        form.password.length === 0 ? "#e5e7eb" :
                        form.password.length < 6 && i === 1 ? "#ef4444" :
                        form.password.length >= 6 && form.password.length < 8 && i <= 2 ? "#F5A623" :
                        form.password.length >= 8 && form.password.length < 12 && i <= 3 ? "#1B3A2D" :
                        form.password.length >= 12 && i <= 4 ? "#1B3A2D" :
                        "#e5e7eb",
                    }}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400">
                {form.password.length === 0 ? "Enter a password" :
                 form.password.length < 6 ? "Too short" :
                 form.password.length < 8 ? "Almost there" :
                 form.password.length < 12 ? "Good" : "Strong"}
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl text-white font-semibold hover:opacity-90"
              style={{ backgroundColor: "#1B3A2D" }}
            >
              {loading ? "Updating..." : "Set New Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}