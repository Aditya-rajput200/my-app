"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Megaphone } from "lucide-react";

const plans = [
  {
    name: "Starter",
    tagline: "For brands just beginning their content journey.",
    price: "₹10,000",
    period: "/month",
    color: "#7b2fff",
    popular: false,
    features: [
      "6 Short-Form Reels (30–60 sec, fully edited)",
      "6 Designed Posts (feed-ready graphics)",
      "Caption Copywriting",
      "Hashtag Research & Optimization",
      "Monthly Performance Report",
      "Meta Ads Setup – FREE of cost*",
    ],
  },
  {
    name: "Growth",
    tagline: "For growing brands that need more content and reach.",
    price: "₹15,000",
    period: "/month",
    color: "#b14aff",
    popular: true,
    features: [
      "10 Short-Form Reels (30–60 sec, fully edited)",
      "8 Designed Posts (feed-ready graphics)",
      "Professional Caption Copywriting",
      "Hashtag Research & Optimization",
      "Instagram & Facebook Page Management",
      "Story Content (4 per week)",
      "Monthly Performance Report",
      "Meta Ads Setup – FREE of cost*",
    ],
  },
  {
    name: "Premium",
    tagline: "For brands that want complete social media dominance.",
    price: "₹25,000",
    period: "/month",
    color: "#c77dff",
    popular: false,
    features: [
      "15 Short-Form Reels (30–60 sec, fully edited)",
      "12 Designed Posts (feed-ready graphics)",
      "Monthly Content Calendar (planned in advance)",
      "Dedicated Social Media Strategy",
      "1 Professional Photo/Video Shoot per Month",
      "Complete Social Media Handling (IG, FB, Google)",
      "Daily Story Content",
      "DM & Comment Management",
      "Competitor Analysis",
      "Monthly Performance & Growth Report",
      "Meta Ads Setup – FREE of cost*",
    ],
  },
];

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
      <circle cx="8" cy="8" r="7.5" stroke={color} strokeOpacity="0.35" />
      <path d="M5 8l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="section-pad relative overflow-hidden" id="pricing">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(ellipse, #7b2fff, transparent)", filter: "blur(120px)" }}
        />
        <div
          className="absolute top-0 left-0 w-[350px] h-[350px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #b14aff, transparent)", filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #c77dff, transparent)", filter: "blur(100px)" }}
        />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-14 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-5"
          >
            <span className="label-chip">Our Packages</span>
          </motion.div>

          <motion.h2
            className="display-heading mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Plans that grow{" "}
            <span className="gradient-text">with you.</span>
          </motion.h2>

          <motion.p
            className="text-white/50 max-w-xl mx-auto text-base leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Monthly retainer plans. No hidden charges. Cancel anytime after a 3-month lock-in.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className="relative rounded-3xl flex flex-col overflow-hidden"
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: i * 0.13, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{
                y: -6,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              style={{
                background: plan.popular
                  ? `linear-gradient(145deg, ${plan.color}28 0%, ${plan.color}12 60%, rgba(0,0,0,0.1) 100%)`
                  : "rgba(255,255,255,0.035)",
                border: `1px solid ${plan.popular ? plan.color + "55" : "rgba(123,47,255,0.18)"}`,
                boxShadow: plan.popular
                  ? `0 0 80px ${plan.color}22, 0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 ${plan.color}30`
                  : "0 20px 60px rgba(0,0,0,0.25)",
              }}
            >
              {/* Top shimmer line for popular */}
              {plan.popular && (
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${plan.color}, transparent)` }}
                />
              )}

              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute top-5 right-5">
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full"
                    style={{
                      background: `${plan.color}25`,
                      border: `1px solid ${plan.color}45`,
                      color: plan.color,
                    }}
                  >
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8 lg:p-9 flex flex-col flex-1">
                {/* Plan name & tagline */}
                <div className="mb-7">
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{plan.name}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{plan.tagline}</p>
                </div>

                {/* Price */}
                <div className="mb-7 pb-7" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <p className="text-white/35 text-xs font-medium tracking-widest uppercase mb-2">Starting at</p>
                  <div className="flex items-end gap-2">
                    <span
                      className="text-5xl font-black leading-none"
                      style={{ color: plan.popular ? "#fff" : "rgba(255,255,255,0.92)" }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-white/35 text-sm mb-1.5">{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3.5 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3.5">
                      <CheckIcon color={plan.color} />
                      <span className="text-white/60 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href="#contact"
                  className="mt-9 w-full py-4 rounded-2xl text-sm font-bold text-center tracking-wide transition-all duration-300 block"
                  style={
                    plan.popular
                      ? {
                          background: `linear-gradient(135deg, ${plan.color}, #7b2fff)`,
                          color: "#fff",
                          boxShadow: `0 0 40px ${plan.color}45, 0 8px 30px rgba(0,0,0,0.3)`,
                        }
                      : {
                          background: "rgba(255,255,255,0.05)",
                          border: `1px solid ${plan.color}35`,
                          color: plan.color,
                        }
                  }
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  data-cursor-hover
                >
                  Get Started
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Meta Ads note */}
        <motion.div
          className="mt-12 rounded-2xl p-6 flex gap-5 items-start"
          style={{
            background: "rgba(123,47,255,0.07)",
            border: "1px solid rgba(123,47,255,0.18)",
            backdropFilter: "blur(20px)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55 }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(123,47,255,0.18)", border: "1px solid rgba(123,47,255,0.3)" }}
          >
            <Megaphone size={18} strokeWidth={1.5} className="text-[#c77dff]" />
          </div>
          <div>
            <p className="text-white/80 text-sm font-semibold mb-1.5">Meta Ads Note</p>
            <p className="text-white/45 text-sm leading-relaxed">
              We also help in running Meta Ads (Instagram & Facebook).{" "}
              <span className="text-white/75 font-semibold">Meta Ads setup is completely FREE of cost.</span>{" "}
              Ad spend / run cost is excluded and borne by the client.
            </p>
          </div>
        </motion.div>

        {/* Bottom CTAs */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.65 }}
        >
          <motion.a
            href="#contact"
            className="btn-primary px-10 py-4 text-sm"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            data-cursor-hover
          >
            Book a Strategy Call
          </motion.a>
          <motion.a
            href="#contact"
            className="flex items-center gap-2 text-sm font-semibold"
            style={{ color: "#b14aff" }}
            whileHover={{ x: 4, transition: { duration: 0.2 } }}
            data-cursor-hover
          >
            Request a custom quote
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="#b14aff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
