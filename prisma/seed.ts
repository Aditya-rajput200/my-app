import { config } from "dotenv";
import path from "path";
config({ path: path.join(process.cwd(), ".env"), override: true });

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const db = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  console.log("🌱 Seeding Kyron Productions database...");

  // ─── Hero Content ───────────────────────────────────────────────────────────
  await db.heroContent.upsert({
    where: { id: "hero-main" },
    update: {},
    create: {
      id: "hero-main",
      headlineLine1: "We Don't Just Create Content.",
      headlineLine2: "We Create Digital Emotion.",
      headlineLine3: "",
      subheadline:
        "Kyron Productions is a cinematic content and digital production studio helping brands turn stories into unforgettable experiences.",
      ctaPrimary: "View Our Work",
      ctaSecondary: "Let's Create Together",
      founderName: "Aman Kumar",
      founderTitle: "Founder & Creative Director",
      founderImage: "/founder.jpeg",
      quoteText:
        "\"Every frame we craft is a conversation between your brand and the world.\"",
    },
  });

  // ─── Team Members ────────────────────────────────────────────────────────────
  const teamData = [
    {
      id: "team-1",
      name: "Aman Kumar",
      role: "Founder",
      bio: "Leads the vision and strategy for every cinematic campaign.",
      icon: "BrainCircuit",
      color: "#7b2fff",
      order: 0,
    },
    {
      id: "team-2",
      name: "Rashmeet Kaur",
      role: "Co-founder",
      bio: "Guides creative direction and brand experience with clarity.",
      icon: "Sparkles",
      color: "#b14aff",
      order: 1,
    },
    {
      id: "team-3",
      name: "Sumit Kumar",
      role: "Video Editor",
      bio: "Shapes narratives through timing, rhythm, and cinematic polish.",
      icon: "Film",
      color: "#c77dff",
      order: 2,
    },
    {
      id: "team-4",
      name: "Suyash Singh",
      role: "Social Media Manager (SMM)",
      bio: "Builds social momentum and audience engagement across platforms.",
      icon: "BarChart2",
      color: "#9d4edd",
      order: 3,
    },
    {
      id: "team-5",
      name: "Sonali Kukreja",
      role: "Content Creator",
      bio: "Crafts compelling scripts, captions, and visual storytelling.",
      icon: "PenLine",
      color: "#7b2fff",
      order: 4,
    },
  ];

  for (const member of teamData) {
    await db.teamMember.upsert({ where: { id: member.id }, update: member, create: member });
  }

  // ─── Services ────────────────────────────────────────────────────────────────
  const servicesData = [
    {
      id: "svc-1",
      title: "Cinematic Video Production",
      description:
        "Full-scale brand films and documentaries crafted with Hollywood-quality cinematography.",
      icon: "Film",
      color: "#7b2fff",
      order: 0,
    },
    {
      id: "svc-2",
      title: "Reels Production",
      description:
        "Viral short-form content engineered for maximum engagement across Instagram & YouTube.",
      icon: "Smartphone",
      color: "#9d4edd",
      order: 1,
    },
    {
      id: "svc-3",
      title: "Branding",
      description:
        "Complete visual identity systems that make your brand unmistakable and memorable.",
      icon: "Gem",
      color: "#b14aff",
      order: 2,
    },
    {
      id: "svc-4",
      title: "Social Media Marketing",
      description:
        "Data-driven content strategies that grow communities and convert followers to customers.",
      icon: "Megaphone",
      color: "#c77dff",
      order: 3,
    },
    {
      id: "svc-5",
      title: "Ad Shoots",
      description:
        "High-impact product and lifestyle photography for campaigns that stop the scroll.",
      icon: "Camera",
      color: "#7b2fff",
      order: 4,
    },
    {
      id: "svc-6",
      title: "Content Strategy",
      description:
        "Deep-funnel content architectures designed around your audience psychology.",
      icon: "Layers",
      color: "#9d4edd",
      order: 5,
    },
    {
      id: "svc-7",
      title: "Editing & Color Grading",
      description:
        "Cinematic color science and precision editing that elevates every frame.",
      icon: "Palette",
      color: "#b14aff",
      order: 6,
    },
    {
      id: "svc-8",
      title: "Creative Direction",
      description:
        "End-to-end creative vision for campaigns, launches, and brand campaigns.",
      icon: "Lightbulb",
      color: "#c77dff",
      order: 7,
    },
  ];

  for (const svc of servicesData) {
    await db.service.upsert({ where: { id: svc.id }, update: svc, create: svc });
  }

  // ─── Testimonials ─────────────────────────────────────────────────────────────
  const testimonialsData = [
    {
      id: "test-1",
      name: "Rohit Sharma",
      role: "Founder",
      company: "StyleCo",
      quote:
        "Kyron completely transformed how we show up online. Our last reel hit 5 million views in 48 hours. Nothing short of cinematic magic — they made our brand feel alive.",
      shortQuote: "5M views in 48 hours. They made our brand feel alive.",
      rating: 5,
      initials: "RS",
      result: "5M Views",
      resultLabel: "48 hrs",
      color: "#7b2fff",
      order: 0,
    },
    {
      id: "test-2",
      name: "Priya Khanna",
      role: "CMO",
      company: "TechNova",
      quote:
        "Working with Kyron is an experience. They don't just execute briefs — they elevate them. Our brand film made our investors tear up. That's the Kyron effect.",
      shortQuote: "They elevated our brief into something that moved investors.",
      rating: 5,
      initials: "PK",
      result: "Series A",
      resultLabel: "Raised",
      color: "#b14aff",
      order: 1,
    },
    {
      id: "test-3",
      name: "Arjun Mehta",
      role: "Director",
      company: "LuxeLiving",
      quote:
        "10x engagement within the first month. But beyond numbers, they gave our brand a soul. A visual identity that actually feels like us — cinematic and bold.",
      shortQuote: "10x engagement. They gave our brand a soul.",
      rating: 5,
      initials: "AM",
      result: "10X",
      resultLabel: "Engagement",
      color: "#9d4edd",
      order: 2,
    },
    {
      id: "test-4",
      name: "Aisha Patel",
      role: "Brand Lead",
      company: "FreshEats",
      quote:
        "I've worked with many agencies. Kyron is in a completely different league. Their cinematic detail is unmatched and the results speak for themselves every single time.",
      shortQuote: "Kyron is in a completely different league.",
      rating: 5,
      initials: "AP",
      result: "340%",
      resultLabel: "Growth",
      color: "#c77dff",
      order: 3,
    },
    {
      id: "test-5",
      name: "Kabir Singh",
      role: "Founder",
      company: "Velox D2C",
      quote:
        "The ad creatives Kyron built for us literally changed our business. 10X ROAS in the first two weeks. Our cost per acquisition dropped by 67%. Game-changing work.",
      shortQuote: "10X ROAS in two weeks. Game-changing work.",
      rating: 5,
      initials: "KS",
      result: "10X ROAS",
      resultLabel: "2 weeks",
      color: "#ff7edb",
      order: 4,
    },
  ];

  for (const t of testimonialsData) {
    await db.testimonial.upsert({ where: { id: t.id }, update: t, create: t });
  }

  // ─── FAQs ─────────────────────────────────────────────────────────────────────
  const faqData = [
    {
      id: "faq-1",
      question: "What services does Kyron Productions provide?",
      answer:
        "Kyron Productions offers a full suite of creative production services including cinematic video production, Instagram reels, YouTube content, brand identity design, social media marketing, ad shoots, content strategy, professional editing, and color grading. We handle everything from concept to final delivery.",
      order: 0,
    },
    {
      id: "faq-2",
      question: "Do you create reels and short-form video ads?",
      answer:
        "Absolutely. Reels and short-form content are our specialty. We craft scroll-stopping, high-retention reels optimized for Instagram, YouTube Shorts, and TikTok — engineered to maximize reach, engagement, and conversions for your brand.",
      order: 1,
    },
    {
      id: "faq-3",
      question: "Can you handle complete branding for our business?",
      answer:
        "Yes. We offer end-to-end brand identity services — from logo and visual identity design to brand films, photography guidelines, and complete marketing collateral. We build brands that look and feel premium across every touchpoint.",
      order: 2,
    },
    {
      id: "faq-4",
      question: "Do you work with both businesses and individual creators?",
      answer:
        "We work with both. Whether you're a D2C brand scaling to a national audience, a corporate company refreshing your image, or an individual creator building your personal brand — we tailor our approach to your goals, budget, and vision.",
      order: 3,
    },
    {
      id: "faq-5",
      question: "How long does a typical production project take?",
      answer:
        "Timelines vary by scope. A standard reel campaign takes 5–7 days from brief to delivery. A full brand film typically requires 2–4 weeks including pre-production. We're known for meeting deadlines without compromising on quality.",
      order: 4,
    },
    {
      id: "faq-6",
      question: "How do we get started with Kyron Productions?",
      answer:
        "Simple — reach out via WhatsApp or fill out our contact form. We'll schedule a 30-minute discovery call, understand your vision, and share a custom proposal within 24 hours. Most projects begin within 3–5 days of brief approval.",
      order: 5,
    },
  ];

  for (const faq of faqData) {
    await db.fAQ.upsert({ where: { id: faq.id }, update: faq, create: faq });
  }

  // ─── Portfolio Projects ───────────────────────────────────────────────────────
  const portfolioData = [
    {
      id: "proj-1",
      title: "Cinematic Brand Relaunch",
      filterKey: "Branding",
      tag: "Brand Film",
      client: "Luxe Fashion Co.",
      metric: "12M Views",
      metric2: "340% Engagement Lift",
      description:
        "Full-scale cinematic rebrand that redefined how the brand speaks — visually and emotionally.",
      services: ["Brand Film", "Color Grading", "Creative Direction", "Copywriting"],
      results: [
        "12M organic views in 30 days",
        "340% engagement increase",
        "4.2X follower growth",
      ],
      accent: "#7b2fff",
      size: "large",
      visual: "mesh",
      order: 0,
      featured: true,
    },
    {
      id: "proj-2",
      title: "Viral Product Launch Reel",
      filterKey: "Reels",
      tag: "Viral Reel",
      client: "NovaTech",
      metric: "5.2M Reach",
      metric2: "8.4% CTR",
      description:
        "A product launch reel that went viral organically within the first 24 hours.",
      services: ["Reel Production", "Motion Graphics", "Sound Design"],
      results: [
        "5.2M organic reach",
        "8.4% click-through rate",
        "Trending on Instagram Reels",
      ],
      accent: "#9d4edd",
      size: "medium",
      visual: "diagonal",
      order: 1,
      featured: false,
    },
    {
      id: "proj-3",
      title: "Wedding Campaign",
      filterKey: "Video Production",
      tag: "Cinematic",
      client: "Royal Events",
      metric: "8.7M Impressions",
      metric2: "92% Retention",
      description:
        "A cinematic wedding campaign that captured the emotion and grandeur of a royal celebration.",
      services: ["Cinematography", "Drone Shots", "Editing", "Color Grading"],
      results: [
        "8.7M impressions across platforms",
        "92% video retention rate",
        "Featured in WeddingWire",
      ],
      accent: "#b14aff",
      size: "tall",
      visual: "circles",
      order: 2,
      featured: false,
    },
    {
      id: "proj-4",
      title: "D2C Ad Campaign",
      filterKey: "Ads",
      tag: "Performance Ad",
      client: "Velox D2C",
      metric: "10X ROAS",
      metric2: "67% Lower CAC",
      description:
        "A full-funnel D2C ad campaign that achieved 10X ROAS within two weeks of launch.",
      services: ["Ad Production", "Copywriting", "A/B Testing", "Media Buying"],
      results: [
        "10X return on ad spend",
        "67% reduction in cost per acquisition",
        "Best performing campaign of 2024",
      ],
      accent: "#c77dff",
      size: "medium",
      visual: "dots",
      order: 3,
      featured: false,
    },
    {
      id: "proj-5",
      title: "Social Media Overhaul",
      filterKey: "Social Media",
      tag: "Social Strategy",
      client: "FreshEats",
      metric: "340% Growth",
      metric2: "50K New Followers",
      description:
        "Complete social media revamp — new content strategy, visual identity, and publishing calendar.",
      services: ["Content Strategy", "Visual Identity", "Reels", "Community Management"],
      results: [
        "340% follower growth in 90 days",
        "50K new organic followers",
        "Avg. 2.1M impressions/month",
      ],
      accent: "#7b2fff",
      size: "medium",
      visual: "waves",
      order: 4,
      featured: false,
    },
    {
      id: "proj-6",
      title: "SaaS Landing Page Film",
      filterKey: "Web Design",
      tag: "Web Film",
      client: "CloudStack",
      metric: "3.8X Conversions",
      metric2: "58s Avg. Session",
      description:
        "A full-motion landing page film that dramatically improved time-on-page and conversion rates.",
      services: ["Web Film", "Motion Design", "Scriptwriting", "Voiceover"],
      results: [
        "3.8X improvement in landing page conversions",
        "58-second average session duration",
        "Featured in SaaS startup newsletter",
      ],
      accent: "#b14aff",
      size: "large",
      visual: "grid",
      order: 5,
      featured: false,
    },
  ];

  for (const proj of portfolioData) {
    await db.portfolioProject.upsert({
      where: { id: proj.id },
      update: proj,
      create: proj,
    });
  }

  // ─── Site Settings ────────────────────────────────────────────────────────────
  const settingsData: Record<string, string> = {
    whatsappNumber: "919203626559",
    whatsappMessage: "Hi Kyron Productions, I'm interested in working with you.",
    email: "hello@kyronproductions.in",
    instagram: "@kyronproductions",
    youtube: "https://youtube.com/@kyronproductions",
    location: "Mumbai, India",
  };

  for (const [key, value] of Object.entries(settingsData)) {
    await db.siteSettings.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  // ─── Site Stats ───────────────────────────────────────────────────────────────
  await db.siteStats.upsert({
    where: { id: "stats-main" },
    update: {},
    create: {
      id: "stats-main",
      totalViews: 120,
      viewsSuffix: "M+",
      totalCampaigns: 250,
      campaignsSuffix: "+",
      totalBrands: 50,
      brandsSuffix: "+",
      engagementGrowth: 10,
      engagementSuffix: "X",
    },
  });

  // ─── SEO Meta ─────────────────────────────────────────────────────────────────
  await db.seoMeta.upsert({
    where: { id: "seo-main" },
    update: {},
    create: {
      id: "seo-main",
      siteTitle: "Kyron Productions | Cinematic Content & Digital Production Studio",
      description:
        "Kyron Productions is a premium cinematic content and digital production studio helping brands turn stories into unforgettable experiences.",
      keywords:
        "Creative Production Studio, Video Production Agency, Reels Production, Brand Films, Social Media Marketing, Mumbai",
      ogImage: "/og-image.jpg",
      canonical: "https://kyronproductions.in",
      gaId: "",
    },
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
