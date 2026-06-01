"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SERVICES = [
  "Brand Film",
  "Instagram Reels",
  "Performance Ads",
  "Social Media Content",
  "Video Production",
  "Web Design",
  "Brand Identity",
  "Other",
];

const BUDGETS = [
  "Under ₹25,000",
  "₹25,000 – ₹75,000",
  "₹75,000 – ₹2,00,000",
  "₹2,00,000 – ₹5,00,000",
  "₹5,00,000+",
  "Let's discuss",
];

const inputBase: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(123,47,255,0.25)",
  color: "rgba(255,255,255,0.9)",
  outline: "none",
  transition: "border-color 0.2s",
};

function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 22 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: i % 4 === 0 ? 3 : 2,
            height: i % 4 === 0 ? 3 : 2,
            left: `${(i * 4.7 + 3) % 100}%`,
            top: `${(i * 6.3 + 8) % 100}%`,
            background: i % 2 === 0 ? "#7b2fff" : "#c77dff",
            opacity: 0.25,
          }}
          animate={{ y: [0, -(25 + (i % 4) * 12), 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const inView = useInView(formRef, { once: true, margin: "-60px" });

  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const focusStyle = (k: string): React.CSSProperties => ({
    ...inputBase,
    borderColor: focused === k ? "rgba(123,47,255,0.8)" : "rgba(123,47,255,0.25)",
    boxShadow: focused === k ? "0 0 0 3px rgba(123,47,255,0.12)" : "none",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setError("Please fill in name, email, and message."); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contact" }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again or WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen" style={{ background: "#07000f", color: "white" }}>
      <Navbar ready />

      {/* Hero banner */}
      <div className="relative pt-32 pb-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #0f0020 0%, #07000f 100%)" }}>
        <FloatingParticles />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(123,47,255,0.18) 0%, transparent 70%)" }} />
        <div className="container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-4">
            <span className="label-chip">Get In Touch</span>
          </motion.div>
          <motion.h1
            className="display-heading mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          >
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Extraordinary.</span>
          </motion.h1>
          <motion.p
            className="text-white/45 text-lg max-w-lg mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Tell us about your project. We&apos;ll get back to you within 24 hours with a plan.
          </motion.p>
        </div>
      </div>

      {/* Main content */}
      <div className="container py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 lg:gap-20 items-start">

          {/* ── LEFT — contact info ── */}
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <div>
              <h2 className="text-3xl font-black text-white mb-3">Why work with us?</h2>
              <p className="text-white/45 leading-relaxed text-sm">
                We don&apos;t just make content — we craft experiences that convert. From concept to camera to conversions, every frame is intentional.
              </p>
            </div>

            {/* Trust points */}
            <div className="space-y-5">
              {[
                { icon: "⚡", title: "24-Hour Response", desc: "We reply to every inquiry within one business day, guaranteed." },
                { icon: "🎬", title: "Free Discovery Call", desc: "30 minutes, no commitment — just honest conversation about your brand." },
                { icon: "📊", title: "Results-First Approach", desc: "Every project is built around measurable impact, not just aesthetics." },
                { icon: "✦", title: "End-to-End Studio", desc: "Concept, shoot, edit, and distribution — one team, zero handoffs." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="flex gap-4 items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                    style={{ background: "rgba(123,47,255,0.15)", border: "1px solid rgba(123,47,255,0.3)" }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                    <p className="text-white/40 text-xs leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact details */}
            <div className="space-y-4 pt-4 border-t border-white/8">
              {[
                { label: "Email", value: "hello@kyronproductions.in", href: "mailto:hello@kyronproductions.in" },
                { label: "WhatsApp", value: "+91 92036 26559", href: "https://wa.me/919203626559" },
                { label: "Instagram", value: "@kyronproductions", href: "https://instagram.com/kyronproductions" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <span className="text-white/30 text-xs tracking-widest uppercase w-20">{c.label}</span>
                  <a href={c.href} target="_blank" rel="noopener noreferrer"
                    className="text-[#c77dff] text-sm font-semibold hover:text-white transition-colors">
                    {c.value}
                  </a>
                </div>
              ))}
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-4">
              {[{ num: "250+", label: "Projects" }, { num: "120M+", label: "Views" }, { num: "24h", label: "Response" }].map((s) => (
                <div key={s.label} className="rounded-2xl p-4 text-center"
                  style={{ background: "rgba(123,47,255,0.08)", border: "1px solid rgba(123,47,255,0.2)" }}>
                  <p className="text-xl font-black text-white" style={{ textShadow: "0 0 20px rgba(123,47,255,0.6)" }}>{s.num}</p>
                  <p className="text-white/35 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT — form ── */}
          <div ref={formRef}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  className="rounded-3xl p-10 text-center space-y-5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(123,47,255,0.3)" }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
                    style={{ background: "linear-gradient(135deg, #7b2fff, #c77dff)", boxShadow: "0 0 50px rgba(123,47,255,0.5)" }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
                  >
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 18l8 8 14-14" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-black text-white">Message Sent!</h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
                    We&apos;ve received your project details and will reach out within 24 hours.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", service: "", budget: "", message: "" }); }}
                      className="px-6 py-2.5 rounded-xl text-sm text-white/50 hover:text-white transition-colors"
                      style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                      Send another
                    </button>
                    <Link href="/" className="btn-primary text-sm py-2.5 px-6">Back to Home</Link>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="rounded-3xl p-6 md:p-8 space-y-5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(123,47,255,0.25)", backdropFilter: "blur(20px)" }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="mb-2">
                    <h3 className="text-xl font-black text-white">Start Your Project</h3>
                    <p className="text-white/35 text-xs mt-1">Fill in the details below and we&apos;ll craft a proposal for you.</p>
                  </div>

                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-white/35 mb-1.5 tracking-widest uppercase">Full Name *</label>
                      <input
                        type="text" value={form.name} onChange={set("name")}
                        onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                        placeholder="Your name"
                        className="w-full rounded-xl px-4 py-3 text-sm placeholder-white/20"
                        style={focusStyle("name")} required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-white/35 mb-1.5 tracking-widest uppercase">Phone</label>
                      <input
                        type="tel" value={form.phone} onChange={set("phone")}
                        onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                        placeholder="+91 99999 99999"
                        className="w-full rounded-xl px-4 py-3 text-sm placeholder-white/20"
                        style={focusStyle("phone")}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] font-semibold text-white/35 mb-1.5 tracking-widest uppercase">Email Address *</label>
                    <input
                      type="email" value={form.email} onChange={set("email")}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                      placeholder="you@brand.com"
                      className="w-full rounded-xl px-4 py-3 text-sm placeholder-white/20"
                      style={focusStyle("email")} required
                    />
                  </div>

                  {/* Service + Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-white/35 mb-1.5 tracking-widest uppercase">Service Needed</label>
                      <select
                        value={form.service} onChange={set("service")}
                        onFocus={() => setFocused("service")} onBlur={() => setFocused(null)}
                        className="w-full rounded-xl px-4 py-3 text-sm"
                        style={{ ...focusStyle("service"), appearance: "none" }}
                      >
                        <option value="" style={{ background: "#0f0020" }}>Select service…</option>
                        {SERVICES.map((s) => <option key={s} value={s} style={{ background: "#0f0020" }}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-white/35 mb-1.5 tracking-widest uppercase">Budget Range</label>
                      <select
                        value={form.budget} onChange={set("budget")}
                        onFocus={() => setFocused("budget")} onBlur={() => setFocused(null)}
                        className="w-full rounded-xl px-4 py-3 text-sm"
                        style={{ ...focusStyle("budget"), appearance: "none" }}
                      >
                        <option value="" style={{ background: "#0f0020" }}>Select budget…</option>
                        {BUDGETS.map((b) => <option key={b} value={b} style={{ background: "#0f0020" }}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] font-semibold text-white/35 mb-1.5 tracking-widest uppercase">Your Message *</label>
                    <textarea
                      value={form.message} onChange={set("message")}
                      onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                      placeholder="Tell us about your brand, your goals, and what kind of content you're looking for…"
                      rows={5}
                      className="w-full rounded-xl px-4 py-3 text-sm placeholder-white/20 resize-none"
                      style={focusStyle("message")} required
                    />
                  </div>

                  {/* Error */}
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        className="text-red-400 text-xs"
                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <button
                    type="submit" disabled={loading}
                    className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60 flex items-center gap-3"
                    style={{ boxShadow: "0 0 40px rgba(123,47,255,0.4)" }}
                  >
                    {loading ? (
                      <>
                        <motion.div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </>
                    )}
                  </button>

                  <p className="text-white/20 text-[10px] text-center">
                    By submitting, you agree we may contact you about your project.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer settings={{}} />
    </div>
  );
}
