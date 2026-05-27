import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kyronproductions.in"),
  title: {
    default: "Kyron Productions | Cinematic Content & Digital Production Studio",
    template: "%s | Kyron Productions",
  },
  description:
    "Kyron Productions is a premium cinematic content and digital production studio. We create reels, ads, brand films, and social media content that turns stories into unforgettable experiences.",
  keywords: [
    "Creative Production Studio",
    "Video Production Agency",
    "Cinematic Content Studio",
    "Social Media Production",
    "Reels Production Agency",
    "Creative Marketing Studio",
    "Branding Production Agency",
    "Content Creation",
    "Brand Films",
    "Ad Production",
  ],
  authors: [{ name: "Kyron Productions" }],
  creator: "Kyron Productions",
  publisher: "Kyron Productions",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kyronproductions.in",
    siteName: "Kyron Productions",
    title: "Kyron Productions | Cinematic Content & Digital Production Studio",
    description:
      "We don't just create content. We create digital emotion. Premium cinematic production for brands.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kyron Productions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kyron Productions | Cinematic Content Studio",
    description: "We don't just create content. We create digital emotion.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Kyron Productions",
              description:
                "Cinematic content and digital production studio helping brands turn stories into unforgettable experiences.",
              url: "https://kyronproductions.in",
              logo: "https://kyronproductions.in/logo.png",
              sameAs: [
                "https://www.instagram.com/kyronproductions",
                "https://www.youtube.com/@kyronproductions",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: ["English", "Hindi"],
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
