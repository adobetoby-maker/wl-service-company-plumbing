import { Wrench, Zap, Gauge, Thermometer, Settings, Car, Shield } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "General Auto Repair",
    desc: "Full-service repairs on all makes and models. If it&apos;s broken, we fix it.",
  },
  {
    icon: Gauge,
    title: "Oil Changes & Maintenance",
    desc: "Fast, affordable oil changes with a full vehicle inspection included.",
  },
  {
    icon: Shield,
    title: "Brake Service",
    desc: "Brake pads, rotors, calipers, and fluid. We keep you stopping safely.",
  },
  {
    icon: Settings,
    title: "Transmission Repair",
    desc: "Automatic and manual transmission diagnosis and repair.",
  },
  {
    icon: Zap,
    title: "Engine Repair",
    desc: "From minor tune-ups to full engine rebuilds — we do it all.",
  },
  {
    icon: Thermometer,
    title: "Water Pump & Belts",
    desc: "Cooling system repairs including water pump, thermostat, and belts.",
  },
  {
    icon: Car,
    title: "Ignition Interlock",
    desc: "Licensed ignition interlock device installation and servicing.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Our Services
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            From a simple oil change to a full engine overhaul — we handle it with the same care and honesty.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group p-6 rounded-2xl border border-slate-100 hover:border-red-200 hover:shadow-lg transition-all bg-white"
            >
              <div className="w-12 h-12 bg-red-50 group-hover:bg-red-100 rounded-xl flex items-center justify-center mb-4 transition-colors">
                <s.icon size={24} className="text-red-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: s.desc }} />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-xl transition-colors"
          >
            Schedule Your Service
          </a>
        </div>
      </div>
    </section>
  );
}
