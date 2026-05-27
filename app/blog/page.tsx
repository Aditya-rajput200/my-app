import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog | Kyron Productions",
  description:
    "Thoughts, insights, and stories from Kyron Productions — on cinematic storytelling, video production, brand strategy, and the art of visual content.",
  openGraph: {
    title: "Blog | Kyron Productions",
    description:
      "Stories from the studio — on craft, creativity, and the art of making brands unforgettable.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
