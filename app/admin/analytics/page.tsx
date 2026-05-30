import { supabaseAdmin } from "@/lib/supabase/admin";
import { BarChart3, AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

const PUBLIC_ROUTES = [
  "/",
  "/blog",
  "/how-to",
  "/services",
  "/contact",
  "/founders",
  "/feedback",
  "/leave-a-review",
];

export const metadata = {
  title: "Analytics · Admin · Junior's Auto Repair",
};

export default async function AnalyticsPage() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Get page views in last 30 days
  const { data: pageViews, error } = await supabaseAdmin
    .from("page_views")
    .select("path")
    .gte("created_at", thirtyDaysAgo.toISOString());

  if (error) {
    console.error("Error fetching page views:", error);
  }

  const views = pageViews || [];

  // Calculate stats
  const pathCounts: Record<string, number> = views.reduce(
    (acc: Record<string, number>, pv: { path: string }) => {
      acc[pv.path] = (acc[pv.path] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const totalViews = views.length;
  const uniquePaths = Object.keys(pathCounts).length;

  // Top 20 paths
  const topPaths = Object.entries(pathCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20)
    .map(([path, count]) => ({
      path,
      views: count,
      percentage: ((count / totalViews) * 100).toFixed(1),
    }));

  // Find missed pages (public routes with zero views)
  const missedPages = PUBLIC_ROUTES.filter((route) => !pathCounts[route]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Page Analytics</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Last 30 days — {totalViews.toLocaleString()} total views across {uniquePaths} unique pages
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold mb-2">TOTAL VIEWS</div>
          <p className="text-3xl font-extrabold text-slate-900">{totalViews.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold mb-2">UNIQUE PAGES</div>
          <p className="text-3xl font-extrabold text-slate-900">{uniquePaths}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold mb-2">AVG VIEWS/PAGE</div>
          <p className="text-3xl font-extrabold text-slate-900">
            {uniquePaths > 0 ? (totalViews / uniquePaths).toFixed(0) : "—"}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Top Pages Visualization */}
        {topPaths.length > 0 && (
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BarChart3 size={18} className="text-red-500" />
              Top Pages
            </h2>
            <div className="space-y-3">
              {topPaths.slice(0, 10).map((p) => (
                <div key={p.path}>
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-xs bg-slate-50 px-2 py-1 rounded text-slate-600">
                      {p.path || "(root)"}
                    </code>
                    <span className="text-sm font-semibold text-slate-900">{p.views}</span>
                  </div>
                  <div className="bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-red-500 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(parseFloat(p.percentage), 100)}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{p.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Missed Pages */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertCircle size={18} className="text-amber-500" />
            No Visits (30 days)
          </h2>
          {missedPages.length === 0 ? (
            <div className="text-center text-slate-400 text-sm py-8">All major pages visited</div>
          ) : (
            <div className="space-y-2">
              {missedPages.map((page) => (
                <div key={page} className="text-sm bg-amber-50 px-3 py-2 rounded-lg text-amber-700 border border-amber-100">
                  <code className="font-mono text-xs">{page}</code>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Top Paths Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-900">All Pages (Top 20)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-slate-600">Page</th>
                <th className="text-right px-5 py-3 font-semibold text-slate-600">Views</th>
                <th className="text-right px-5 py-3 font-semibold text-slate-600">% of Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {topPaths.map((path) => (
                <tr key={path.path} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 text-slate-900 font-medium">
                    <code className="text-xs bg-slate-50 px-2 py-1 rounded">{path.path || "(root)"}</code>
                  </td>
                  <td className="text-right px-5 py-3 text-slate-600 font-semibold">
                    {path.views.toLocaleString()}
                  </td>
                  <td className="text-right px-5 py-3 text-slate-600">
                    <div className="w-24 ml-auto">
                      <div className="bg-slate-100 rounded-full h-2 mb-1">
                        <div
                          className="bg-red-500 h-full rounded-full"
                          style={{ width: `${Math.min(parseFloat(path.percentage), 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">{path.percentage}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
