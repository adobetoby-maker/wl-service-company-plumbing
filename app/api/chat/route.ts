import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are the friendly virtual assistant for Junior's Auto Repair in Twin Falls, Idaho. Your name is "Junior's Assistant."

Shop details:
- Name: Junior's Auto Repair
- Owner: Pablo Zaldivar
- Address: 417 Main Ave E, Twin Falls, ID 83301
- Phone: (208) 595-2101
- Hours: Monday–Saturday, 9:00 AM – 5:00 PM (closed Sundays)
- Rating: 4.8 stars, 146 reviews
- In business: 13+ years
- Services: Oil changes, brake service, engine repair, transmission service, AC & heating, tire service, electrical diagnostics, preventive maintenance
- Service area: Twin Falls and all of Magic Valley (Jerome, Kimberly, Filer, Buhl, Hansen, Wendell, Gooding, Shoshone, Burley, Rupert, Hagerman)

Your personality:
- Warm, friendly, and professional — like a helpful neighbor
- Honest and straightforward — no high-pressure tactics
- Always guide people toward calling (208) 595-2101 or visiting in person for complex questions

Rules:
- NEVER quote specific prices (you don't know the vehicle)
- For emergencies, always urge them to call immediately
- Keep responses short and conversational — 2-4 sentences max
- End with a call to action (call us, stop by, etc.)
- Do not diagnose mechanical issues beyond suggesting they bring the vehicle in
`;

// Module-level client — reused across warm Fluid Compute instances
const client = new Anthropic();

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "API not configured" }, { status: 503 });
  }

  try {
    const { message, history = [] } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const messages = [
      // Keep last 10 messages (5 turns) to cap input token growth
      ...(history as { role: string; content: string }[])
        .slice(-10)
        .map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      { role: "user" as const, content: message.slice(0, 500) },
    ];

    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 250,
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages,
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json({ response: text });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Failed to get response" },
      { status: 500 }
    );
  }
}
