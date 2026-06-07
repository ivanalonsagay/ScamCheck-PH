import { ExternalLink, Search, X } from "lucide-react";
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
  const [selectedReport, setSelectedReport] = useState(null);

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
                    <button
                      className="inline-flex items-center gap-1 font-semibold text-primary hover:text-blue-700"
                      onClick={() => setSelectedReport(report)}
                    >
                      View
                      <ExternalLink size={14} />
                    </button>
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

      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 px-5 py-8">
          <article className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-soft">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <StatusBadge status={selectedReport.status} />
                <h2 className="mt-4 text-2xl font-extrabold text-slate-950">
                  {selectedReport.title}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  {selectedReport.scamType} via {selectedReport.platform}
                </p>
              </div>

              <button
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                onClick={() => setSelectedReport(null)}
                aria-label="Close report details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              <div className="rounded-xl bg-slate-50 p-4">
                <h3 className="text-sm font-bold text-slate-950">Description</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {selectedReport.description}
                </p>
              </div>

              {selectedReport.suspiciousLink && (
                <div>
                  <h3 className="text-sm font-bold text-slate-950">
                    Suspicious Link / Contact
                  </h3>
                  <p className="mt-2 break-words rounded-xl border border-slate-100 p-3 text-sm text-slate-600">
                    {selectedReport.suspiciousLink}
                  </p>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-100 p-4">
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Date Reported
                  </p>
                  <p className="mt-2 font-semibold">
                    {formatDate(selectedReport.createdAt)}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 p-4">
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Risk Level
                  </p>
                  <p className="mt-2 font-semibold">
                    {selectedReport.riskLevel || "Pending review"}
                  </p>
                </div>
              </div>

              {selectedReport.safetyTip && (
                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <h3 className="text-sm font-bold text-slate-950">
                    Admin Safety Tip
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {selectedReport.safetyTip}
                  </p>
                </div>
              )}

              {selectedReport.adminRemarks && (
                <div className="rounded-xl border border-slate-100 p-4">
                  <h3 className="text-sm font-bold text-slate-950">
                    Admin Remarks
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {selectedReport.adminRemarks}
                  </p>
                </div>
              )}
            </div>
          </article>
        </div>
      )}
    </div>
  );
}

export default MyReportsPage;
