import { supabaseAdmin } from "@/lib/supabase/admin";
import { Star, Mail } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Feedback · Admin · Junior's Auto Repair",
};

export default async function FeedbackPage() {
  const { data: allFeedback, error } = await supabaseAdmin
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching feedback:", error);
  }

  const feedback = allFeedback || [];

  // Calculate stats
  const avgRating =
    feedback.length > 0
      ? (feedback.reduce((sum: number, f: any) => sum + (f.rating || 0), 0) / feedback.length).toFixed(1)
      : null;
  const ratedCount = feedback.filter((f: any) => f.rating).length;
  const withEmail = feedback.filter((f: any) => f.email).length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Customer Feedback</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          {feedback.length} submission{feedback.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold mb-2">TOTAL FEEDBACK</div>
          <p className="text-3xl font-extrabold text-slate-900">{feedback.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold mb-2">AVG RATING</div>
          <p className="text-3xl font-extrabold text-slate-900">{avgRating || "—"}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold mb-2">WITH RATING</div>
          <p className="text-3xl font-extrabold text-slate-900">{ratedCount}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold mb-2">WITH EMAIL</div>
          <p className="text-3xl font-extrabold text-slate-900">{withEmail}</p>
        </div>
      </div>

      {/* All Feedback List */}
      {feedback.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
          <p className="text-slate-400">No feedback yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y">
          {feedback.map((item: any) => (
            <div key={item.id} className="p-5 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {item.name || "Anonymous"}
                  </h3>
                  {item.email && (
                    <a
                      href={`mailto:${item.email}`}
                      className="text-xs text-red-500 hover:underline flex items-center gap-1"
                    >
                      <Mail size={12} />
                      {item.email}
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {item.rating ? (
                    <>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < item.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300"
                          }
                        />
                      ))}
                    </>
                  ) : null}
                </div>
              </div>
              <p className="text-sm text-slate-700 mb-2">{item.message}</p>
              <p className="text-xs text-slate-400">
                {new Date(item.created_at).toLocaleDateString()} at{" "}
                {new Date(item.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
