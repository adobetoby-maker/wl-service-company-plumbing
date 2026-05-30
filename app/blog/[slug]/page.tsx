import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles } from "@/lib/articles";
import { Clock, Tag, ChevronLeft, Phone } from "lucide-react";

const categoryColors: Record<string, string> = {
  Maintenance: "bg-blue-100 text-blue-700",
  Safety: "bg-red-100 text-red-700",
  "Engine & Transmission": "bg-orange-100 text-orange-700",
  Tips: "bg-green-100 text-green-700",
};

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const paragraphs = article.body.trim().split("\n\n");

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50">
        {/* Hero */}
        <div className="relative bg-slate-900 text-white">
          {article.heroImage && (
            <div className="h-64 md:h-80 overflow-hidden relative">
              <img
                src={article.heroImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            </div>
          )}
          <div className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 ${article.heroImage ? "pb-12 -mt-24 relative" : "py-12"}`}>
            <Link href="/blog" className="flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
              <ChevronLeft size={16} />
              Back to Articles
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${categoryColors[article.category] ?? "bg-slate-700 text-slate-300"}`}>
                <Tag size={10} />
                {article.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock size={10} />
                {article.readTime}
              </span>
              <span className="text-xs text-slate-400">{article.date}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">{article.title}</h1>
            <p className="text-slate-400 mt-3">By Pablo Zaldivar · Junior&apos;s Auto Repair, Twin Falls, ID</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm prose prose-slate max-w-none">
            {paragraphs.map((para, i) => {
              if (para.startsWith("**") && para.endsWith("**")) {
                return <h3 key={i} className="text-xl font-bold text-slate-900 mt-6 mb-2">{para.replace(/\*\*/g, "")}</h3>;
              }
              if (para.startsWith("- ")) {
                const items = para.split("\n").filter(l => l.startsWith("- "));
                return (
                  <ul key={i} className="list-disc list-inside text-slate-600 space-y-1 mb-4">
                    {items.map((item, j) => <li key={j}>{item.replace(/^- /, "").replace(/\*\*/g, "").replace(/`/g, "")}</li>)}
                  </ul>
                );
              }
              return <p key={i} className="text-slate-600 leading-relaxed mb-4">{para.replace(/\*\*/g, "")}</p>;
            })}
          </div>

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
