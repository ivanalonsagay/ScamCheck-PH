import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import StatusBadge from "../../components/StatusBadge";
import api from "../../services/api";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

function MyReportsPage() {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
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

  const filteredReports = useMemo(() => {
    return reports
      .filter((report) => {
        const searchText = `${report.title} ${report.scamType} ${report.platform} ${report.status}`.toLowerCase();
        return searchText.includes(searchTerm.toLowerCase());
      })
      .sort((a, b) => {
        const firstDate = new Date(a.createdAt).getTime();
        const secondDate = new Date(b.createdAt).getTime();
        return sortOrder === "newest" ? secondDate - firstDate : firstDate - secondDate;
      });
  }, [reports, searchTerm, sortOrder]);

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
            <input
              className="input pl-11"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <select
            className="input md:w-48"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
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
              {filteredReports.map((report) => (
                <tr key={report._id} className="border-b last:border-none">
                  <td className="py-4 font-semibold">{report.title}</td>
                  <td>{report.scamType}</td>
                  <td>{report.platform}</td>
                  <td>
                    <StatusBadge status={report.status} />
                  </td>
                  <td>{formatDate(report.createdAt)}</td>
                  <td>
                    <button className="font-semibold text-primary">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!loading && filteredReports.length === 0 && (
            <div className="py-10 text-center text-sm text-slate-500">
              No reports found.
            </div>
          )}

          {loading && (
            <div className="py-10 text-center text-sm text-slate-500">
              Loading your reports...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyReportsPage;
