export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  published: boolean;
  readTime: number;
}

const STORAGE_KEY = "kyron_blog_posts";

const seed: BlogPost[] = [
  {
    id: "seed-1",
    title: "The Art of Cinematic Storytelling",
    slug: "art-of-cinematic-storytelling",
    excerpt:
      "How we craft emotional narratives that resonate with audiences across every frame.",
    content: `## The Power of Visual Narrative

Every frame tells a story. At Kyron Productions, we believe that cinematic storytelling is the most powerful form of communication available to brands today.

## Emotion First, Then Logic

The most memorable campaigns don't lead with features — they lead with feelings. Before we touch a camera, we ask: what do we want people to *feel*?

## The Three Pillars of Cinematic Content

**1. Light as Language**
Lighting isn't just technical — it's emotional. Warm golden tones speak of warmth and nostalgia. Cool blues convey calm and professionalism.

**2. Movement with Meaning**
Every camera move must serve the story. A slow push-in builds tension. A wide-angle reveal creates scope and grandeur.

**3. Sound Design**
The sound underneath the frame is often more powerful than the image. We treat audio as a first-class citizen in every production.

## Our Process

We begin every project with a discovery session where we listen more than we speak. Understanding your brand's soul before we shoot a single frame is what separates great content from forgettable content.`,
    category: "Insights",
    tags: "filmmaking, storytelling, cinematography",
    coverImage: "",
    author: "Kyron Productions",
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    published: true,
    readTime: 4,
  },
  {
    id: "seed-2",
    title: "Why Your Brand Needs Video in 2025",
    slug: "why-your-brand-needs-video-2025",
    excerpt:
      "Video content drives 1200% more shares than static assets. Here's how to use it right.",
    content: `## The Video-First Reality

In 2025, video is no longer optional for brands that want to compete. The numbers speak clearly: video content generates 1200% more shares than text and images combined.

## What Makes Video Content Convert

### Authenticity Over Polish

Audiences have become extraordinarily good at detecting inauthenticity. The highest-converting content often feels real — because it *is* real.

### Short-Form Dominance

With attention spans shrinking, the first 3 seconds of any video determine whether it gets watched. We obsess over those first 3 seconds.

### Platform-Native Content

A video that works on YouTube won't work on Instagram Reels. Each platform has its own grammar, and we speak them all fluently.

## The ROI of Professional Video Production

**Brand Awareness:** Professional video lifts brand recall by 3x compared to static imagery.

**Conversion Rate:** Product videos increase purchase intent by 64% on e-commerce platforms.

**SEO Impact:** Pages with video are 53x more likely to rank on Google's first page.

## Getting Started

The barrier to video production has never been lower. But the bar for quality has never been higher. The brands winning are those who invest in professional-grade content that stops the scroll.`,
    category: "Strategy",
    tags: "video marketing, brand strategy, social media",
    coverImage: "",
    author: "Kyron Productions",
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    published: true,
    readTime: 5,
  },
  {
    id: "seed-3",
    title: "Behind the Lens: Our Production Process",
    slug: "behind-the-lens-our-production-process",
    excerpt:
      "A transparent look at how we take a brief from concept to final delivery.",
    content: `## From Brief to Screen: Our 5-Stage Process

Great video production doesn't happen by accident. It happens through a disciplined process that we've refined across hundreds of productions.

## Stage 1: Discovery & Strategy

Before anything else, we listen. We conduct deep-dive discovery sessions to understand your brand, your audience, and your goals. This stage defines everything that follows.

## Stage 2: Creative Development

Our creative team develops concepts that align your brand identity with your campaign goals. We present multiple directions and collaborate with you to choose the right path.

## Stage 3: Pre-Production

This is where great productions are made or broken. Detailed location scouts, casting sessions, equipment planning, shot lists, and storyboards are all completed before a single camera rolls.

**Pre-production checklist:**
- Location scouting and permits
- Talent casting and coordination
- Equipment and crew booking
- Shot list and storyboard approval
- Lighting and color grade reference

## Stage 4: Production

This is the part everyone sees — but it's the smallest part of our work. With the pre-production done right, shoot days are efficient, purposeful, and often run ahead of schedule.

## Stage 5: Post-Production

Editing, color grading, sound design, motion graphics, and final delivery. We work in collaboration with your team through revision cycles to ensure the final product exceeds expectations.`,
    category: "Behind the Scenes",
    tags: "production process, behind the scenes, filmmaking",
    coverImage: "",
    author: "Kyron Productions",
    publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    published: true,
    readTime: 6,
  },
];

export function getPosts(): BlogPost[] {
  if (typeof window === "undefined") return seed;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === null) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }
  try {
    return JSON.parse(stored) as BlogPost[];
  } catch {
    return seed;
  }
}

export function savePosts(posts: BlogPost[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function createPost(
  data: Omit<BlogPost, "id" | "publishedAt" | "updatedAt">
): BlogPost {
  const post: BlogPost = {
    ...data,
    id: Date.now().toString(),
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  savePosts([...getPosts(), post]);
  return post;
}

export function updatePost(
  id: string,
  data: Partial<Omit<BlogPost, "id" | "publishedAt">>
): void {
  savePosts(
    getPosts().map((p) =>
      p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
    )
  );
}

export function deletePost(id: string): void {
  savePosts(getPosts().filter((p) => p.id !== id));
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
