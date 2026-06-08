import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileText,
  ShieldCheck,
  Users,
} from "lucide-react";

const references = [
  {
    label: "National Privacy Commission: Threats to Security and Privacy",
    url: "https://privacy.gov.ph/threats-security-privacy/",
  },
  {
    label: "Philippine Information Agency: Report online shopping scams to #1326",
    url: "https://pia.gov.ph/news/dict-caraga-reminds-public-report-online-shopping-scam-to-hotline-1326/",
  },
  {
    label: "Philippine News Agency: CICC scam complaint reporting context",
    url: "https://www.pna.gov.ph/index.php/articles/1243101",
  },
];

function AboutPage() {
  return (
    <section className="bg-soft">
      <div className="bg-navy px-5 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
            <ShieldCheck size={18} />
            About the platform
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
            ScamCheck PH helps communities verify, report, and avoid online scams.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-100">
            ScamCheck PH is a community awareness space where people can share
            suspicious messages, links, fake seller activity, and online fraud
            patterns. Verified reports become public warnings so others can check
            before they click, pay, or share personal information.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card p-6">
            <Users className="text-primary" />
            <h2 className="mt-4 text-xl font-bold">Community First</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Users report suspicious messages, links, fake sellers, payment
              requests, and scam attempts they encounter online.
            </p>
          </div>
          <div className="card p-6">
            <CheckCircle2 className="text-green-600" />
            <h2 className="mt-4 text-xl font-bold">Admin Reviewed</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Admins review submitted reports, set a risk level, add safety tips,
              and verify or reject reports before they appear publicly.
            </p>
          </div>
          <div className="card p-6">
            <AlertTriangle className="text-red-600" />
            <h2 className="mt-4 text-xl font-bold">Public Warnings</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Verified reports are displayed as warning cards so visitors can
              search scams by type, platform, and keywords.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="card p-8">
            <h2 className="text-2xl font-extrabold">How ScamCheck Helps You</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Search verified scam warnings before trusting a message or link.",
                "Report suspicious contacts, fake sellers, and payment requests.",
                "Track whether your submitted report is pending, verified, or rejected.",
                "Read safety tips added by reviewers for each verified warning.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                  <CheckCircle2 className="mt-0.5 text-green-600" size={18} />
                  <span className="text-sm leading-6 text-slate-600">{item}</span>
                </div>
              ))}
            </div>

            <h2 className="mt-8 text-2xl font-extrabold">How Report Verification Works</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
              <p>
                A registered user submits a scam report with a title, type,
                platform, suspicious link or contact, and description.
              </p>
              <p>
                The report starts as Pending. An admin reviews the details, adds
                a safety tip, assigns a risk level, then marks the report as
                Verified or Rejected.
              </p>
              <p>
                Only Verified reports appear on the public warning board. Rejected
                reports remain visible to admins and the submitting user as part
                of the moderation record.
              </p>
            </div>

            <h2 className="mt-8 text-2xl font-extrabold">What to Check Before You Trust</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                "Sender identity: verify the account, number, or email through official channels.",
                "Payment request: avoid advance payments to personal accounts.",
                "Urgency: be careful with messages that pressure you to act fast.",
                "Links: inspect URLs and avoid shortened or misspelled domains.",
                "Personal data: never share OTP, MPIN, passwords, or recovery codes.",
                "Proof: save screenshots and transaction details if you report a scam.",
              ].map((tip) => (
                <div key={tip} className="rounded-xl border border-slate-100 p-4 text-sm leading-6 text-slate-600">
                  {tip}
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card p-6">
              <Clock3 className="text-amber-600" />
              <h2 className="mt-4 text-xl font-bold">Report Status Guide</h2>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <p><span className="font-bold text-amber-700">Pending:</span> waiting for admin review.</p>
                <p><span className="font-bold text-green-700">Verified:</span> reviewed and shown publicly.</p>
                <p><span className="font-bold text-red-700">Rejected:</span> not enough evidence or not confirmed.</p>
              </div>
            </div>

            <div className="card p-6">
              <BookOpen className="text-primary" />
              <h2 className="mt-4 text-xl font-bold">Safety References</h2>
              <div className="mt-4 space-y-3">
                {references.map((reference) => (
                  <a
                    key={reference.url}
                    href={reference.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-xl border border-slate-100 p-3 text-sm font-semibold text-primary hover:bg-blue-50"
                  >
                    {reference.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <FileText className="text-primary" />
              <h2 className="mt-4 text-xl font-bold">Important Note</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                ScamCheck PH is an awareness and reporting system. Serious cases,
                financial losses, or threats should also be reported through
                official law enforcement, bank, wallet, or government channels.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
