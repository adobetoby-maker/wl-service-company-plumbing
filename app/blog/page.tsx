import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles } from "@/lib/articles";
import { Clock, Tag } from "lucide-react";

const categoryColors: Record<string, string> = {
  Maintenance: "bg-blue-100 text-blue-700",
  Safety: "bg-red-100 text-red-700",
  "Engine & Transmission": "bg-orange-100 text-orange-700",
  Tips: "bg-green-100 text-green-700",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50">
        <div className="bg-slate-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold mb-3">Auto Repair Tips & Advice</h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              Practical guides from Pablo and the team at Junior&apos;s — so you can make smart decisions about your vehicle.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group bg-white rounded-2xl border border-slate-100 hover:shadow-lg hover:border-red-200 transition-all overflow-hidden flex flex-col"
              >
                {article.heroImage && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={article.heroImage}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${categoryColors[article.category] ?? "bg-slate-100 text-slate-600"}`}>
                      <Tag size={10} />
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock size={10} />
                      {article.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{article.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-slate-400">{article.date}</span>
                    <span className="text-red-600 text-sm font-semibold group-hover:underline">Read more →</span>
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
