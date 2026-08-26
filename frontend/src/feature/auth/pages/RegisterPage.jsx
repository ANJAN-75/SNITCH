import { useState } from "react";
import { Link } from "react-router";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    contact: "",
    isSeller: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSellerChange = (value) => {
    setFormData((prev) => ({ ...prev, isSeller: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register data:", formData);
    // TODO: connect to backend API
    // Expected payload: { fullname, email, password, contact, isSeller }
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a0a] font-sans">
      {/* ── Left: Fashion Image Panel ── */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&auto=format&fit=crop&q=80')`,
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/80" />

        {/* Center quote */}
        <div className="absolute inset-0 flex items-center justify-center px-16">
          <div className="text-center">
            <div className="w-12 h-px bg-[#c9a84c] mx-auto mb-6" />
            <p
              className="text-white/70 text-lg italic leading-relaxed"
              style={{ fontFamily: "'Bodoni Moda', 'Georgia', serif" }}
            >
              "Fashion is the armor to survive the reality of everyday life."
            </p>
            <div className="w-12 h-px bg-[#c9a84c] mx-auto mt-6" />
          </div>
        </div>

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

      {/* ── Right: Register Form Panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 relative bg-[#0a0a0a] overflow-y-auto">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/40 to-transparent pointer-events-none" />

        <div className="w-full max-w-md relative z-10 my-auto">
          {/* Logo */}
          <div className="mb-10 text-center">
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
                Create Account
              </h2>
              <p className="text-[#99907e] text-xs tracking-[0.15em] uppercase mt-2">
                Join the exclusive circle
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="register-fullname"
                  className="block text-[10px] tracking-[0.2em] uppercase text-[#99907e] mb-2 font-semibold"
                >
                  Full Name
                </label>
                <input
                  id="register-fullname"
                  type="text"
                  name="fullname"
                  required
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full bg-white/[0.05] border border-[#4d4637] text-[#e5e2e1] placeholder-[#4d4637] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c] focus:bg-white/[0.08] transition-all duration-300 tracking-wide"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="register-email"
                  className="block text-[10px] tracking-[0.2em] uppercase text-[#99907e] mb-2 font-semibold"
                >
                  Email Address
                </label>
                <input
                  id="register-email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full bg-white/[0.05] border border-[#4d4637] text-[#e5e2e1] placeholder-[#4d4637] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c] focus:bg-white/[0.08] transition-all duration-300 tracking-wide"
                />
              </div>

              {/* Contact */}
              <div>
                <label
                  htmlFor="register-contact"
                  className="block text-[10px] tracking-[0.2em] uppercase text-[#99907e] mb-2 font-semibold"
                >
                  Contact Number
                </label>
                <input
                  id="register-contact"
                  type="tel"
                  name="contact"
                  required
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full bg-white/[0.05] border border-[#4d4637] text-[#e5e2e1] placeholder-[#4d4637] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c] focus:bg-white/[0.08] transition-all duration-300 tracking-wide"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="register-password"
                  className="block text-[10px] tracking-[0.2em] uppercase text-[#99907e] mb-2 font-semibold"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="register-password"
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

              {/* isSeller — Radio Buttons */}
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#99907e] mb-3 font-semibold">
                  Account Type
                </p>
                <div className="flex gap-4">
                  {/* Buyer option */}
                  <label
                    htmlFor="role-buyer"
                    className={`flex-1 flex items-center gap-3 border px-4 py-3 cursor-pointer transition-all duration-200 ${
                      !formData.isSeller
                        ? "border-[#c9a84c] bg-[#c9a84c]/10"
                        : "border-[#4d4637] bg-white/[0.03] hover:border-[#99907e]"
                    }`}
                  >
                    <input
                      id="role-buyer"
                      type="radio"
                      name="isSeller"
                      value="buyer"
                      checked={!formData.isSeller}
                      onChange={() => handleSellerChange(false)}
                      className="sr-only"
                    />
                    {/* Custom radio indicator */}
                    <span
                      className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-all ${
                        !formData.isSeller
                          ? "border-[#c9a84c]"
                          : "border-[#4d4637]"
                      }`}
                    >
                      {!formData.isSeller && (
                        <span className="w-2 h-2 bg-[#c9a84c] block" />
                      )}
                    </span>
                    <div>
                      <p
                        className={`text-xs font-semibold tracking-wider uppercase ${
                          !formData.isSeller ? "text-[#e6c364]" : "text-[#99907e]"
                        }`}
                      >
                        Buyer
                      </p>
                      <p className="text-[10px] text-[#4d4637] mt-0.5">
                        Shop collections
                      </p>
                    </div>
                  </label>

                  {/* Seller option */}
                  <label
                    htmlFor="role-seller"
                    className={`flex-1 flex items-center gap-3 border px-4 py-3 cursor-pointer transition-all duration-200 ${
                      formData.isSeller
                        ? "border-[#c9a84c] bg-[#c9a84c]/10"
                        : "border-[#4d4637] bg-white/[0.03] hover:border-[#99907e]"
                    }`}
                  >
                    <input
                      id="role-seller"
                      type="radio"
                      name="isSeller"
                      value="seller"
                      checked={formData.isSeller}
                      onChange={() => handleSellerChange(true)}
                      className="sr-only"
                    />
                    {/* Custom radio indicator */}
                    <span
                      className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-all ${
                        formData.isSeller
                          ? "border-[#c9a84c]"
                          : "border-[#4d4637]"
                      }`}
                    >
                      {formData.isSeller && (
                        <span className="w-2 h-2 bg-[#c9a84c] block" />
                      )}
                    </span>
                    <div>
                      <p
                        className={`text-xs font-semibold tracking-wider uppercase ${
                          formData.isSeller ? "text-[#e6c364]" : "text-[#99907e]"
                        }`}
                      >
                        Seller
                      </p>
                      <p className="text-[10px] text-[#4d4637] mt-0.5">
                        List products
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="register-submit"
                type="submit"
                className="w-full bg-[#c9a84c] text-black py-4 text-xs font-bold tracking-[0.3em] uppercase hover:bg-[#e6c364] active:scale-[0.98] transition-all duration-200 mt-2 cursor-pointer"
              >
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-[#4d4637]" />
              <span className="text-[#4d4637] text-[10px] tracking-[0.2em] uppercase">
                or
              </span>
              <div className="flex-1 h-px bg-[#4d4637]" />
            </div>

            {/* Login Link */}
            <p className="text-center text-[#99907e] text-xs tracking-wide">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#c9a84c] hover:text-[#e6c364] tracking-[0.1em] uppercase font-semibold transition-colors"
              >
                Sign In
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
