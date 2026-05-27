"use client";
import { useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { BrainCircuit, Sparkles, Film, BarChart2, PenLine, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  BrainCircuit, Sparkles, Film, BarChart2, PenLine, Users,
};

type TeamMemberData = { id?: string; name: string; role: string; bio: string; color: string; icon: LucideIcon };

const FALLBACK_TEAM: TeamMemberData[] = [
  { name: "Aman Kumar", role: "Founder", bio: "Leads the vision and strategy for every cinematic campaign.", color: "#7b2fff", icon: BrainCircuit },
  { name: "Rashmeet Kaur", role: "Co-founder", bio: "Guides creative direction and brand experience with clarity.", color: "#b14aff", icon: Sparkles },
  { name: "Sumit Kumar", role: "Video Editor", bio: "Shapes narratives through timing, rhythm, and cinematic polish.", color: "#c77dff", icon: Film },
  { name: "Suyash Singh", role: "Social Media Manager (SMM)", bio: "Builds social momentum and audience engagement across platforms.", color: "#9d4edd", icon: BarChart2 },
  { name: "Sonali Kukreja", role: "Content Creator", bio: "Crafts compelling scripts, captions, and visual storytelling.", color: "#7b2fff", icon: PenLine },
];

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * 20,
      y: (x - 0.5) * -20,
      glowX: x * 100,
      glowY: y * 100,
    });
  }

  function onLeave() {
    setTilt({ x: 0, y: 0, glowX: 50, glowY: 50 });
  }

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
    >
      {/* Dynamic glow follow */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(123,47,255,0.25) 0%, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}

function TeamMemberCard({ member, index }: { member: TeamMemberData; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
    >
      <div
        className="glass rounded-2xl p-4 cursor-pointer group transition-all duration-400"
        style={{
          border: `1px solid ${expanded ? member.color + "60" : "rgba(123,47,255,0.2)"}`,
          boxShadow: expanded ? `0 0 30px ${member.color}25` : "none",
        }}
        onClick={() => setExpanded(!expanded)}
        data-cursor-hover
      >
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${member.color}22`, border: `1px solid ${member.color}44` }}
          >
            <member.icon size={18} strokeWidth={1.5} style={{ color: member.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-white text-sm">{member.name}</p>
            <p className="text-xs text-white/40 mt-0.5">{member.role}</p>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 2v6M2 5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="overflow-hidden"
        >
          <p className="text-xs text-white/50 leading-relaxed pt-3 border-t border-white/10 mt-3">
            {member.bio}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function TeamSection({ teamData }: { teamData?: Record<string, string>[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const team: TeamMemberData[] =
    teamData && teamData.length > 0
      ? teamData.map((m) => ({
          id: m.id,
          name: m.name,
          role: m.role,
          bio: m.bio,
          color: m.color || "#7b2fff",
          icon: ICON_MAP[m.icon] ?? Users,
        }))
      : FALLBACK_TEAM;

  return (
    <section ref={sectionRef} className="section-pad relative overflow-hidden" id="team">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #7b2fff, transparent)", filter: "blur(80px)" }}
        />
      </div>

      <div className="container">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="label-chip">The Crew</span>
          </motion.div>
          <motion.h2
            className="display-heading mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Five Minds.{" "}
            <span className="gradient-text">One Frame.</span>
          </motion.h2>
          <motion.p
            className="text-white/50 max-w-md mx-auto text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A tight-knit team of directors, designers and editors who live for the craft.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* LEFT: cinematic team image card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <TiltCard className="relative rounded-[28px] overflow-hidden">
              <div
                className="relative rounded-[28px] overflow-hidden"
                style={{
                  border: "1px solid rgba(123,47,255,0.5)",
                  boxShadow: "0 30px 80px rgba(123,47,255,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
                  animation: "glow-pulse 4s ease-in-out infinite",
                }}
              >
                {/* Team image */}
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Image
                    src="/team.jpeg"
                    alt="Kyron Productions Team"
                    fill
                    className="object-cover object-center scale-105 hover:scale-100 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Cinematic colour overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(145deg, rgba(123,47,255,0.18) 0%, transparent 45%, rgba(10,0,21,0.45) 100%)",
                    }}
                  />
                  {/* Bottom fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0015] via-transparent to-transparent opacity-60" />
                  {/* Corner flares */}
                  <div
                    className="absolute top-0 left-0 w-32 h-32 pointer-events-none opacity-40"
                    style={{ background: "radial-gradient(circle at 0% 0%, #7b2fff, transparent)" }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none opacity-30"
                    style={{ background: "radial-gradient(circle at 100% 100%, #b14aff, transparent)" }}
                  />
                </div>

                <div className="p-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full bg-green-400"
                      style={{ boxShadow: "0 0 8px rgba(74,222,128,0.8)", animation: "pulse-dot 2s ease-in-out infinite" }}
                    />
                    <p className="text-xs text-white/40 tracking-wider uppercase">Currently Available for Projects</p>
                  </div>
                  <p className="text-white font-bold text-lg mt-2">Kyron Creative Team</p>
                  <p className="text-[#c77dff] text-sm mt-1">5 Specialists · Mumbai, India</p>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* RIGHT: team member cards */}
          <div className="flex flex-col gap-3">
            {team.map((member, i) => (
              <TeamMemberCard key={member.name} member={member} index={i} />
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-4 p-5 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(123,47,255,0.15) 0%, rgba(177,74,255,0.08) 100%)",
                border: "1px solid rgba(123,47,255,0.3)",
              }}
            >
              <p className="text-white/60 text-sm italic leading-relaxed">
                &ldquo;Every brand has a story. We exist to make people feel it.&rdquo;
              </p>
              <p className="text-[#c77dff] text-xs mt-2 font-semibold">— Kyron Productions</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
