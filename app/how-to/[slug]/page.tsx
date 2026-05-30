import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { howtos, HowTo } from "@/lib/howtos";
import { Clock, ChevronLeft, Phone, Wrench } from "lucide-react";

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

export function generateStaticParams() {
  return howtos.map((h) => ({ slug: h.slug }));
}

export default async function HowToPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const howto: HowTo | undefined = howtos.find((h) => h.slug === slug);
  if (!howto) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50">
        <div className="bg-slate-900 text-white py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/how-to"
              className="flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
            >
              <ChevronLeft size={16} />
              Back to Guides
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${difficultyColors[howto.difficulty] ?? "bg-slate-700 text-slate-300"}`}
              >
                {howto.difficulty}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock size={10} />
                {howto.time}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">{howto.title}</h1>
            <p className="text-slate-400 mt-3">By Pablo Zaldivar · Junior&apos;s Auto Repair, Twin Falls, ID</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero image */}
          <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-8">
            <Image
              src={howto.heroImage}
              alt={howto.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Tools list */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm mb-6">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Wrench size={14} />
              What You&apos;ll Need
            </h2>
            <div className="flex flex-wrap gap-2">
              {howto.tools.map((tool) => (
                <span
                  key={tool}
                  className="text-sm bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Warning box */}
          {howto.warning && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 mb-6">
              <p className="text-sm text-yellow-800 leading-relaxed">
                <span className="font-bold">⚠️ Before you start: </span>
                {howto.warning}
              </p>
            </div>
          )}

          {/* Steps */}
          <div className="space-y-4 mb-8">
            {howto.steps.map((step, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex gap-5"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-extrabold text-lg">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA block */}
          <div className="mt-8 bg-red-600 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-lg">Need service? We&apos;re ready.</p>
              <p className="text-red-200 text-sm">417 Main Ave E · Twin Falls, ID · Mon–Sat 9am–5pm</p>
            </div>
            <a
              href="tel:2085952101"
              className="flex items-center gap-2 bg-white text-red-600 font-bold px-6 py-3 rounded-xl hover:bg-red-50 transition-colors whitespace-nowrap"
            >
              <Phone size={16} />
              (208) 595-2101
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
