import { AlertCircle, CheckCircle, Clock3, FileText } from "lucide-react";
import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";

function UserDashboardPage() {
  const recentReports = [
    {
      title: "GCash Double Your Money Scam",
      type: "Phishing",
      status: "Verified",
    },
    {
      title: "Fake Shopee Delivery Fee",
      type: "Fake Delivery",
      status: "Pending",
    },
    {
      title: "Telegram Investment Group",
      type: "Investment Scam",
      status: "Rejected",
    },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Good morning, Juan!</h1>
          <p className="text-slate-500">
            Thank you for helping keep our community safe.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        <StatCard icon={FileText} label="Total Reports" value="12" note="All time" />
        <StatCard icon={Clock3} label="Pending" value="3" note="Awaiting review" color="amber" />
        <StatCard icon={CheckCircle} label="Verified" value="7" note="Confirmed scams" color="green" />
        <StatCard icon={AlertCircle} label="Rejected" value="2" note="Not confirmed" color="red" />
      </div>

      <div className="card mt-8 p-6">
        <h2 className="mb-5 text-xl font-bold">Recent Activity</h2>

        <div className="space-y-4">
          {recentReports.map((report) => (
            <div
              key={report.title}
              className="flex flex-col gap-3 rounded-2xl border border-slate-100 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="font-bold">{report.title}</h3>
                <p className="text-sm text-slate-500">{report.type}</p>
              </div>

              <StatusBadge status={report.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDashboardPage;