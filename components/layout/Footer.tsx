"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Footer({ settings }: { settings?: Record<string, string> }) {
  const instagramUrl = settings?.instagram
    ? `https://instagram.com/${settings.instagram.replace("@", "")}`
    : "#";
  const youtubeUrl = settings?.youtube || "#";

  const socials = [
    { label: "Instagram", href: instagramUrl },
    { label: "YouTube", href: youtubeUrl },
    { label: "LinkedIn", href: "#" },
  ];

  return (
    <footer className="relative border-t border-[rgba(123,47,255,0.2)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(123,47,255,0.1),transparent)]" />
      <div className="container relative py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 w-fit group">
              <Image
                src="/logo.png"
                alt="Kyron Productions"
                width={94}
                height={94}
                className="w-16 h-16 object-contain transition-all duration-300"
                style={{ filter: "drop-shadow(0 0 10px rgba(199,125,255,0.6))" }}
              />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              {settings?.location
                ? `${settings.location} — Cinematic content and digital production studio.`
                : "Cinematic content and digital production studio helping brands turn stories into unforgettable experiences."}
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href !== "#" ? "_blank" : undefined}
                  rel={s.href !== "#" ? "noopener noreferrer" : undefined}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/50 hover:text-[#c77dff] hover:border-[#7b2fff]/50 transition-colors text-xs font-medium"
                >
                  {s.label[0]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.12em] uppercase text-white/40 mb-4">Services</h4>
            <ul className="space-y-2.5">
              {["Video Production", "Reels & Shorts", "Branding", "Social Media", "Ad Shoots", "Color Grading"].map((s) => (
                <li key={s}>
                  <Link href="#services" className="text-sm text-white/60 hover:text-white transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.12em] uppercase text-white/40 mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[["About", "/about"], ["Work", "#work"], ["Blog", "/blog"], ["Team", "#team"], ["FAQ", "#faq"], ["Admin", "/admin"]].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="section-divider mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Kyron Productions. All rights reserved.</p>
          <p>Crafted with passion for visual storytelling.</p>
        </div>
      </div>
    </footer>
  );
}
