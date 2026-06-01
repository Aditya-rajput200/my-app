"use client";

import { useRef, useState, useCallback, useMemo } from "react";
import { motion, useInView } from "framer-motion";

interface PortfolioProject {
  reels?: unknown;
  accent?: unknown;
}

function extractReelId(url: string): string | null {
  const m = url.match(/\/reel\/([A-Za-z0-9_-]+)/);
  return m ? m[1] : null;
}

function ReelCard({ url, accent, index }: { url: string; accent: string; index: number }) {
  const [loaded, setLoaded] = useState(false);
  const reelId = extractReelId(url);
  const embedUrl = reelId ? `https://www.instagram.com/reel/${reelId}/embed/` : null;

  return (
    <motion.div
      className="relative flex-shrink-0 select-none"
      style={{ width: 260, height: 462 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.28 } }}
    >
      <div
        className="relative w-full h-full rounded-[2.8rem] overflow-hidden"
        style={{
          background: "#0a0014",
          border: `1.5px solid ${accent}45`,
          boxShadow: `0 0 0 1px rgba(0,0,0,0.6), 0 24px 60px rgba(0,0,0,0.55), 0 0 40px ${accent}14, inset 0 1px 0 rgba(255,255,255,0.05)`,
        }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-center pt-3 pointer-events-none">
          <div className="w-20 h-5 rounded-b-2xl"
            style={{ background: "#07000f", border: `1px solid ${accent}20`, borderTop: "none" }} />
        </div>

        {/* Side buttons */}
        <div className="absolute right-0 top-24 w-0.5 h-8 rounded-l-full pointer-events-none" style={{ background: `${accent}40` }} />
        <div className="absolute left-0 top-20 w-0.5 h-6 rounded-r-full pointer-events-none" style={{ background: `${accent}30` }} />
        <div className="absolute left-0 top-28 w-0.5 h-6 rounded-r-full pointer-events-none" style={{ background: `${accent}30` }} />

        {/* Skeleton */}
        {!loaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3"
            style={{ background: "linear-gradient(160deg, #0f0018 0%, #07000f 100%)" }}>
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: `${accent}18`, border: `1px solid ${accent}35` }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill={accent}><path d="M6 3.5l10 5.5-10 5.5V3.5z" /></svg>
            </motion.div>
            <div className="space-y-2 w-20">
              <div className="h-1.5 rounded-full animate-pulse" style={{ background: `${accent}22` }} />
              <div className="h-1.5 rounded-full animate-pulse w-3/4 mx-auto" style={{ background: `${accent}14` }} />
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
            <p className="text-white/20 text-xs px-4 text-center">Invalid reel URL</p>
          </div>
        )}

        {/* Glare */}
        <div className="absolute inset-0 pointer-events-none rounded-[2.8rem]"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%)" }} />
      </div>

      {/* Glow */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 blur-xl pointer-events-none"
        style={{ background: `${accent}28` }} />
    </motion.div>
  );
}

export default function ReelsSection({ portfolioData }: { portfolioData?: Record<string, unknown>[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.3;
  }, []);

  const stopDrag = useCallback(() => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  }, []);

  const allReels = useMemo(() => {
    if (!portfolioData?.length) return [];
    const out: { url: string; accent: string }[] = [];
    for (const p of portfolioData as PortfolioProject[]) {
      if (!Array.isArray(p.reels)) continue;
      const accent = typeof p.accent === "string" ? p.accent : "#7b2fff";
      for (const url of p.reels as string[]) {
        if (typeof url === "string" && url.includes("/reel/")) {
          out.push({ url, accent });
        }
      }
    }
    return out;
  }, [portfolioData]);

  if (!allReels.length) return null;

  return (
    <section ref={sectionRef} className="py-24 overflow-hidden">
      <div className="px-6 md:px-16 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: "rgba(123,47,255,0.5)" }} />
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#c77dff]">Instagram</span>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Watch Our{" "}
                <span style={{
                  background: "linear-gradient(135deg, #c77dff 0%, #7b2fff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>Reels</span>
              </h2>
              <p className="text-white/40 text-sm mt-2">Cinematic moments and brand stories — in motion.</p>
            </div>
            <a
              href="https://www.instagram.com/kyronproductions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-white/40 hover:text-[#c77dff] transition-colors flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              Follow us
            </a>
          </div>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #07000f, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #07000f, transparent)" }} />

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-4"
          style={{
            cursor: "grab",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingLeft: "clamp(1.5rem, 8vw, 8rem)",
            paddingRight: "clamp(1.5rem, 8vw, 8rem)",
            WebkitOverflowScrolling: "touch",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          {allReels.map((reel, i) => (
            <ReelCard key={i} url={reel.url} accent={reel.accent} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
