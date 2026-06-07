import { Link } from "react-router-dom";
import {
  AlertTriangle,
  BadgeCheck,
  Database,
  Send,
  ShieldCheck,
  Users,
} from "lucide-react";
import Button from "../../components/Button";
import StatusBadge from "../../components/StatusBadge";
import heroImage from "../../assets/home.png";

function HomePage() {
  const featuredWarnings = [
    {
      title: "GCash Double Your Money Scam",
      type: "Phishing",
      risk: "High Risk",
    },
    {
      title: "Fake Shopee Delivery Fee",
      type: "Fake Delivery",
      risk: "Medium Risk",
    },
    {
      title: "Telegram Investment Group",
      type: "Investment Scam",
      risk: "High Risk",
    },
  ];

  return (
    <section className="bg-soft">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-primary">
            <ShieldCheck size={18} />
            Community scam awareness platform
          </div>

          <h2 className="text-4xl font-extrabold leading-tight text-slate-950 md:text-6xl">
            Report suspicious messages.{" "}
            <span className="text-primary">Protect the community.</span>
          </h2>

          <p className="mt-6 max-w-xl text-lg text-slate-600">
            ScamCheck PH helps Filipinos identify, report, and avoid online scams.
            Together, verified reports become public warnings that keep others safe.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/dashboard/submit-report">
              <Button>
                <Send size={18} />
                Report a Scam
              </Button>
            </Link>

            <Link to="/warnings">
              <Button variant="outline">
                <AlertTriangle size={18} />
                View Warnings
              </Button>
            </Link>
          </div>
        </div>

        <div className="card overflow-hidden p-4">
          <div className="rounded-xl bg-blue-50">
            <img
              src={heroImage}
              alt="Scam alert protection illustration"
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-16">
        <div className="card grid gap-6 p-6 md:grid-cols-4">
          <div className="flex gap-4">
            <BadgeCheck className="text-primary" />
            <div>
              <h3 className="font-bold">Verify</h3>
              <p className="text-sm text-slate-500">
                Check scam warnings before clicking links.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Send className="text-primary" />
            <div>
              <h3 className="font-bold">Report</h3>
              <p className="text-sm text-slate-500">
                Submit suspicious messages to help others.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Users className="text-primary" />
            <div>
              <h3 className="font-bold">Protect</h3>
              <p className="text-sm text-slate-500">
                Build a safer online community together.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Database className="text-primary" />
            <div>
              <h3 className="font-bold">Built with MERN</h3>
              <p className="text-sm text-slate-500">
                React, Express, Node, and MongoDB Atlas.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Featured Scam Warnings</h2>
            <Link to="/warnings" className="text-sm font-semibold text-primary">
              View all warnings
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {featuredWarnings.map((warning) => (
              <div key={warning.title} className="card p-5">
                <StatusBadge status={warning.risk} />
                <h3 className="mt-4 font-bold">{warning.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{warning.type}</p>
                <p className="mt-4 text-sm text-slate-600">
                  Safety Tip: Never share OTP, MPIN, or passwords.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
