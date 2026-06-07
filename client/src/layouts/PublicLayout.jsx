import { Link, Outlet } from "react-router-dom";
import { AlertTriangle, HelpCircle, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.png";

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-soft">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-auto bg-navy px-5 py-7 text-white">
        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[1.4fr_0.75fr_1fr_1fr]">
          <div>
            <div className="flex items-start gap-3">
              <img
                src={logo}
                alt="ScamCheck PH logo"
                className="h-12 w-12 rounded-xl object-contain"
              />
              <div>
                <h3 className="text-lg font-extrabold">ScamCheck PH</h3>
                <p className="text-sm text-blue-100">
                  Community-Based Online Scam Awareness and Reporting System
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-lg text-sm leading-6 text-blue-100">
              Report suspicious links or contacts, review verified warnings, and
              learn safer habits before clicking, paying, or sharing information.
            </p>
          </div>

          <div>
            <h4 className="mb-3 flex items-center gap-2 font-bold">
              <ShieldCheck size={18} />
              Pages
            </h4>
            <div className="space-y-2 text-sm text-blue-100">
              <Link className="block hover:text-white" to="/">
                Home
              </Link>
              <Link className="block hover:text-white" to="/warnings">
                Verified Warnings
              </Link>
              <Link className="block hover:text-white" to="/dashboard/submit-report">
                Report a Scam
              </Link>
              <Link className="block hover:text-white" to="/about">
                About
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-3 flex items-center gap-2 font-bold">
              <AlertTriangle size={18} />
              Safety Tips
            </h4>
            <div className="space-y-2 text-sm text-blue-100">
              <p>Do not share OTP, MPIN, or passwords.</p>
              <p>Verify links through official websites.</p>
              <p>Never pay fees to personal accounts.</p>
              <p>Report suspicious messages early.</p>
            </div>
          </div>

          <div>
            <h4 className="mb-3 flex items-center gap-2 font-bold">
              <HelpCircle size={18} />
              Need Help?
            </h4>
            <div className="space-y-2 text-sm text-blue-100">
              <p>Use Warnings before opening links.</p>
              <p>Submit clear details for faster review.</p>
              <p>Admins review reports before publishing.</p>
              <p>For urgent cases, contact official authorities.</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 grid max-w-7xl gap-3 border-t border-white/10 pt-4 text-sm text-blue-100 md:grid-cols-2 md:items-center">
          <p>Copyright 2026 ScamCheck PH. All rights reserved.</p>
          <p className="md:text-right">For academic and cyber-awareness use.</p>
        </div>
      </footer>
    </div>
  );
}

export default PublicLayout;
