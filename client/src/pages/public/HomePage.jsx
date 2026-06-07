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

  const featureSlides = [
    {
      title: "Verify",
      text: "Check scam warnings before clicking links.",
      icon: BadgeCheck,
    },
    {
      title: "Report",
      text: "Submit suspicious messages to help others.",
      icon: Send,
    },
    {
      title: "Protect",
      text: "Build a safer online community together.",
      icon: Users,
    },
    {
      title: "Built with MERN",
      text: "React, Express, Node, and MongoDB Atlas.",
      icon: Database,
    },
  ];
  const marqueeSlides = [...featureSlides, ...featureSlides];

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
        <div className="card overflow-hidden p-4">
          <div className="mb-3">
            <h2 className="text-lg font-bold">How ScamCheck PH Helps</h2>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex w-max animate-feature-marquee gap-4 hover:[animation-play-state:paused]">
              {marqueeSlides.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <article
                    key={`${feature.title}-${index}`}
                    className="w-[270px] rounded-xl border border-slate-100 bg-white p-5 md:w-[340px]"
                  >
                    <div className="flex gap-4">
                      <Icon className="shrink-0 text-primary" />
                      <div>
                        <h3 className="font-bold">{feature.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-500">
                          {feature.text}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
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
