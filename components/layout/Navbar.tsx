"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ ready = true }: { ready?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > lastY.current && y > 200);
      lastY.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[9990]"
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? "glass-strong border-b border-[rgba(123,47,255,0.2)] py-3"
              : "py-5"
          }`}
        >
          <div className="container flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="magnetic-btn flex items-center gap-2 group">
              <div className="relative flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                  style={{ background: "radial-gradient(circle, #7b2fff, transparent)" }}
                />
                <Image
                  src="/logo.png"
                  alt="Kyron Productions"
                  width={106}
                  height={106}
                  className="w-14 h-14 object-contain relative z-10 transition-all duration-300 group-hover:drop-shadow-[0_0_16px_rgba(123,47,255,0.9)]"
                  priority
                  style={{
                    opacity: ready ? 1 : 0,
                    transition: "opacity 0.25s ease",
                    filter: "drop-shadow(0 0 8px rgba(199,125,255,0.6))",
                  }}
                />
                {!ready && (
                  <div className="absolute inset-0 rounded-full bg-white/5" />
                )}
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="magnetic-btn px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-[#7b2fff] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <Link
                href="#contact"
                className="hidden md:flex btn-primary text-sm py-2.5 px-6 magnetic-btn"
              >
                Let&apos;s Talk
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <button
                className="md:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-[5px] magnetic-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <motion.span
                  className="w-6 h-px bg-white block origin-center"
                  animate={menuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-6 h-px bg-white block"
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-6 h-px bg-white block origin-center"
                  animate={menuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[9980] flex flex-col pt-24 px-6 pb-10"
            style={{ background: "rgba(10,0,21,0.97)", backdropFilter: "blur(40px)" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <nav className="flex flex-col gap-2 mt-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className="block py-4 border-b border-white/10 text-2xl font-bold text-white/80 hover:text-white transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              className="mt-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="#contact"
                className="btn-primary w-full justify-center text-base py-4"
                onClick={() => setMenuOpen(false)}
              >
                Let&apos;s Talk
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
