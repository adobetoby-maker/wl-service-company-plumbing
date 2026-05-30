import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, rating } = body;

    if (!message) {
      return Response.json({ error: "message required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("feedback").insert({
      name: name || null,
      email: email || null,
      message,
      rating: rating ? parseInt(rating, 10) : null,
    });

    if (error) throw error;

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Feedback submission error:", err);
    return Response.json({ error: "Failed to submit feedback" }, { status: 500 });
  }
}
