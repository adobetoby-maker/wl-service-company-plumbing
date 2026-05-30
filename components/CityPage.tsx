import Link from "next/link";
import { Phone, MapPin, Clock, Star, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { shopInfo } from "@/lib/shopInfo";
import type { CityData } from "@/lib/cities";

const services = [
  { title: "Oil Changes", desc: "Full synthetic or conventional, with a free vehicle inspection every time." },
  { title: "Brake Service", desc: "Pads, rotors, calipers, and fluid — we measure before we recommend." },
  { title: "Engine Diagnostics", desc: "We read codes and actually diagnose the problem, not just clear the light." },
  { title: "Transmission Service", desc: "Fluid flushes, repairs, and rebuilds on automatics and manuals." },
  { title: "AC & Heating", desc: "Recharges, leak diagnosis, and full system repairs." },
  { title: "Electrical Repair", desc: "Batteries, alternators, starters, and wiring issues of all kinds." },
  { title: "Tire Service", desc: "Rotations, balancing, and tire inspection to keep your tires lasting longer." },
  { title: "Preventive Maintenance", desc: "Coolant flushes, belt replacements, filters — we keep you ahead of breakdowns." },
];

const reviews = [
  { name: "Mark K.", text: "Saved us before a big road trip. Water pump, belt, thermostat — all done same day. Couldn't believe it.", rating: 5 },
  { name: "Sarah M.", text: "Extremely content with how he runs his business. Reliable work, reasonable prices, always works with you.", rating: 5 },
  { name: "Jessica T.", text: "Pablo diagnosed my car in 20 minutes. Other shops had it two days and still weren't sure. Honest, fast, fair.", rating: 5 },
];

type Props = { city: CityData }

export default function CityPage({ city }: Props) {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="bg-slate-900 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-red-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Serving {city.name}, Idaho · Magic Valley
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Auto Repair in {city.name}, Idaho
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              {city.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${shopInfo.phone.replace(/\D/g, "")}`}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                {shopInfo.phone}
              </a>
              <a
                href="#contact"
                className="border border-slate-600 hover:border-slate-400 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg"
              >
                Book an Appointment
              </a>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="bg-red-600 text-white py-4 px-4">
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-semibold">
            <span className="flex items-center gap-2">
              <Star size={14} className="fill-white" /> {shopInfo.rating} Stars · {shopInfo.reviewCount}+ Reviews
            </span>
            <span className="hidden sm:inline">|</span>
            <span>{shopInfo.yearsInBusiness}+ Years Serving Magic Valley</span>
            <span className="hidden sm:inline">|</span>
            <span>{city.localNote}</span>
          </div>
        </section>

        {/* Distance stats */}
        <section className="py-12 bg-white px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-slate-50 rounded-2xl p-6">
                <MapPin size={28} className="text-red-600 mx-auto mb-3" />
                <p className="font-extrabold text-slate-900 text-xl">{city.distance}</p>
                <p className="text-slate-500 text-sm">from {city.name} to our shop</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6">
                <Clock size={28} className="text-red-600 mx-auto mb-3" />
                <p className="font-extrabold text-slate-900 text-xl">{city.driveTime}</p>
                <p className="text-slate-500 text-sm">drive time each way</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6">
                <Phone size={28} className="text-red-600 mx-auto mb-3" />
                <p className="font-extrabold text-slate-900 text-xl">Same-Day</p>
                <p className="text-slate-500 text-sm">appointments often available</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-slate-50 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
                What We Fix for {city.name} Drivers
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                All makes and models. Foreign and domestic. We do the work right so you don&apos;t have to come back for the same problem.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map(s => (
                <div key={s.title} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-1">{s.title}</h3>
                  <p className="text-slate-500 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="py-16 bg-white px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                What Magic Valley Drivers Say
              </h2>
              <p className="text-slate-500">{shopInfo.rating} stars · {shopInfo.reviewCount}+ Google reviews</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map(r => (
                <div key={r.name} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                  <p className="text-xs font-semibold text-slate-500">— {r.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="py-16 bg-slate-900 text-white px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold mb-3">
                Why {city.name} Drivers Choose Junior&apos;s
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                There are closer shops. Here&apos;s why people make the drive.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "No surprise charges", body: "You approve the price before we touch anything. What we quote is what you pay." },
                { title: "You talk to the mechanic", body: "Pablo answers the phone and explains what he found — in plain English, not shop-speak." },
                { title: "Done right the first time", body: "13 years in business because we don't send cars back out until the job is actually finished." },
                { title: "All makes and models", body: "Domestic, foreign, gas, diesel. If it has wheels and an engine, we work on it." },
              ].map(item => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full shrink-0 mt-2" />
                  <div>
                    <p className="font-bold text-white mb-1">{item.title}</p>
                    <p className="text-slate-400 text-sm">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Also serving */}
        <section className="py-12 bg-white px-4 border-t border-slate-100">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 text-center">
              Also Serving
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {city.nearbyCities.map(c => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 hover:border-red-300 hover:bg-red-50 text-slate-700 hover:text-red-700 text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                >
                  Auto Repair in {c.name} <ChevronRight size={14} />
                </Link>
              ))}
              <Link
                href="/"
                className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 hover:border-red-300 hover:bg-red-50 text-slate-700 hover:text-red-700 text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                Twin Falls (Main Shop) <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Contact */}
        <Contact />

      </main>
      <Footer />
    </>
  );
}
