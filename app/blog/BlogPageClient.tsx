"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getPosts, BlogPost } from "@/lib/blogStorage";

const categoryColors: Record<string, string> = {
  Insights: "#7b2fff",
  Strategy: "#b14aff",
  "Behind the Scenes": "#9d4edd",
  "Industry News": "#ffd60a",
  "Case Studies": "#ff2df7",
  "Tips & Tricks": "#c77dff",
};

const categoryGradients: Record<string, string> = {
  Insights: "linear-gradient(135deg, #1e0035 0%, #7b2fff 100%)",
  Strategy: "linear-gradient(135deg, #1a0030 0%, #b14aff 100%)",
  "Behind the Scenes": "linear-gradient(135deg, #0a0015 0%, #9d4edd 100%)",
  "Industry News": "linear-gradient(135deg, #1a1000 0%, #ffd60a40 100%)",
  "Case Studies": "linear-gradient(135deg, #200030 0%, #ff2df740 100%)",
  "Tips & Tricks": "linear-gradient(135deg, #150025 0%, #c77dff 100%)",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const accentColor = categoryColors[post.category] ?? "#7b2fff";
  const gradient =
    categoryGradients[post.category] ??
    "linear-gradient(135deg, #1e0035, #7b2fff)";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.23, 1, 0.32, 1] }}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div
          className="h-full rounded-2xl overflow-hidden transition-all duration-500 group-hover:-translate-y-1"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(123,47,255,0.2)",
            boxShadow: "0 0 0 0 rgba(123,47,255,0)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px rgba(123,47,255,0.25)`;
            (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}50`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 rgba(123,47,255,0)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(123,47,255,0.2)";
          }}
        >
          {/* Cover */}
          <div
            className="relative h-48 overflow-hidden"
            style={{ background: gradient }}
          >
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-4 left-4">
              <span
                className="text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full"
                style={{
                  background: `${accentColor}25`,
                  color: accentColor,
                  border: `1px solid ${accentColor}40`,
                  backdropFilter: "blur(8px)",
                }}
              >
                {post.category}
              </span>
            </div>
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-white/60 text-xs">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {post.readTime} min read
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="font-black text-white text-lg leading-snug mb-3 group-hover:text-[#c77dff] transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed line-clamp-3 mb-5">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                  style={{ background: `linear-gradient(135deg, #7b2fff, #b14aff)` }}
                >
                  K
                </div>
                <div>
                  <p className="text-white/70 text-xs font-medium">{post.author}</p>
                  <p className="text-white/30 text-[10px]">{formatDate(post.publishedAt)}</p>
                </div>
              </div>
              <span
                className="text-xs font-semibold flex items-center gap-1 transition-all duration-300 group-hover:gap-2"
                style={{ color: accentColor }}
              >
                Read
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function FeaturedPost({ post }: { post: BlogPost }) {
  const accentColor = categoryColors[post.category] ?? "#7b2fff";
  const gradient =
    categoryGradients[post.category] ??
    "linear-gradient(135deg, #1e0035, #7b2fff)";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="mb-10"
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <div
          className="relative rounded-3xl overflow-hidden transition-all duration-500"
          style={{
            background: gradient,
            border: "1px solid rgba(123,47,255,0.3)",
          }}
        >
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

          <div className="relative p-8 md:p-12 max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full"
                style={{
                  background: `${accentColor}25`,
                  color: accentColor,
                  border: `1px solid ${accentColor}40`,
                }}
              >
                Featured · {post.category}
              </span>
              <span className="text-white/30 text-xs">{post.readTime} min read</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4 group-hover:text-[#c77dff] transition-colors duration-300">
              {post.title}
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-6 max-w-lg">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white"
                  style={{ background: "linear-gradient(135deg, #7b2fff, #b14aff)" }}
                >
                  K
                </div>
                <div>
                  <p className="text-white/80 text-sm font-medium">{post.author}</p>
                  <p className="text-white/40 text-xs">{formatDate(post.publishedAt)}</p>
                </div>
              </div>
              <span
                className="ml-4 text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
                style={{ color: accentColor }}
              >
                Read Article
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogPageClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const all = getPosts().filter((p) => p.published);
    setPosts(all);
    setLoaded(true);
  }, []);

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen" style={{ background: "#0a0015" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[120px] opacity-20"
            style={{ background: "radial-gradient(ellipse, #7b2fff, transparent)" }}
          />
        </div>
        <div className="container relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-chip mb-6 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7b2fff] animate-pulse" />
              Journal & Insights
            </span>
            <h1 className="display-heading text-5xl md:text-7xl font-black mb-5">
              Thoughts &amp; <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
              Stories from the studio — on craft, creativity, and the art of making brands unforgettable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category filters */}
      <section className="sticky top-[72px] z-40 py-4" style={{ background: "rgba(10,0,21,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(123,47,255,0.1)" }}>
        <div className="container">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  background: activeCategory === cat ? "rgba(123,47,255,0.25)" : "rgba(255,255,255,0.04)",
                  color: activeCategory === cat ? "#c77dff" : "rgba(255,255,255,0.4)",
                  border: `1px solid ${activeCategory === cat ? "rgba(123,47,255,0.5)" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="container py-16">
        {!loaded ? (
          <div className="flex items-center justify-center py-24">
            <div
              className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: "#7b2fff", borderTopColor: "transparent" }}
            />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-white/30 text-lg">No posts in this category yet.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {featured && <FeaturedPost post={featured} />}

              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post, i) => (
                    <BlogCard key={post.id} post={post} index={i} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      {/* CTA */}
      <section className="container pb-20">
        <div
          className="rounded-3xl p-10 text-center"
          style={{
            background: "rgba(123,47,255,0.06)",
            border: "1px solid rgba(123,47,255,0.2)",
          }}
        >
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
            Want to Work With Us?
          </h2>
          <p className="text-white/50 mb-6 max-w-md mx-auto">
            Let&apos;s turn your brand story into cinematic content that moves people.
          </p>
          <Link href="/#contact" className="btn-primary inline-flex">
            Start a Project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
