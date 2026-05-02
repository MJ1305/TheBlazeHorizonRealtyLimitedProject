import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }

    window.location.href = "/admin/dashboard";
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F5F5F5" }}>

      {/* Left panel */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12"
        style={{ backgroundColor: "#1B3A2D" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 rounded-full" style={{ backgroundColor: "#F5A623" }} />
          <span className="text-white text-xl font-semibold tracking-wide">
            Blaze Horizon Realty
          </span>
        </div>
        <div>
          <h1 className="text-white text-5xl font-bold leading-tight mb-6">
            Manage your
            <br />
            <span style={{ color: "#F5A623" }}>properties</span>
            <br />
            with ease.
          </h1>
          <p style={{ color: "#9DB8A8" }} className="text-lg leading-relaxed">
            The admin portal gives your team full control over listings,
            property status, and more — all in one place.
          </p>
        </div>
        <div className="flex gap-6">
          {["Properties", "Admins", "Listings"].map((item) => (
            <div key={item} className="text-center">
              <div className="w-12 h-1 rounded-full mb-2" style={{ backgroundColor: "#F5A623" }} />
              <span style={{ color: "#9DB8A8" }} className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-2 h-8 rounded-full" style={{ backgroundColor: "#F5A623" }} />
            <span className="text-xl font-semibold" style={{ color: "#1B3A2D" }}>
              Blaze Horizon Realty
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#1B3A2D" }}>
              Welcome back
            </h2>
            <p className="text-gray-500">Sign in to your admin account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#1B3A2D" }}>
                Email Address
              </label>
              <Input
                type="email"
                placeholder="admin@blazehorizon.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl border-gray-200 bg-gray-50"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#1B3A2D" }}>
                  Password
                </label>
                <Link
                  to="/admin/forgot-password"
                  className="text-xs font-medium hover:opacity-70 transition-opacity"
                  style={{ color: "#F5A623" }}
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 rounded-xl border-gray-200 bg-gray-50"
              />
            </div>

            {error && (
              <div className="rounded-xl px-4 py-3 text-sm" style={{ backgroundColor: "#fdecea", color: "#c0392b" }}>
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
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

          <p className="text-center text-sm text-gray-400 mt-8">
            Staff access only. Contact your administrator if you need access.
          </p>
        </div>
      </div>
    </div>
  );
}