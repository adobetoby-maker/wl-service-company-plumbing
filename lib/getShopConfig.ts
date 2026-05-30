import { shopInfo, type ShopInfo } from "./shopInfo";

// Server-only — reads the JSON override file if it exists, falls back to defaults
export async function getShopConfig(): Promise<ShopInfo & Record<string, string>> {
  try {
    // Dynamic import keeps 'fs' out of the client bundle
    const { promises: fs } = await import("fs");
    const path = await import("path");
    const configPath = path.join(process.cwd(), "data", "shop-config.json");
    const raw = await fs.readFile(configPath, "utf-8");
    return { ...shopInfo, ...JSON.parse(raw) };
  } catch {
    return { ...shopInfo } as ShopInfo & Record<string, string>;
  }
}
