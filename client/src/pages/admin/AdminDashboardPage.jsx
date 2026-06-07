import { AlertCircle, CheckCircle, Clock3, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";
import api from "../../services/api";

const CHART_COLORS = ["#2563eb", "#f97316", "#22c55e", "#ef4444", "#8b5cf6"];

function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await api.get("/reports/stats");
        setStats(data.stats);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const typeData =
    stats?.reportsByType?.map((item) => ({
      name: item._id || "Other",
      value: item.count,
    })) || [];

  const barData =
    stats?.reportsOverTime?.map((item) => ({
      day: item.label,
      reports: item.count,
    })) || [];

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-primary">Admin Dashboard</p>
        <h1 className="text-3xl font-extrabold">Overview</h1>
        <p className="text-slate-500">
          Monitor scam reports, verification status, and community warning trends.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        <StatCard
          icon={FileText}
          label="Total Reports"
          value={loading ? "..." : stats?.totalReports || 0}
          note="All reports"
        />
        <StatCard
          icon={Clock3}
          label="Pending Verification"
          value={loading ? "..." : stats?.pendingReports || 0}
          note="Needs review"
          color="amber"
        />
        <StatCard
          icon={CheckCircle}
          label="Verified Scams"
          value={loading ? "..." : stats?.verifiedReports || 0}
          note="Public warnings"
          color="green"
        />
        <StatCard
          icon={AlertCircle}
          label="Rejected Reports"
          value={loading ? "..." : stats?.rejectedReports || 0}
          note="Not confirmed"
          color="red"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="mb-4 text-xl font-bold">Reports by Type</h2>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={typeData} dataKey="value" outerRadius={100} label>
                  {typeData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="mb-4 text-xl font-bold">Reports Over Time</h2>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={barData}>
                <XAxis dataKey="day" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="reports" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card mt-8 p-6">
        <h2 className="mb-5 text-xl font-bold">Recent Reports</h2>

        <div className="space-y-4">
          {stats?.recentReports?.map((report) => (
            <div
              key={report._id}
              className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="font-bold">{report.title}</h3>
                <p className="text-sm text-slate-500">
                  {report.scamType} via {report.platform}
                </p>
              </div>

              <StatusBadge status={report.status} />
            </div>
          ))}

          {!loading && !stats?.recentReports?.length && (
            <p className="text-sm text-slate-500">No reports yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
