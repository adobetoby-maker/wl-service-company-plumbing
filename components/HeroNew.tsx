"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Star, Phone, MapPin, Clock, ChevronDown, Award } from "lucide-react";

function useShopStatus() {
  const [status, setStatus] = useState({ isOpen: false, label: "Checking…", detail: "" });

  useEffect(() => {
    function check() {
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Boise" }));
      const day = now.getDay(); // 0 Sun … 6 Sat
      const mins = now.getHours() * 60 + now.getMinutes();
      const open = 9 * 60;   // 9:00 AM
      const close = 17 * 60; // 5:00 PM
      const isOpen = day >= 1 && day <= 6 && mins >= open && mins < close;

      let detail = "";
      if (isOpen) {
        const remaining = close - mins;
        detail = remaining > 60
          ? `Closes at 5 PM`
          : `Closing in ${remaining} min`;
      } else {
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        if (day === 0 || (day === 6 && mins >= close)) detail = "Opens Mon · 9 AM";
        else if (mins < open) detail = "Opens today · 9 AM";
        else detail = `Opens ${dayNames[day === 5 ? 1 : day + 1]} · 9 AM`;
      }

      setStatus({ isOpen, label: isOpen ? "Open Now" : "Closed", detail });
    }
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  return status;
}

function CarSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 900 380" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Body */}
      <path d="M120 260 C120 260 180 200 300 185 L420 165 C500 155 580 160 650 175 L780 210 C820 220 840 240 840 260 L840 300 C840 310 830 320 820 320 L140 320 C130 320 120 310 120 300 Z" fill="url(#bodyGrad)" />
      {/* Roof */}
      <path d="M280 185 C300 150 360 120 460 112 C560 104 640 118 690 145 L720 175 L280 185 Z" fill="url(#roofGrad)" />
      {/* Windshield */}
      <path d="M300 183 C320 148 370 122 455 114 L455 182 Z" fill="#1e293b" opacity="0.7"/>
      {/* Rear window */}
      <path d="M540 113 C610 118 660 138 692 165 L692 182 L540 182 Z" fill="#1e293b" opacity="0.7"/>
      {/* Front wheel */}
      <circle cx="250" cy="320" r="55" fill="#0f172a" />
      <circle cx="250" cy="320" r="38" fill="#1e293b" />
      <circle cx="250" cy="320" r="22" fill="#334155" />
      <circle cx="250" cy="320" r="8" fill="#ef4444" />
      {/* Rear wheel */}
      <circle cx="680" cy="320" r="55" fill="#0f172a" />
      <circle cx="680" cy="320" r="38" fill="#1e293b" />
      <circle cx="680" cy="320" r="22" fill="#334155" />
      <circle cx="680" cy="320" r="8" fill="#ef4444" />
      {/* Headlight */}
      <ellipse cx="148" cy="255" rx="22" ry="14" fill="#fbbf24" opacity="0.9" />
      <ellipse cx="148" cy="255" rx="16" ry="9" fill="#fef3c7" />
      {/* Tail light */}
      <ellipse cx="832" cy="255" rx="18" ry="12" fill="#ef4444" opacity="0.8" />
      {/* Door lines */}
      <path d="M390 185 L380 315" stroke="#475569" strokeWidth="2" opacity="0.4"/>
      <path d="M550 183 L555 315" stroke="#475569" strokeWidth="2" opacity="0.4"/>
      {/* Grill */}
      <path d="M118 240 L145 230 L145 265 L118 272 Z" fill="#1e293b"/>
      <path d="M122 238 L143 232 L143 264 L122 270 Z" fill="#334155" opacity="0.6"/>
      {/* Ground shadow */}
      <ellipse cx="460" cy="375" rx="340" ry="12" fill="black" opacity="0.3"/>
      <defs>
        <linearGradient id="bodyGrad" x1="120" y1="200" x2="840" y2="320" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e3a5f"/>
          <stop offset="50%" stopColor="#1e40af"/>
          <stop offset="100%" stopColor="#1e3a5f"/>
        </linearGradient>
        <linearGradient id="roofGrad" x1="280" y1="110" x2="720" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e3a8a"/>
          <stop offset="100%" stopColor="#1e3a5f"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function HeroNew() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -120]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const stripOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const status = useShopStatus();

  useEffect(() => {
    function handleMouse(e: MouseEvent) {
      const w = window.innerWidth, h = window.innerHeight;
      setMouse({ x: (e.clientX / w - 0.5) * 2, y: (e.clientY / h - 0.5) * 2 });
    }
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-red-950" />
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-red-600/10 blur-3xl"
          animate={{ x: mouse.x * 20, y: mouse.y * 20 }}
          transition={{ type: "spring", stiffness: 40, damping: 20 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl"
          animate={{ x: mouse.x * -15, y: mouse.y * -15 }}
          transition={{ type: "spring", stiffness: 30, damping: 20 }}
        />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
      </div>

      {/* Live Trust Strip */}
      <motion.div
        style={{ opacity: stripOpacity, y: y1 }}
        className="absolute bottom-20 left-0 right-0 z-10 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3.5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {/* Live open/closed */}
            <div className="flex items-center gap-2.5">
              <span className={`w-2 h-2 rounded-full ${status.isOpen ? "bg-green-400 animate-pulse" : "bg-red-500"}`} />
              <span className={`text-sm font-bold ${status.isOpen ? "text-green-400" : "text-red-400"}`}>
                {status.label}
              </span>
              <span className="text-slate-500 text-xs">{status.detail}</span>
            </div>

            <div className="hidden sm:block w-px h-4 bg-white/10" />

            {/* Star rating */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Junior%27s+Auto+Repair+Twin+Falls+ID"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              {[...Array(5)].map((_,i) => <Star key={i} size={11} className="fill-yellow-400 text-yellow-400"/>)}
              <span className="text-white text-sm font-bold ml-1">4.8</span>
              <span className="text-slate-500 text-xs">&middot; 146 Google Reviews</span>
            </a>

            <div className="hidden sm:block w-px h-4 bg-white/10" />

            {/* Years + location */}
            <div className="flex items-center gap-1.5 text-slate-400 text-sm">
              <Award size={13} className="text-red-400 shrink-0" />
              13 Years Serving Magic Valley
            </div>

            <div className="hidden md:block w-px h-4 bg-white/10" />

            {/* Phone */}
            <a href="tel:2085952101" className="hidden md:flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors">
              <Phone size={13} className="text-red-400 shrink-0" />
              (208) 595-2101
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 grid md:grid-cols-2 gap-12 items-center w-full">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-1.5 text-red-300 text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            Twin Falls' Most Trusted Auto Repair
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6"
            style={{ textShadow: "0 0 80px rgba(239,68,68,0.2)" }}
          >
            Your Car.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              Fixed Right.
            </span><br />
            <span className="text-4xl md:text-5xl text-slate-300">Every Time.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-slate-400 mb-8 max-w-md leading-relaxed"
          >
            Pablo Zaldivar has been keeping Magic Valley vehicles running since 2012. Honest diagnosis. Fair prices. Work you can trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 mb-10"
          >
            <a
              href="#contact"
              className="group relative bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-2xl text-center text-lg transition-all shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10">Book an Appointment</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <Link
              href="/portal"
              className="border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 backdrop-blur text-white font-bold px-8 py-4 rounded-2xl text-center text-lg transition-all hover:scale-105"
            >
              Customer Portal
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col gap-2 text-sm text-slate-400"
          >
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-red-400 shrink-0" />
              <a
                href="https://maps.google.com/?q=417+Main+Ave+E,+Twin+Falls,+ID+83301"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                417 Main Ave E, Twin Falls, ID 83301
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-red-400 shrink-0" />
              <a href="tel:2085952101" className="hover:text-white transition-colors">(208) 595-2101</a>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-red-400 shrink-0" />
              Mon–Sat: 9:00 AM – 5:00 PM
            </div>
          </motion.div>
        </motion.div>

        {/* 3D Car visual */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          style={{ perspective: 1000 }}
          className="hidden md:block"
        >
          <motion.div
            animate={{
              rotateY: mouse.x * 8,
              rotateX: mouse.y * -4,
            }}
            transition={{ type: "spring", stiffness: 60, damping: 25 }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative"
          >
            {/* Glow under car */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-red-600/30 blur-2xl rounded-full" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-4 bg-blue-500/20 blur-xl rounded-full" />
            <CarSVG className="w-full drop-shadow-2xl" />
            {/* Reflection */}
            <div className="mt-1 opacity-20 scale-y-[-0.15] origin-top blur-sm">
              <CarSVG className="w-full" />
            </div>
          </motion.div>

          {/* Floating spec badges around car */}
          <motion.div
            className="absolute top-8 left-4 bg-slate-800/80 backdrop-blur border border-slate-700/50 rounded-xl px-3 py-2"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <p className="text-xs text-slate-400">Engine</p>
            <p className="text-sm font-bold text-white">All Makes</p>
          </motion.div>

          <motion.div
            className="absolute top-8 right-4 bg-red-900/60 backdrop-blur border border-red-700/40 rounded-xl px-3 py-2"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
          >
            <p className="text-xs text-red-300">Service</p>
            <p className="text-sm font-bold text-white">Same Day</p>
          </motion.div>

          <motion.div
            className="absolute bottom-12 right-6 bg-slate-800/80 backdrop-blur border border-slate-700/50 rounded-xl px-3 py-2"
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
          >
            <p className="text-xs text-slate-400">Warranty</p>
            <p className="text-sm font-bold text-white">On All Work</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
