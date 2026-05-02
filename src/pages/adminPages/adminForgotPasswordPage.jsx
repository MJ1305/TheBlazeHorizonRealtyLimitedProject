import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // TODO: uncomment when network is fixed
    // const { error } = await supabase.auth.resetPasswordForEmail(email, {
    //   redirectTo: "http://localhost:5173/admin/reset-password",
    // });
    // if (error) { setError(error.message); setLoading(false); return; }

    // Simulated success for now
    setSent(true);
    setLoading(false);
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
            Forgot your
            <br />
            <span style={{ color: "#F5A623" }}>password?</span>
          </h1>
          <p style={{ color: "#9DB8A8" }} className="text-lg leading-relaxed">
            No worries — we'll send a reset link to your email so you can get back in quickly.
          </p>
        </div>
        <div className="flex gap-6">
          {["Secure", "Quick", "Simple"].map((item) => (
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

          {sent ? (
            /* Success state */
            <div className="text-center space-y-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
                style={{ backgroundColor: "#e6f4ed" }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1B3A2D" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: "#1B3A2D" }}>Check your email</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  We sent a password reset link to <strong>{email}</strong>. Check your inbox and follow the instructions.
                </p>
              </div>
              <div className="rounded-xl px-4 py-3 text-sm text-left" style={{ backgroundColor: "#fff4e0", color: "#b7770d" }}>
                Didn't receive it? Check your spam folder or wait a few minutes before trying again.
              </div>
              <Link
                to="/admin/login"
                className="inline-block w-full text-center py-3 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#1B3A2D" }}
              >
                Back to Login
              </Link>
            </div>
          ) : (
            /* Form state */
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2" style={{ color: "#1B3A2D" }}>Reset Password</h2>
                <p className="text-gray-500">Enter your email and we'll send you a reset link.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
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
                      Sending...
                    </span>
                  ) : "Send Reset Link"}
                </Button>
              </form>

              <div className="text-center mt-6">
                <Link
                  to="/admin/login"
                  className="text-sm font-medium hover:opacity-70 transition-opacity"
                  style={{ color: "#1B3A2D" }}
                >
                  ← Back to Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}