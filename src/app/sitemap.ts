import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const pages = [
  { path: "", priority: 1, frequency: "weekly" as const },
  { path: "/faculty", priority: 0.8, frequency: "monthly" as const },
  { path: "/results", priority: 0.9, frequency: "monthly" as const },
  { path: "/admissions", priority: 0.9, frequency: "weekly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.flatMap(({ path, priority, frequency }) => {
    const englishUrl = `${siteUrl}${path || "/"}`;
    const urduUrl = `${siteUrl}/ur${path}`;
    const alternates = { languages: { en: englishUrl, ur: urduUrl } };
    return [
      { url: englishUrl, lastModified, changeFrequency: frequency, priority, alternates },
      { url: urduUrl, lastModified, changeFrequency: frequency, priority: priority - 0.1, alternates },
    ];
  });
}
