"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Film, Smartphone, Gem, Megaphone, Camera, Layers, Palette, Lightbulb } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Film, Smartphone, Gem, Megaphone, Camera, Layers, Palette, Lightbulb,
};

const FALLBACK_SERVICES = [
  { id: "1", icon: Film, title: "Cinematic Video Production", desc: "Full-scale brand films and documentaries crafted with Hollywood-quality cinematography.", color: "#7b2fff" },
  { id: "2", icon: Smartphone, title: "Reels Production", desc: "Viral short-form content engineered for maximum engagement across Instagram & YouTube.", color: "#9d4edd" },
  { id: "3", icon: Gem, title: "Branding", desc: "Complete visual identity systems that make your brand unmistakable and memorable.", color: "#b14aff" },
  { id: "4", icon: Megaphone, title: "Social Media Marketing", desc: "Data-driven content strategies that grow communities and convert followers to customers.", color: "#c77dff" },
  { id: "5", icon: Camera, title: "Ad Shoots", desc: "High-impact product and lifestyle photography for campaigns that stop the scroll.", color: "#7b2fff" },
  { id: "6", icon: Layers, title: "Content Strategy", desc: "Deep-funnel content architectures designed around your audience psychology.", color: "#9d4edd" },
  { id: "7", icon: Palette, title: "Editing & Color Grading", desc: "Cinematic color science and precision editing that elevates every frame.", color: "#b14aff" },
  { id: "8", icon: Lightbulb, title: "Creative Direction", desc: "End-to-end creative vision for campaigns, launches, and brand campaigns.", color: "#c77dff" },
];

export default function ServicesSection({ servicesData }: { servicesData?: Record<string, string>[] }) {
  const services =
    servicesData && servicesData.length > 0
      ? servicesData.map((s) => ({ id: s.id, icon: ICON_MAP[s.icon] ?? Film, title: s.title, desc: s.description, color: s.color || "#7b2fff" }))
      : FALLBACK_SERVICES;
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="section-pad relative overflow-hidden" id="services">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #b14aff, transparent)", filter: "blur(80px)" }}
        />
      </div>

      <div className="container">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="label-chip">What We Do</span>
          </motion.div>
          <motion.h2
            className="display-heading mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Services Built for{" "}
            <span className="gradient-text">Impact.</span>
          </motion.h2>
          <motion.p
            className="text-white/50 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Everything your brand needs to dominate the digital landscape.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map(({ icon: Icon, ...service }, i) => (
            <motion.div
              key={service.title}
              className="group relative rounded-2xl p-6 card-hover cursor-pointer overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(123,47,255,0.2)",
                backdropFilter: "blur(20px)",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{
                borderColor: `${service.color}60`,
                boxShadow: `0 0 30px ${service.color}25, 0 20px 60px rgba(0,0,0,0.3)`,
              }}
              data-cursor-hover
            >
              {/* Animated gradient top border */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
              />

              {/* Hover background glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}15 0%, transparent 70%)` }}
              />

              {/* Shimmer effect */}
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
                }}
              />

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 relative z-10"
                style={{
                  background: `${service.color}18`,
                  border: `1px solid ${service.color}35`,
                  boxShadow: `0 0 20px ${service.color}20`,
                }}
              >
                <Icon size={22} strokeWidth={1.8} style={{ color: service.color }} />
              </div>

              <h3 className="font-bold text-white text-sm mb-2 leading-tight relative z-10">
                {service.title}
              </h3>
              <p className="text-white/40 text-xs leading-relaxed relative z-10">{service.desc}</p>

              <div className="mt-4 flex items-center gap-2 relative z-10">
                <span
                  className="text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
                  style={{ color: service.color }}
                >
                  Learn more
                </span>
                <svg
                  width="12" height="12" viewBox="0 0 12 12" fill="none"
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                  style={{ stroke: service.color }}
                >
                  <path d="M2 6h8M6 2l4 4-4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
