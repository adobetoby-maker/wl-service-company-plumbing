import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { howtos } from "@/lib/howtos";
import { cities } from "@/lib/cities";

const BASE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || null) ??
  "https://jrsautorepair.worker-bee.app";

function parseArticleDate(dateStr: string): Date {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? new Date("2026-01-01") : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Static pages ──────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/how-to`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/founders`,
      lastModified: new Date("2026-05-01"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/portal`,
      lastModified: new Date("2026-05-01"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  // ── Blog articles ─────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: parseArticleDate(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // ── How-to guides ─────────────────────────────────────
  const howtoPages: MetadataRoute.Sitemap = howtos.map((guide) => ({
    url: `${BASE_URL}/how-to/${guide.slug}`,
    lastModified: new Date("2026-04-01"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ── City landing pages ────────────────────────────────
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE_URL}/${city.slug}`,
    lastModified: new Date("2026-05-03"),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticPages, ...cityPages, ...blogPages, ...howtoPages];
}
