"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const FALLBACK_FAQS = [
  { id: "1", question: "What services does Kyron Productions provide?", answer: "Kyron Productions offers a full suite of creative production services including cinematic video production, Instagram reels, YouTube content, brand identity design, social media marketing, ad shoots, content strategy, professional editing, and color grading." },
  { id: "2", question: "Do you create reels and short-form video ads?", answer: "Absolutely. Reels and short-form content are our specialty. We craft scroll-stopping, high-retention reels optimized for Instagram, YouTube Shorts, and TikTok." },
  { id: "3", question: "Can you handle complete branding for our business?", answer: "Yes. We offer end-to-end brand identity services — from logo and visual identity design to brand films, photography guidelines, and complete marketing collateral." },
  { id: "4", question: "Do you work with both businesses and individual creators?", answer: "We work with both. Whether you're a D2C brand or an individual creator — we tailor our approach to your goals, budget, and vision." },
  { id: "5", question: "How long does a typical production project take?", answer: "A standard reel campaign takes 5–7 days. A full brand film typically requires 2–4 weeks including pre-production." },
  { id: "6", question: "How do we get started with Kyron Productions?", answer: "Reach out via WhatsApp or our contact form. We'll schedule a 30-minute discovery call and share a custom proposal within 24 hours." },
];

export default function FAQSection({ faqData }: { faqData?: Record<string, string>[] }) {
  const faqs = (faqData && faqData.length > 0 ? faqData : FALLBACK_FAQS).map((f) => ({ id: f.id, q: f.question, a: f.answer }));
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section ref={ref} className="section-pad relative overflow-hidden" id="faq">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mb-4"
          >
            <span className="label-chip">FAQ</span>
          </motion.div>
          <motion.h2
            className="display-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Questions{" "}
            <span className="gradient-text">Answered.</span>
          </motion.h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id ?? i}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${open === i ? "rgba(123,47,255,0.5)" : "rgba(123,47,255,0.15)"}`,
                boxShadow: open === i ? "0 0 30px rgba(123,47,255,0.12)" : "none",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                data-cursor-hover
              >
                <span className="font-semibold text-white/90 text-sm leading-snug pr-4">{faq.q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: open === i ? "rgba(123,47,255,0.3)" : "rgba(255,255,255,0.06)",
                    border: `1px solid ${open === i ? "rgba(123,47,255,0.6)" : "rgba(255,255,255,0.1)"}`,
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-white/10 pt-4">
                      <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
