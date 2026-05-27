"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function AboutPreview() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={ref} className="section-pad relative overflow-hidden" id="about-preview">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(123,47,255,0.12) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left visual */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          >
            <div
              className="relative rounded-[28px] overflow-hidden aspect-[4/3]"
              style={{
                border: "1px solid rgba(123,47,255,0.4)",
                boxShadow: "0 30px 80px rgba(123,47,255,0.25)",
                animation: "float-slow 8s ease-in-out infinite",
              }}
            >
              {/* Founder image */}
              <Image
                src="/founder.jpeg"
                alt="Kyron Productions Studio"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Cinematic colour overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(123,47,255,0.2) 0%, transparent 50%, rgba(10,0,21,0.55) 100%)",
                }}
              />
              {/* Letterbox bars */}
              <div className="absolute top-0 left-0 right-0 h-7 bg-black/60" />
              <div className="absolute bottom-0 left-0 right-0 h-7 bg-black/60" />

              {/* Floating mini badges */}
              <motion.div
                className="absolute top-4 left-4 glass rounded-xl px-3 py-2"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-[10px] text-[#c77dff] font-semibold tracking-wide">EST. 2020</p>
              </motion.div>
              <motion.div
                className="absolute bottom-4 right-4 glass rounded-xl px-3 py-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-[10px] text-[#c77dff] font-semibold">Mumbai, India</p>
              </motion.div>
            </div>

            {/* Glow halo */}
            <div
              className="absolute -inset-8 rounded-[36px] blur-3xl opacity-20 -z-10"
              style={{ background: "radial-gradient(circle, #7b2fff, #b14aff)" }}
            />
          </motion.div>

          {/* Right content */}
          <motion.div
            className="order-1 lg:order-2 flex flex-col gap-6"
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="label-chip w-fit">Our Story</span>

            <h2 className="display-heading">
              More Than an{" "}
              <span className="gradient-text">Agency.</span>
            </h2>

            <p className="text-white/60 text-base leading-relaxed">
              Kyron Productions is more than a creative agency. It&apos;s a team obsessed with storytelling, emotion and visual impact.
            </p>
            <p className="text-white/50 text-base leading-relaxed">
              Born from a passion for cinema and a belief that every brand deserves a story worth feeling, we&apos;ve spent years mastering the craft of visual storytelling.
            </p>

            <div className="flex gap-8 pt-4 border-t border-white/10">
              {[
                { val: "5+", label: "Years" },
                { val: "50+", label: "Brands" },
                { val: "250+", label: "Projects" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-black text-white glow-text">{s.val}</p>
                  <p className="text-xs text-white/40">{s.label}</p>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-primary w-fit magnetic-btn">
              Our Full Story
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
