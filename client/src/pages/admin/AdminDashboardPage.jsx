import { AlertCircle, CheckCircle, Clock3, FileText } from "lucide-react";
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

function AdminDashboardPage() {
  const typeData = [
    { name: "Phishing", value: 40 },
    { name: "Fake Delivery", value: 25 },
    { name: "Investment", value: 20 },
    { name: "Other", value: 15 },
  ];

  const barData = [
    { day: "Mon", reports: 12 },
    { day: "Tue", reports: 19 },
    { day: "Wed", reports: 15 },
    { day: "Thu", reports: 24 },
    { day: "Fri", reports: 18 },
  ];

  const recentReports = [
    {
      title: "GCash Double Your Money Scam",
      type: "Phishing",
      status: "Verified",
    },
    {
      title: "Shopee Fake Delivery Fee",
      type: "Fake Delivery",
      status: "Pending",
    },
    {
      title: "Fake BDO Banking Alert",
      type: "Banking Scam",
      status: "Rejected",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold">Overview</h1>
        <p className="text-slate-500">
          Welcome back, Admin. Here is what is happening on ScamCheck PH.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        <StatCard icon={FileText} label="Total Reports" value="248" note="All reports" />
        <StatCard icon={Clock3} label="Pending Review" value="28" note="Needs review" color="amber" />
        <StatCard icon={CheckCircle} label="Verified" value="184" note="Public warnings" color="green" />
        <StatCard icon={AlertCircle} label="Rejected" value="36" note="Not valid" color="red" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="mb-4 text-xl font-bold">Reports by Type</h2>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={typeData} dataKey="value" outerRadius={100} label>
                  {typeData.map((entry, index) => (
                    <Cell key={entry.name} />
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
                <YAxis />
                <Tooltip />
                <Bar dataKey="reports" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card mt-8 p-6">
        <h2 className="mb-5 text-xl font-bold">Recent Reports</h2>

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

export default AdminDashboardPage;