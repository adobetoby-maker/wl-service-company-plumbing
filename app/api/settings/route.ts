import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { shopInfo } from "@/lib/shopInfo";

const CONFIG_PATH = path.join(process.cwd(), "data", "shop-config.json");

async function readConfig() {
  try {
    const raw = await fs.readFile(CONFIG_PATH, "utf-8");
    return { ...shopInfo, ...JSON.parse(raw) };
  } catch {
    return { ...shopInfo };
  }
}

// GET /api/settings — return merged config
export async function GET() {
  const config = await readConfig();
  return NextResponse.json(config);
}

// POST /api/settings — save overrides to disk
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Ensure data dir exists
    await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });
    await fs.writeFile(CONFIG_PATH, JSON.stringify(body, null, 2), "utf-8");

    // Revalidate public-facing pages so they reflect the changes
    try {
      const { revalidatePath } = await import("next/cache");
      revalidatePath("/");
      revalidatePath("/admin/settings");
    } catch {}

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Settings save error:", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
