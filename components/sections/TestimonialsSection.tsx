"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { Star } from "lucide-react";

/* ─────────────── TYPES & DATA ─────────────── */

interface TestimonialItem {
  id: number | string;
  name: string; role: string; company: string;
  quote: string; short: string; rating: number; initials: string;
  result: string; resultLabel: string;
  color: string; gradTop: string; gradBot: string;
}

function deriveGrads(color: string): { gradTop: string; gradBot: string } {
  const map: Record<string, { gradTop: string; gradBot: string }> = {
    "#7b2fff": { gradTop: "#3d0080", gradBot: "#0a0015" },
    "#b14aff": { gradTop: "#4a0090", gradBot: "#0d001a" },
    "#9d4edd": { gradTop: "#350060", gradBot: "#080010" },
    "#c77dff": { gradTop: "#5500a0", gradBot: "#0a0018" },
    "#ff7edb": { gradTop: "#6b0055", gradBot: "#0d000f" },
    "#ffd60a": { gradTop: "#4a3a00", gradBot: "#0d0a00" },
  };
  return map[color] ?? { gradTop: "#2a0060", gradBot: "#080010" };
}

const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    name: "Rohit Sharma",
    role: "Founder",
    company: "StyleCo",
    quote: "Kyron completely transformed how we show up online. Our last reel hit 5 million views in 48 hours. Nothing short of cinematic magic — they made our brand feel alive.",
    short: "5M views in 48 hours. They made our brand feel alive.",
    rating: 5,
    initials: "RS",
    result: "5M Views",
    resultLabel: "48 hrs",
    color: "#7b2fff",
    gradTop: "#3d0080",
    gradBot: "#0a0015",
  },
  {
    id: 2,
    name: "Priya Khanna",
    role: "CMO",
    company: "TechNova",
    quote: "Working with Kyron is an experience. They don't just execute briefs — they elevate them. Our brand film made our investors tear up. That's the Kyron effect.",
    short: "They elevated our brief into something that moved investors.",
    rating: 5,
    initials: "PK",
    result: "Series A",
    resultLabel: "Raised",
    color: "#b14aff",
    gradTop: "#4a0090",
    gradBot: "#0d001a",
  },
  {
    id: 3,
    name: "Arjun Mehta",
    role: "Director",
    company: "LuxeLiving",
    quote: "10x engagement within the first month. But beyond numbers, they gave our brand a soul. A visual identity that actually feels like us — cinematic and bold.",
    short: "10x engagement. They gave our brand a soul.",
    rating: 5,
    initials: "AM",
    result: "10X",
    resultLabel: "Engagement",
    color: "#9d4edd",
    gradTop: "#350060",
    gradBot: "#080010",
  },
  {
    id: 4,
    name: "Aisha Patel",
    role: "Brand Lead",
    company: "FreshEats",
    quote: "I've worked with many agencies. Kyron is in a completely different league. Their cinematic detail is unmatched and the results speak for themselves every single time.",
    short: "Kyron is in a completely different league.",
    rating: 5,
    initials: "AP",
    result: "340%",
    resultLabel: "Growth",
    color: "#c77dff",
    gradTop: "#5500a0",
    gradBot: "#0a0018",
  },
  {
    id: 5,
    name: "Kabir Singh",
    role: "Founder",
    company: "Velox D2C",
    quote: "The ad creatives Kyron built for us literally changed our business. 10X ROAS in the first two weeks. Our cost per acquisition dropped by 67%. Game-changing work.",
    short: "10X ROAS in two weeks. Game-changing work.",
    rating: 5,
    initials: "KS",
    result: "10X ROAS",
    resultLabel: "2 weeks",
    color: "#ff7edb",
    gradTop: "#6b0055",
    gradBot: "#0d000f",
  },
  {
    id: 6,
    name: "Neha Gupta",
    role: "CEO",
    company: "Orbis Jewels",
    quote: "We came to Kyron for a single product video. We ended up with a full cinematic brand identity. Sales doubled. The brand finally looks as premium as it is.",
    short: "Sales doubled. The brand finally looks as premium as it is.",
    rating: 5,
    initials: "NG",
    result: "2X Sales",
    resultLabel: "Month 1",
    color: "#ffd60a",
    gradTop: "#4a3a00",
    gradBot: "#0d0a00",
  },
];

/* ─────────────── CARD ─────────────── */

interface CardProps {
  t: TestimonialItem;
  index: number;
  active: number;
  total: number;
  onClick: () => void;
}

function TestimonialCard({ t, index, active, total, onClick }: CardProps) {
  const dist = index - active;
  const absDist = Math.abs(dist);

  return (
    <motion.div
      layout
      className="absolute top-0 cursor-pointer select-none"
      style={{
        width: 260,
        height: 390,
        left: "50%",
        zIndex: total - absDist,
      }}
      animate={{
        x: dist * 230 - 130,
        rotate: dist * 7,
        y: absDist * 18,
        scale: 1 - absDist * 0.055,
        opacity: 1 - absDist * 0.12,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 32 }}
      onClick={onClick}
      data-cursor-hover
    >
      {/* Card shell */}
      <div
        className="w-full h-full rounded-[24px] overflow-hidden relative flex flex-col"
        style={{
          background: `linear-gradient(170deg, ${t.gradTop} 0%, ${t.gradBot} 100%)`,
          border: index === active
            ? `1px solid ${t.color}80`
            : `1px solid rgba(255,255,255,0.08)`,
          boxShadow: index === active
            ? `0 30px 70px ${t.color}40, 0 0 0 1px ${t.color}30, inset 0 1px 0 rgba(255,255,255,0.1)`
            : `0 20px 50px rgba(0,0,0,0.5)`,
        }}
      >
        {/* ── Top photo area ── */}
        <div className="relative flex-1 overflow-hidden flex items-center justify-center">
          {/* Ambient background pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 30%, ${t.color}35 0%, transparent 65%)`,
            }}
          />
          {/* Diagonal lines */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, ${t.color} 0, ${t.color} 1px, transparent 0, transparent 50%)`,
              backgroundSize: "18px 18px",
            }}
          />

          {/* Large avatar */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <motion.div
              className="w-24 h-24 rounded-full flex items-center justify-center font-black text-2xl text-white relative"
              style={{
                background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                boxShadow: `0 0 0 6px ${t.color}25, 0 0 40px ${t.color}60`,
              }}
              animate={index === active ? { scale: [1, 1.04, 1] } : { scale: 1 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {t.initials}
              {/* Orbiting dot */}
              {index === active && (
                <motion.div
                  className="absolute w-3 h-3 rounded-full"
                  style={{ background: t.color, top: 4, right: 4, boxShadow: `0 0 10px ${t.color}` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              )}
            </motion.div>

            {/* Result badge */}
            <div
              className="px-3 py-1.5 rounded-full flex items-center gap-1.5"
              style={{
                background: `${t.color}22`,
                border: `1px solid ${t.color}50`,
                backdropFilter: "blur(12px)",
              }}
            >
              <span className="text-base font-black text-white" style={{ textShadow: `0 0 20px ${t.color}` }}>
                {t.result}
              </span>
              <span className="text-[10px] text-white/50">{t.resultLabel}</span>
            </div>
          </div>

          {/* Stars */}
          <div className="absolute top-4 left-0 right-0 flex justify-center gap-0.5">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} size={11} fill="#facc15" stroke="none" className="text-yellow-400" />
            ))}
          </div>

          {/* Corner glow */}
          <div
            className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
            style={{ background: `radial-gradient(circle at 100% 0%, ${t.color}30, transparent)` }}
          />

          {/* Gradient fade to bottom */}
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to bottom, transparent 50%, ${t.gradBot} 100%)` }}
          />
        </div>

        {/* ── Bottom info bar ── */}
        <div
          className="relative px-5 pt-4 pb-5"
          style={{ background: `linear-gradient(180deg, transparent 0%, ${t.gradBot} 30%)` }}
        >
          {/* Short quote */}
          <p className="text-white/70 text-[11px] leading-relaxed mb-3 italic line-clamp-2">
            &ldquo;{t.short}&rdquo;
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-white text-sm">{t.name}</p>
              <p className="text-[11px]" style={{ color: t.color }}>
                {t.role}, {t.company}
              </p>
            </div>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: `${t.color}25`, border: `1px solid ${t.color}50` }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={t.color} strokeWidth="1.8" strokeLinecap="round">
                <path d="M1.5 5h7M5 1.5l3.5 3.5L5 8.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Active border shimmer */}
        {index === active && (
          <motion.div
            className="absolute inset-0 rounded-[24px] pointer-events-none"
            style={{
              background: `linear-gradient(135deg, transparent 30%, ${t.color}18 50%, transparent 70%)`,
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
          />
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────── EXPANDED QUOTE ─────────────── */

function ExpandedQuote({ t, inView }: { t: TestimonialItem; inView: boolean }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={t.id}
        className="relative max-w-2xl mx-auto rounded-[24px] p-6 md:p-8 overflow-hidden"
        style={{
          background: `rgba(255,255,255,0.03)`,
          border: `1px solid ${t.color}30`,
          boxShadow: `0 0 60px ${t.color}12`,
        }}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      >
        <div
          className="absolute inset-0 pointer-events-none rounded-[24px]"
          style={{ background: `radial-gradient(circle at 0% 100%, ${t.color}12 0%, transparent 55%)` }}
        />
        {/* Giant quote mark */}
        <span
          className="absolute -top-3 left-6 text-[80px] leading-none font-serif pointer-events-none select-none"
          style={{ color: t.color, opacity: 0.12 }}
        >
          "
        </span>
        <p className="text-white/75 text-base md:text-lg leading-relaxed italic relative z-10">
          &ldquo;{t.quote}&rdquo;
        </p>
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/8 relative z-10">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white"
              style={{
                background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                boxShadow: `0 0 16px ${t.color}50`,
              }}
            >
              {t.initials}
            </div>
            <div>
              <p className="text-white font-bold text-sm">{t.name}</p>
              <p className="text-white/40 text-xs">{t.role}, {t.company}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="font-black text-lg" style={{ color: t.color }}>{t.result}</p>
            <p className="text-white/30 text-[10px]">{t.resultLabel}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────── MAIN SECTION ─────────────── */

export default function TestimonialsSection({ testimonialsData }: { testimonialsData?: Record<string, string>[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  const testimonials: TestimonialItem[] =
    testimonialsData && testimonialsData.length > 0
      ? testimonialsData.map((t, i) => {
          const grads = deriveGrads(t.color || "#7b2fff");
          return {
            id: t.id ?? i,
            name: t.name, role: t.role, company: t.company,
            quote: t.quote, short: t.shortQuote || t.quote,
            rating: Number(t.rating) || 5,
            initials: t.initials || (t.name ? t.name.split(" ").map((n) => n[0]).join("") : "?"),
            result: t.result, resultLabel: t.resultLabel,
            color: t.color || "#7b2fff",
            gradTop: grads.gradTop, gradBot: grads.gradBot,
          };
        })
      : FALLBACK_TESTIMONIALS;

  const total = testimonials.length;

  const prev = useCallback(() => setActive((a) => (a - 1 + total) % total), [total]);
  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // Auto-advance
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % total), 4500);
    return () => clearInterval(id);
  }, [inView, total]);

  const t = testimonials[active];

  return (
    <section
      ref={sectionRef}
      className="section-pad relative overflow-hidden"
      id="testimonials"
      style={{ background: "linear-gradient(180deg, #0a0015 0%, #060010 60%, #0a0015 100%)" }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{ background: `radial-gradient(circle, ${t.color}12 0%, transparent 70%)`, filter: "blur(60px)" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          key={t.id}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(123,47,255,0.06) 0%, transparent 70%)" }}
        />
        {/* Floating particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${(i * 19 + 5) % 92}%`,
              top: `${(i * 27 + 8) % 88}%`,
              background: testimonials[i % total].color,
              opacity: 0.25,
            }}
            animate={{ y: [0, -(16 + i * 5), 0], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="container relative z-10">

        {/* ── HEADER ── */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mb-4"
          >
            <span className="label-chip">Social Proof</span>
          </motion.div>
          <motion.h2
            className="display-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            Best Clients for{" "}
            <span className="gradient-text">Your Inspiration.</span>
          </motion.h2>
          <motion.p
            className="text-white/40 mt-3 text-sm max-w-sm mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
          >
            Drag or click a card to hear their story.
          </motion.p>
        </div>

        {/* ── FAN CARD TRACK ── */}
        <motion.div
          className="relative mx-auto mb-14 overflow-hidden"
          style={{ height: 420, maxWidth: 900 }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.id}
              t={t}
              index={i}
              active={active}
              total={total}
              onClick={() => setActive(i)}
            />
          ))}

          {/* Drag hint arrow — left */}
          <motion.button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-30 w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
            }}
            whileHover={{ scale: 1.1, background: `${testimonials[active].color}25` }}
            whileTap={{ scale: 0.95 }}
            onClick={prev}
            data-cursor-hover
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M9 2L4 7l5 5" />
            </svg>
          </motion.button>

          {/* Drag hint arrow — right */}
          <motion.button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-30 w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
            }}
            whileHover={{ scale: 1.1, background: `${testimonials[active].color}25` }}
            whileTap={{ scale: 0.95 }}
            onClick={next}
            data-cursor-hover
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M5 2l5 5-5 5" />
            </svg>
          </motion.button>
        </motion.div>

        {/* ── DOT INDICATORS ── */}
        <motion.div
          className="flex justify-center gap-2 mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {testimonials.map((tt, i) => (
            <button
              key={tt.id}
              onClick={() => setActive(i)}
              className="relative rounded-full transition-all duration-400"
              style={{
                width: i === active ? 28 : 8,
                height: 8,
                background: i === active ? testimonials[active].color : "rgba(255,255,255,0.15)",
                boxShadow: i === active ? `0 0 10px ${testimonials[active].color}80` : "none",
              }}
              data-cursor-hover
            />
          ))}
        </motion.div>

        {/* ── EXPANDED QUOTE ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <ExpandedQuote t={testimonials[active]} inView={inView} />
        </motion.div>

        {/* ── BOTTOM BRAND ROW ── */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          {testimonials.map((tt, i) => (
            <motion.button
              key={tt.id}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl transition-all duration-300"
              style={{
                background: i === active ? `${tt.color}18` : "rgba(255,255,255,0.04)",
                border: `1px solid ${i === active ? tt.color + "50" : "rgba(255,255,255,0.08)"}`,
                boxShadow: i === active ? `0 0 20px ${tt.color}20` : "none",
              }}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-cursor-hover
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black text-white flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${tt.color}, ${tt.color}88)`,
                  boxShadow: i === active ? `0 0 12px ${tt.color}60` : "none",
                }}
              >
                {tt.initials}
              </div>
              <div className="text-left">
                <p className="text-white text-xs font-semibold leading-none">{tt.name}</p>
                <p className="text-[10px] mt-0.5" style={{ color: i === active ? tt.color : "rgba(255,255,255,0.35)" }}>
                  {tt.company}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
