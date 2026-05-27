"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Film, Lightbulb, Handshake, Flame } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import TeamSection from "@/components/sections/TeamSection";
import FinalCTA from "@/components/sections/FinalCTA";

const timeline = [
  { year: "2020", title: "The Beginning", desc: "Founded with a camera, a dream, and an obsession for cinematic storytelling." },
  { year: "2021", title: "First 10 Brands", desc: "Delivered breakthrough campaigns that generated over 10 million combined views." },
  { year: "2022", title: "Team of Five", desc: "Built a tight-knit crew of directors, designers, and strategists." },
  { year: "2023", title: "50+ Brands", desc: "Expanded across industries from fashion to tech — all united by great storytelling." },
  { year: "2024", title: "100M+ Views", desc: "Our content crossed 100 million views, proving that emotion drives results." },
  { year: "2025", title: "Now", desc: "Still hungry. Still cinematic. Still obsessed with making brands feel unforgettable." },
];

const values: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Film, title: "Cinematic First", desc: "Every frame is treated like it's for the big screen. Quality is non-negotiable." },
  { icon: Lightbulb, title: "Strategy-Backed Creativity", desc: "Beautiful work that also delivers measurable, real-world results." },
  { icon: Handshake, title: "Partnership, Not Vendor", desc: "We invest in your brand as if it were our own. Your success is our success." },
  { icon: Flame, title: "Obsession Over Execution", desc: "We don't just complete briefs. We obsess over them until they're unforgettable." },
];

export default function AboutPageClient() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacityHero = useTransform(scrollYProgress, [0.6, 1], [1, 0]);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden gradient-bg pt-24">
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ y: yParallax }}
          >
            <div
              className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vh] rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, #7b2fff, transparent)", filter: "blur(80px)" }}
            />
          </motion.div>

          <div className="container relative z-10">
            <motion.div
              style={{ opacity: opacityHero }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6"
              >
                <span className="label-chip">Our Story</span>
              </motion.div>

              <motion.h1
                className="display-heading mb-6"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              >
                We Are{" "}
                <span className="gradient-text">Kyron Productions.</span>
              </motion.h1>

              <motion.p
                className="text-white/60 text-lg leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                We&apos;re not just a production house. We&apos;re a team of storytellers, directors, designers, and strategists who believe every brand deserves a cinematic identity that moves people.
              </motion.p>

              <motion.blockquote
                className="mt-8 pl-6 border-l-2 border-[#7b2fff]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                <p className="text-white/80 text-xl italic font-medium">
                  &ldquo;Every brand has a story. We exist to make people feel it.&rdquo;
                </p>
                <footer className="text-[#c77dff] text-sm mt-2 font-semibold">— Kyron Productions</footer>
              </motion.blockquote>

              {/* Right col — founder image */}
              <motion.div
                className="hidden lg:block relative"
                initial={{ opacity: 0, scale: 0.9, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <div
                  className="relative rounded-[24px] overflow-hidden aspect-[3/4]"
                  style={{
                    border: "1px solid rgba(123,47,255,0.5)",
                    boxShadow: "0 30px 80px rgba(123,47,255,0.3)",
                    animation: "float 7s ease-in-out infinite",
                  }}
                >
                  <Image
                    src="/founder.jpeg"
                    alt="Founder — Kyron Productions"
                    fill
                    className="object-cover object-center"
                    sizes="50vw"
                    priority
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(145deg, rgba(123,47,255,0.18) 0%, transparent 50%, rgba(10,0,21,0.6) 100%)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0015] via-transparent to-transparent opacity-60" />
                </div>
                <div
                  className="absolute -inset-6 rounded-[32px] blur-3xl opacity-20 -z-10"
                  style={{ background: "radial-gradient(circle, #7b2fff, #b14aff)" }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
              <motion.div
                className="w-1 h-1.5 rounded-full bg-[#7b2fff]"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Mission */}
        <MissionSection />

        {/* Timeline */}
        <TimelineSection />

        {/* Values */}
        <ValuesSection />

        {/* Team */}
        <TeamSection />

        {/* CTA */}
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

function MissionSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-pad relative overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="label-chip mb-6 inline-block">Our Mission</span>
            <h2 className="display-heading mb-6">
              Obsessed with{" "}
              <span className="gradient-text">the Craft.</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Kyron Productions was built on a simple belief: content that doesn&apos;t make you feel something isn&apos;t content at all. It&apos;s noise.
            </p>
            <p className="text-white/50 leading-relaxed mb-4">
              Every project we take on is approached with the same intensity as a feature film. Pre-production planning. Precision on set. Obsessive post-production. That&apos;s the Kyron standard.
            </p>
            <p className="text-white/50 leading-relaxed">
              Our mission is to be the production partner that growing brands trust to represent them with cinematic excellence — consistently, at scale.
            </p>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Team photo */}
            <div
              className="relative rounded-[24px] overflow-hidden aspect-[4/3]"
              style={{
                border: "1px solid rgba(123,47,255,0.45)",
                boxShadow: "0 30px 80px rgba(123,47,255,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
                animation: "float-slow 7s ease-in-out infinite",
              }}
            >
              <Image
                src="/team.jpeg"
                alt="Kyron Productions Team"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(123,47,255,0.2) 0%, transparent 50%, rgba(10,0,21,0.5) 100%)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0015] via-transparent to-transparent opacity-50" />
              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[10px] tracking-[0.15em] uppercase text-[#c77dff] font-semibold mb-1">The Crew</p>
                <p className="text-white font-bold text-sm">Kyron Productions Team</p>
              </div>
            </div>
            <div
              className="absolute -inset-6 rounded-[32px] blur-3xl opacity-20 -z-10"
              style={{ background: "radial-gradient(circle, #7b2fff, #b14aff)" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="section-pad relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(123,47,255,0.05) 50%, transparent 100%)" }}
      />
      <div className="container">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mb-4"
          >
            <span className="label-chip">Our Journey</span>
          </motion.div>
          <motion.h2
            className="display-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            A Story of{" "}
            <span className="gradient-text">Relentless Growth.</span>
          </motion.h2>
        </div>

        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(180deg, transparent, #7b2fff, #c77dff, transparent)" }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <div className="flex flex-col gap-8">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                className="flex gap-8 items-start"
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                {/* Dot */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-black text-white z-10 relative"
                    style={{
                      background: "linear-gradient(135deg, #7b2fff, #b14aff)",
                      boxShadow: "0 0 20px rgba(123,47,255,0.5)",
                    }}
                  >
                    {item.year.slice(2)}
                  </div>
                </div>
                <div className="pt-2 pb-6 border-b border-white/10 last:border-0 flex-1">
                  <p className="text-[#c77dff] text-xs font-bold tracking-wider mb-1">{item.year}</p>
                  <h3 className="font-bold text-white text-base mb-1">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-pad relative overflow-hidden">
      <div className="container">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mb-4"
          >
            <span className="label-chip">Our Values</span>
          </motion.div>
          <motion.h2
            className="display-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            What We{" "}
            <span className="gradient-text">Stand For.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              className="glass rounded-2xl p-6 card-hover"
              style={{ border: "1px solid rgba(123,47,255,0.2)" }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="mb-4 w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(123,47,255,0.15)", border: "1px solid rgba(123,47,255,0.3)" }}>
                <v.icon size={20} strokeWidth={1.5} className="text-[#c77dff]" />
              </div>
              <h3 className="font-bold text-white text-sm mb-2">{v.title}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
