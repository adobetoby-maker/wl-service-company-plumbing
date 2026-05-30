import { ExternalLink, ShoppingBag } from "lucide-react";

const products = [
  {
    title: "FIXD OBD2 Scanner",
    desc: "Know what your check engine light means before you call us. Plugs into your OBD port and explains codes in plain English on your phone.",
    badge: "Top Pick",
    badgeColor: "bg-red-100 text-red-700",
    href: "https://www.amazon.com/s?k=FIXD+OBD2+scanner&tag=juniorsauto-20",
  },
  {
    title: "Car Emergency Kit",
    desc: "Jump cables, emergency flares, a first-aid kit, and a window breaker — everything you need for a roadside situation in the Magic Valley.",
    badge: "Highly Rated",
    badgeColor: "bg-slate-100 text-slate-700",
    href: "https://www.amazon.com/s?k=car+emergency+kit+roadside&tag=juniorsauto-20",
  },
  {
    title: "Digital Tire Pressure Gauge",
    desc: "Check your own tire pressure weekly. Proper inflation saves fuel, extends tire life, and improves safety — takes 60 seconds.",
    badge: "Quick Win",
    badgeColor: "bg-orange-100 text-orange-700",
    href: "https://www.amazon.com/s?k=digital+tire+pressure+gauge&tag=juniorsauto-20",
  },
  {
    title: "Oil Life Monitor Reset Tool",
    desc: "Just had an oil change? Reset your maintenance light yourself without a trip to the dealer. Works on most makes and models.",
    badge: "Handy",
    badgeColor: "bg-blue-100 text-blue-700",
    href: "https://www.amazon.com/s?k=oil+life+monitor+reset+tool&tag=juniorsauto-20",
  },
];

export default function AffiliateProducts() {
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-4 py-1.5 text-red-600 text-sm font-medium mb-5">
            <ShoppingBag size={14} />
            From Our Shop to Your Glove Box
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Keep Your Car Healthy Between Visits
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            A few tools every driver in Twin Falls should have. Pablo uses and recommends these.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group flex flex-col p-6 rounded-2xl border border-slate-100 hover:border-red-200 hover:shadow-lg transition-all bg-white cursor-pointer"
            >
              {/* Badge */}
              <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${p.badgeColor}`}>
                {p.badge}
              </span>

              {/* Title */}
              <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-red-600 transition-colors">
                {p.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-4">
                {p.desc}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-1.5 text-red-600 text-sm font-semibold group-hover:gap-2.5 transition-all">
                <span>View on Amazon</span>
                <ExternalLink size={14} />
              </div>
            </a>
          ))}
        </div>

        {/* Disclosure */}
        <p className="text-center text-xs text-slate-400 mt-8">
          As an Amazon Associate, Jr.&apos;s Auto Repair earns from qualifying purchases. Prices and availability are subject to change.
        </p>
      </div>
    </section>
  );
}
