import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Junior's Auto Repair",
    short_name: "Junior's Auto",
    description:
      "Trusted auto repair in downtown Twin Falls, Idaho. Oil changes, brakes, transmission, engine repair & more.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#ef4444",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
