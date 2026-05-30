import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Junior's Auto Repair — Twin Falls, Idaho";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f172a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "#ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
            }}
          >
            🔧
          </div>
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Junior&apos;s Auto Repair
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#ef4444",
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          Twin Falls, Idaho
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Oil changes · Brakes · Transmission · Engine Repair · 4.8 ★ · 13 Years
        </div>
      </div>
    ),
    { ...size }
  );
}
