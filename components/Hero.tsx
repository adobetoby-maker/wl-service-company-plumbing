import Link from "next/link";
import { Star, Clock, MapPin, Phone } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 opacity-90" />
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-slate-300 text-sm">4.8 stars · 146 reviews</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Twin Falls&apos; Most Trusted<br />
            <span className="text-red-500">Auto Repair Shop</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl">
            Honest work, fair prices, done right the first time. Serving downtown Twin Falls for over 13 years.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a
              href="#contact"
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl text-center text-lg transition-colors shadow-lg"
            >
              Book an Appointment
            </a>
            <Link
              href="/portal"
              className="border-2 border-white hover:bg-white hover:text-slate-900 text-white font-bold px-8 py-4 rounded-xl text-center text-lg transition-colors"
            >
              Customer Portal
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-red-400 shrink-0" />
              <a
                href="https://maps.google.com/?q=417+Main+Ave+E,+Twin+Falls,+ID+83301"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                417 Main Ave E, Twin Falls, ID
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-red-400 shrink-0" />
              <span>Mon–Sat: 9:00 AM – 5:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-red-400 shrink-0" />
              <a href="tel:2085952101" className="hover:text-white">(208) 595-2101</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
