import { FolderKanban, Search, ShieldAlert } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import StatusBadge from "../../components/StatusBadge";
import { SCAM_TYPES } from "../../constants";
import api from "../../services/api";

function CategoriesPage() {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const { data } = await api.get("/reports");
        setReports(data.reports || []);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  const categories = useMemo(() => {
    return SCAM_TYPES.map((type) => {
      const typeReports = reports.filter((report) => report.scamType === type);

      return {
        type,
        total: typeReports.length,
        pending: typeReports.filter((report) => report.status === "Pending").length,
        verified: typeReports.filter((report) => report.status === "Verified").length,
        rejected: typeReports.filter((report) => report.status === "Rejected").length,
        topPlatform:
          Object.entries(
            typeReports.reduce((acc, report) => {
              acc[report.platform] = (acc[report.platform] || 0) + 1;
              return acc;
            }, {})
          ).sort((a, b) => b[1] - a[1])[0]?.[0] || "No reports yet",
      };
    }).filter((category) =>
      category.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [reports, searchTerm]);

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-primary">Categories</p>
        <h1 className="text-3xl font-extrabold">Scam Categories</h1>
        <p className="text-slate-500">
          Track report volume and verification status by scam type.
        </p>
      </div>

      <div className="card p-6">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              className="input pl-11"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-primary">
            <FolderKanban size={18} />
            {SCAM_TYPES.length} categories
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <article key={category.type} className="rounded-xl border border-slate-100 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-primary">
                    <ShieldAlert size={22} />
                  </div>
                  <h2 className="mt-4 text-lg font-bold">{category.type}</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Top platform: {category.topPlatform}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-extrabold text-slate-950">
                    {category.total}
                  </p>
                  <p className="text-xs text-slate-400">reports</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-amber-50 p-2">
                  <StatusBadge status="Pending" />
                  <p className="mt-2 font-bold">{category.pending}</p>
                </div>
                <div className="rounded-lg bg-green-50 p-2">
                  <StatusBadge status="Verified" />
                  <p className="mt-2 font-bold">{category.verified}</p>
                </div>
                <div className="rounded-lg bg-red-50 p-2">
                  <StatusBadge status="Rejected" />
                  <p className="mt-2 font-bold">{category.rejected}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {!loading && categories.length === 0 && (
          <div className="py-10 text-center text-sm text-slate-500">
            No categories found.
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoriesPage;
