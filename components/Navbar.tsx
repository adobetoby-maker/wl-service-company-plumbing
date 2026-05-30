"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Wrench } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Wrench className="text-red-500" size={24} />
            <span>Junior&apos;s Auto Repair</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/#services" className="hover:text-red-400 transition-colors">Services</Link>
            <Link href="/#about" className="hover:text-red-400 transition-colors">About</Link>
            <Link href="/#reviews" className="hover:text-red-400 transition-colors">Reviews</Link>
            <Link href="/blog" className="hover:text-red-400 transition-colors">Articles</Link>
            <Link href="/how-to" className="hover:text-red-400 transition-colors">How-To</Link>
            <Link href="/founders" className="hover:text-red-400 transition-colors">Our Story</Link>
            <Link href="/#contact" className="hover:text-red-400 transition-colors">Contact</Link>
            <Link href="/portal" className="hover:text-red-400 transition-colors">Customer Portal</Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="tel:2085952101" className="flex items-center gap-1 text-sm text-slate-300 hover:text-white">
              <Phone size={14} />
              (208) 595-2101
            </a>
            <a
              href="/#contact"
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Book Appointment
            </a>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <nav className="flex flex-col px-4 py-4 gap-4 text-sm font-medium">
            <Link href="/#services" onClick={() => setOpen(false)} className="hover:text-red-400">Services</Link>
            <Link href="/#about" onClick={() => setOpen(false)} className="hover:text-red-400">About</Link>
            <Link href="/#reviews" onClick={() => setOpen(false)} className="hover:text-red-400">Reviews</Link>
            <Link href="/blog" onClick={() => setOpen(false)} className="hover:text-red-400">Articles</Link>
            <Link href="/how-to" onClick={() => setOpen(false)} className="hover:text-red-400">How-To</Link>
            <Link href="/founders" onClick={() => setOpen(false)} className="hover:text-red-400">Our Story</Link>
            <Link href="/#contact" onClick={() => setOpen(false)} className="hover:text-red-400">Contact</Link>
            <Link href="/portal" onClick={() => setOpen(false)} className="hover:text-red-400">Customer Portal</Link>
            <a
              href="/#contact"
              className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg text-center"
              onClick={() => setOpen(false)}
            >
              Book Appointment
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
