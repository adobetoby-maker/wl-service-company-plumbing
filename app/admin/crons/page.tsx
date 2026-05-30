import { Timer } from "lucide-react";

const jobs = [
  { name: "SEO keyword rank check", schedule: "Daily at 8:00 AM", status: "not configured" },
  { name: "Overdue invoice sweep", schedule: "Daily at 9:00 AM", status: "not configured" },
  { name: "Customer follow-up reminders", schedule: "Weekly on Monday", status: "not configured" },
  { name: "Review request SMS", schedule: "24h after invoice paid", status: "not configured" },
];

export default function CronsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Agent Cron Jobs</h1>
        <p className="text-slate-500 text-sm">Scheduled tasks run automatically in the background</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
          <Timer size={16} className="text-slate-400" />
          <h2 className="font-bold text-slate-900">Scheduled Jobs</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {jobs.map((job) => (
            <div key={job.name} className="px-5 py-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900 text-sm">{job.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{job.schedule}</p>
              </div>
              <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                {job.status}
              </span>
            </div>
          ))}
        </div>
        <div className="px-5 py-4 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Cron jobs will be activated when the agent integration is configured.
          </p>
        </div>
      </div>
    </div>
  );
}
