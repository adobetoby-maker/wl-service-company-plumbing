import Link from "next/link";
import { Wrench, Phone, MapPin, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-white text-lg mb-3">
              <Wrench className="text-red-500" size={20} />
              Junior&apos;s Auto Repair
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Honest auto repair in downtown Twin Falls, Idaho. Serving the Magic Valley since 2012.
            </p>
            <a
              href="https://www.facebook.com/Juniorsauto417/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
            >
              <ExternalLink size={14} />
              @Juniorsauto417
            </a>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-sm">
              {["Oil Changes", "Brake Service", "Transmission Repair", "Engine Repair", "Ignition Interlock"].map((s) => (
                <li key={s}>
                  <a href="/#services" className="hover:text-white transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#about" className="hover:text-white">About Pablo</Link></li>
              <li><Link href="/#reviews" className="hover:text-white">Reviews</Link></li>
              <li><Link href="/blog" className="hover:text-white">Articles</Link></li>
              <li><Link href="/portal" className="hover:text-white">Customer Portal</Link></li>
              <li><Link href="/#contact" className="hover:text-white">Book Appointment</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-red-500 mt-0.5 shrink-0" />
                <a
                  href="https://maps.google.com/?q=417+Main+Ave+E,+Twin+Falls,+ID+83301"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  417 Main Ave E<br />Twin Falls, ID 83301
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-red-500 shrink-0" />
                <a href="tel:2085952101" className="hover:text-white">(208) 595-2101</a>
              </div>
              <div className="text-xs leading-relaxed">
                <span className="text-white font-medium">Hours:</span><br />
                Mon–Sat: 9:00 AM – 5:00 PM<br />
                Sunday: Closed
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
          <p>© {new Date().getFullYear()} Junior&apos;s Auto Repair LLC. All rights reserved.</p>
          <p>
            <a
              href="https://maps.google.com/?q=417+Main+Ave+E,+Twin+Falls,+ID+83301"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              417 Main Ave E &middot; Twin Falls, ID 83301
            </a>
            {" · "}(208) 595-2101
          </p>
        </div>
        <div className="border-t border-slate-800/50 mt-4 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-600">
          <p>
            Website by{" "}
            <a href="https://worker-bee.app" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-300 transition-colors">
              Anderton &amp; Associates Web Services
            </a>
          </p>
          <Link href="/admin" className="text-slate-700 hover:text-slate-400 transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
