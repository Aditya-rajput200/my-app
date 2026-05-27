"use client";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { Star as StarIcon, BarChart2, Target, Zap } from "lucide-react";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/* ─────────────── DATA ─────────────── */

type FilterKey =
  | "All"
  | "Branding"
  | "Video Production"
  | "Ads"
  | "Social Media"
  | "Reels"
  | "Web Design";

interface Project {
  id: number;
  featured?: boolean;
  title: string;
  filterKey: FilterKey;
  tag: string;
  client: string;
  desc: string;
  metric: string;
  metric2: string;
  services: string[];
  results: string[];
  reels: string[];
  accent: string;
  size: "large" | "medium" | "tall";
  visual: "mesh" | "diagonal" | "circles" | "dots" | "waves" | "grid" | "prism" | "noise";
}

const PROJECTS: Project[] = [
  {
    id: 1, featured: true, title: "Cinematic Brand Relaunch", filterKey: "Branding", tag: "Brand Film",
    client: "Luxe Fashion Co.", desc: "Full-scale cinematic rebrand that redefined how the brand speaks — visually and emotionally.",
    metric: "12M Views", metric2: "340% Engagement Lift",
    services: ["Brand Film", "Color Grading", "Creative Direction", "Copywriting"],
    results: ["12M organic views in 30 days", "340% engagement increase", "4.2X follower growth"],
    reels: [], accent: "#7b2fff", size: "large", visual: "mesh",
  },
  {
    id: 2, title: "Viral Product Launch Reel", filterKey: "Reels", tag: "Short-Form Video",
    client: "NovaTech Startup", desc: "A 30-second reel that broke all platform records for the client on launch day.",
    metric: "5.2M Reach", metric2: "1.8M Saves",
    services: ["Reel Production", "Motion Graphics", "Sound Design"],
    results: ["5.2M reach in 72 hours", "1.8M saves", "#1 trending on Instagram Reels"],
    reels: [], accent: "#b14aff", size: "medium", visual: "diagonal",
  },
  {
    id: 3, title: "Luxury Wedding Campaign", filterKey: "Video Production", tag: "Cinematic Film",
    client: "Elara Weddings", desc: "Cinematic storytelling that captured the emotion of a high-profile wedding brand.",
    metric: "8.7M Impressions", metric2: "62% Booking Increase",
    services: ["Cinematography", "Color Grading", "Aerial Shots", "Editing"],
    results: ["8.7M impressions", "62% increase in bookings", "Featured in Vogue India"],
    reels: [], accent: "#e0aaff", size: "tall", visual: "circles",
  },
  {
    id: 4, title: "D2C Food Brand Social Series", filterKey: "Social Media", tag: "Content Series",
    client: "FreshBowl Foods", desc: "12-part cinematic content series that turned a food brand into a lifestyle identity.",
    metric: "25M+ Views", metric2: "10X Engagement",
    services: ["Content Strategy", "Video Series", "Social Management"],
    results: ["25M+ total views", "10X average engagement rate", "3X revenue growth"],
    reels: [], accent: "#c77dff", size: "medium", visual: "dots",
  },
  {
    id: 5, title: "Performance Ad Campaign", filterKey: "Ads", tag: "Ad Production",
    client: "Velox D2C Brand", desc: "Performance-first ad creatives engineered for maximum ROAS across Meta and Google.",
    metric: "10X ROAS", metric2: "₹4.2Cr Revenue",
    services: ["Ad Creative", "A/B Testing", "Motion Design", "Copywriting"],
    results: ["10X return on ad spend", "₹4.2 Crore revenue driven", "CPA reduced by 67%"],
    reels: [], accent: "#ff7edb", size: "medium", visual: "waves",
  },
  {
    id: 6, title: "SaaS Brand Identity System", filterKey: "Branding", tag: "Brand Identity",
    client: "Stackly SaaS", desc: "End-to-end visual identity — logo, motion guidelines, brand film, and launch campaign.",
    metric: "2.1M Launch Views", metric2: "Series A Raised",
    services: ["Logo Design", "Motion Guidelines", "Brand Film", "UI Direction"],
    results: ["2.1M launch campaign views", "Raised ₹12Cr Series A", "Top 10 ProductHunt"],
    reels: [], accent: "#7b2fff", size: "large", visual: "grid",
  },
  {
    id: 7, title: "Real Estate Cinematic Reel", filterKey: "Reels", tag: "Property Film",
    client: "Skyline Realty", desc: "Aerial and cinematic property showcase that positioned the brand as ultra-premium.",
    metric: "3.8M Views", metric2: "180% Lead Growth",
    services: ["Aerial Videography", "Cinematic Edit", "Sound Design"],
    results: ["3.8M views", "180% increase in property inquiries", "Sold out in 3 weeks"],
    reels: [], accent: "#9d4edd", size: "medium", visual: "prism",
  },
  {
    id: 8, title: "E-Commerce Web Design", filterKey: "Web Design", tag: "UI/UX Design",
    client: "Orbis Jewels", desc: "Premium e-commerce experience designed to reflect the exclusivity of a luxury jewellery brand.",
    metric: "4.1X Conversion", metric2: "92 PageSpeed",
    services: ["UI/UX Design", "Web Development", "Brand Integration"],
    results: ["4.1X conversion rate lift", "PageSpeed score 92", "AOV increased by 2.3X"],
    reels: [], accent: "#ffd60a", size: "tall", visual: "noise",
  },
];

const FILTERS: FilterKey[] = [
  "All",
  "Branding",
  "Video Production",
  "Ads",
  "Social Media",
  "Reels",
  "Web Design",
];

/* ─────────────── VISUAL GENERATORS ─────────────── */

function CardVisual({ visual, accent }: { visual: Project["visual"]; accent: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {visual === "mesh" && (
        <>
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 80% at 30% 40%, ${accent}40 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 80% 80%, ${accent}25 0%, transparent 50%), #0a0015` }} />
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 300">
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={i} x1={i * 55} y1="0" x2={i * 55 - 80} y2="300" stroke={accent} strokeWidth="0.5" />
            ))}
          </svg>
        </>
      )}
      {visual === "diagonal" && (
        <>
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, #0a0015 0%, ${accent}20 50%, #0a0015 100%)` }} />
          <div className="absolute inset-0 opacity-15" style={{ backgroundImage: `repeating-linear-gradient(45deg, ${accent} 0, ${accent} 1px, transparent 0, transparent 50%)`, backgroundSize: "20px 20px" }} />
        </>
      )}
      {visual === "circles" && (
        <>
          <div className="absolute inset-0 bg-[#0a0015]" />
          {[120, 200, 280].map((r, i) => (
            <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{ width: r, height: r, borderColor: `${accent}${30 - i * 8}` }} />
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full" style={{ background: `radial-gradient(circle, ${accent}, transparent)`, filter: "blur(8px)" }} />
        </>
      )}
      {visual === "dots" && (
        <>
          <div className="absolute inset-0 bg-[#0a0015]" />
          <div className="absolute inset-0 opacity-25" style={{ backgroundImage: `radial-gradient(circle, ${accent} 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${accent}30 0%, transparent 70%)` }} />
        </>
      )}
      {visual === "waves" && (
        <>
          <div className="absolute inset-0 bg-[#0a0015]" />
          <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 400 300" preserveAspectRatio="none">
            {Array.from({ length: 7 }).map((_, i) => (
              <path key={i} d={`M0,${50 + i * 35} Q100,${35 + i * 35} 200,${50 + i * 35} T400,${50 + i * 35}`} fill="none" stroke={accent} strokeWidth="1.2" />
            ))}
          </svg>
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 40% at 20% 80%, ${accent}35 0%, transparent 60%)` }} />
        </>
      )}
      {visual === "grid" && (
        <>
          <div className="absolute inset-0 bg-[#0a0015]" />
          <div className="absolute inset-0 opacity-15" style={{ backgroundImage: `linear-gradient(${accent}80 1px, transparent 1px), linear-gradient(90deg, ${accent}80 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 60% at 70% 30%, ${accent}30 0%, transparent 60%)` }} />
        </>
      )}
      {visual === "prism" && (
        <>
          <div className="absolute inset-0 bg-[#0a0015]" />
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300">
            <polygon points="200,20 380,280 20,280" fill="none" stroke={accent} strokeWidth="1" />
            <polygon points="200,70 330,260 70,260" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.6" />
            <polygon points="200,120 280,240 120,240" fill="none" stroke={accent} strokeWidth="0.4" opacity="0.4" />
          </svg>
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 50% 60% at 50% 60%, ${accent}25 0%, transparent 70%)` }} />
        </>
      )}
      {visual === "noise" && (
        <>
          <div className="absolute inset-0" style={{ background: `linear-gradient(145deg, ${accent}25 0%, #0a0015 60%)` }} />
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }} />
        </>
      )}
    </div>
  );
}

/* ─────────────── TILT CARD WRAPPER ─────────────── */

function TiltWrapper({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 30 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
    glowX.set(50);
    glowY.set(50);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 1000 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Dynamic reflection */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.08) 0%, transparent 50%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
}

/* ─────────────── FEATURED SPOTLIGHT CARD ─────────────── */

function FeaturedCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <TiltWrapper
      className="relative rounded-[28px] overflow-hidden cursor-pointer group"
      style={{
        border: `1px solid ${hovered ? project.accent + "70" : "rgba(123,47,255,0.3)"}`,
        boxShadow: hovered
          ? `0 30px 80px ${project.accent}35, 0 0 0 1px ${project.accent}30, inset 0 1px 0 rgba(255,255,255,0.08)`
          : `0 10px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)`,
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}
    >
      <div
        className="relative aspect-[16/9] overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
        data-cursor-hover
      >
        <CardVisual visual={project.visual} accent={project.accent} />

        {/* Cinematic film grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        />

        {/* Hover video-preview shimmer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(135deg, transparent 30%, ${project.accent}15 50%, transparent 70%)` }}
          animate={{ x: hovered ? ["−100%", "200%"] : "−100%" }}
          transition={{ duration: 1.4, ease: "easeInOut", repeat: hovered ? Infinity : 0, repeatDelay: 1 }}
        />

        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060010] via-[rgba(6,0,16,0.3)] to-transparent" />

        {/* Top row */}
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
          <span
            className="px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.12em] uppercase backdrop-blur-md"
            style={{ background: `${project.accent}30`, border: `1px solid ${project.accent}60`, color: project.accent }}
          >
            {project.tag}
          </span>
          <span
            className="px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider backdrop-blur-md text-white"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <StarIcon size={10} fill="currentColor" stroke="none" className="inline-block mr-1 -mt-px" />Featured
          </span>
        </div>

        {/* Play button */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-10"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${project.accent}, #c77dff)`,
                  boxShadow: `0 0 0 12px ${project.accent}25, 0 0 40px ${project.accent}80`,
                }}
              >
                <svg width="26" height="26" viewBox="0 0 26 26" fill="white"><path d="M9 5.5l13 7.5-13 7.5V5.5z" /></svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <p className="text-white/50 text-xs mb-2 leading-relaxed line-clamp-2">{project.desc}</p>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-white font-black text-2xl md:text-3xl" style={{ textShadow: `0 0 30px ${project.accent}80` }}>
                {project.metric}
              </p>
              <p className="text-white/40 text-[10px] tracking-wider">{project.metric2}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Card footer */}
      <div
        className="relative px-6 py-5 flex items-center justify-between"
        style={{ background: "rgba(6,0,16,0.95)", borderTop: `1px solid ${project.accent}20` }}
        onClick={onClick}
        data-cursor-hover
      >
        <div>
          <p className="font-black text-white text-lg leading-tight">{project.title}</p>
          <p style={{ color: project.accent }} className="text-xs mt-0.5 font-semibold">{project.client}</p>
        </div>
        <motion.div
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
          style={{ background: `${project.accent}20`, border: `1px solid ${project.accent}40`, color: project.accent }}
          whileHover={{ scale: 1.05, x: 2 }}
        >
          Case Study
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M2 6h8M6 2l4 4-4 4" />
          </svg>
        </motion.div>
      </div>
    </TiltWrapper>
  );
}

/* ─────────────── STANDARD GRID CARD ─────────────── */

function GridCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.23, 1, 0.32, 1] }}
      className={project.size === "tall" ? "row-span-2" : "row-span-1"}
    >
      <TiltWrapper
        className="relative rounded-[22px] overflow-hidden cursor-pointer group h-full"
        style={{
          border: `1px solid ${hovered ? project.accent + "60" : "rgba(123,47,255,0.2)"}`,
          boxShadow: hovered ? `0 20px 60px ${project.accent}28, 0 0 0 1px ${project.accent}25` : "none",
          transition: "border-color 0.35s, box-shadow 0.35s",
          minHeight: project.size === "tall" ? 420 : 220,
        }}
      >
        {/* Visual */}
        <div
          className={`relative overflow-hidden ${project.size === "tall" ? "h-64" : "h-44"}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={onClick}
          data-cursor-hover
        >
          <CardVisual visual={project.visual} accent={project.accent} />

          <motion.div
            className="absolute inset-0"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ background: `radial-gradient(circle at 50% 50%, ${project.accent}20 0%, transparent 70%)` }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#060010] via-transparent to-transparent" />

          {/* Category tag */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className="px-2.5 py-1 rounded-full text-[9px] font-bold tracking-[0.12em] uppercase backdrop-blur-md"
              style={{ background: `${project.accent}30`, border: `1px solid ${project.accent}50`, color: project.accent }}
            >
              {project.tag}
            </span>
          </div>

          {/* Metric badge */}
          <div className="absolute top-4 right-4 z-10">
            <span className="px-2.5 py-1 rounded-full text-[9px] font-bold text-white backdrop-blur-md"
              style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)" }}>
              {project.metric}
            </span>
          </div>

          {/* Play on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${project.accent}, #c77dff)`,
                    boxShadow: `0 0 25px ${project.accent}80`,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><path d="M5 3.5l8 4.5-8 4.5V3.5z" /></svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info */}
        <div className="p-5 bg-[rgba(6,0,16,0.95)]" onClick={onClick} data-cursor-hover>
          <h3 className="font-black text-white text-sm leading-snug mb-1">{project.title}</h3>
          <p className="text-white/40 text-[11px]">{project.client}</p>
          {project.size === "tall" && (
            <p className="text-white/40 text-xs leading-relaxed mt-2 line-clamp-2">{project.desc}</p>
          )}
          <div className="flex items-center justify-between mt-4">
            <div>
              <p className="text-white font-bold text-base" style={{ color: project.accent }}>{project.metric}</p>
              <p className="text-white/30 text-[10px]">{project.metric2}</p>
            </div>
            <motion.span
              className="flex items-center gap-1.5 text-xs font-semibold"
              style={{ color: project.accent }}
              animate={{ x: hovered ? 3 : 0 }}
              transition={{ duration: 0.3 }}
            >
              View
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M1.5 5h7M5 1.5l3.5 3.5L5 8.5" />
              </svg>
            </motion.span>
          </div>
        </div>
      </TiltWrapper>
    </motion.div>
  );
}

/* ─────────────── MARQUEE ─────────────── */

function MarqueeStrip({ projects }: { projects: Project[] }) {
  const items = [...projects, ...projects];
  return (
    <div className="relative overflow-hidden py-4">
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #060010, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(-90deg, #060010, transparent)" }} />
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {items.map((p, i) => (
          <div
            key={`${p.id}-${i}`}
            className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-full"
            style={{
              background: `${p.accent}12`,
              border: `1px solid ${p.accent}30`,
            }}
          >
            <div className="w-5 h-5 rounded-full" style={{ background: `radial-gradient(circle, ${p.accent}, transparent)`, filter: "blur(2px)" }} />
            <span className="text-xs font-semibold text-white/70 whitespace-nowrap">{p.title}</span>
            <span className="text-[10px] font-bold" style={{ color: p.accent }}>{p.metric}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────── REEL PHONE CARD ─────────────── */

function extractReelId(url: string): string | null {
  const m = url.match(/\/reel\/([A-Za-z0-9_-]+)/);
  return m ? m[1] : null;
}

function ReelPhoneCard({ url, accent, index }: { url: string; accent: string; index: number }) {
  const [loaded, setLoaded] = useState(false);
  const reelId = extractReelId(url);
  const embedUrl = reelId ? `https://www.instagram.com/reel/${reelId}/embed/` : null;

  return (
    <motion.div
      className="relative flex-shrink-0"
      style={{ width: 200, height: 355 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
    >
      <div
        className="relative w-full h-full rounded-[2rem] overflow-hidden"
        style={{
          background: "#080012",
          border: `1.5px solid ${accent}40`,
          boxShadow: `0 0 0 1px rgba(0,0,0,0.5), 0 16px 40px rgba(0,0,0,0.5), 0 0 30px ${accent}15`,
        }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-center pt-2 pointer-events-none">
          <div className="w-14 h-4 rounded-b-xl" style={{ background: "#04000a", border: `1px solid ${accent}20`, borderTop: "none" }} />
        </div>

        {/* Loading state */}
        {!loaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3"
            style={{ background: `linear-gradient(160deg, #0f0018 0%, #07000f 100%)` }}>
            <motion.div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: `${accent}18`, border: `1px solid ${accent}35` }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill={accent}><path d="M5 3.5l8 4.5-8 4.5V3.5z" /></svg>
            </motion.div>
            <div className="space-y-1.5 w-16">
              <div className="h-1 rounded-full animate-pulse" style={{ background: `${accent}25` }} />
              <div className="h-1 rounded-full animate-pulse w-3/4 mx-auto" style={{ background: `${accent}15` }} />
            </div>
          </div>
        )}

        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full border-0"
            style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}
            onLoad={() => setLoaded(true)}
            scrolling="no"
            allowFullScreen
            title={`Reel ${index + 1}`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/20 text-xs text-center px-4">Invalid URL</p>
          </div>
        )}

        {/* Screen glare */}
        <div className="absolute inset-0 pointer-events-none rounded-[2rem]"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.035) 0%, transparent 40%)" }} />
      </div>

      {/* Glow under */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-6 blur-xl pointer-events-none"
        style={{ background: `${accent}30` }} />
    </motion.div>
  );
}

/* ─────────────── MODAL ─────────────── */

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[99990] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 backdrop-blur-2xl"
        style={{ background: "rgba(3,0,10,0.88)" }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[32px] z-10 scrollbar-hide"
        style={{
          background: "linear-gradient(145deg, #110020 0%, #060010 100%)",
          border: `1px solid ${project.accent}45`,
          boxShadow: `0 50px 120px rgba(0,0,0,0.9), 0 0 80px ${project.accent}20, inset 0 1px 0 rgba(255,255,255,0.06)`,
        }}
        initial={{ scale: 0.88, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 30, opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
          onClick={onClose}
          data-cursor-hover
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>

        {/* Top visual */}
        <div className="relative aspect-[16/7] overflow-hidden rounded-t-[32px]">
          <CardVisual visual={project.visual} accent={project.accent} />
          {/* Cinematic bars */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-black/60 z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060010] via-transparent to-transparent" />
          {/* Play */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div
              className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${project.accent}, #c77dff)`,
                boxShadow: `0 0 0 16px ${project.accent}20, 0 0 60px ${project.accent}60`,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              data-cursor-hover
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="white"><path d="M10 7l13 7-13 7V7z" /></svg>
            </motion.div>
          </div>
          {/* Tag */}
          <div className="absolute top-12 left-6 z-10">
            <span
              className="px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase backdrop-blur-md"
              style={{ background: `${project.accent}35`, border: `1px solid ${project.accent}60`, color: project.accent }}
            >
              {project.tag}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">{project.title}</h2>
              <p className="text-white/50 text-sm mt-1">{project.client} · {project.filterKey}</p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1">
              <p className="text-3xl font-black" style={{ color: project.accent, textShadow: `0 0 30px ${project.accent}60` }}>{project.metric}</p>
              <p className="text-white/40 text-xs">{project.metric2}</p>
            </div>
          </div>

          <p className="text-white/60 leading-relaxed mb-8">{project.desc}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {project.results.map((r, i) => (
              <motion.div
                key={i}
                className="rounded-2xl p-4"
                style={{
                  background: `${project.accent}10`,
                  border: `1px solid ${project.accent}30`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: `${project.accent}25` }}>
                  {i === 0 ? <BarChart2 size={15} strokeWidth={1.5} style={{ color: project.accent }} /> :
                   i === 1 ? <Target size={15} strokeWidth={1.5} style={{ color: project.accent }} /> :
                              <Zap size={15} strokeWidth={1.5} style={{ color: project.accent }} />}
                </div>
                <p className="text-white font-bold text-sm leading-snug">{r}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div
              className="flex-1 rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/30 mb-3">Services Used</p>
              <div className="flex flex-wrap gap-2">
                {project.services.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-full text-xs font-semibold text-white/70"
                    style={{ background: `${project.accent}18`, border: `1px solid ${project.accent}35` }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Instagram Reels ── */}
          {project.reels.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${project.accent}50, transparent)` }} />
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill={project.accent}><path d="M4 2.5l7 4.5-7 4.5V2.5z" /></svg>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: project.accent }}>Watch the Reels</span>
                </div>
                <div className="h-px flex-1" style={{ background: `linear-gradient(to left, ${project.accent}50, transparent)` }} />
              </div>

              <div
                className="flex gap-4 overflow-x-auto pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
              >
                {project.reels.map((url, i) => (
                  <ReelPhoneCard key={i} url={url} accent={project.accent} index={i} />
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-white/8">
            <a href="#contact" className="btn-primary magnetic-btn" onClick={onClose}>
              Start a Similar Project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href={`https://wa.me/919203626559?text=${encodeURIComponent(`Hi! I love the "${project.title}" project. I'd like something similar for my brand.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline magnetic-btn text-sm"
            >
              Discuss on WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────── ANIMATED BACKGROUND ─────────────── */

function SectionBg() {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      mouseX.set((e.clientX / window.innerWidth) * 100);
      mouseY.set((e.clientY / window.innerHeight) * 100);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Animated gradient blobs */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full"
        style={{
          top: "−10%", left: "−5%",
          background: "radial-gradient(circle, rgba(123,47,255,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          bottom: "0%", right: "5%",
          background: "radial-gradient(circle, rgba(177,74,255,0.1) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      {/* Mouse-follow glow */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(123,47,255,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
          left: useTransform(mouseX, [0, 100], ["-20%", "80%"]),
          top: useTransform(mouseY, [0, 100], ["-20%", "80%"]),
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* Floating particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${(i * 17 + 5) % 95}%`,
            top: `${(i * 23 + 10) % 90}%`,
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            background: i % 2 === 0 ? "#7b2fff" : "#c77dff",
            opacity: 0.3,
          }}
          animate={{ y: [0, -(20 + (i % 4) * 15), 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─────────────── FILTER TABS ─────────────── */

function FilterTabs({ active, onChange, counts }: {
  active: FilterKey;
  onChange: (f: FilterKey) => void;
  counts: Record<FilterKey, number>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="flex items-center gap-1 overflow-x-auto scrollbar-hide flex-nowrap pb-1">
      {FILTERS.map((f) => {
        const isActive = active === f;
        return (
          <motion.button
            key={f}
            onClick={() => onChange(f)}
            className="relative flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-colors duration-300 whitespace-nowrap"
            style={{
              color: isActive ? "white" : "rgba(255,255,255,0.45)",
              background: isActive ? "rgba(123,47,255,0.25)" : "transparent",
              border: isActive ? "1px solid rgba(123,47,255,0.6)" : "1px solid rgba(255,255,255,0.08)",
            }}
            whileHover={{ color: "rgba(255,255,255,0.85)" }}
            whileTap={{ scale: 0.96 }}
            data-cursor-hover
          >
            {isActive && (
              <motion.div
                layoutId="filter-bg"
                className="absolute inset-0 rounded-full"
                style={{ background: "rgba(123,47,255,0.2)", border: "1px solid rgba(123,47,255,0.5)" }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              />
            )}
            <span className="relative z-10">{f}</span>
            {counts[f] > 0 && (
              <span
                className="relative z-10 ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full"
                style={{ background: isActive ? "rgba(123,47,255,0.4)" : "rgba(255,255,255,0.08)" }}
              >
                {counts[f]}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

/* ─────────────── MAIN SECTION ─────────────── */

export default function WorkShowcase({ portfolioData }: { portfolioData?: Record<string, unknown>[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const PROJECTS_SRC: Project[] = useMemo(() => {
    if (portfolioData && portfolioData.length > 0) {
      return portfolioData.map((p, i) => ({
        id: i + 1,
        featured: Boolean(p.featured),
        title: String(p.title ?? ""),
        filterKey: (p.filterKey as FilterKey) ?? "Branding",
        tag: String(p.tag ?? ""),
        client: String(p.client ?? ""),
        desc: String(p.description ?? ""),
        metric: String(p.metric ?? ""),
        metric2: String(p.metric2 ?? ""),
        services: Array.isArray(p.services) ? (p.services as string[]) : [],
        results: Array.isArray(p.results) ? (p.results as string[]) : [],
        reels: Array.isArray(p.reels) ? (p.reels as string[]) : [],
        accent: String(p.accent ?? "#7b2fff"),
        size: (p.size as Project["size"]) ?? "medium",
        visual: (p.visual as Project["visual"]) ?? "mesh",
      }));
    }
    return PROJECTS;
  }, [portfolioData]);

  const filtered = useMemo(() =>
    activeFilter === "All" ? PROJECTS_SRC : PROJECTS_SRC.filter((p) => p.filterKey === activeFilter),
    [activeFilter, PROJECTS_SRC]
  );

  const featuredProject = useMemo(() => filtered.find((p) => p.featured) ?? filtered[0], [filtered]);
  const gridProjects = useMemo(() => filtered.filter((p) => p.id !== featuredProject?.id).slice(0, 6), [filtered, featuredProject]);

  const counts = useMemo(() => {
    const c = {} as Record<FilterKey, number>;
    FILTERS.forEach((f) => {
      c[f] = f === "All" ? PROJECTS_SRC.length : PROJECTS_SRC.filter((p) => p.filterKey === f).length;
    });
    return c;
  }, [PROJECTS_SRC]);

  return (
    <section
      ref={sectionRef}
      className="section-pad relative overflow-hidden"
      id="work"
      style={{ background: "linear-gradient(180deg, #0a0015 0%, #060010 50%, #0a0015 100%)" }}
    >
      <SectionBg />

      <div className="container relative z-10">

        {/* ── HEADER ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="label-chip">Creative Portfolio</span>
            </motion.div>
            <motion.h2
              className="display-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            >
              Projects That Generated{" "}
              <br className="hidden lg:block" />
              <span className="gradient-text">Real Results.</span>
            </motion.h2>
          </div>
          <motion.div
            className="max-w-xs"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <p className="text-white/45 text-sm leading-relaxed">
              Every project crafted with emotion, strategy and cinematic storytelling. Click any card to explore the full story.
            </p>
          </motion.div>
        </div>

        {/* ── FILTERS ── */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FilterTabs active={activeFilter} onChange={setActiveFilter} counts={counts} />
        </motion.div>

        {/* ── FEATURED + SIDE STACK ── */}
        <AnimatePresence mode="wait">
          {featuredProject && (
            <motion.div
              key={`featured-${activeFilter}`}
              className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5 mb-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            >
              <FeaturedCard project={featuredProject} onClick={() => setSelectedProject(featuredProject)} />

              {/* Side stack */}
              <div className="flex flex-row xl:flex-col gap-4 overflow-x-auto xl:overflow-visible scrollbar-hide">
                {(gridProjects.length > 0 ? gridProjects : PROJECTS_SRC.filter((p) => p.id !== featuredProject.id))
                  .slice(0, 2)
                  .map((p, i) => (
                    <motion.div
                      key={p.id}
                      className="flex-shrink-0 w-[280px] xl:w-auto"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <TiltWrapper
                        className="relative rounded-[22px] overflow-hidden cursor-pointer group"
                        style={{
                          border: `1px solid ${p.accent}30`,
                          boxShadow: `0 10px 40px rgba(0,0,0,0.3)`,
                        }}
                      >
                        <div
                          className="relative h-36 overflow-hidden"
                          onClick={() => setSelectedProject(p)}
                          data-cursor-hover
                        >
                          <CardVisual visual={p.visual} accent={p.accent} />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#060010] to-transparent" />
                          <div className="absolute top-3 left-3">
                            <span className="px-2 py-1 rounded-full text-[9px] font-bold tracking-wider backdrop-blur-md"
                              style={{ background: `${p.accent}30`, border: `1px solid ${p.accent}50`, color: p.accent }}>
                              {p.tag}
                            </span>
                          </div>
                        </div>
                        <div className="px-4 py-3.5 bg-[rgba(6,0,16,0.95)]" onClick={() => setSelectedProject(p)} data-cursor-hover>
                          <p className="font-bold text-white text-sm leading-tight">{p.title}</p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs font-bold" style={{ color: p.accent }}>{p.metric}</p>
                            <p className="text-white/30 text-[10px]">{p.client}</p>
                          </div>
                        </div>
                      </TiltWrapper>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── GRID ── */}
        <AnimatePresence mode="wait">
          {gridProjects.length > 2 && (
            <motion.div
              key={`grid-${activeFilter}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {gridProjects.slice(2).map((p, i) => (
                <GridCard
                  key={p.id}
                  project={p}
                  index={i}
                  onClick={() => setSelectedProject(p)}
                />
              ))}

              {/* CTA card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="rounded-[22px] p-8 flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden group"
                style={{
                  background: "rgba(123,47,255,0.06)",
                  border: "1px dashed rgba(123,47,255,0.35)",
                  minHeight: 220,
                }}
                whileHover={{ borderColor: "rgba(123,47,255,0.65)", background: "rgba(123,47,255,0.1)" }}
                data-cursor-hover
              >
                <div
                  className="absolute inset-0 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 50% 50%, rgba(123,47,255,0.15) 0%, transparent 70%)" }}
                />
                <motion.div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "rgba(123,47,255,0.15)", border: "1px solid rgba(123,47,255,0.4)" }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#c77dff" strokeWidth="2" strokeLinecap="round">
                    <path d="M11 4v14M4 11h14" />
                  </svg>
                </motion.div>
                <p className="font-black text-white text-base mb-2">Your Brand Here</p>
                <p className="text-white/35 text-xs leading-relaxed mb-5 max-w-[200px]">Ready to create something that actually drives results?</p>
                <a href="#contact" className="btn-primary text-xs py-2.5 px-5 magnetic-btn">
                  Start a Project
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── EMPTY STATE ── */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              className="py-20 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-white/30 text-sm">No projects in this category yet.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── MARQUEE ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
        className="mt-4 border-t border-b border-[rgba(123,47,255,0.12)] py-0"
      >
        <MarqueeStrip projects={PROJECTS_SRC} />
      </motion.div>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
