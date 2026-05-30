import type { Metadata } from "next";
import { Geist } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import ChatBot from "@/components/ChatBot";
import PageTracker from "@/components/PageTracker";
import Script from "next/script";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || null) ?? "https://jrsautorepair.worker-bee.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Junior's Auto Repair | Twin Falls, Idaho",
  description: "Trusted auto repair in downtown Twin Falls, ID. Oil changes, brakes, transmission, engine repair & more. 4.8 stars, 13 years serving the Magic Valley.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Junior's Auto Repair | Twin Falls, Idaho",
    description: "Trusted auto repair in downtown Twin Falls, ID. Oil changes, brakes, transmission, engine repair & more. 4.8 stars, 13 years serving the Magic Valley.",
    url: BASE_URL,
    siteName: "Junior's Auto Repair",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Junior's Auto Repair | Twin Falls, Idaho",
    description: "Trusted auto repair in downtown Twin Falls, ID. Oil changes, brakes, transmission, engine repair & more.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "Junior's Auto Repair",
  description: "Trusted auto repair shop in downtown Twin Falls, Idaho. Oil changes, brakes, transmission, engine repair & more.",
  url: BASE_URL,
  telephone: "+1-208-555-0100",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Downtown",
    addressLocality: "Twin Falls",
    addressRegion: "ID",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 42.5630,
    longitude: -114.4609,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "200",
  },
  image: `${BASE_URL}/opengraph-image`,
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <PageTracker />
        <SmoothScroll>{children}</SmoothScroll>
        <ChatBot />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
