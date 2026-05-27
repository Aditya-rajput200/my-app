import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us | Kyron Productions",
  description:
    "Meet the team behind Kyron Productions — a cinematic production studio obsessed with storytelling, emotion and visual impact. Learn our story, values, and creative philosophy.",
  openGraph: {
    title: "About Kyron Productions | Our Story & Team",
    description:
      "We're not just a production house. We're storytellers, directors, designers and strategists who believe every brand deserves a cinematic identity.",
    images: [{ url: "/og-about.jpg", width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
