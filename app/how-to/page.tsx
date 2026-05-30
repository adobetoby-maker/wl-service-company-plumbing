import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { howtos } from "@/lib/howtos";
import { Clock, Wrench } from "lucide-react";

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

export default function HowToPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50">
        <div className="bg-slate-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold mb-3">DIY Guides &amp; How-To</h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              Step-by-step guides from Pablo&apos;s team — fix common issues yourself or know when to call us.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {howtos.map((howto) => (
              <Link
                key={howto.slug}
                href={`/how-to/${howto.slug}`}
                className="group bg-white rounded-2xl border border-slate-100 hover:shadow-lg hover:border-red-200 transition-all overflow-hidden"
              >
                <div className="relative w-full h-[240px]">
                  <Image
                    src={howto.heroImage}
                    alt={howto.title}
                    width={400}
                    height={240}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${difficultyColors[howto.difficulty] ?? "bg-slate-100 text-slate-600"}`}
                    >
                      {howto.difficulty}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock size={10} />
                      {howto.time}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors leading-snug">
                    {howto.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{howto.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Wrench size={10} />
                      {howto.tools.slice(0, 2).join(", ")}
                      {howto.tools.length > 2 && "..."}
                    </span>
                    <span className="text-red-600 text-sm font-semibold group-hover:underline">
                      View guide →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
