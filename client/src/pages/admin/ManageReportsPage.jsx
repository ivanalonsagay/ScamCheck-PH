import {
  AlertTriangle,
  CheckCircle2,
  Eye,
  Search,
  ShieldCheck,
  Trash2,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Button from "../../components/Button";
import StatusBadge from "../../components/StatusBadge";
import { PLATFORMS } from "../../constants";
import api from "../../services/api";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

function ManageReportsPage() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [reviewForm, setReviewForm] = useState({
    safetyTip: "",
    adminRemarks: "",
    riskLevel: "Medium Risk",
  });

  const loadReports = async () => {
    const { data } = await api.get("/reports");
    setReports(data.reports || []);
  };

  useEffect(() => {
    const init = async () => {
      try {
        await loadReports();
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const reporter = report.submittedBy?.name || "";
      const searchText = `${report.title} ${report.scamType} ${report.platform} ${report.status} ${reporter}`.toLowerCase();
      const matchesSearch = searchText.includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || report.status === statusFilter;
      const matchesPlatform =
        platformFilter === "all" || report.platform === platformFilter;

      return matchesSearch && matchesStatus && matchesPlatform;
    });
  }, [reports, searchTerm, statusFilter, platformFilter]);

  const openReport = (report) => {
    setSelectedReport(report);
    setReviewForm({
      safetyTip: report.safetyTip || "",
      adminRemarks: report.adminRemarks || "",
      riskLevel: report.riskLevel || "Medium Risk",
    });
  };

  const updateStatus = async (report, status) => {
    const safetyTip =
      reviewForm.safetyTip ||
      report.safetyTip ||
      "Verify links, sender identity, and payment requests before taking action.";

    setSavingId(report._id);
    setNotice("");
    setError("");

    try {
      const payload = {
        status,
        adminRemarks: reviewForm.adminRemarks || report.adminRemarks,
        riskLevel: reviewForm.riskLevel || report.riskLevel,
      };

      if (status === "Verified") {
        payload.safetyTip = safetyTip;
      }

      const { data } = await api.patch(`/reports/${report._id}/status`, payload);

      setReports((current) =>
        current.map((item) => (item._id === report._id ? data.report : item))
      );
      setSelectedReport(data.report);
      setNotice(`Report marked as ${status}.`);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update report.");
    } finally {
      setSavingId("");
    }
  };

  const deleteReport = async (report) => {
    const confirmed = window.confirm(`Delete "${report.title}" permanently?`);

    if (!confirmed) {
      return;
    }

    setSavingId(report._id);
    setNotice("");
    setError("");

    try {
      await api.delete(`/reports/${report._id}`);
      setReports((current) => current.filter((item) => item._id !== report._id));
      setSelectedReport(null);
      setNotice("Report deleted.");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete report.");
    } finally {
      setSavingId("");
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">Reports Management</p>
          <h1 className="text-3xl font-extrabold">Manage Reports</h1>
          <p className="text-slate-500">
            Review, verify, and reject submitted scam reports before public display.
          </p>
        </div>

        <Button onClick={loadReports}>Refresh</Button>
      </div>

      {notice && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <CheckCircle2 size={18} />
          {notice}
        </div>
      )}

      {error && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertTriangle size={18} />
          {error}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="card p-6">
          <div className="mb-5 grid gap-4 md:grid-cols-3">
            <div className="relative">
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
              className="input"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="all">All Statuses</option>
              <option>Pending</option>
              <option>Verified</option>
              <option>Rejected</option>
            </select>

            <select
              className="input"
              value={platformFilter}
              onChange={(event) => setPlatformFilter(event.target.value)}
            >
              <option value="all">All Platforms</option>
              {PLATFORMS.map((platform) => (
                <option key={platform}>{platform}</option>
              ))}
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
                {filteredReports.map((report) => (
                  <tr key={report._id} className="border-b last:border-none">
                    <td className="py-4 text-slate-500">
                      #{report._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="font-semibold">{report.title}</td>
                    <td>{report.scamType}</td>
                    <td>{report.platform}</td>
                    <td>{report.submittedBy?.name || "Unknown"}</td>
                    <td>
                      <StatusBadge status={report.status} />
                    </td>
                    <td>{formatDate(report.createdAt)}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                          onClick={() => openReport(report)}
                          title="View report"
                        >
                          <Eye size={17} />
                        </button>
                        <button
                          className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                          onClick={() => updateStatus(report, "Verified")}
                          disabled={savingId === report._id}
                          title="Verify report"
                        >
                          <ShieldCheck size={17} />
                        </button>
                        <button
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                          onClick={() => updateStatus(report, "Rejected")}
                          disabled={savingId === report._id}
                          title="Reject report"
                        >
                          <XCircle size={17} />
                        </button>
                        <button
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                          onClick={() => deleteReport(report)}
                          disabled={savingId === report._id}
                          title="Delete report"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
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
                Loading reports...
              </div>
            )}
          </div>
        </div>

        <aside className="card p-6">
          <h2 className="text-xl font-bold">Review Panel</h2>

          {selectedReport ? (
            <div className="mt-5 space-y-5">
              <div>
                <StatusBadge status={selectedReport.status} />
                <h3 className="mt-4 text-lg font-bold">{selectedReport.title}</h3>
                <p className="mt-2 text-sm text-slate-500">
                  {selectedReport.scamType} via {selectedReport.platform}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                {selectedReport.description}
              </div>

              {selectedReport.suspiciousLink && (
                <div>
                  <p className="text-sm font-semibold">Suspicious Link / Contact</p>
                  <p className="mt-1 break-words text-sm text-slate-600">
                    {selectedReport.suspiciousLink}
                  </p>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-semibold">Risk Level</label>
                <select
                  className="input"
                  value={reviewForm.riskLevel}
                  onChange={(event) =>
                    setReviewForm((current) => ({
                      ...current,
                      riskLevel: event.target.value,
                    }))
                  }
                >
                  <option>Low Risk</option>
                  <option>Medium Risk</option>
                  <option>High Risk</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Safety Tip</label>
                <textarea
                  className="input min-h-24 resize-none"
                  placeholder="Example: Never share OTPs or click unknown banking links."
                  value={reviewForm.safetyTip}
                  onChange={(event) =>
                    setReviewForm((current) => ({
                      ...current,
                      safetyTip: event.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Admin Remarks</label>
                <textarea
                  className="input min-h-24 resize-none"
                  placeholder="Internal review notes..."
                  value={reviewForm.adminRemarks}
                  onChange={(event) =>
                    setReviewForm((current) => ({
                      ...current,
                      adminRemarks: event.target.value,
                    }))
                  }
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Button
                  onClick={() => updateStatus(selectedReport, "Verified")}
                  disabled={savingId === selectedReport._id}
                >
                  <ShieldCheck size={17} />
                  Verify
                </Button>
                <Button
                  variant="danger"
                  onClick={() => updateStatus(selectedReport, "Rejected")}
                  disabled={savingId === selectedReport._id}
                >
                  <XCircle size={17} />
                  Reject
                </Button>
              </div>
            </div>
          ) : (
            <p className="mt-5 text-sm text-slate-500">
              Select a report to review details, add a safety tip, and choose a final status.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}

export default ManageReportsPage;
