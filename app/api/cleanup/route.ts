import { verifyAdminSession, unauthorizedResponse } from "@/lib/adminAuth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (!verifyAdminSession(req)) return unauthorizedResponse()
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not set" },
      { status: 503 }
    );
  }

  try {
    const { text, context } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "text is required" }, { status: 400 });
    }

    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const client = new Anthropic({ apiKey });

    const systemPrompt = `You are a professional copywriter for a local auto repair shop called Junior's Auto Repair in Twin Falls, Idaho.
The shop is friendly, trustworthy, and family-owned. Pablo Zaldivar is the owner.

When given text, you:
1. Fix all spelling errors
2. Fix grammar and punctuation
3. Improve clarity and flow
4. Keep the same meaning and facts — don't change addresses, phone numbers, hours, or service lists
5. Match the warm, professional, approachable tone of a trusted local business
6. Return ONLY the cleaned text — no explanation, no quotation marks around it

${context ? `Context about this field: ${context}` : ""}`;

    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: `Please clean up and improve this text:\n\n${text}`,
        },
      ],
    });

    const cleaned =
      response.content[0].type === "text" ? response.content[0].text : text;

    return NextResponse.json({ cleaned });
  } catch (err) {
    console.error("Cleanup API error:", err);
    return NextResponse.json(
      { error: "Failed to clean text" },
      { status: 500 }
    );
  }
}
