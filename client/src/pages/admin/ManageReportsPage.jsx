import { Eye, Search, ShieldCheck, Trash2, XCircle } from "lucide-react";
import Button from "../../components/Button";
import StatusBadge from "../../components/StatusBadge";

function ManageReportsPage() {
  const reports = [
    {
      id: "#RPT-2025-0248",
      title: "GCash Double Your Money Scam",
      type: "Phishing",
      platform: "Facebook",
      reporter: "Juan Dela Cruz",
      status: "Pending",
      date: "May 20, 2025",
    },
    {
      id: "#RPT-2025-0247",
      title: "Fake Shopee Delivery Fee Scam",
      type: "Fake Delivery",
      platform: "Messenger",
      reporter: "Maria Santos",
      status: "Verified",
      date: "May 19, 2025",
    },
    {
      id: "#RPT-2025-0246",
      title: "Fake BDO Banking Alert",
      type: "Banking Scam",
      platform: "SMS",
      reporter: "Pedro Reyes",
      status: "Rejected",
      date: "May 18, 2025",
    },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Manage Reports</h1>
          <p className="text-slate-500">
            Review, verify, and take action on submitted scam reports.
          </p>
        </div>

        <Button>New Report</Button>
      </div>

      <div className="card p-6">
        <div className="mb-5 grid gap-4 md:grid-cols-3">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input className="input pl-11" placeholder="Search reports..." />
          </div>

          <select className="input">
            <option>All Statuses</option>
          </select>

          <select className="input">
            <option>All Platforms</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b text-slate-500">
                <th className="py-3">ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Platform</th>
                <th>Reporter</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b last:border-none">
                  <td className="py-4 text-slate-500">{report.id}</td>
                  <td className="font-semibold">{report.title}</td>
                  <td>{report.type}</td>
                  <td>{report.platform}</td>
                  <td>{report.reporter}</td>
                  <td>
                    <StatusBadge status={report.status} />
                  </td>
                  <td>{report.date}</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="rounded-lg p-2 text-blue-600 hover:bg-blue-50">
                        <Eye size={17} />
                      </button>
                      <button className="rounded-lg p-2 text-green-600 hover:bg-green-50">
                        <ShieldCheck size={17} />
                      </button>
                      <button className="rounded-lg p-2 text-red-600 hover:bg-red-50">
                        <XCircle size={17} />
                      </button>
                      <button className="rounded-lg p-2 text-red-600 hover:bg-red-50">
                        <Trash2 size={17} />
                      </button>
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

export default ManageReportsPage;