"use client";
import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getPostBySlug, getPosts, BlogPost } from "@/lib/blogStorage";

const categoryColors: Record<string, string> = {
  Insights: "#7b2fff",
  Strategy: "#b14aff",
  "Behind the Scenes": "#9d4edd",
  "Industry News": "#ffd60a",
  "Case Studies": "#ff2df7",
  "Tips & Tricks": "#c77dff",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function parseInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*"))
      return <em key={i}>{part.slice(1, -1)}</em>;
    if (part.startsWith("`") && part.endsWith("`"))
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded text-xs font-mono"
          style={{ background: "rgba(123,47,255,0.2)", color: "#c77dff" }}
        >
          {part.slice(1, -1)}
        </code>
      );
    return part;
  });
}

function BlogContent({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/).filter(Boolean);

  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        const lines = block.split("\n");

        if (block.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="text-2xl md:text-3xl font-black text-white mt-10 mb-2"
              style={{ borderLeft: "3px solid #7b2fff", paddingLeft: "1rem" }}
            >
              {parseInline(block.slice(3))}
            </h2>
          );
        }

        if (block.startsWith("### ")) {
          return (
            <h3 key={i} className="text-lg md:text-xl font-bold text-white/90 mt-7 mb-1">
              {parseInline(block.slice(4))}
            </h3>
          );
        }

        if (block === "---") {
          return (
            <hr
              key={i}
              className="my-8"
              style={{ borderColor: "rgba(123,47,255,0.3)" }}
            />
          );
        }

        if (block.startsWith("```")) {
          const code = block.replace(/^```\w*\n?/, "").replace(/```$/, "");
          return (
            <pre
              key={i}
              className="rounded-xl p-5 overflow-x-auto text-sm font-mono text-white/70 leading-relaxed"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(123,47,255,0.2)",
              }}
            >
              <code>{code}</code>
            </pre>
          );
        }

        if (block.startsWith("> ")) {
          return (
            <blockquote
              key={i}
              className="pl-5 py-1 italic text-white/60 text-lg"
              style={{ borderLeft: "3px solid #7b2fff" }}
            >
              {parseInline(block.slice(2))}
            </blockquote>
          );
        }

        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="space-y-2 pl-2">
              {lines.map((l, j) => (
                <li key={j} className="flex gap-3 text-white/70 leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#7b2fff" }} />
                  <span>{parseInline(l.slice(2))}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (lines.every((l) => /^\d+\. /.test(l))) {
          return (
            <ol key={i} className="space-y-2 pl-2">
              {lines.map((l, j) => (
                <li key={j} className="flex gap-3 text-white/70 leading-relaxed">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "rgba(123,47,255,0.2)", color: "#c77dff" }}
                  >
                    {j + 1}
                  </span>
                  <span className="mt-0.5">{parseInline(l.replace(/^\d+\. /, ""))}</span>
                </li>
              ))}
            </ol>
          );
        }

        return (
          <p key={i} className="text-white/65 leading-[1.85] text-base md:text-lg">
            {parseInline(block)}
          </p>
        );
      })}
    </div>
  );
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const found = getPostBySlug(slug);
    if (!found || !found.published) {
      setNotFound(true);
      return;
    }
    setPost(found);
    const others = getPosts()
      .filter((p) => p.published && p.id !== found.id && p.category === found.category)
      .slice(0, 3);
    setRelated(others);
  }, [slug]);

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "#0a0015" }}>
        <Navbar />
        <div className="text-center mt-20">
          <p className="text-white/30 text-xl mb-4">Post not found.</p>
          <Link href="/blog" className="btn-primary inline-flex">
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0015" }}>
        <div
          className="w-10 h-10 rounded-full border-2 animate-spin"
          style={{ borderColor: "#7b2fff", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  const accentColor = categoryColors[post.category] ?? "#7b2fff";
  const tags = post.tags ? post.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

  return (
    <div className="min-h-screen" style={{ background: "#0a0015" }}>
      <Navbar />

      {/* Article header */}
      <section className="relative pt-36 pb-12 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] opacity-15"
          style={{ background: `radial-gradient(ellipse, ${accentColor}, transparent)` }}
        />
        <div className="container relative max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8 text-sm text-white/40">
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span style={{ color: accentColor }}>{post.category}</span>
            </div>

            {/* Category + read time */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full"
                style={{
                  background: `${accentColor}20`,
                  color: accentColor,
                  border: `1px solid ${accentColor}40`,
                }}
              >
                {post.category}
              </span>
              <span className="text-white/30 text-sm flex items-center gap-1">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                {post.readTime} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {/* Author + date */}
            <div className="flex items-center gap-4 pb-8" style={{ borderBottom: "1px solid rgba(123,47,255,0.15)" }}>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #7b2fff, #b14aff)" }}
              >
                K
              </div>
              <div>
                <p className="text-white/80 font-semibold text-sm">{post.author}</p>
                <p className="text-white/40 text-xs">{formatDate(post.publishedAt)}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article content */}
      <article className="container max-w-3xl mx-auto py-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <BlogContent content={post.content} />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12 pt-8" style={{ borderTop: "1px solid rgba(123,47,255,0.15)" }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-full text-white/40"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(123,47,255,0.2)",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="container max-w-3xl mx-auto pb-16 px-4">
          <h3
            className="text-lg font-black text-white mb-6 pt-8"
            style={{ borderTop: "1px solid rgba(123,47,255,0.15)" }}
          >
            More in <span style={{ color: accentColor }}>{post.category}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {related.slice(0, 2).map((rel) => (
              <Link
                key={rel.id}
                href={`/blog/${rel.slug}`}
                className="group p-5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(123,47,255,0.2)",
                }}
              >
                <span
                  className="text-[10px] font-bold tracking-[0.12em] uppercase"
                  style={{ color: categoryColors[rel.category] ?? "#7b2fff" }}
                >
                  {rel.category}
                </span>
                <h4 className="font-bold text-white text-sm mt-2 mb-1 group-hover:text-[#c77dff] transition-colors leading-snug">
                  {rel.title}
                </h4>
                <p className="text-white/40 text-xs">{rel.readTime} min read</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back CTA */}
      <section className="container max-w-3xl mx-auto pb-20 px-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <path d="M12 7H2M7 2L2 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Blog
        </Link>
      </section>

      <Footer />
    </div>
  );
}
