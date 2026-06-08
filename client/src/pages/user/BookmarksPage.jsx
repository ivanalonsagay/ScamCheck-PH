import {
  Bookmark,
  CalendarDays,
  ExternalLink,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState(() =>
    JSON.parse(localStorage.getItem("scamcheck_bookmarks") || "[]")
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBookmark, setSelectedBookmark] = useState(null);

  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter((bookmark) => {
      const searchText = `${bookmark.title} ${bookmark.scamType} ${bookmark.platform}`.toLowerCase();
      return searchText.includes(searchTerm.toLowerCase());
    });
  }, [bookmarks, searchTerm]);

  const removeBookmark = (event, id) => {
    event.stopPropagation();
    const nextBookmarks = bookmarks.filter((bookmark) => bookmark._id !== id);
    localStorage.setItem("scamcheck_bookmarks", JSON.stringify(nextBookmarks));
    setBookmarks(nextBookmarks);

    if (selectedBookmark?._id === id) {
      setSelectedBookmark(null);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-primary">Saved Warnings</p>
        <h1 className="text-3xl font-extrabold">Bookmarks</h1>
        <p className="text-slate-500">
          Keep important verified scam warnings for quick review.
        </p>
      </div>

      <div className="card p-6">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              className="input pl-11"
              placeholder="Search bookmarks..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <Link
            to="/warnings"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-blue-50"
          >
            <ExternalLink size={17} />
            Browse Warnings
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredBookmarks.map((bookmark) => (
            <article
              key={bookmark._id}
              className="cursor-pointer rounded-xl border border-slate-100 p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-soft"
              onClick={() => setSelectedBookmark(bookmark)}
            >
              <div className="flex items-start justify-between gap-3">
                <StatusBadge status={bookmark.riskLevel} />
                <button
                  className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                  onClick={(event) => removeBookmark(event, bookmark._id)}
                  title="Remove bookmark"
                >
                  <Trash2 size={17} />
                </button>
              </div>

              <div className="mt-5 flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-primary">
                  <Bookmark size={24} />
                </div>
                <div>
                  <h2 className="font-bold">{bookmark.title}</h2>
                  <p className="mt-2 text-sm text-slate-500">
                    {bookmark.scamType} via {bookmark.platform}
                  </p>
                </div>
              </div>

              <p className="mt-4 border-t pt-4 text-sm leading-6 text-slate-600">
                Safety Tip: {bookmark.safetyTip || "Verify before you trust."}
              </p>
              <p className="mt-3 text-xs text-slate-400">
                Verified: {formatDate(bookmark.updatedAt)}
              </p>
            </article>
          ))}
        </div>

        {filteredBookmarks.length === 0 && (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-primary">
              <Bookmark size={26} />
            </div>
            <p className="font-semibold text-slate-700">No bookmarks yet.</p>
            <p className="mt-2 text-sm text-slate-500">
              Save warnings from the public warning board.
            </p>
          </div>
        )}
      </div>

      {selectedBookmark && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 px-5 py-8">
          <article className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-soft">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <StatusBadge status={selectedBookmark.riskLevel} />
                <h2 className="mt-4 text-2xl font-extrabold text-slate-950">
                  {selectedBookmark.title}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  {selectedBookmark.scamType} via {selectedBookmark.platform}
                </p>
              </div>

              <button
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                onClick={() => setSelectedBookmark(null)}
                aria-label="Close bookmark details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-[1fr_260px]">
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-slate-950">Scam Details</h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    {selectedBookmark.description || "No description provided."}
                  </p>
                </div>

                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <h3 className="text-sm font-bold text-slate-950">
                    Admin Safety Tip
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {selectedBookmark.safetyTip || "Verify before you trust."}
                  </p>
                </div>

                {selectedBookmark.suspiciousLink && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-950">
                      Suspicious Link / Contact
                    </h3>
                    <p className="mt-2 break-words rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                      {selectedBookmark.suspiciousLink}
                    </p>
                  </div>
                )}
              </div>

              <aside className="space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm">
                <h3 className="font-bold text-slate-950">Saved Warning</h3>
                <p className="text-slate-600">
                  Report ID: #{selectedBookmark._id.slice(-6).toUpperCase()}
                </p>
                <p className="flex items-center gap-2 text-slate-600">
                  <CalendarDays size={16} />
                  Reported {formatDate(selectedBookmark.createdAt)}
                </p>
                <p className="text-slate-600">
                  Verified {formatDate(selectedBookmark.updatedAt)}
                </p>
                <button
                  className="inline-flex items-center gap-2 font-semibold text-red-600"
                  onClick={(event) => removeBookmark(event, selectedBookmark._id)}
                >
                  <Trash2 size={15} />
                  Remove bookmark
                </button>
              </aside>
            </div>
          </article>
        </div>
      )}
    </div>
  );
}

export default BookmarksPage;
