import {
  Bookmark,
  BookmarkCheck,
  CalendarDays,
  ExternalLink,
  RefreshCw,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import StatusBadge from "../../components/StatusBadge";
import { PLATFORMS, SCAM_TYPES } from "../../constants";
import api from "../../services/api";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const formatTime = (date) =>
  new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

function WarningsPage() {
  const [warnings, setWarnings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [newWarningCount, setNewWarningCount] = useState(0);
  const [selectedWarning, setSelectedWarning] = useState(null);
  const [intelReports, setIntelReports] = useState([]);
  const [intelLoading, setIntelLoading] = useState(true);
  const [intelRefreshing, setIntelRefreshing] = useState(false);
  const [intelError, setIntelError] = useState("");
  const [intelLastUpdated, setIntelLastUpdated] = useState(null);
  const [intelRefreshCount, setIntelRefreshCount] = useState(0);
  const [selectedIntelReport, setSelectedIntelReport] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    const savedBookmarks = JSON.parse(
      localStorage.getItem("scamcheck_bookmarks") || "[]"
    );
    return savedBookmarks.map((bookmark) => bookmark._id);
  });

  const loadWarnings = async ({ silent = false } = {}) => {
    try {
      if (silent) {
        setRefreshing(true);
      }

      const { data } = await api.get("/reports/public");
      const nextWarnings = data.reports || [];

      setWarnings((currentWarnings) => {
        if (currentWarnings.length > 0) {
          const currentIds = new Set(currentWarnings.map((warning) => warning._id));
          const incomingCount = nextWarnings.filter(
            (warning) => !currentIds.has(warning._id)
          ).length;

          if (incomingCount > 0) {
            setNewWarningCount((current) => current + incomingCount);
          }
        }

        return nextWarnings;
      });
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadWarnings();

    const interval = setInterval(() => {
      loadWarnings({ silent: true });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const loadIntelReports = async ({ silent = false } = {}) => {
    try {
      setIntelError("");

      if (silent) {
        setIntelRefreshing(true);
      }

      const { data } = await api.get("/reports/phishing-live", {
        params: {
          t: Date.now(),
        },
      });

      setIntelReports(data.reports || []);
      setIntelLastUpdated(data.fetchedAt ? new Date(data.fetchedAt) : new Date());
      setIntelRefreshCount((current) => current + 1);
    } catch (err) {
      setIntelError(
        err.response?.data?.message || "Unable to load phishing intelligence."
      );
    } finally {
      setIntelLoading(false);
      setIntelRefreshing(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadIntelReports();

    const interval = setInterval(() => {
      loadIntelReports({ silent: true });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const toggleBookmark = (event, warning) => {
    event.stopPropagation();

    const savedBookmarks = JSON.parse(
      localStorage.getItem("scamcheck_bookmarks") || "[]"
    );
    const isBookmarked = savedBookmarks.some((bookmark) => bookmark._id === warning._id);

    const nextBookmarks = isBookmarked
      ? savedBookmarks.filter((bookmark) => bookmark._id !== warning._id)
      : [
          ...savedBookmarks,
          {
            _id: warning._id,
            title: warning.title,
            scamType: warning.scamType,
            platform: warning.platform,
            riskLevel: warning.riskLevel,
            description: warning.description,
            safetyTip: warning.safetyTip,
            suspiciousLink: warning.suspiciousLink,
            createdAt: warning.createdAt,
            updatedAt: warning.updatedAt,
          },
        ];

    localStorage.setItem("scamcheck_bookmarks", JSON.stringify(nextBookmarks));
    setBookmarkedIds(nextBookmarks.map((bookmark) => bookmark._id));
  };

  const filteredWarnings = useMemo(() => {
    return warnings
      .filter((warning) => {
        const searchText = `${warning.title} ${warning.scamType} ${warning.platform} ${warning.description}`.toLowerCase();
        const matchesSearch = searchText.includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === "all" || warning.scamType === typeFilter;
        const matchesPlatform =
          platformFilter === "all" || warning.platform === platformFilter;

        return matchesSearch && matchesType && matchesPlatform;
      })
      .sort((a, b) => {
        const firstDate = new Date(a.updatedAt).getTime();
        const secondDate = new Date(b.updatedAt).getTime();
        return sortOrder === "newest" ? secondDate - firstDate : firstDate - secondDate;
      });
  }, [warnings, searchTerm, typeFilter, platformFilter, sortOrder]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Live updates enabled
          </div>
          <h1 className="text-4xl font-extrabold text-slate-950">
            Verified Scam Warnings
          </h1>
          <p className="mt-2 text-slate-600">
            These reports are reviewed by admins before being shown publicly.
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Auto-refreshes every 15 seconds
            {lastUpdated ? ` • Last updated ${formatTime(lastUpdated)}` : ""}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 md:max-w-xl md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              className="input pl-12"
              placeholder="Search scams, keywords, or platforms..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary bg-white px-4 py-3 text-sm font-semibold text-primary hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => loadWarnings({ silent: true })}
            disabled={refreshing}
          >
            <RefreshCw size={17} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {newWarningCount > 0 && (
        <button
          className="mb-6 w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-primary hover:bg-blue-100"
          onClick={() => setNewWarningCount(0)}
        >
          {newWarningCount} new verified warning
          {newWarningCount > 1 ? "s" : ""} added
        </button>
      )}

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <select
          className="input"
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
        >
          <option value="all">All Scam Types</option>
          {SCAM_TYPES.map((type) => (
            <option key={type}>{type}</option>
          ))}
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

        <select
          className="input"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
        >
          <option value="newest">Sort by: Newest</option>
          <option value="oldest">Sort by: Oldest</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {filteredWarnings.map((warning) => (
          <article
            key={warning._id}
            className="card cursor-pointer p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-soft"
            onClick={() => setSelectedWarning(warning)}
          >
            <div className="flex items-start justify-between gap-3">
              <StatusBadge status={warning.riskLevel} />
              <button
                className="rounded-lg p-2 text-primary hover:bg-blue-50"
                onClick={(event) => toggleBookmark(event, warning)}
                title={
                  bookmarkedIds.includes(warning._id)
                    ? "Remove bookmark"
                    : "Save bookmark"
                }
              >
                {bookmarkedIds.includes(warning._id) ? (
                  <BookmarkCheck size={18} />
                ) : (
                  <Bookmark size={18} />
                )}
              </button>
            </div>

            <div className="mt-5 flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-primary">
                <ShieldCheck size={28} />
              </div>

              <div>
                <h3 className="text-lg font-bold">{warning.title}</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Type: {warning.scamType}
                </p>
                <p className="text-sm text-slate-500">
                  Platform: {warning.platform}
                </p>
              </div>
            </div>

            <p className="mt-5 border-t pt-4 text-sm text-slate-600">
              Safety Tip: {warning.safetyTip || "Stay alert and verify before you trust."}
            </p>

            <p className="mt-3 text-xs text-slate-400">
              Verified: {formatDate(warning.updatedAt)}
            </p>
          </article>
        ))}
      </div>

      {!loading && filteredWarnings.length === 0 && (
        <div className="card p-10 text-center text-sm text-slate-500">
          No verified scam warnings found.
        </div>
      )}

      {loading && (
        <div className="card p-10 text-center text-sm text-slate-500">
          Loading verified scam warnings...
        </div>
      )}

      <section className="mt-12">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Free Threat Feed
            </div>
            <h2 className="mt-3 text-2xl font-extrabold text-slate-950">
              Live Phishing Intelligence
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Recent phishing URLs from PhishStats. Refreshes every 60 seconds.
              {intelLastUpdated ? ` Last updated ${formatTime(intelLastUpdated)}.` : ""}
              {intelRefreshCount > 0 ? ` Refresh #${intelRefreshCount}.` : ""}
            </p>
          </div>

          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-600 bg-white px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => loadIntelReports({ silent: true })}
            disabled={intelRefreshing}
          >
            <RefreshCw
              size={17}
              className={intelRefreshing ? "animate-spin" : ""}
            />
            {intelRefreshing ? "Refreshing..." : "Refresh Feed"}
          </button>
        </div>

        {intelError && (
          <div className="card border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {intelError}
          </div>
        )}

        {!intelError && intelReports.length > 0 && (
          <div className="grid gap-5 md:grid-cols-3">
            {intelReports.map((report) => (
              <article
                key={report.id}
                className="card cursor-pointer p-5 transition hover:-translate-y-1 hover:border-red-200 hover:shadow-soft"
                onClick={() => setSelectedIntelReport(report)}
              >
                <div className="flex items-start justify-between gap-3">
                  <StatusBadge status={report.riskLevel} />
                  <a
                    href={report.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                    title="Open phishing URL"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <ExternalLink size={17} />
                  </a>
                </div>

                <h3 className="mt-4 font-bold">{report.title}</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Source: {report.platform}
                </p>
                <p className="mt-4 max-h-40 overflow-hidden border-t pt-4 text-sm leading-6 text-slate-600">
                  {report.description}
                </p>
                {(report.host || report.country || report.score) && (
                  <div className="mt-4 grid gap-2 text-xs text-slate-500">
                    {report.host && <p>Host: {report.host}</p>}
                    {report.country && <p>Country: {report.country}</p>}
                    {report.score !== undefined && <p>Score: {report.score}</p>}
                  </div>
                )}
                <p className="mt-3 text-xs text-slate-400">
                  Detected: {formatDate(report.createdAt)}
                </p>
              </article>
            ))}
          </div>
        )}

        {intelLoading && !intelError && (
          <div className="card p-8 text-center text-sm text-slate-500">
            Loading phishing intelligence...
          </div>
        )}

        {!intelLoading && !intelError && intelReports.length === 0 && (
          <div className="card p-8 text-center text-sm text-slate-500">
            No recent phishing intelligence found right now.
          </div>
        )}
      </section>

      {selectedIntelReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 px-5 py-8">
          <article className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-soft">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <StatusBadge status={selectedIntelReport.riskLevel} />
                <h2 className="mt-4 text-2xl font-extrabold text-slate-950">
                  {selectedIntelReport.title}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Source: {selectedIntelReport.platform}
                </p>
              </div>

              <button
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                onClick={() => setSelectedIntelReport(null)}
                aria-label="Close phishing intelligence details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-[1fr_260px]">
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-slate-950">
                    Threat Details
                  </h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    {selectedIntelReport.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-950">
                    Reported URL
                  </h3>
                  <p className="mt-2 break-words rounded-xl bg-red-50 p-3 text-sm text-red-700">
                    {selectedIntelReport.sourceUrl}
                  </p>
                </div>

                <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                  <h3 className="text-sm font-bold text-slate-950">
                    Safety Reminder
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Do not open suspicious URLs on your main device. If you need
                    to investigate, use official reporting channels and avoid
                    entering passwords, OTPs, payment details, or personal data.
                  </p>
                </div>
              </div>

              <aside className="space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm">
                <h3 className="font-bold text-slate-950">Threat Citation</h3>
                <p className="text-slate-600">
                  Feed ID: {selectedIntelReport.id}
                </p>
                {selectedIntelReport.host && (
                  <p className="break-words text-slate-600">
                    Host: {selectedIntelReport.host}
                  </p>
                )}
                {selectedIntelReport.country && (
                  <p className="text-slate-600">
                    Country: {selectedIntelReport.country}
                  </p>
                )}
                {selectedIntelReport.score !== undefined && (
                  <p className="text-slate-600">
                    Score: {selectedIntelReport.score}
                  </p>
                )}
                <p className="flex items-center gap-2 text-slate-600">
                  <CalendarDays size={16} />
                  Detected {formatDate(selectedIntelReport.createdAt)}
                </p>
                <a
                  className="inline-flex items-center gap-2 font-semibold text-red-600"
                  href={selectedIntelReport.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open source URL
                  <ExternalLink size={15} />
                </a>
              </aside>
            </div>
          </article>
        </div>
      )}

      {selectedWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 px-5 py-8">
          <article className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-soft">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <StatusBadge status={selectedWarning.riskLevel} />
                <h2 className="mt-4 text-2xl font-extrabold text-slate-950">
                  {selectedWarning.title}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  {selectedWarning.scamType} via {selectedWarning.platform}
                </p>
              </div>

              <button
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                onClick={() => setSelectedWarning(null)}
                aria-label="Close warning details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-[1fr_260px]">
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-slate-950">Scam Details</h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    {selectedWarning.description}
                  </p>
                </div>

                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <h3 className="text-sm font-bold text-slate-950">Admin Safety Tip</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {selectedWarning.safetyTip ||
                      "Verify sender identity, official websites, and payment requests before taking action."}
                  </p>
                </div>

                {selectedWarning.suspiciousLink && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-950">
                      Suspicious Link / Contact
                    </h3>
                    <p className="mt-2 break-words rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                      {selectedWarning.suspiciousLink}
                    </p>
                  </div>
                )}
              </div>

              <aside className="space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm">
                <h3 className="font-bold text-slate-950">Report Citation</h3>
                <p className="text-slate-600">
                  Report ID: #{selectedWarning._id.slice(-6).toUpperCase()}
                </p>
                <p className="flex items-center gap-2 text-slate-600">
                  <CalendarDays size={16} />
                  Reported {formatDate(selectedWarning.createdAt)}
                </p>
                <p className="text-slate-600">
                  Verified {formatDate(selectedWarning.updatedAt)}
                </p>
                <p className="text-slate-600">
                  Source: Community-submitted report reviewed by ScamCheck PH admin.
                </p>
                <a
                  className="inline-flex items-center gap-2 font-semibold text-primary"
                  href="/about"
                >
                  Learn how reports are reviewed
                  <ExternalLink size={15} />
                </a>
              </aside>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}

export default WarningsPage;
