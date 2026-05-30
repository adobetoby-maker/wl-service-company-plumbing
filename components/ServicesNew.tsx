"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Wrench, Zap, Gauge, Thermometer, Settings, Car, Shield } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "General Auto Repair",
    desc: "Full-service repairs on all makes and models. If it's broken, we fix it right the first time.",
    detail: "We diagnose everything from mystery noises to warning lights — then give you a straight answer on what it actually needs.",
    color: "from-slate-700 to-slate-900",
    accent: "bg-slate-600",
  },
  {
    icon: Gauge,
    title: "Oil Changes",
    desc: "Fast, affordable oil changes with a full vehicle inspection included every time.",
    detail: "Conventional, synthetic blend, or full synthetic. We check your fluids, filters, and tire pressure while we're at it.",
    color: "from-red-700 to-red-900",
    accent: "bg-red-600",
  },
  {
    icon: Shield,
    title: "Brake Service",
    desc: "Pads, rotors, calipers, and fluid. We keep you stopping safely.",
    detail: "We measure your rotor thickness and test brake fluid moisture before recommending a single part. No upselling.",
    color: "from-orange-700 to-orange-900",
    accent: "bg-orange-600",
  },
  {
    icon: Settings,
    title: "Transmission",
    desc: "Automatic and manual transmission diagnosis and repair.",
    detail: "From fluid flushes to full rebuilds — we use factory spec procedures and quality parts you can count on.",
    color: "from-blue-700 to-blue-900",
    accent: "bg-blue-600",
  },
  {
    icon: Zap,
    title: "Engine Repair",
    desc: "Minor tune-ups to full engine rebuilds — we handle it all.",
    detail: "Complete engine diagnostics with live data readouts. We fix the root cause, not just the symptom.",
    color: "from-yellow-600 to-yellow-900",
    accent: "bg-yellow-500",
  },
  {
    icon: Thermometer,
    title: "Cooling System",
    desc: "Water pump, thermostat, belts, and hoses. Keep your engine cool.",
    detail: "Idaho summers are brutal on cooling systems. We pressure-test and inspect the whole system, not just the broken part.",
    color: "from-cyan-700 to-cyan-900",
    accent: "bg-cyan-600",
  },
  {
    icon: Car,
    title: "Ignition Interlock",
    desc: "Licensed ignition interlock device installation and servicing.",
    detail: "State-certified installation. We work with all major IID providers and handle all required reporting.",
    color: "from-purple-700 to-purple-900",
    accent: "bg-purple-600",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: y * -12, y: x * 12 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setFlipped(false);
  }

  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setFlipped(f => !f)}
      className="relative h-52 cursor-pointer"
      style={{ perspective: 800 }}
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          rotateZ: flipped ? 180 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} p-5 flex flex-col justify-between shadow-xl`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className={`w-11 h-11 ${service.accent} bg-opacity-40 rounded-xl flex items-center justify-center`}>
            <Icon size={22} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base mb-1">{service.title}</h3>
            <p className="text-white/70 text-xs leading-relaxed">{service.desc}</p>
          </div>
          <div className="flex items-center gap-1 text-white/40 text-[10px]">
            <span>Tap to learn more</span>
            <span>→</span>
          </div>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} p-5 flex flex-col justify-center items-center text-center shadow-xl`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Icon size={28} className="text-white/60 mb-3" />
          <p className="text-white text-sm leading-relaxed">{service.detail}</p>
          <a
            href="#contact"
            onClick={e => e.stopPropagation()}
            className="mt-4 text-xs font-bold text-white border border-white/30 hover:border-white/60 px-4 py-1.5 rounded-full transition-colors"
          >
            Book Now
          </a>
        </div>
      </motion.div>

      {/* Glow shadow */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/20 blur-xl rounded-full" />
    </motion.div>
  );
}

export default function ServicesNew() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-red-600/15 border border-red-500/20 rounded-full px-4 py-1.5 text-red-400 text-sm font-medium mb-5">
            <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
            What We Do
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Every Service.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Done Right.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            From a quick oil change to a full engine overhaul — same care, same honesty, every time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-4 rounded-2xl transition-all hover:scale-105 shadow-lg shadow-red-600/25 text-lg"
          >
            Schedule Your Service
          </a>
        </motion.div>
      </div>
    </section>
  );
}
