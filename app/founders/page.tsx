"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Heart, Wrench, MapPin, Star, Clock, Users, Award, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const timeline = [
  { year: "2003", title: "Learning the Trade", desc: "Pablo began working in auto shops across southern Idaho, learning every system from the ground up under experienced mechanics." },
  { year: "2008", title: "Master Technician", desc: "After years of hands-on work, Pablo earned his master technician certification — able to diagnose and repair any vehicle make or model." },
  { year: "2012", title: "Junior's Opens", desc: "Pablo and Cindy opened Jr.'s Auto Repair on Main Ave in Twin Falls with two bays, two lifts, and a commitment to honest work." },
  { year: "2016", title: "Growing the Family", desc: "As the Zaldivar family grew, so did the shop. Added a third bay and started taking on apprentices from the community." },
  { year: "2019", title: "Magic Valley's Choice", desc: "Crossed 500 five-star reviews. The community had spoken — Jr.'s became the most trusted name in auto repair in Magic Valley." },
  { year: "2025", title: "13 Years Strong", desc: "Still family-owned, still personally run by Pablo. Every repair order still reviewed and approved by the man whose name is on the door." },
];

const values = [
  { icon: Wrench, title: "Honest Work", desc: "We only recommend what your car actually needs. No upselling, no scare tactics." },
  { icon: Heart, title: "Family First", desc: "We treat your vehicle like it carries someone we love — because it does." },
  { icon: Users, title: "Community Roots", desc: "Twin Falls is home. We give back through sponsorships, scholarships, and apprenticeships." },
  { icon: Award, title: "Stand Behind It", desc: "Every repair comes with a warranty. If something isn't right, we make it right." },
];

function ParallaxSection({ children, offset = 60 }: { children: React.ReactNode; offset?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function FoundersPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);

  return (
    <>
      <Navbar />
      <main className="bg-slate-950 overflow-hidden">

        {/* Hero */}
        <section ref={heroRef} className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-red-950/20 to-slate-950" />
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(239,68,68,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59,130,246,0.3) 0%, transparent 50%)" }}
            />
          </motion.div>

          <motion.div
            style={{ opacity: heroOpacity }}
            className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-red-600/15 border border-red-500/20 rounded-full px-4 py-1.5 text-red-400 text-sm font-medium mb-8"
            >
              <Heart size={14} />
              The Family Behind The Shop
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.05] tracking-tight"
            >
              Built by a Family.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                For Families.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Pablo and Cindy Zaldivar started Jr.'s Auto Repair with a single promise: treat every customer the way you'd want your own family treated.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-slate-400"
            >
              {[
                { icon: MapPin, text: "Twin Falls, Idaho" },
                { icon: Clock, text: "Since 2012 · 13 Years" },
                { icon: Star, text: "4.8★ · 146 Reviews" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon size={14} className="text-red-400" />
                  {text}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ChevronRight size={18} className="rotate-90" />
            </motion.div>
          </motion.div>
        </section>

        {/* Pablo & Cindy */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
              {/* Pablo portrait placeholder */}
              <FadeUp>
                <div className="relative">
                  <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 overflow-hidden flex items-center justify-center relative">
                    {/* Stylized silhouette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <svg viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-56 opacity-20">
                      <circle cx="150" cy="110" r="70" fill="#94a3b8"/>
                      <path d="M40 400 C40 300 80 260 150 250 C220 260 260 300 260 400 Z" fill="#94a3b8"/>
                    </svg>
                    {/* Label overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-slate-900/90 backdrop-blur border border-slate-700/50 rounded-2xl p-4">
                        <p className="text-white font-bold text-lg">Pablo Zaldivar</p>
                        <p className="text-red-400 text-sm">Owner & Master Technician</p>
                      </div>
                    </div>
                    {/* Decorative corner accent */}
                    <div className="absolute top-6 right-6 bg-red-600/20 border border-red-500/30 rounded-xl px-3 py-2">
                      <p className="text-red-300 text-xs font-bold">ASE Certified</p>
                    </div>
                  </div>
                  {/* Floating mechanic badge */}
                  <ParallaxSection offset={20}>
                    <div className="absolute -bottom-6 -right-6 bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center">
                          <Wrench size={18} className="text-red-400" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">20+ Years</p>
                          <p className="text-slate-400 text-xs">Experience</p>
                        </div>
                      </div>
                    </div>
                  </ParallaxSection>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div>
                  <div className="inline-flex items-center gap-2 bg-red-600/15 border border-red-500/20 rounded-full px-3 py-1 text-red-400 text-xs font-medium mb-6">
                    The Owner
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                    Pablo Zaldivar
                  </h2>
                  <div className="space-y-4 text-slate-400 leading-relaxed">
                    <p>
                      Pablo grew up taking things apart to understand how they worked. By the time he was a teenager, he was already rebuilding small engines in his backyard. That curiosity turned into a career — and eventually, a business built on the belief that good auto repair isn't complicated. It's just honest work done by someone who cares.
                    </p>
                    <p>
                      After earning his ASE master technician certification and spending years working for other shops, Pablo realized he wanted to build something different: a place where the diagnosis was always honest, the price was always fair, and the customer always left knowing exactly what was done to their vehicle and why.
                    </p>
                    <p>
                      In 2012, he opened Jr.'s Auto Repair — named for the next generation he was building it for. Today, he still turns wrenches himself. That's not an accident. It's a choice.
                    </p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {["ASE Master Technician", "20+ Years Experience", "Twin Falls Native", "Father of 3"].map(tag => (
                      <span key={tag} className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Cindy */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeUp delay={0.1}>
                <div className="order-2 lg:order-1">
                  <div className="inline-flex items-center gap-2 bg-pink-600/15 border border-pink-500/20 rounded-full px-3 py-1 text-pink-400 text-xs font-medium mb-6">
                    Co-Founder & Heart of the Shop
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                    Cindy Zaldivar
                  </h2>
                  <div className="space-y-4 text-slate-400 leading-relaxed">
                    <p>
                      Every great shop has someone who makes everything run. At Jr.'s, that's Cindy. While Pablo focuses on what happens in the bays, Cindy runs the business side — customer relationships, scheduling, bookkeeping, and the hundred invisible things that keep a small business alive.
                    </p>
                    <p>
                      Cindy also happens to be the reason Jr.'s has the reputation it does for communication and customer care. She believes that how you treat someone when they're stressed about their car is just as important as how well you fix it. That philosophy is baked into everything.
                    </p>
                    <p>
                      She and Pablo are a team in every sense — at home and at work. Jr.'s is named for their kids, and those kids are growing up watching their parents build something they can be proud of.
                    </p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {["Business Operations", "Customer Relations", "Community Involved", "Mom of 3"].map(tag => (
                      <span key={tag} className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {/* Cindy portrait placeholder */}
              <FadeUp>
                <div className="relative order-1 lg:order-2">
                  <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-pink-950/30 to-slate-900 border border-slate-700/50 overflow-hidden flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <svg viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-56 opacity-20">
                      <circle cx="150" cy="105" r="65" fill="#94a3b8"/>
                      <path d="M50 400 C50 310 85 270 150 258 C215 270 250 310 250 400 Z" fill="#94a3b8"/>
                    </svg>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-slate-900/90 backdrop-blur border border-slate-700/50 rounded-2xl p-4">
                        <p className="text-white font-bold text-lg">Cindy Zaldivar</p>
                        <p className="text-pink-400 text-sm">Co-Founder & Operations</p>
                      </div>
                    </div>
                    <div className="absolute top-6 left-6 bg-pink-600/20 border border-pink-500/30 rounded-xl px-3 py-2">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-xs">★</span>)}
                      </div>
                      <p className="text-pink-300 text-xs font-bold mt-0.5">Customer Favorite</p>
                    </div>
                  </div>
                  <ParallaxSection offset={-20}>
                    <div className="absolute -bottom-6 -left-6 bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-pink-600/20 rounded-xl flex items-center justify-center">
                          <Heart size={18} className="text-pink-400" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">146 Reviews</p>
                          <p className="text-slate-400 text-xs">4.8★ Average</p>
                        </div>
                      </div>
                    </div>
                  </ParallaxSection>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* The Kids */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeUp>
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 bg-yellow-500/15 border border-yellow-500/20 rounded-full px-4 py-1.5 text-yellow-400 text-sm font-medium mb-5">
                  <Users size={14} />
                  The Next Generation
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                  Named for the Kids.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Built for the Future.</span>
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                  Jr.'s Auto Repair got its name from something simple: Pablo wanted to build something his children could be proud of. Something that stood for doing things right.
                </p>
              </div>
            </FadeUp>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  emoji: "🔧",
                  name: "The Eldest",
                  desc: "Already taking apart bikes and helping Pablo in the garage on weekends. The apple didn't fall far.",
                  color: "from-blue-900/40 to-slate-900",
                  border: "border-blue-700/30",
                },
                {
                  emoji: "⭐",
                  name: "The Middle",
                  desc: "The creative one. Has already designed three 'logos' for the shop and decorated the waiting room with school art.",
                  color: "from-yellow-900/30 to-slate-900",
                  border: "border-yellow-700/30",
                },
                {
                  emoji: "❤️",
                  name: "The Youngest",
                  desc: "Still learning to walk through the shop, but already knows how to wave at every customer that comes through the door.",
                  color: "from-red-900/30 to-slate-900",
                  border: "border-red-700/30",
                },
              ].map((kid, i) => (
                <FadeUp key={kid.name} delay={i * 0.12}>
                  <div className={`bg-gradient-to-br ${kid.color} border ${kid.border} rounded-3xl p-8 flex flex-col items-center text-center h-full`}>
                    <div className="text-5xl mb-4">{kid.emoji}</div>
                    <h3 className="text-white font-bold text-lg mb-3">{kid.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{kid.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.3}>
              <div className="mt-10 bg-gradient-to-r from-red-950/40 to-slate-900 border border-red-800/20 rounded-3xl p-8 text-center">
                <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mx-auto italic">
                  "We named it Jr.'s because this isn't just a business. It's what we're leaving behind for them. Every car we fix right, every customer who trusts us — that's the foundation we're building on."
                </p>
                <p className="text-red-400 font-bold mt-4">— Pablo Zaldivar</p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeUp>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Our Story</h2>
                <p className="text-slate-400">Over 20 years in the making.</p>
              </div>
            </FadeUp>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-600/60 via-slate-700 to-transparent" />

              <div className="space-y-12">
                {timeline.map((item, i) => (
                  <FadeUp key={item.year} delay={i * 0.1}>
                    <div className={`relative flex gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-start`}>
                      {/* Dot */}
                      <div className="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 top-1 w-4 h-4 bg-red-600 rounded-full border-4 border-slate-950 z-10" />

                      <div className={`pl-12 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                        <span className="inline-block bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold px-3 py-1 rounded-full mb-3">
                          {item.year}
                        </span>
                        <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>

                      <div className="hidden md:block md:w-1/2" />
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-slate-900/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeUp>
              <div className="text-center mb-14">
                <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">What We Stand For</h2>
                <p className="text-slate-400 max-w-xl mx-auto">The principles that have guided Jr.'s Auto Repair since day one.</p>
              </div>
            </FadeUp>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <FadeUp key={v.title} delay={i * 0.1}>
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center hover:border-red-500/30 transition-colors">
                      <div className="w-12 h-12 bg-red-600/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Icon size={22} className="text-red-400" />
                      </div>
                      <h3 className="text-white font-bold mb-2">{v.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <FadeUp>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                Ready to meet the team?
              </h2>
              <p className="text-slate-400 text-lg mb-10">
                Come by the shop at 417 Main Ave E in Twin Falls, or book your service online. Pablo or Cindy will be glad to say hello.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/#contact"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-4 rounded-2xl transition-all hover:scale-105 shadow-lg shadow-red-600/25 text-lg"
                >
                  Book an Appointment
                </a>
                <Link
                  href="/"
                  className="border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-bold px-10 py-4 rounded-2xl transition-all hover:scale-105 text-lg"
                >
                  Back to Home
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
