import type { MetadataRoute } from "next";

const BASE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || null) ??
  "https://jrsautorepair.worker-bee.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/portal/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
