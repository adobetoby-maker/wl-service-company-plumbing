"use client";
import { useState } from "react";
import { MapPin, Phone, Clock, ExternalLink, Send } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", vehicle: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Get in Touch</h2>
          <p className="text-slate-400 text-lg">Book an appointment or drop us a message — we&apos;ll get back to you fast.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-6">Shop Information</h3>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-semibold">Address</p>
                  <a
                    href="https://maps.google.com/?q=417+Main+Ave+E,+Twin+Falls,+ID+83301"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <p>417 Main Ave E</p>
                    <p>Twin Falls, ID 83301</p>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="font-semibold">Phone</p>
                  <a href="tel:2085952101" className="text-slate-400 hover:text-white transition-colors">
                    (208) 595-2101
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="font-semibold">Hours</p>
                  <p className="text-slate-400">Monday – Saturday: 9:00 AM – 5:00 PM</p>
                  <p className="text-slate-400">Sunday: Closed</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <ExternalLink size={18} />
                </div>
                <div>
                  <p className="font-semibold">Facebook</p>
                  <a
                    href="https://www.facebook.com/Juniorsauto417/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    @Juniorsauto417
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl overflow-hidden border border-slate-700">
              <iframe
                title="Junior's Auto Repair location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.5!2d-114.4608!3d42.5627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54a9a4b9e1234567%3A0xabcdef1234567890!2s417+Main+Ave+E%2C+Twin+Falls%2C+ID+83301!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Book an Appointment</h3>

            {sent ? (
              <div className="bg-green-900/50 border border-green-600 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-3">✅</div>
                <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                <p className="text-slate-300">We&apos;ll give you a call back within a few hours to confirm your appointment.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Your Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Phone *</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                      placeholder="(208) 555-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Vehicle (Year / Make / Model)</label>
                  <input
                    name="vehicle"
                    value={form.vehicle}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    placeholder="2019 Toyota Camry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">What&apos;s going on? *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 resize-none"
                    placeholder="Describe what your vehicle needs or what you're experiencing..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
