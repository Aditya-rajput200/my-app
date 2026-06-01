"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

export default function FinalCTA({ settings }: { settings?: Record<string, string> }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const phone = settings?.whatsappNumber || "919203626559";
  const message = encodeURIComponent(settings?.whatsappMessage || "Hi Kyron Productions, I'm interested in working with you.");

  return (
    <section ref={ref} className="section-pad relative overflow-hidden" id="contact">
      {/* Animated gradient waves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Wave layers */}
        {[
          { color: "rgba(123,47,255,0.25)", size: "120%", delay: 0 },
          { color: "rgba(177,74,255,0.15)", size: "100%", delay: 2 },
          { color: "rgba(157,78,221,0.1)", size: "80%", delay: 4 },
        ].map((wave, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: wave.size,
              paddingBottom: wave.size,
              background: `radial-gradient(circle, ${wave.color} 0%, transparent 70%)`,
              filter: "blur(40px)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: wave.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(${123 + Math.random() * 80},${47 + Math.random() * 40},255,0.6)`,
            }}
            animate={{
              y: [0, -40 - Math.random() * 40, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-6"
        >
          <span className="label-chip">Ready to Begin?</span>
        </motion.div>

        <motion.h2
          className="display-heading-xl mb-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #c77dff 50%, #7b2fff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Let&apos;s Create Something Unforgettable.
        </motion.h2>

        <motion.p
          className="text-white/50 text-lg max-w-xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          Your brand deserves a story that moves people. Let&apos;s build it together.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/contact"
            className="btn-primary text-base py-4 px-8 magnetic-btn"
            style={{ boxShadow: "0 0 60px rgba(123,47,255,0.6), 0 4px 30px rgba(123,47,255,0.4)" }}
          >
            Start Your Project
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 9h12M9 3l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          <a
            href={`https://wa.me/${phone}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-base py-4 px-8 magnetic-btn flex items-center gap-3"
            style={{ borderColor: "rgba(37,211,102,0.4)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#25d366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 mt-12 text-xs text-white/30"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          {["Response within 24 hours", "Free discovery call", "No-commitment proposal", "Results-driven approach"].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#7b2fff]" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
