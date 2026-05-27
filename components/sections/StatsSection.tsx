"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Eye, Target, Award, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const FALLBACK_STATS: { value: number; suffix: string; label: string; icon: LucideIcon }[] = [
  { value: 120, suffix: "M+", label: "Total Views", icon: Eye },
  { value: 250, suffix: "+", label: "Campaigns", icon: Target },
  { value: 50, suffix: "+", label: "Brands Served", icon: Award },
  { value: 10, suffix: "X", label: "Avg. Engagement Growth", icon: TrendingUp },
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCurrent(value);
        clearInterval(timer);
      } else {
        setCurrent(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white glow-text">
      {current}{suffix}
    </span>
  );
}

export default function StatsSection({ statsData }: { statsData?: Record<string, string | number> | null }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const stats = statsData
    ? [
        { value: Number(statsData.totalViews), suffix: String(statsData.viewsSuffix ?? "M+"), label: "Total Views", icon: Eye },
        { value: Number(statsData.totalCampaigns), suffix: String(statsData.campaignsSuffix ?? "+"), label: "Campaigns", icon: Target },
        { value: Number(statsData.totalBrands), suffix: String(statsData.brandsSuffix ?? "+"), label: "Brands Served", icon: Award },
        { value: Number(statsData.engagementGrowth), suffix: String(statsData.engagementSuffix ?? "X"), label: "Avg. Engagement Growth", icon: TrendingUp },
      ]
    : FALLBACK_STATS;

  return (
    <section ref={ref} className="section-pad relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(123,47,255,0.06) 50%, transparent 100%)" }}
      />

      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 sm:p-6 md:p-8 rounded-2xl relative overflow-hidden"
              style={{
                background: "rgba(123,47,255,0.06)",
                border: "1px solid rgba(123,47,255,0.2)",
              }}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 0%, rgba(123,47,255,0.15) 0%, transparent 70%)",
                }}
              />
              <div className="flex justify-center mb-3">
                <stat.icon size={28} strokeWidth={1.5} className="text-[#c77dff]" />
              </div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
              <p className="text-white/40 text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
