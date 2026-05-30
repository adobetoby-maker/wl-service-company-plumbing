import { Star } from "lucide-react";

const reviews = [
  {
    name: "Mark K.",
    rating: 5,
    date: "3 years ago",
    text: "Junior was able to squeeze me in for urgent repairs before a big weekend trip. Water pump, belt, and thermostat — all done same day. Couldn't believe it. Saved us.",
    source: "Google",
  },
  {
    name: "Sarah M.",
    rating: 5,
    date: "1 year ago",
    text: "I've been going to Junior's for a few years now. Extremely content with how he runs his business. Reliable work, reasonable prices, and always works with you.",
    source: "Google",
  },
  {
    name: "David R.",
    rating: 5,
    date: "8 months ago",
    text: "Does what he said he would do for the price he said he would do it. That alone puts him miles ahead of every other shop I've been to in Twin Falls.",
    source: "Google",
  },
  {
    name: "Jessica T.",
    rating: 5,
    date: "6 months ago",
    text: "Pablo diagnosed my car in 20 minutes. Other shops had it for two days and still weren't sure. Honest, fast, and fair. This is my shop from now on.",
    source: "Google",
  },
  {
    name: "Carlos V.",
    rating: 5,
    date: "4 months ago",
    text: "Best mechanic in the Magic Valley, no question. He takes pride in his work and it shows. My whole family brings their cars here now.",
    source: "Facebook",
  },
  {
    name: "Linda H.",
    rating: 5,
    date: "2 months ago",
    text: "Called in a panic when my brakes started grinding. Pablo got me in the same afternoon. Professional, quick, and the price was exactly what he quoted.",
    source: "Google",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            What Our Customers Say
          </h2>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Junior%27s+Auto+Repair+Twin+Falls+ID"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mb-2 hover:opacity-80 transition-opacity"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="font-bold text-slate-900 text-xl">4.8</span>
            <span className="text-slate-500">&middot; 146 Google Reviews</span>
          </a>
          <p className="text-slate-500 text-sm">Based on Google &amp; Facebook reviews</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-slate-900">{r.name}</p>
                  <p className="text-xs text-slate-400">{r.date} &middot; {r.source}</p>
                </div>
                <div className="flex">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">&ldquo;{r.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
