"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Layers, Film, Scissors, Zap, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const steps: { num: string; title: string; desc: string; icon: LucideIcon; color: string }[] = [
  { num: "01", title: "Discovery", desc: "Deep dive into your brand, audience, and goals. We map the emotional journey before a single frame is shot.", icon: Search, color: "#7b2fff" },
  { num: "02", title: "Strategy", desc: "Data-meets-creativity. We craft the content blueprint and distribution strategy for maximum impact.", icon: Layers, color: "#9d4edd" },
  { num: "03", title: "Production", desc: "Lights, camera, magic. Our cinematic crew brings the vision to life on set.", icon: Film, color: "#b14aff" },
  { num: "04", title: "Editing", desc: "Precision cuts, cinematic color grading, and motion design that makes every frame tell a story.", icon: Scissors, color: "#c77dff" },
  { num: "05", title: "Launch", desc: "Strategic multi-platform rollout timed for maximum reach and algorithm advantage.", icon: Zap, color: "#7b2fff" },
  { num: "06", title: "Growth", desc: "We track, iterate and optimize. Your content becomes a compound machine for brand growth.", icon: TrendingUp, color: "#9d4edd" },
];

export default function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-pad relative overflow-hidden" id="process">
      <div className="container">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mb-4"
          >
            <span className="label-chip">How We Work</span>
          </motion.div>
          <motion.h2
            className="display-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            From Idea to{" "}
            <span className="gradient-text">Impact.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative rounded-2xl p-6 overflow-hidden group"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(123,47,255,0.2)",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ borderColor: `${step.color}50`, boxShadow: `0 0 30px ${step.color}15` }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${step.color}12 0%, transparent 70%)` }}
              />

              <div className="flex items-start gap-4">
                <div>
                  <span className="text-[11px] font-black tracking-[0.15em]" style={{ color: step.color }}>
                    {step.num}
                  </span>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mt-2"
                    style={{ background: `${step.color}18`, border: `1px solid ${step.color}35` }}
                  >
                    <step.icon size={18} strokeWidth={1.5} style={{ color: step.color }} />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-base mb-2">{step.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>

              {/* Connecting line (except last row) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 w-5 h-px z-10"
                  style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
