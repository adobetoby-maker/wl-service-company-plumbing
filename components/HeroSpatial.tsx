"use client";
import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Sparkles,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import Link from "next/link";
import { Star, Phone, MapPin, Award, ChevronDown } from "lucide-react";

// ─── DROP YOUR GENERATED IMAGE URL HERE ──────────────────────────────────────
// Leave empty to use the full 3D car scene fallback.
// Paste the Midjourney / DALL-E result URL and the hero auto-switches to
// image-background + WebGL atmospheric overlay mode.
const HERO_IMAGE = "/jrs-logo.png";

// ─── Live shop status ────────────────────────────────────────────────────────
function useShopStatus() {
  const [status, setStatus] = useState({ isOpen: false, label: "Checking…", detail: "" });
  useEffect(() => {
    function check() {
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Boise" }));
      const day = now.getDay();
      const mins = now.getHours() * 60 + now.getMinutes();
      const isOpen = day >= 1 && day <= 6 && mins >= 540 && mins < 1020;
      let detail = "";
      if (isOpen) {
        const left = 1020 - mins;
        detail = left > 60 ? "Closes at 5 PM" : `Closing in ${left} min`;
      } else {
        const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        if (day === 0 || (day === 6 && mins >= 1020)) detail = "Opens Mon · 9 AM";
        else if (mins < 540) detail = "Opens today · 9 AM";
        else detail = `Opens ${names[day < 5 ? day + 1 : 1]} · 9 AM`;
      }
      setStatus({ isOpen, label: isOpen ? "Open Now" : "Closed", detail });
    }
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);
  return status;
}

// ─── 3D Car (procedural) ─────────────────────────────────────────────────────
function Car() {
  const group = useRef<THREE.Group>(null!);
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;
    // Gentle float
    group.current.position.y = Math.sin(time.current * 0.7) * 0.06 - 0.05;
    // Mouse-responsive rotation
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.mouse.x * 0.45,
      0.04
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.mouse.y * -0.12,
      0.04
    );
  });

  const paint = { color: "#0d2650", metalness: 0.88, roughness: 0.1 };
  const chrome = { color: "#aaaaaa", metalness: 1.0, roughness: 0.04 };
  const rubber = { color: "#111111", metalness: 0.05, roughness: 0.9 };
  const glass = { color: "#1a3366", metalness: 0.1, roughness: 0.05, transparent: true, opacity: 0.55 };

  const wheels: [number, number, number][] = [
    [-1.35, -0.62, 1.0],
    [ 1.35, -0.62, 1.0],
    [-1.35, -0.62,-1.0],
    [ 1.35, -0.62,-1.0],
  ];

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* ── Body ── */}
      <mesh castShadow>
        <boxGeometry args={[4.1, 0.6, 1.85]} />
        <meshStandardMaterial {...paint} />
      </mesh>
      {/* Roof / cabin */}
      <mesh position={[0, 0.57, 0.06]} castShadow>
        <boxGeometry args={[2.05, 0.5, 1.58]} />
        <meshStandardMaterial {...paint} />
      </mesh>
      {/* Hood slope (front) */}
      <mesh position={[-1.45, 0.18, 0]} castShadow>
        <boxGeometry args={[1.2, 0.15, 1.82]} />
        <meshStandardMaterial {...paint} />
      </mesh>
      {/* Trunk (rear) */}
      <mesh position={[1.45, 0.1, 0]} castShadow>
        <boxGeometry args={[1.1, 0.12, 1.82]} />
        <meshStandardMaterial {...paint} />
      </mesh>
      {/* Front bumper */}
      <mesh position={[-2.15, -0.15, 0]}>
        <boxGeometry args={[0.18, 0.46, 1.78]} />
        <meshStandardMaterial {...paint} />
      </mesh>
      {/* Rear bumper */}
      <mesh position={[2.15, -0.15, 0]}>
        <boxGeometry args={[0.18, 0.46, 1.78]} />
        <meshStandardMaterial {...paint} />
      </mesh>

      {/* ── Windows ── */}
      {/* Windshield */}
      <mesh position={[-0.78, 0.56, 0]}>
        <boxGeometry args={[0.07, 0.44, 1.44]} />
        <meshStandardMaterial {...glass} />
      </mesh>
      {/* Rear glass */}
      <mesh position={[0.82, 0.56, 0]}>
        <boxGeometry args={[0.07, 0.44, 1.44]} />
        <meshStandardMaterial {...glass} />
      </mesh>
      {/* Side glass L */}
      <mesh position={[0, 0.58, 0.83]}>
        <boxGeometry args={[1.84, 0.38, 0.05]} />
        <meshStandardMaterial {...glass} />
      </mesh>
      {/* Side glass R */}
      <mesh position={[0, 0.58, -0.83]}>
        <boxGeometry args={[1.84, 0.38, 0.05]} />
        <meshStandardMaterial {...glass} />
      </mesh>

      {/* ── Wheels ── */}
      {wheels.map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.38, 0.38, 0.26, 40]} />
            <meshStandardMaterial {...rubber} />
          </mesh>
          {/* Rim */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.27, 0.27, 0.28, 20]} />
            <meshStandardMaterial {...chrome} />
          </mesh>
          {/* Centre cap */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.3, 8]} />
            <meshStandardMaterial color="#cc2200" metalness={0.6} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* ── Lights ── */}
      {/* Headlights */}
      {([ [-2.2, 0.04, 0.65], [-2.2, 0.04, -0.65] ] as [number,number,number][]).map(([x,y,z], i) => (
        <mesh key={`hl${i}`} position={[x, y, z]}>
          <sphereGeometry args={[0.11, 20, 20]} />
          <meshStandardMaterial color="white" emissive="#fffde0" emissiveIntensity={5} />
        </mesh>
      ))}
      {/* Tail lights */}
      {([ [2.18, 0.04, 0.65], [2.18, 0.04, -0.65] ] as [number,number,number][]).map(([x,y,z], i) => (
        <mesh key={`tl${i}`} position={[x, y, z]}>
          <sphereGeometry args={[0.09, 20, 20]} />
          <meshStandardMaterial color="#ff2200" emissive="#ff2200" emissiveIntensity={6} />
        </mesh>
      ))}

      {/* Headlight glow */}
      <pointLight position={[-3, 0.1, 0]} intensity={2} color="#ffffee" distance={6} decay={2} />
      {/* Tail glow */}
      <pointLight position={[3, 0.1, 0]} intensity={1.5} color="#ff3300" distance={5} decay={2} />
      {/* Undercar accent */}
      <pointLight position={[0, -0.8, 0]} intensity={0.4} color="#0033ff" distance={3} decay={2} />
    </group>
  );
}

// ─── Reflective floor plane ───────────────────────────────────────────────────
function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.03, 0]} receiveShadow>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial
        blur={[400, 100]}
        resolution={512}
        mixBlur={1}
        mixStrength={40}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#050510"
        metalness={0.6}
        roughness={1}
        mirror={0}
      />
    </mesh>
  );
}

// ─── Full 3D scene ────────────────────────────────────────────────────────────
function Scene({ hasImage }: { hasImage: boolean }) {
  return (
    <>
      {/* Solid background + fog only when no photo behind us */}
      {!hasImage && <color attach="background" args={["#020617"]} />}
      {!hasImage && <fog attach="fog" args={["#020617", 10, 30]} />}

      {/* Lighting */}
      <ambientLight intensity={hasImage ? 0.05 : 0.25} />
      {!hasImage && (
        <>
          <directionalLight position={[8, 10, 5]} intensity={1.8} color="#ffffff" castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-6, 4, -4]} intensity={0.6} color="#3355ff" />
          <pointLight position={[0, 8, 0]} intensity={0.4} color="#ffffff" />
          <Environment preset="city" />
        </>
      )}

      {/* Procedural car + floor — only when no photo */}
      {!hasImage && (
        <>
          <Car />
          <ContactShadows position={[0, -1.02, 0]} opacity={0.75} scale={10} blur={2.8} far={5} />
          <Floor />
        </>
      )}

      {/* ── Atmospheric particles ──
          Warm golden/ember tones over the sunset image;
          red/blue sparks over the dark 3D scene.           */}
      {hasImage ? (
        <>
          {/* Chrome flecks — logo silver accents */}
          <Sparkles count={90} scale={[28, 10, 14]} size={2.8} speed={0.10} color="#c0c8d8" noise={1.3} position={[0, 2, -4]} />
          {/* Electric blue — logo accent color */}
          <Sparkles count={55} scale={[22, 6, 10]} size={2.0} speed={0.14} color="#4499ff" noise={1.0} position={[2, 0, -3]} />
          {/* Bright white motes — logo highlight glint */}
          <Sparkles count={35} scale={[16, 8, 10]} size={1.6} speed={0.08} color="#e8f0ff" noise={0.7} position={[-2, 3, -5]} />
          {/* Steel blue — deep background layer */}
          <Sparkles count={40} scale={[18, 5, 10]} size={1.0} speed={0.06} color="#2255aa" noise={0.5} position={[0, 4, -5]} />
        </>
      ) : (
        <>
          <Sparkles count={70} scale={[12, 6, 8]} size={1.8} speed={0.25} color="#ff4422" noise={1} position={[0, 0, 0]} />
          <Sparkles count={30} scale={[8, 3, 6]} size={1.2} speed={0.15} color="#4488ff" noise={0.8} position={[0, 2, -2]} />
        </>
      )}
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function HeroSpatial() {
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 500], [0, -80]);
  const stripOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scrollOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const status = useShopStatus();
  const hasImage = HERO_IMAGE.length > 0;

  // Mouse position for image parallax (only needed when photo is active)
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (!hasImage) return;
    const handler = (e: MouseEvent) => setMouse({
      x: (e.clientX / window.innerWidth - 0.5),
      y: (e.clientY / window.innerHeight - 0.5),
    });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [hasImage]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">

      {/* ── Photo background (when HERO_IMAGE is set) ── */}
      {hasImage && (
        <motion.div
          className="absolute inset-[-6%]"
          animate={{ x: mouse.x * -28, y: mouse.y * -18 }}
          transition={{ type: "spring", stiffness: 40, damping: 18 }}
        >
          <img
            src={HERO_IMAGE}
            alt="Junior's Auto Repair logo"
            className="w-full h-full object-cover"
          />
          {/* Light shadow — logo is already dark, don't wash it out */}
          <div className="absolute inset-0 bg-slate-950/20" />
        </motion.div>
      )}

      {/* ── WebGL canvas — transparent bg when photo is present ── */}
      <div className="absolute inset-0">
        <Canvas
          shadows={!hasImage}
          camera={{ position: [0, 1.2, 7.5], fov: 42 }}
          gl={{ antialias: true, powerPreference: "high-performance", alpha: hasImage }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <Scene hasImage={hasImage} />
          </Suspense>
        </Canvas>
      </div>

      {/* Left gradient — stronger over the photo for text readability */}
      <div className={`absolute inset-0 pointer-events-none ${hasImage
        ? "bg-gradient-to-r from-slate-950 via-slate-950/80 md:via-slate-950/65 to-slate-950/10"
        : "bg-gradient-to-r from-slate-950 via-slate-950/85 md:via-slate-950/60 to-transparent"
      }`} />
      {/* Top + bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-slate-950/85 pointer-events-none" />

      {/* ── Content ── */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-36 flex flex-col justify-center min-h-screen w-full"
      >
        {/* Text lives in the left ~55% */}
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-1.5 text-red-300 text-sm font-medium mb-7"
          >
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            Twin Falls' Most Trusted Auto Repair
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6"
            style={{ textShadow: "0 0 120px rgba(239,68,68,0.25)" }}
          >
            Your Car.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              Fixed Right.
            </span><br />
            <span className="text-4xl md:text-5xl text-slate-300">Every Time.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-slate-400 mb-9 leading-relaxed"
          >
            Pablo Zaldivar has been keeping Magic Valley vehicles running since 2012.
            Honest diagnosis. Fair prices. Work you can trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
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
            transition={{ delay: 0.95 }}
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
          </motion.div>
        </div>
      </motion.div>

      {/* ── Live Trust Strip ── */}
      <motion.div
        style={{ opacity: stripOpacity }}
        className="absolute bottom-20 left-0 right-0 z-10 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3.5 flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            <div className="flex items-center gap-2.5">
              <span className={`w-2 h-2 rounded-full ${status.isOpen ? "bg-green-400 animate-pulse" : "bg-red-500"}`} />
              <span className={`text-sm font-bold ${status.isOpen ? "text-green-400" : "text-red-400"}`}>
                {status.label}
              </span>
              <span className="text-slate-500 text-xs">{status.detail}</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
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
            <div className="flex items-center gap-1.5 text-slate-400 text-sm">
              <Award size={13} className="text-red-400 shrink-0" />
              13 Years &middot; Magic Valley
            </div>
            <div className="hidden md:block w-px h-4 bg-white/10" />
            <a href="tel:2085952101" className="hidden md:flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors">
              <Phone size={13} className="text-red-400 shrink-0" />
              (208) 595-2101
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        style={{ opacity: scrollOpacity }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 z-10"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
