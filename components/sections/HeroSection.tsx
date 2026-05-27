"use client";
import { useRef, useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";

/* ─── copy ─── */
const L1 = "We Don't Just Create Content.";
const L2 = "We Create";
const L3 = "Digital Emotion.";

const SPEED  = 40;   // ms per character
const PAUSE  = 380;  // ms pause between lines before next starts

/* ─── blinking cursor ─── */
function Cursor() {
  return (
    <motion.span
      className="inline-block w-[3px] h-[0.82em] bg-[#c77dff] ml-1 align-middle rounded-sm"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.65, repeat: Infinity }}
    />
  );
}

export default function HeroSection({ ready = false }: { ready?: boolean }) {
  const sectionRef  = useRef<HTMLElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  /* ─── typing state ─── */
  const [l1, setL1] = useState("");
  const [l2, setL2] = useState("");
  const [l3, setL3] = useState("");
  /**
   * 0 = idle before first char
   * 1 = typing L1
   * 2 = typing L2
   * 3 = typing L3
   * 4 = all done → switch to full hero
   */
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0);

  /* ─── scroll parallax ─── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yBg            = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText          = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yImage         = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opacitySection = useTransform(scrollYProgress, [0.7, 1], [1, 0]);
  const quoteOpacity   = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const quoteY         = useTransform(scrollYProgress, [0.3, 0.6], [20, 0]);

  /* ─── mouse-parallax springs (only active in full-hero phase) ─── */
  const springX = useSpring(0, { stiffness: 60, damping: 20 });
  const springY = useSpring(0, { stiffness: 60, damping: 20 });

  /* ─── sequential typewriter — only starts once the intro loader is done ─── */
  useEffect(() => {
    if (!ready) return;
    const ids: Array<ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>> = [];

    function type(
      text: string,
      setter: React.Dispatch<React.SetStateAction<string>>,
      onDone: () => void,
    ) {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setter(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(iv);
          onDone();
        }
      }, SPEED);
      ids.push(iv);
    }

    /* kick off after brief initial delay */
    const t0 = setTimeout(() => {
      setPhase(1);
      type(L1, setL1, () => {
        const t1 = setTimeout(() => {
          setPhase(2);
          type(L2, setL2, () => {
            const t2 = setTimeout(() => {
              setPhase(3);
              type(L3, setL3, () => {
                const t3 = setTimeout(() => setPhase(4), PAUSE + 200);
                ids.push(t3);
              });
            }, PAUSE);
            ids.push(t2);
          });
        }, PAUSE);
        ids.push(t1);
      });
    }, 500);
    ids.push(t0);

    return () => ids.forEach((id) => {
      clearInterval(id as ReturnType<typeof setInterval>);
      clearTimeout(id as ReturnType<typeof setTimeout>);
    });
  }, [ready]);

  /* ─── mouse-follow gradient (only after full reveal) ─── */
  useEffect(() => {
    if (phase < 4) return;
    function onMove(e: MouseEvent) {
      springX.set((e.clientX / window.innerWidth  - 0.5) * 40);
      springY.set((e.clientY / window.innerHeight - 0.5) * 30);
      if (gradientRef.current) {
        const px = (e.clientX / window.innerWidth)  * 100;
        const py = (e.clientY / window.innerHeight) * 100;
        gradientRef.current.style.background =
          `radial-gradient(circle 600px at ${px}% ${py}%, rgba(123,47,255,0.18) 0%, transparent 60%)`;
      }
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [phase, springX, springY]);

  /* ─── shared background elements ─── */
  const Backgrounds = (
    <>
      <div
        ref={gradientRef}
        className="absolute inset-0 pointer-events-none transition-all duration-500"
      />
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: yBg }}>
        <div
          className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vh] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #7b2fff 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vh] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #b14aff 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#7b2fff]"
            style={{
              left: `${(i * 5.3 + 3) % 100}%`,
              top: `${(i * 7.1 + 5) % 100}%`,
              opacity: 0.2,
            }}
            animate={{ y: [0, -(30 + (i % 5) * 10), 0], opacity: [0.1, 0.4, 0.1] }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              delay: (i * 0.3) % 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </>
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh overflow-hidden gradient-bg"
      id="hero"
    >
      {Backgrounds}

      {/* ═══════════════════════════════════════════════
          PHASE 1-3 — full-screen sequential typewriter
          ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase < 4 && (
          <motion.div
            key="typing-stage"
            className="absolute inset-0 z-10 flex items-center justify-center px-6"
            exit={{
              y: -60,
              opacity: 0,
              scale: 0.96,
              transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
            }}
          >
            <motion.div style={{ y: yText }} className="w-full max-w-4xl mx-auto">
              <h1 className="display-heading text-center">

                {/* ── Line 1 ── */}
                <span className="block">
                  {l1}
                  {phase === 1 && <Cursor />}
                </span>

                {/* ── Line 2 — fades in when phase ≥ 2 ── */}
                <AnimatePresence>
                  {phase >= 2 && (
                    <motion.span
                      className="block gradient-text"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      {l2}
                      {phase === 2 && <Cursor />}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* ── Line 3 — fades in when phase ≥ 3 ── */}
                <AnimatePresence>
                  {phase >= 3 && (
                    <motion.span
                      className="block"
                      style={{
                        WebkitTextStroke: "2px rgba(199,125,255,0.65)",
                        color: "transparent",
                      }}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      {l3}
                      {phase === 3 && <Cursor />}
                    </motion.span>
                  )}
                </AnimatePresence>
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════
          PHASE 4 — full two-column hero layout
          (section visually compresses from the centered
          title card into this tighter, content-rich view)
          ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase >= 4 && (
          <motion.div
            key="full-hero"
            className="container relative z-10 min-h-svh flex flex-col justify-center pt-24 pb-16 lg:pt-28 lg:pb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.div
              style={{ y: yText, opacity: opacitySection }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center"
            >
              {/* ── LEFT ── */}
              <div className="flex flex-col gap-5 order-2 lg:order-1">

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.05 }}
                >
                  <span className="label-chip">Creative Production Studio</span>
                </motion.div>

                {/* Static headline (mirrors what was typed) */}
                <motion.h1
                  className="display-heading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.15 }}
                >
                  <span className="block">{L1}</span>
                  <span className="block gradient-text">{L2}</span>
                  <span
                    className="block"
                    style={{
                      WebkitTextStroke: "2px rgba(199,125,255,0.65)",
                      color: "transparent",
                    }}
                  >
                    {L3}
                  </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  className="text-white/55 text-base md:text-lg leading-relaxed max-w-md"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.28 }}
                >
                  Kyron Productions is a cinematic content and digital production studio
                  helping brands turn stories into unforgettable experiences.
                </motion.p>

                {/* Buttons */}
                <motion.div
                  className="flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Link href="#work" className="btn-primary magnetic-btn">
                    View Our Work
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8h10M8 3l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                  <Link href="#contact" className="btn-outline magnetic-btn">
                    Let&apos;s Create Together
                  </Link>
                </motion.div>

                {/* Stats row */}
                <motion.div
                  className="flex gap-6 sm:gap-10 pt-4 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                >
                  {[
                    { num: "120M+", label: "Views" },
                    { num: "250+",  label: "Campaigns" },
                    { num: "50+",   label: "Brands" },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="text-xl font-black text-white glow-text">{s.num}</p>
                      <p className="text-xs text-white/40 tracking-wide">{s.label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* ── RIGHT — Founder image ── */}
              <motion.div
                className="relative flex justify-center lg:justify-end lg:-mt-14 order-1 lg:order-2"
                style={{ x: springX, y: springY }}
              >
                <motion.div
                  className="relative w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[440px]"
                  style={{ y: yImage }}
                  initial={{ opacity: 0, scale: 0.94, x: 40 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.85, delay: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  {/* Glow halo */}
                  <div
                    className="absolute -inset-4 rounded-[28px] blur-3xl opacity-40"
                    style={{ background: "radial-gradient(circle, #7b2fff 0%, #b14aff 100%)" }}
                  />

                  {/* Card */}
                  <div
                    className="relative rounded-[24px] overflow-hidden border border-[rgba(123,47,255,0.5)]"
                    style={{
                      background:
                        "linear-gradient(145deg, rgba(30,0,53,0.95) 0%, rgba(10,0,21,0.95) 100%)",
                      boxShadow:
                        "0 30px 80px rgba(123,47,255,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
                      animation: "float 6s ease-in-out infinite",
                    }}
                  >
                    {/* Cinematic image — slides up into frame */}
                    <div className="relative overflow-hidden h-[360px] sm:h-[460px] lg:h-[520px]">
                      <motion.div
                        className="absolute inset-0"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{
                          duration: 1.1,
                          delay: 0.35,
                          ease: [0.76, 0, 0.24, 1],
                        }}
                      >
                        <Image
                          src="/founder.jpeg"
                          alt="Founder — Kyron Productions"
                          fill
                          className="object-cover object-top hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 640px) 300px, (max-width: 1024px) 380px, 440px"
                          priority
                        />
                        {/* Colour grade */}
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(145deg, rgba(123,47,255,0.15) 0%, transparent 40%, rgba(10,0,21,0.5) 100%)",
                          }}
                        />
                        {/* Bottom fade */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0015] via-transparent to-transparent opacity-60" />
                        {/* Scan-lines */}
                        <div
                          className="absolute inset-0 pointer-events-none opacity-[0.04]"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)",
                            backgroundSize: "100% 3px",
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Info bar */}
                    <div className="p-4 sm:p-5 border-t border-white/10">
                      <p className="text-xs text-[#c77dff] tracking-[0.15em] uppercase font-semibold mb-1">
                        Founder & Director
                      </p>
                      <p className="text-white font-bold text-base sm:text-lg">
                        Kyron Productions
                      </p>
                      <p className="text-white/40 text-xs mt-1">Cinematic Storyteller</p>
                    </div>
                  </div>

                  {/* Floating badges — hidden on mobile */}
                  <motion.div
                    className="absolute -left-3 sm:-left-6 top-14 glass rounded-2xl px-3 sm:px-4 py-2 sm:py-3 hidden sm:block"
                    style={{ boxShadow: "0 8px 32px rgba(123,47,255,0.3)" }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <p className="text-[10px] sm:text-xs text-white/50 mb-0.5">Projects</p>
                    <p className="text-white font-black text-lg sm:text-xl">250+</p>
                  </motion.div>

                  <motion.div
                    className="absolute -right-3 sm:-right-6 bottom-20 glass rounded-2xl px-3 sm:px-4 py-2 sm:py-3 hidden sm:block"
                    style={{ boxShadow: "0 8px 32px rgba(123,47,255,0.3)" }}
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <p className="text-[10px] sm:text-xs text-white/50 mb-0.5">Views</p>
                    <p className="text-white font-black text-lg sm:text-xl">120M+</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <motion.div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
                <motion.div
                  className="w-1 h-1.5 rounded-full bg-[#7b2fff]"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
              <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase">Scroll</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Founder quote — reveals on scroll */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 py-6 px-4 text-center z-10 pointer-events-none"
        style={{ opacity: quoteOpacity, y: quoteY }}
      >
        <p className="text-white/30 text-sm italic max-w-lg mx-auto">
          &ldquo;Every brand has a story. We exist to make people feel it.&rdquo;
        </p>
      </motion.div>
    </section>
  );
}
