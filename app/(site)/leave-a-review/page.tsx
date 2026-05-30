import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Star, MessageSquare, Heart } from "lucide-react";

export const metadata = {
  title: "Leave a Review | Junior's Auto Repair",
  description: "Share your experience at Junior's Auto Repair. Review us on Google, Facebook, or send direct feedback.",
};

export default function LeaveReviewPage() {
  const reviewLinks = [
    {
      platform: "Google",
      href: "https://g.page/jrs-auto-repair/review",
      description: "See our reviews and ratings",
      icon: Star,
      color: "from-blue-500 to-blue-600",
      text: "bg-blue-50 text-blue-700",
    },
    {
      platform: "Facebook",
      href: "https://facebook.com/jrsautorepair",
      description: "Review us on Facebook",
      icon: Heart,
      color: "from-blue-600 to-blue-700",
      text: "bg-blue-50 text-blue-700",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-b from-white to-slate-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
              Leave Us a Review
            </h1>
            <p className="text-xl text-slate-600">
              Your feedback helps us serve you better. Tell your friends about Junior's Auto Repair.
            </p>
          </div>

          {/* Main CTA Buttons */}
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {reviewLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.platform}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block bg-white rounded-2xl border-2 border-slate-100 shadow-lg hover:shadow-xl hover:border-red-200 transition-all p-8 text-center group`}
                >
                  <div className={`w-16 h-16 rounded-xl ${item.text} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    {item.platform}
                  </h2>
                  <p className="text-slate-600 mb-4">{item.description}</p>
                  <span className="inline-flex items-center text-red-500 font-semibold group-hover:gap-2 transition-all gap-1">
                    Review Now →
                  </span>
                </a>
              );
            })}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-slate-500 font-medium">OR</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Feedback Form CTA */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border-2 border-red-200 shadow-lg p-8 text-center">
            <MessageSquare size={40} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Prefer to Tell Us Directly?
            </h2>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Send us direct feedback about your experience. We read every message and appreciate your input.
            </p>
            <Link
              href="/feedback"
              className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-colors"
            >
              Send Feedback
            </Link>
          </div>

          {/* Info Box */}
          <div className="mt-12 bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Why Leave a Review?</h3>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold mt-0.5">•</span>
                <span>Help other car owners find a trusted mechanic in Twin Falls</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold mt-0.5">•</span>
                <span>Share your honest experience so we can continue to improve</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold mt-0.5">•</span>
                <span>Support a local business with over 13 years of service in Magic Valley</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
