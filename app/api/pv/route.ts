import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { path, referrer } = body;

    if (!path) {
      return Response.json({ error: "path required" }, { status: 400 });
    }

    const ua = request.headers.get("user-agent") || undefined;

    const { error } = await supabaseAdmin.from("page_views").insert({
      path,
      referrer: referrer || null,
      ua,
    });

    if (error) throw error;

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Page view tracking error:", err);
    return Response.json({ ok: true }); // Don't fail page loads
  }
}
