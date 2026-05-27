import { db } from "@/lib/db";
import HomeClient, { SiteData } from "./HomeClient";

async function getSiteData(): Promise<SiteData> {
  try {
    const [hero, team, services, testimonials, faqs, portfolio, statsRow, settingsRows] =
      await Promise.all([
        db.heroContent.findFirst(),
        db.teamMember.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
        db.service.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
        db.testimonial.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
        db.fAQ.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
        db.portfolioProject.findMany({ where: { published: true }, orderBy: [{ featured: "desc" }, { order: "asc" }] }),
        db.siteStats.findFirst(),
        db.siteSettings.findMany(),
      ]);

    const settings: Record<string, string> = {
      whatsappNumber: "919203626559",
      whatsappMessage: "Hi Kyron Productions, I'm interested in working with you.",
      email: "hello@kyronproductions.in",
      instagram: "@kyronproductions",
      youtube: "https://youtube.com/@kyronproductions",
      location: "Mumbai, India",
    };
    for (const row of settingsRows) settings[row.key] = row.value;

    return {
      hero: hero as unknown as Record<string, string> | null,
      team: team as unknown as Record<string, string>[],
      services: services as unknown as Record<string, string>[],
      testimonials: testimonials as unknown as Record<string, string>[],
      faqs: faqs as unknown as Record<string, string>[],
      portfolio: portfolio as unknown as Record<string, unknown>[],
      stats: statsRow as unknown as Record<string, string | number> | null,
      settings,
    };
  } catch {
    // DB not yet connected — return empty fallback so page still renders
    return {
      hero: null, team: [], services: [], testimonials: [],
      faqs: [], portfolio: [], stats: null,
      settings: { whatsappNumber: "919203626559", whatsappMessage: "Hi Kyron Productions, I'm interested in working with you." },
    };
  }
}

export default async function Home() {
  const data = await getSiteData();
  return <HomeClient data={data} />;
}
