import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }
    window.location.href = "/admin/dashboard";
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ backgroundColor: "#F5F5F5" }}>

      {/* Left panel */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-8 xl:p-12"
        style={{ backgroundColor: "#1B3A2D" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 rounded-full" style={{ backgroundColor: "#F5A623" }} />
          <span className="text-white text-lg xl:text-xl font-semibold tracking-wide">Blaze Horizon Realty</span>
        </div>
        <div>
          <h1 className="text-white text-4xl xl:text-5xl font-bold leading-tight mb-4 xl:mb-6">
            Manage your<br />
            <span style={{ color: "#F5A623" }}>properties</span><br />
            with ease.
          </h1>
          <p style={{ color: "#9DB8A8" }} className="text-base xl:text-lg leading-relaxed">
            The admin portal gives your team full control over listings,
            property status, and more — all in one place.
          </p>
        </div>
        <div className="flex gap-4 xl:gap-6">
          {["Properties", "Admins", "Listings"].map((item) => (
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

          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: "#1B3A2D" }}>Welcome back</h2>
            <p className="text-gray-500 text-sm sm:text-base">Sign in to your admin account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#1B3A2D" }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="admin@blazehorizon.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-11 sm:h-12 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-800"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#1B3A2D" }}>
                  Password
                </label>
                <Link to="/admin/forgot-password" className="text-xs font-medium hover:opacity-70 transition-opacity" style={{ color: "#F5A623" }}>
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-11 sm:h-12 rounded-xl border border-gray-200 bg-gray-50 px-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-green-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl px-4 py-3 text-xs sm:text-sm" style={{ backgroundColor: "#fdecea", color: "#c0392b" }}>
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 sm:h-12 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-sm sm:text-base"
              style={{ backgroundColor: "#1B3A2D" }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Signing in...
                </span>
              ) : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-xs sm:text-sm text-gray-400 mt-6 sm:mt-8">
            Staff access only. Contact your administrator if you need access.
          </p>
        </div>
      </div>
    </div>
  );
}