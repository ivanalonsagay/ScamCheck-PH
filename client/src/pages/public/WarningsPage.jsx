import { Search, ShieldCheck } from "lucide-react";
import StatusBadge from "../../components/StatusBadge";

function WarningsPage() {
  const warnings = [
    {
      title: "GCash Phishing Login Scam",
      type: "Phishing",
      platform: "SMS / Fake Website",
      risk: "High Risk",
      tip: "Never click links from unknown senders and never share your OTP.",
    },
    {
      title: "Fake Delivery Fee Scam",
      type: "Fake Delivery",
      platform: "Messenger",
      risk: "Medium Risk",
      tip: "Legit couriers do not ask for payment using personal accounts.",
    },
    {
      title: "Fake BDO Banking Alert",
      type: "Banking Scam",
      platform: "SMS",
      risk: "High Risk",
      tip: "Banks will never ask for your password or OTP through SMS.",
    },
  ];

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
          />
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <select className="input">
          <option>All Scam Types</option>
        </select>

        <select className="input">
          <option>All Platforms</option>
        </select>

        <select className="input">
          <option>Sort by: Newest</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {warnings.map((warning) => (
          <article key={warning.title} className="card p-6">
            <StatusBadge status={warning.risk} />

            <div className="mt-5 flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-primary">
                <ShieldCheck size={28} />
              </div>

              <div>
                <h3 className="text-lg font-bold">{warning.title}</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Type: {warning.type}
                </p>
                <p className="text-sm text-slate-500">
                  Platform: {warning.platform}
                </p>
              </div>
            </div>

            <p className="mt-5 border-t pt-4 text-sm text-slate-600">
              Safety Tip: {warning.tip}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default WarningsPage;