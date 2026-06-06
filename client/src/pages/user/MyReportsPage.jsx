import { Search } from "lucide-react";
import StatusBadge from "../../components/StatusBadge";

function MyReportsPage() {
  const reports = [
    {
      title: "Fake iPhone 15 Pro Max Giveaway",
      type: "Fake Giveaway",
      platform: "Facebook",
      status: "Verified",
      date: "May 19, 2025",
    },
    {
      title: "Investment Scheme Double Your Money",
      type: "Investment Scam",
      platform: "Messenger",
      status: "Pending",
      date: "May 18, 2025",
    },
    {
      title: "Phishing Link Instagram Security",
      type: "Phishing",
      platform: "Instagram",
      status: "Rejected",
      date: "May 15, 2025",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold">My Reports</h1>
        <p className="text-slate-500">
          Track and manage scam reports you submitted.
        </p>
      </div>

      <div className="card p-6">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-md flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input className="input pl-11" placeholder="Search reports..." />
          </div>

          <select className="input md:w-48">
            <option>Newest First</option>
            <option>Oldest First</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b text-slate-500">
                <th className="py-3">Report Title</th>
                <th>Type</th>
                <th>Platform</th>
                <th>Status</th>
                <th>Date Reported</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report) => (
                <tr key={report.title} className="border-b last:border-none">
                  <td className="py-4 font-semibold">{report.title}</td>
                  <td>{report.type}</td>
                  <td>{report.platform}</td>
                  <td>
                    <StatusBadge status={report.status} />
                  </td>
                  <td>{report.date}</td>
                  <td>
                    <button className="font-semibold text-primary">View</button>
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

export default MyReportsPage;