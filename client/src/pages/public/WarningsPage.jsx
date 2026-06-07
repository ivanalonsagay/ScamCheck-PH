import {
  Bookmark,
  BookmarkCheck,
  CalendarDays,
  ExternalLink,
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

function WarningsPage() {
  const [warnings, setWarnings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [selectedWarning, setSelectedWarning] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    const savedBookmarks = JSON.parse(
      localStorage.getItem("scamcheck_bookmarks") || "[]"
    );
    return savedBookmarks.map((bookmark) => bookmark._id);
  });

  useEffect(() => {
    const loadWarnings = async () => {
      try {
        const { data } = await api.get("/reports/public");
        setWarnings(data.reports || []);
      } finally {
        setLoading(false);
      }
    };

    loadWarnings();
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
          <h1 className="text-4xl font-extrabold text-slate-950">
            Verified Scam Warnings
          </h1>
          <p className="mt-2 text-slate-600">
            These reports are reviewed by admins before being shown publicly.
          </p>
        </div>

        <div className="relative max-w-md flex-1">
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
      </div>

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
