import { AlertCircle, CheckCircle, Clock3, FileText, PlusCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

function UserDashboardPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const { data } = await api.get("/reports/my-reports");
        setReports(data.reports || []);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  const reportCounts = useMemo(() => {
    return reports.reduce(
      (counts, report) => ({
        ...counts,
        [report.status]: counts[report.status] + 1,
      }),
      {
        Pending: 0,
        Verified: 0,
        Rejected: 0,
      }
    );
  }, [reports]);

  const recentReports = reports.slice(0, 5);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">User Dashboard</p>
          <h1 className="text-3xl font-extrabold">
            Welcome back, {user?.name || "ScamCheck user"}.
          </h1>
          <p className="text-slate-500">
            Track your submitted scam reports and their verification status.
          </p>
        </div>

        <Link to="/dashboard/submit-report">
          <Button>
            <PlusCircle size={18} />
            Report a Scam
          </Button>
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        <StatCard
          icon={FileText}
          label="Total Reports"
          value={loading ? "..." : reports.length}
          note="All time"
        />
        <StatCard
          icon={Clock3}
          label="Pending Verification"
          value={loading ? "..." : reportCounts.Pending}
          note="Awaiting review"
          color="amber"
        />
        <StatCard
          icon={CheckCircle}
          label="Verified Scams"
          value={loading ? "..." : reportCounts.Verified}
          note="Confirmed scams"
          color="green"
        />
        <StatCard
          icon={AlertCircle}
          label="Rejected Reports"
          value={loading ? "..." : reportCounts.Rejected}
          note="Not confirmed"
          color="red"
        />
      </div>

      <div className="card mt-8 p-6">
        <h2 className="mb-5 text-xl font-bold">Recent Activity</h2>

        <div className="space-y-4">
          {recentReports.map((report) => (
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

          {!loading && recentReports.length === 0 && (
            <p className="text-sm text-slate-500">
              You have not submitted any reports yet.
            </p>
          )}

          {loading && <p className="text-sm text-slate-500">Loading reports...</p>}
        </div>
      </div>
    </div>
  );
}

export default UserDashboardPage;
