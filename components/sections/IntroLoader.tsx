"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"loading" | "reveal" | "exit">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setPhase("reveal"), 200);
        setTimeout(() => setPhase("exit"), 1800);
        setTimeout(() => onComplete(), 2600);
      }
      setProgress(Math.min(p, 100));
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          className="loader-screen"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(123,47,255,0.25) 0%, transparent 70%)",
            }}
          />

          {/* Sound-wave bars */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-[3px] h-24 overflow-hidden opacity-30">
            {Array.from({ length: 60 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-[3px] rounded-t-full bg-[#7b2fff]"
                animate={{ height: ["20%", `${30 + Math.sin(i * 0.4) * 40 + Math.random() * 30}%`, "20%"] }}
                transition={{
                  duration: 0.8 + Math.random() * 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.02,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Purple light flare */}
          <motion.div
            className="absolute w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(123,47,255,0.6) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Logo image reveal */}
          <div className="relative z-20 flex flex-col items-center gap-6">
            {/* Glow ring behind logo */}
            <div className="relative">
              <motion.div
                className="absolute -inset-8 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(123,47,255,0.7), transparent)" }}
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.6, filter: "blur(20px)" }}
                animate={
                  phase === "loading"
                    ? { opacity: progress / 100, scale: 0.6 + (progress / 100) * 0.4, filter: `blur(${20 - progress * 0.18}px)` }
                    : { opacity: 1, scale: 1, filter: "blur(0px)" }
                }
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  filter: "drop-shadow(0 0 40px rgba(199,125,255,0.9)) drop-shadow(0 0 80px rgba(123,47,255,0.6))",
                }}
              >
                <Image
                  src="/logo.png"
                  alt="Kyron Productions"
                  width={1020}
                  height={1020}
                  className="w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 object-contain"
                  priority
                />
              </motion.div>
            </div>

            <motion.p
              className="text-sm font-medium tracking-[0.3em] uppercase text-[#c77dff]"
              animate={progress > 60 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Productions
            </motion.p>

            <motion.p
              className="text-xs tracking-[0.2em] uppercase text-white/30"
              animate={progress > 80 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              Creative Production Studio
            </motion.p>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-8 left-8 right-8 md:left-16 md:right-16">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white/30 tracking-[0.1em]">Loading</span>
              <span className="text-xs text-[#c77dff] font-mono">{Math.round(progress)}%</span>
            </div>
            <div className="h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #7b2fff, #c77dff)",
                  boxShadow: "0 0 10px rgba(123,47,255,0.8)",
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
