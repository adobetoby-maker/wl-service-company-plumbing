"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Phone, MapPin } from "lucide-react";
import { shopInfo } from "@/lib/shopInfo";

type Message = {
  role: "bot" | "user";
  text: string;
  actions?: Action[];
};

type Action = {
  label: string;
  icon: "phone" | "map";
  href: string;
};

// ── Intent classifier ─────────────────────────────────────
type Intent = keyof typeof RESPONSES;

const INTENTS: Record<Intent, string[]> = {
  greeting:    ["hi", "hello", "hey", "howdy", "good morning", "good afternoon", "sup", "what's up"],
  hours:       ["hours", "open", "close", "closing", "when", "time", "schedule", "today", "weekend", "saturday", "sunday", "monday", "what time"],
  location:    ["where", "address", "located", "location", "directions", "find you", "map", "come", "far", "drive", "downtown"],
  phone:       ["call", "phone", "number", "reach", "contact", "talk", "speak"],
  services:    ["service", "services", "what do you", "what can you", "fix", "repair", "work on", "handle", "specialize", "offer", "do you do"],
  oil:         ["oil", "oil change", "lube", "synthetic", "conventional", "quart"],
  brakes:      ["brake", "brakes", "stopping", "pads", "rotors", "squeaking", "squealing", "grinding", "brake light"],
  transmission:["transmission", "trans", "shifting", "gear", "gears", "automatic", "manual", "clutch"],
  ac:          ["ac", "air conditioning", "heat", "heating", "hvac", "cool", "cold", "warm", "hot air", "blowing"],
  engine:      ["engine", "check engine", "light", "misfire", "noise", "knocking", "stalling", "rough idle", "diagnosis", "diagnostic"],
  tires:       ["tire", "tires", "flat", "rotation", "balance", "wheel"],
  pricing:     ["cost", "price", "how much", "charge", "expensive", "affordable", "estimate", "quote", "rate", "fee", "cheap"],
  book:        ["book", "appointment", "schedule", "come in", "bring in", "drop off", "bring my car", "walk in", "walk-in"],
  emergency:   ["emergency", "broken down", "stranded", "won't start", "dead", "tow", "urgent", "help", "stuck", "breakdown", "side of road"],
  reviews:     ["review", "rating", "rated", "trust", "reliable", "honest", "reputation", "good", "best", "recommend"],
  payment:     ["cash", "credit", "card", "debit", "check", "payment", "pay", "accept", "financing"],
  wait:        ["how long", "wait", "turnaround", "ready", "done", "takes", "time to fix", "same day"],
  warranty:    ["warranty", "guarantee", "come back", "break again", "stand behind"],
  area:        ["jerome", "kimberly", "filer", "buhl", "hansen", "wendell", "gooding", "shoshone", "burley", "rupert", "hagerman", "magic valley", "area", "nearby"],
};

const RESPONSES: Record<string, { text: string; actions?: Action[] }> = {
  greeting: {
    text: `Hey there! Welcome to ${shopInfo.name}. 👋 How can I help you today? I can answer questions about our services, hours, location, or help get you connected with our team.`,
  },
  hours: {
    text: `We're open **Monday through Saturday, 9 AM – 5 PM**. We're closed on Sundays.\n\nNeed to stop by? Give us a call first and we'll be ready for you!`,
    actions: [{ label: "Call Us", icon: "phone", href: `tel:${shopInfo.phone.replace(/\D/g, "")}` }],
  },
  location: {
    text: `We're at **${shopInfo.address}** in downtown Twin Falls — easy to find, right in the heart of the city.\n\nWe serve all of Magic Valley, so don't hesitate to make the drive!`,
    actions: [
      { label: "Get Directions", icon: "map", href: shopInfo.googleMapsUrl },
      { label: "Call Us", icon: "phone", href: `tel:${shopInfo.phone.replace(/\D/g, "")}` },
    ],
  },
  phone: {
    text: `You can reach us directly at **${shopInfo.phone}**.\n\nWe're available Monday–Saturday, 9 AM – 5 PM. We'd love to help!`,
    actions: [{ label: "Call Now", icon: "phone", href: `tel:${shopInfo.phone.replace(/\D/g, "")}` }],
  },
  services: {
    text: `We handle a full range of auto repair:\n• Oil changes & fluids\n• Brake service & repair\n• Engine diagnostics & repair\n• Transmission service\n• AC & heating systems\n• Tire service\n• Electrical diagnostics\n\nNot sure if we cover your issue? Just call!`,
    actions: [{ label: "Call Us", icon: "phone", href: `tel:${shopInfo.phone.replace(/\D/g, "")}` }],
  },
  oil: {
    text: `Yes, oil changes are one of our most popular services! We use quality oil and filters and do a full inspection while we're at it.\n\nWalk-ins welcome — stop by anytime Mon–Sat 9–5!`,
    actions: [{ label: "Call Us", icon: "phone", href: `tel:${shopInfo.phone.replace(/\D/g, "")}` }],
  },
  brakes: {
    text: `Brake problems are serious — we take them seriously. We service everything: pads, rotors, calipers, and brake lines.\n\nIf your brakes are squealing or grinding, don't wait. Give us a call today!`,
    actions: [{ label: "Call Now", icon: "phone", href: `tel:${shopInfo.phone.replace(/\D/g, "")}` }],
  },
  transmission: {
    text: `Yes, we work on transmissions! Whether it's shifting rough, slipping, or leaking, we can diagnose it.\n\nBring it in and we'll tell you exactly what's going on before any work starts.`,
    actions: [{ label: "Call Us", icon: "phone", href: `tel:${shopInfo.phone.replace(/\D/g, "")}` }],
  },
  ac: {
    text: `Yes — we service AC and heating systems. Whether your AC is blowing hot air or your heater isn't working, we can diagnose and repair it.\n\nCall us to schedule a time to come in!`,
    actions: [{ label: "Call Us", icon: "phone", href: `tel:${shopInfo.phone.replace(/\D/g, "")}` }],
  },
  engine: {
    text: `We do full engine diagnostics. That check engine light could be anything from a loose gas cap to a sensor issue to something more serious.\n\nBring it in — we'll plug in our scanner and tell you exactly what's going on.`,
    actions: [{ label: "Call Us", icon: "phone", href: `tel:${shopInfo.phone.replace(/\D/g, "")}` }],
  },
  tires: {
    text: `We handle tire rotations and balancing to keep your tires wearing evenly and your vehicle handling safely. Swing by or give us a call!`,
    actions: [{ label: "Call Us", icon: "phone", href: `tel:${shopInfo.phone.replace(/\D/g, "")}` }],
  },
  pricing: {
    text: `Our pricing is honest and transparent — no surprise fees, no unnecessary upsells. Every job is different, so we can't quote exact prices without seeing the vehicle.\n\nWe always explain costs before starting work. Call us and describe the issue — we'll give you a ballpark!`,
    actions: [{ label: "Call Us", icon: "phone", href: `tel:${shopInfo.phone.replace(/\D/g, "")}` }],
  },
  book: {
    text: `We'd love to see your vehicle! The easiest way is to give us a call at **${shopInfo.phone}** to set a time.\n\nWalk-ins are welcome too — just come by Monday–Saturday, 9 AM – 5 PM!`,
    actions: [{ label: "Call to Book", icon: "phone", href: `tel:${shopInfo.phone.replace(/\D/g, "")}` }],
  },
  emergency: {
    text: `Oh no — sorry to hear that! Your safety comes first.\n\nCall us immediately at **${shopInfo.phone}** and we'll help figure out next steps. If you need a tow, we can connect you with local towing that brings vehicles straight to our shop.`,
    actions: [{ label: "Call Now — We Can Help", icon: "phone", href: `tel:${shopInfo.phone.replace(/\D/g, "")}` }],
  },
  reviews: {
    text: `We're proud of our **4.8-star rating** across ${shopInfo.reviewCount} reviews — earned over 13 years of honest work.\n\nPablo and his family treat every customer like a neighbor. That's just how we do it.`,
    actions: [{ label: "Call Us", icon: "phone", href: `tel:${shopInfo.phone.replace(/\D/g, "")}` }],
  },
  payment: {
    text: `We accept cash, credit cards, and debit cards. We never want payment to get in the way of you driving safely.\n\nHave questions? Give us a call!`,
    actions: [{ label: "Call Us", icon: "phone", href: `tel:${shopInfo.phone.replace(/\D/g, "")}` }],
  },
  wait: {
    text: `It depends on the repair! Oil changes and minor services are often same-day. Bigger jobs or parts orders may take a day or two.\n\nWe always call when your vehicle is ready and keep you in the loop. Call us for a better estimate on your specific situation!`,
    actions: [{ label: "Call Us", icon: "phone", href: `tel:${shopInfo.phone.replace(/\D/g, "")}` }],
  },
  warranty: {
    text: `We stand behind our work. If something isn't right after a repair, bring it back and we'll make it right — no hassle.\n\nWe're building long-term relationships, not just fixing cars once.`,
    actions: [{ label: "Call Us", icon: "phone", href: `tel:${shopInfo.phone.replace(/\D/g, "")}` }],
  },
  area: {
    text: `We serve all of Magic Valley! Customers come to us from Jerome, Kimberly, Filer, Buhl, and beyond.\n\nWe're centrally located in Twin Falls at ${shopInfo.address} — easy to reach from anywhere in the valley.`,
    actions: [
      { label: "Get Directions", icon: "map", href: shopInfo.googleMapsUrl },
      { label: "Call Us", icon: "phone", href: `tel:${shopInfo.phone.replace(/\D/g, "")}` },
    ],
  },
  fallback: {
    text: `Great question! For the most accurate answer, your best bet is to give Pablo a call directly at **${shopInfo.phone}**.\n\nOur team is happy to help with anything about your vehicle!`,
    actions: [{ label: "Call Us", icon: "phone", href: `tel:${shopInfo.phone.replace(/\D/g, "")}` }],
  },
};

function classifyIntent(input: string): Intent {
  const lower = input.toLowerCase();
  const scores: Partial<Record<Intent, number>> = {};

  for (const [intent, keywords] of Object.entries(INTENTS) as [Intent, string[]][]) {
    let score = 0;
    for (const kw of keywords) {
      if (lower.includes(kw)) score += kw.split(" ").length; // multi-word = higher weight
    }
    if (score > 0) scores[intent] = score;
  }

  if (Object.keys(scores).length === 0) return "fallback";

  return (Object.entries(scores) as [Intent, number][]).reduce(
    (best, [intent, score]) => (score > (scores[best] ?? 0) ? intent : best),
    "fallback" as Intent
  );
}

// ── Chat history for API mode ─────────────────────────────
type HistoryItem = { role: "user" | "assistant"; content: string };

async function getAIResponse(
  message: string,
  history: HistoryItem[]
): Promise<{ text: string }> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });
  if (!res.ok) throw new Error("API error");
  const data = await res.json();
  return { text: data.response };
}

// ── Render message text (simple bold + newline support) ───
function MessageText({ text }: { text: string }) {
  const parts = text.split(/\n/);
  return (
    <>
      {parts.map((line, i) => {
        const segments = line.split(/\*\*(.+?)\*\*/g);
        return (
          <span key={i}>
            {segments.map((seg, j) =>
              j % 2 === 1 ? <strong key={j}>{seg}</strong> : seg
            )}
            {i < parts.length - 1 && <br />}
          </span>
        );
      })}
    </>
  );
}

// ── Quick-reply chips shown after welcome ─────────────────
const QUICK_REPLIES = [
  "What are your hours?",
  "Where are you located?",
  "What do you fix?",
  "How much does an oil change cost?",
  "Do you take walk-ins?",
  "My check engine light is on",
];

// ── Main component ─────────────────────────────────────────
function makeWelcome(phone: string): Message {
  return {
    role: "bot",
    text: `Hi! I'm Junior's virtual assistant. 👋 I can answer questions about our services, hours, pricing, and more.\n\nWhat can I help you with today?`,
    actions: [{ label: phone, icon: "phone", href: `tel:${phone.replace(/\D/g, "")}` }],
  };
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [livePhone, setLivePhone] = useState(shopInfo.phone);
  const [messages, setMessages] = useState<Message[]>([makeWelcome(shopInfo.phone)]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [apiMode, setApiMode] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [unread, setUnread] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load live config (phone may have changed in admin settings)
    fetch("/api/settings")
      .then(r => r.json())
      .then(d => {
        if (d.phone && d.phone !== shopInfo.phone) {
          setLivePhone(d.phone);
          setMessages([makeWelcome(d.phone)]);
        }
      })
      .catch(() => {});

    // Probe whether the AI API is available
    fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: "__ping__" }) })
      .then(r => r.json())
      .then(d => { if (!d.error?.includes("API not configured")) setApiMode(true); })
      .catch(() => {});
  }, []);

  // Keep livePhone in sync across RESPONSES
  const phone = livePhone;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) {
      setUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  async function send(overrideText?: string) {
    const text = (overrideText ?? input).trim();
    if (!text) return;
    setInput("");
    setShowQuickReplies(false);

    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    const delay = 400 + Math.random() * 400;

    try {
      let botResponse: { text: string; actions?: Action[] };

      if (apiMode) {
        const newHistory: HistoryItem[] = [
          ...history,
          { role: "user", content: text },
        ];
        const result = await getAIResponse(text, history);
        botResponse = { text: result.text };
        setHistory([...newHistory, { role: "assistant", content: result.text }]);
      } else {
        await new Promise((r) => setTimeout(r, delay));
        const intent = classifyIntent(text);
        botResponse = RESPONSES[intent] ?? RESPONSES.fallback;
      }

      setTyping(false);
      setMessages((prev) => [...prev, { role: "bot", ...botResponse }]);
      if (!open) setUnread(true);
    } catch {
      await new Promise((r) => setTimeout(r, delay));
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: `Sorry, I had a hiccup! For the fastest help, call us at **${shopInfo.phone}**.`,
          actions: [{ label: "Call Now", icon: "phone", href: `tel:${shopInfo.phone.replace(/\D/g, "")}` }],
        },
      ]);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Chat panel */}
      <div
        className={`fixed bottom-24 right-4 z-50 w-[340px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-300 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{ maxHeight: "min(520px, calc(100vh - 120px))" }}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="bg-red-600 text-white px-4 py-3 flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
            <MessageCircle size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm leading-tight">Junior&apos;s Assistant</p>
            <p className="text-red-200 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
              {apiMode ? "AI-powered" : "Online"}
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-7 h-7 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close chat"
          >
            <X size={14} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] ${msg.role === "user" ? "" : ""}`}>
                <div
                  className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-red-600 text-white rounded-br-sm"
                      : "bg-slate-100 text-slate-800 rounded-bl-sm"
                  }`}
                >
                  <MessageText text={msg.text} />
                </div>
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {msg.actions.map((action, j) => (
                      <a
                        key={j}
                        href={action.href}
                        target={action.icon === "map" ? "_blank" : undefined}
                        rel={action.icon === "map" ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1.5 bg-white border border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold px-2.5 py-1.5 rounded-full transition-colors"
                      >
                        {action.icon === "phone" ? <Phone size={11} /> : <MapPin size={11} />}
                        {action.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Quick-reply chips */}
          {showQuickReplies && !typing && (
            <div className="flex flex-wrap gap-1.5 pb-1">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-xs bg-slate-100 hover:bg-red-50 hover:border-red-200 border border-slate-200 text-slate-600 hover:text-red-700 font-medium px-3 py-1.5 rounded-full transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {typing && (
            <div className="flex justify-start">
              <div className="bg-slate-100 px-3 py-2.5 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-3 pb-3 pt-2 border-t border-slate-100 shrink-0">
          <div className="flex gap-2 items-center">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask a question…"
              className="flex-1 text-sm bg-slate-100 rounded-full px-4 py-2.5 outline-none focus:ring-2 focus:ring-red-400 focus:bg-white transition-all placeholder:text-slate-400"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim()}
              className="w-9 h-9 bg-red-600 hover:bg-red-700 disabled:bg-slate-300 text-white rounded-full flex items-center justify-center transition-colors shrink-0"
              aria-label="Send"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-4 z-50 w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <X size={22} />
        ) : (
          <>
            <MessageCircle size={24} />
            {unread && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
            )}
          </>
        )}
      </button>
    </>
  );
}
