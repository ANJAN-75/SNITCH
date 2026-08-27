import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const navigate=useNavigate()
  const {handleLogin} =useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Login data:", formData);
    await handleLogin({
      email:formData.email,
      password:formData.password
    })
    navigate("/")
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a0a] font-sans">
      {/* ── Left: Fashion Image Panel ── */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop&q=80')`,
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/70" />
        {/* Brand watermark */}
        <div className="absolute bottom-12 left-10">
          <p className="text-[#99907e] text-xs tracking-[0.3em] uppercase font-medium">
            Est. 2020
          </p>
          <p className="text-white/20 text-xs tracking-[0.2em] uppercase mt-1">
            Premium Fashion
          </p>
        </div>
      </div>

      {/* ── Right: Login Form Panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 relative bg-[#0a0a0a]">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/40 to-transparent pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Logo */}
          <div className="mb-12 text-center">
            <Link to="/">
              <h1
                className="text-5xl font-bold tracking-[0.15em] text-[#e6c364] uppercase"
                style={{ fontFamily: "'Bodoni Moda', 'Georgia', serif" }}
              >
                SNITCH
              </h1>
            </Link>
            <div className="w-16 h-px bg-[#c9a84c] mx-auto mt-3" />
          </div>

          {/* Glassmorphism Card */}
          <div className="bg-white/[0.04] border border-white/10 backdrop-blur-xl p-10 shadow-2xl">
            <div className="mb-8">
              <h2
                className="text-2xl font-semibold tracking-[0.05em] text-white uppercase"
                style={{ fontFamily: "'Bodoni Moda', 'Georgia', serif" }}
              >
                Welcome Back
              </h2>
              <p className="text-[#99907e] text-xs tracking-[0.15em] uppercase mt-2">
                Sign in to your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-[10px] tracking-[0.2em] uppercase text-[#99907e] mb-2 font-semibold"
                >
                  Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full bg-white/[0.05] border border-[#4d4637] text-[#e5e2e1] placeholder-[#4d4637] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c] focus:bg-white/[0.08] transition-all duration-300 tracking-wide"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="login-password"
                  className="block text-[10px] tracking-[0.2em] uppercase text-[#99907e] mb-2 font-semibold"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-white/[0.05] border border-[#4d4637] text-[#e5e2e1] placeholder-[#4d4637] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c] focus:bg-white/[0.08] transition-all duration-300 tracking-wide pr-16"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#99907e] hover:text-[#c9a84c] transition-colors text-[10px] tracking-widest uppercase"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-[10px] tracking-[0.15em] uppercase text-[#c9a84c] hover:text-[#e6c364] transition-colors"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                id="login-submit"
                type="submit"
                className="w-full bg-[#c9a84c] text-black py-4 text-xs font-bold tracking-[0.3em] uppercase hover:bg-[#e6c364] active:scale-[0.98] transition-all duration-200 mt-2 cursor-pointer"
              >
                Login
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-[#4d4637]" />
              <span className="text-[#4d4637] text-[10px] tracking-[0.2em] uppercase">
                or
              </span>
              <div className="flex-1 h-px bg-[#4d4637]" />
            </div>

            {/* Register Link */}
            <p className="text-center text-[#99907e] text-xs tracking-wide">
              New to SNITCH?{" "}
              <Link
                to="/register"
                className="text-[#c9a84c] hover:text-[#e6c364] tracking-[0.1em] uppercase font-semibold transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>

          {/* Footer note */}
          <p className="text-center text-[#4d4637] text-[10px] tracking-[0.15em] uppercase mt-8">
            &copy; 2025 Snitch. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
