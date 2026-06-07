import { AlertCircle, BarChart3, CheckCircle, Clock3, FileText } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import StatCard from "../../components/StatCard";
import api from "../../services/api";

const COLORS = ["#2563eb", "#f97316", "#22c55e", "#ef4444", "#8b5cf6", "#06b6d4"];

function AnalyticsPage() {
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

  const typeData = useMemo(
    () =>
      stats?.reportsByType?.map((item) => ({
        name: item._id || "Other",
        value: item.count,
      })) || [],
    [stats]
  );

  const platformData = useMemo(
    () =>
      stats?.reportsByPlatform?.map((item) => ({
        name: item._id || "Other",
        reports: item.count,
      })) || [],
    [stats]
  );

  const trendData = useMemo(
    () =>
      stats?.reportsOverTime?.map((item) => ({
        day: item.label,
        reports: item.count,
      })) || [],
    [stats]
  );

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-primary">Analytics</p>
        <h1 className="text-3xl font-extrabold">Report Insights</h1>
        <p className="text-slate-500">
          Review scam trends by type, platform, and verification status.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        <StatCard icon={FileText} label="Total Reports" value={loading ? "..." : stats?.totalReports || 0} note="All submissions" />
        <StatCard icon={Clock3} label="Pending Verification" value={loading ? "..." : stats?.pendingReports || 0} note="Needs review" color="amber" />
        <StatCard icon={CheckCircle} label="Verified Scams" value={loading ? "..." : stats?.verifiedReports || 0} note="Published warnings" color="green" />
        <StatCard icon={AlertCircle} label="Rejected Reports" value={loading ? "..." : stats?.rejectedReports || 0} note="Not confirmed" color="red" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <div className="mb-4 flex items-center gap-3">
            <BarChart3 className="text-primary" />
            <h2 className="text-xl font-bold">Reports Over Time</h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer>
              <BarChart data={trendData}>
                <XAxis dataKey="day" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="reports" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="mb-4 text-xl font-bold">Reports by Scam Type</h2>
          <div className="h-80">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={typeData} dataKey="value" nameKey="name" outerRadius={110} label>
                  {typeData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card mt-8 p-6">
        <h2 className="mb-5 text-xl font-bold">Top Platforms</h2>
        <div className="h-80">
          <ResponsiveContainer>
            <BarChart data={platformData} layout="vertical" margin={{ left: 40 }}>
              <XAxis type="number" allowDecimals={false} />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="reports" fill="#0f62fe" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
