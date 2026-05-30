import { CheckCircle, Award, Users, Calendar } from "lucide-react";

const stats = [
  { icon: Calendar, value: "13+", label: "Years in Business" },
  { icon: Users, value: "146+", label: "5-Star Reviews" },
  { icon: Award, value: "4.8★", label: "Average Rating" },
  { icon: CheckCircle, value: "100%", label: "Honest Estimates" },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-red-600 font-semibold text-sm uppercase tracking-widest">About Pablo</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-6">
              A Mechanic Who Treats Your Car Like His Own
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Pablo Zaldivar has been turning wrenches in Twin Falls since 2012. What started as a passion for
              fixing things the right way has grown into one of the Magic Valley&apos;s most trusted auto repair shops —
              Junior&apos;s Auto Repair, right in the heart of downtown.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Pablo built his reputation on three things: honest diagnosis, fair pricing, and standing behind
              his work. He won&apos;t recommend a repair you don&apos;t need, and he won&apos;t charge you more than he quoted.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              From oil changes to engine rebuilds, from daily drivers to work trucks — if it rolls into
              Junior&apos;s, it leaves running right.
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                "All Makes & Models",
                "Same-Day Service Available",
                "Free Estimates",
                "Licensed & Insured",
                "Ignition Interlock Certified",
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-white border border-slate-200 text-slate-700 text-sm px-3 py-1 rounded-full"
                >
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center"
                >
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <s.icon size={20} className="text-red-600" />
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 mb-1">{s.value}</div>
                  <div className="text-sm text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-red-600 text-white rounded-2xl p-6">
              <p className="font-semibold text-lg mb-1">&ldquo;He does reliable work at reasonable prices and always works with you.&rdquo;</p>
              <p className="text-red-200 text-sm">— Long-time customer, Google Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
