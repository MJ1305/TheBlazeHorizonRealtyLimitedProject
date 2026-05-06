import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/Components/ui/button";
import { Link } from "react-router-dom";

const EyeIcon = ({ open }) => open ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

export default function AdminResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [validSession, setValidSession] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") setValidSession(true);
      setCheckingSession(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      const { error: authError } = await supabase.auth.updateUser({ password });
      if (authError) { setError("Failed to update password: " + authError.message); setLoading(false); return; }
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from("admins").update({ must_change_password: false }).eq("id", user.id);
      setDone(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const inputClass = "w-full h-11 sm:h-12 rounded-xl border border-gray-200 bg-gray-50 px-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-green-800";

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ backgroundColor: "#F5F5F5" }}>

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-8 xl:p-12" style={{ backgroundColor: "#1B3A2D" }}>
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 rounded-full" style={{ backgroundColor: "#F5A623" }} />
          <span className="text-white text-lg xl:text-xl font-semibold tracking-wide">Blaze Horizon Realty</span>
        </div>
        <div>
          <h1 className="text-white text-4xl xl:text-5xl font-bold leading-tight mb-4 xl:mb-6">
            Set your new<br />
            <span style={{ color: "#F5A623" }}>password.</span>
          </h1>
          <p style={{ color: "#9DB8A8" }} className="text-base xl:text-lg leading-relaxed">
            Choose a strong password to keep your account secure.
          </p>
        </div>
        <div className="flex gap-4 xl:gap-6">
          {["Secure", "Quick", "Simple"].map((item) => (
            <div key={item} className="text-center">
              <div className="w-10 xl:w-12 h-1 rounded-full mb-2" style={{ backgroundColor: "#F5A623" }} />
              <span style={{ color: "#9DB8A8" }} className="text-xs xl:text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-12">
        <div className="w-full max-w-sm sm:max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 sm:mb-10 lg:hidden">
            <div className="w-2 h-7 sm:h-8 rounded-full" style={{ backgroundColor: "#F5A623" }} />
            <span className="text-lg sm:text-xl font-semibold" style={{ color: "#1B3A2D" }}>Blaze Horizon Realty</span>
          </div>

          {checkingSession ? (
            <div className="text-center space-y-4">
              <svg className="animate-spin mx-auto opacity-40" width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#1B3A2D" strokeWidth="4"/>
                <path className="opacity-75" fill="#1B3A2D" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              <p className="text-gray-400 text-sm">Verifying your reset link...</p>
            </div>

          ) : !validSession ? (
            <div className="text-center space-y-5 sm:space-y-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: "#fdecea" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: "#1B3A2D" }}>Link expired</h2>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  This password reset link is invalid or has expired. Please request a new one.
                </p>
              </div>
              <Link to="/admin/forgot-password" className="inline-block w-full text-center py-2.5 sm:py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90" style={{ backgroundColor: "#1B3A2D" }}>
                Request New Link
              </Link>
            </div>

          ) : done ? (
            <div className="text-center space-y-5 sm:space-y-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: "#e6f4ed" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1B3A2D" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: "#1B3A2D" }}>Password updated!</h2>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  Your password has been changed successfully. You can now log in with your new password.
                </p>
              </div>
              <Link to="/admin" className="inline-block w-full text-center py-2.5 sm:py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90" style={{ backgroundColor: "#1B3A2D" }}>
                Go to Login
              </Link>
            </div>

          ) : (
            <div>
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: "#1B3A2D" }}>New Password</h2>
                <p className="text-gray-500 text-sm sm:text-base">Choose a strong password for your account.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#1B3A2D" }}>New Password</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputClass} />
                    <button type="button" onClick={() => setShowPassword((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#1B3A2D" }}>Confirm Password</label>
                  <div className="relative">
                    <input type={showConfirm ? "text" : "password"} placeholder="Repeat your new password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required className={inputClass} />
                    <button type="button" onClick={() => setShowConfirm((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      <EyeIcon open={showConfirm} />
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-1 flex-1 rounded-full transition-colors" style={{
                        backgroundColor:
                          password.length === 0 ? "#e5e7eb" :
                          password.length < 6 && i === 1 ? "#ef4444" :
                          password.length >= 6 && password.length < 8 && i <= 2 ? "#F5A623" :
                          password.length >= 8 && password.length < 12 && i <= 3 ? "#1B3A2D" :
                          password.length >= 12 && i <= 4 ? "#1B3A2D" : "#e5e7eb",
                      }} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">
                    {password.length === 0 ? "Enter a password" : password.length < 6 ? "Too short" : password.length < 8 ? "Almost there" : password.length < 12 ? "Good" : "Strong"}
                  </p>
                </div>

                {error && (
                  <div className="rounded-xl px-4 py-3 text-xs sm:text-sm" style={{ backgroundColor: "#fdecea", color: "#c0392b" }}>{error}</div>
                )}

                <Button type="submit" disabled={loading} className="w-full h-11 sm:h-12 text-white font-semibold rounded-xl hover:opacity-90 text-sm sm:text-base" style={{ backgroundColor: "#1B3A2D" }}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                      Updating...
                    </span>
                  ) : "Update Password"}
                </Button>
              </form>

              <div className="text-center mt-5 sm:mt-6">
                <Link to="/admin" className="text-xs sm:text-sm font-medium hover:opacity-70" style={{ color: "#1B3A2D" }}>← Back to Login</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}