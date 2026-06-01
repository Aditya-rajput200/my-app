"use client";
import { Suspense, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => { emailRef.current?.focus(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      if (res.ok) {
        router.push(from);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? "Invalid credentials");
      }
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "#07000f" }}
    >
      {/* Animated background blobs */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          top: "50%", left: "50%", transform: "translate(-60%, -60%)",
          background: "radial-gradient(circle, rgba(123,47,255,0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          bottom: "-10%", right: "-5%",
          background: "radial-gradient(circle, rgba(177,74,255,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${(i * 19 + 5) % 95}%`,
            top: `${(i * 27 + 8) % 90}%`,
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            background: i % 2 === 0 ? "#7b2fff" : "#c77dff",
            opacity: 0.25,
          }}
          animate={{ y: [0, -(15 + (i % 4) * 10), 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
        />
      ))}

      {/* Card */}
      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        <div
          className="relative rounded-[28px] p-8 md:p-10"
          style={{
            background: "linear-gradient(145deg, rgba(17,0,32,0.95) 0%, rgba(8,0,18,0.98) 100%)",
            border: "1px solid rgba(123,47,255,0.35)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 60px rgba(123,47,255,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
            backdropFilter: "blur(40px)",
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #7b2fff, #b14aff)", boxShadow: "0 0 20px rgba(123,47,255,0.5)" }}
            >
              K
            </div>
            <div>
              <p className="font-black text-white text-sm leading-tight">
                Kyron<span style={{ color: "#c77dff" }}>.</span>
              </p>
              <p className="text-white/30 text-[10px] tracking-widest uppercase">Admin Portal</p>
            </div>
          </div>

          <h1 className="text-2xl font-black text-white mb-1">Welcome back</h1>
          <p className="text-white/40 text-sm mb-8">Sign in to manage your website content.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-[10px] font-semibold text-white/40 mb-2 tracking-widest uppercase">
                Email Address
              </label>
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  width="15" height="15" viewBox="0 0 15 15" fill="none"
                >
                  <path d="M1 3.5h13M1 3.5l6.5 5L14 3.5M1 3.5v8h13v-8" stroke="rgba(123,47,255,0.7)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(123,47,255,0.3)",
                    color: "rgba(255,255,255,0.85)",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(123,47,255,0.7)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(123,47,255,0.12)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(123,47,255,0.3)"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] font-semibold text-white/40 mb-2 tracking-widest uppercase">
                Password
              </label>
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  width="15" height="15" viewBox="0 0 15 15" fill="none"
                >
                  <rect x="2" y="6" width="11" height="8" rx="1.5" stroke="rgba(123,47,255,0.7)" strokeWidth="1.2" />
                  <path d="M5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="rgba(123,47,255,0.7)" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl pl-10 pr-12 py-3.5 text-sm outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(123,47,255,0.3)",
                    color: "rgba(255,255,255,0.85)",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(123,47,255,0.7)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(123,47,255,0.12)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(123,47,255,0.3)"; e.currentTarget.style.boxShadow = "none"; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                  tabIndex={-1}
                >
                  {showPass ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                      <path d="M2 8s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z" />
                      <circle cx="8" cy="8" r="1.5" />
                      <path d="M3 3l10 10" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                      <path d="M2 8s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z" />
                      <circle cx="8" cy="8" r="1.5" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="7" cy="7" r="6" />
                    <path d="M7 4v3M7 9.5v.5" />
                  </svg>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, #7b2fff 0%, #b14aff 100%)",
                boxShadow: "0 0 30px rgba(123,47,255,0.4)",
              }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(123,47,255,0.6)" }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <path d="M8 2a6 6 0 0 1 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M2 7h10M7 2l5 5-5 5" />
                  </svg>
                </>
              )}
            </motion.button>
          </form>

          {/* Back link */}
          <p className="mt-6 text-center">
            <a href="/" className="text-white/25 text-xs hover:text-white/60 transition-colors">
              ← Back to website
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
