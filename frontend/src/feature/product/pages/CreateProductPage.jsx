import { useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router";
import { createProduct } from "../service/product.api";

/* ─────────────────────────────────────────────────────────────────
   SNITCH Design System tokens (from Google Stitch project)
   ─────────────────────────────────────────────────────────────── */
const CURRENCIES = ["USD", "EUR", "GBP", "INR"];

export default function CreateProductPage() {
  const navigate = useNavigate();

  /* ── Form state ── */
  const [form, setForm] = useState({
    title: "",
    description: "",
    amount: "",
    currency: "USD",
  });
  const [images, setImages] = useState([]); // { file, preview }[]
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  /* ── Handlers ── */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addFiles = useCallback((files) => {
    const newImages = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setImages((prev) => [...prev, ...newImages].slice(0, 6));
  }, []);

  const handleFileInput = (e) => addFiles(e.target.files);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const removeImage = (idx) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) return setError("Product title is required.");
    if (!form.amount || Number(form.amount) <= 0)
      return setError("Please enter a valid amount.");

    try {
      setLoading(true);
      const imagePreviews = images.map((img) => img.preview);
      await createProduct({
        title: form.title,
        description: form.description,
        amount: Number(form.amount),
        currency: form.currency,
        images: imagePreviews,
      });
      navigate("/products");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] font-sans"
      style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
    >
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,600;0,6..96,700;1,6..96,400&family=Hanken+Grotesk:wght@300;400;500;600&display=swap');

        .snitch-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid #4d4637;
          color: #e5e2e1;
          padding: 12px 16px;
          font-family: 'Hanken Grotesk', sans-serif;
          font-size: 14px;
          letter-spacing: 0.02em;
          outline: none;
          transition: border-color 0.25s, background 0.25s;
          border-radius: 0;
        }
        .snitch-input::placeholder { color: #4d4637; }
        .snitch-input:focus {
          border-color: #c9a84c;
          background: rgba(255,255,255,0.07);
        }
        .snitch-select {
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2399907e' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          cursor: pointer;
        }
        .snitch-select option { background: #1c1b1b; color: #e5e2e1; }
        .img-thumb {
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
          border: 1px solid #4d4637;
          background: #131313;
        }
        .img-thumb:hover .img-remove { opacity: 1; }
        .img-remove {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
          cursor: pointer;
        }
      `}</style>

      {/* ── Top Nav bar ── */}
      <header className="border-b border-[#4d4637]/60 backdrop-blur-xl bg-[#0a0a0a]/80 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold tracking-[0.15em] text-[#e6c364] uppercase"
            style={{ fontFamily: "'Bodoni Moda', 'Georgia', serif" }}
          >
            SNITCH
          </Link>
          <div className="w-8 h-px bg-[#c9a84c]" />
        </div>
      </header>

      {/* ── Page body ── */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-12 md:py-16 lg:py-20">
        {/* Page header */}
        <div className="mb-12 md:mb-16">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-[#99907e] hover:text-[#c9a84c] transition-colors text-xs tracking-[0.2em] uppercase font-semibold mb-8 group"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform group-hover:-translate-x-1"
            >
              <path
                d="M10 3L5 8L10 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
            Back to Products
          </Link>

          <h1
            className="text-4xl md:text-5xl font-semibold text-white uppercase tracking-[0.05em] leading-tight"
            style={{ fontFamily: "'Bodoni Moda', 'Georgia', serif" }}
          >
            New Product
          </h1>
          <div className="w-16 h-px bg-[#c9a84c] mt-4" />
          <p className="text-[#99907e] text-xs tracking-[0.15em] uppercase mt-4">
            Fill in the details below to list a new product
          </p>
        </div>

        {/* Glassmorphic form card */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl p-8 md:p-12 lg:p-14">
            {/* Two-column grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              {/* ─── LEFT COLUMN ─── */}
              <div className="space-y-8">
                {/* Section label */}
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-[10px] text-[#c9a84c] tracking-[0.3em] uppercase font-semibold">
                    01 — Product Info
                  </span>
                  <div className="flex-1 h-px bg-[#4d4637]" />
                </div>

                {/* Product Title */}
                <div>
                  <label
                    htmlFor="cp-title"
                    className="block text-[10px] tracking-[0.2em] uppercase text-[#99907e] mb-3 font-semibold"
                  >
                    Product Title <span className="text-[#c9a84c]">*</span>
                  </label>
                  <input
                    id="cp-title"
                    name="title"
                    type="text"
                    required
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Oversized Wool Blazer"
                    className="snitch-input"
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="cp-description"
                    className="block text-[10px] tracking-[0.2em] uppercase text-[#99907e] mb-3 font-semibold"
                  >
                    Description
                  </label>
                  <textarea
                    id="cp-description"
                    name="description"
                    rows={7}
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe the product — fabric, fit, occasion…"
                    className="snitch-input resize-none"
                    style={{ minHeight: "160px" }}
                  />
                  <p className="text-[#4d4637] text-[10px] tracking-[0.1em] uppercase mt-2">
                    {form.description.length} / 1000 characters
                  </p>
                </div>
              </div>

              {/* ─── RIGHT COLUMN ─── */}
              <div className="space-y-8">
                {/* Section label */}
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-[10px] text-[#c9a84c] tracking-[0.3em] uppercase font-semibold">
                    02 — Pricing &amp; Media
                  </span>
                  <div className="flex-1 h-px bg-[#4d4637]" />
                </div>

                {/* Amount + Currency row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="cp-amount"
                      className="block text-[10px] tracking-[0.2em] uppercase text-[#99907e] mb-3 font-semibold"
                    >
                      Amount <span className="text-[#c9a84c]">*</span>
                    </label>
                    <input
                      id="cp-amount"
                      name="amount"
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      value={form.amount}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="snitch-input"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cp-currency"
                      className="block text-[10px] tracking-[0.2em] uppercase text-[#99907e] mb-3 font-semibold"
                    >
                      Currency
                    </label>
                    <select
                      id="cp-currency"
                      name="currency"
                      value={form.currency}
                      onChange={handleChange}
                      className="snitch-input snitch-select"
                    >
                      {CURRENCIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#99907e] mb-3 font-semibold">
                    Product Images{" "}
                    <span className="text-[#4d4637] normal-case tracking-normal text-[10px]">
                      (up to 6)
                    </span>
                  </label>

                  {/* Drop zone */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    onDragEnter={(e) => {
                      e.preventDefault();
                      setDragging(true);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    className={`w-full border border-dashed transition-all duration-300 p-8 flex flex-col items-center justify-center gap-3 cursor-pointer
                      ${
                        dragging
                          ? "border-[#c9a84c] bg-[#c9a84c]/5"
                          : "border-[#4d4637] bg-white/[0.02] hover:border-[#99907e] hover:bg-white/[0.04]"
                      }`}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      className={`transition-colors ${
                        dragging ? "text-[#c9a84c]" : "text-[#4d4637]"
                      }`}
                    >
                      <rect
                        x="2"
                        y="2"
                        width="24"
                        height="24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M14 8V20M8 14H20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                      />
                    </svg>
                    <span className="text-[#99907e] text-xs tracking-[0.15em] uppercase">
                      {dragging
                        ? "Drop to add images"
                        : "Click or drag images here"}
                    </span>
                    <span className="text-[#4d4637] text-[10px] tracking-[0.1em] uppercase">
                      JPG, PNG, WEBP
                    </span>
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileInput}
                    className="hidden"
                  />

                  {/* Image thumbnails */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {images.map((img, idx) => (
                        <div key={idx} className="img-thumb">
                          <img
                            src={img.preview}
                            alt={`preview-${idx}`}
                            className="w-full h-full object-cover"
                          />
                          <div
                            className="img-remove"
                            onClick={() => removeImage(idx)}
                            role="button"
                            aria-label="Remove image"
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                            >
                              <path
                                d="M4 4L14 14M14 4L4 14"
                                stroke="#e5e2e1"
                                strokeWidth="1.5"
                                strokeLinecap="square"
                              />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ─── Error message ─── */}
            {error && (
              <div className="mt-10 border border-[#ffb4ab]/30 bg-[#93000a]/20 px-5 py-4">
                <p className="text-[#ffb4ab] text-xs tracking-[0.1em] uppercase">
                  {error}
                </p>
              </div>
            )}

            {/* ─── Divider ─── */}
            <div className="my-10 h-px bg-[#4d4637]" />

            {/* ─── Action buttons ─── */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                id="cp-submit"
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#c9a84c] text-black py-4 px-8 text-xs font-bold tracking-[0.3em] uppercase hover:bg-[#e6c364] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg
                      className="animate-spin"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <circle
                        cx="7"
                        cy="7"
                        r="5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="10 20"
                      />
                    </svg>
                    Creating…
                  </span>
                ) : (
                  "Create Product"
                )}
              </button>

              <Link
                to="/products"
                className="flex-none sm:flex-none flex items-center justify-center px-8 py-4 border border-[#4d4637] text-[#99907e] text-xs tracking-[0.3em] uppercase hover:border-[#99907e] hover:text-[#e5e2e1] transition-all duration-200"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>

        {/* Footer note */}
        <p className="text-center text-[#4d4637] text-[10px] tracking-[0.15em] uppercase mt-12">
          &copy; 2025 Snitch. All rights reserved.
        </p>
      </main>
    </div>
  );
}
