import { Link, Outlet } from "react-router-dom";
import { Database, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.png";

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-soft">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-auto bg-navy px-5 py-10 text-white">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[1.45fr_0.75fr_1fr_1fr]">
          <div>
            <div className="flex items-start gap-3">
              <img
                src={logo}
                alt="ScamCheck PH logo"
                className="h-14 w-14 rounded-xl object-contain"
              />
              <div>
                <h3 className="text-lg font-extrabold">ScamCheck PH</h3>
                <p className="text-sm text-blue-100">
                  Community-Based Online Scam Awareness and Reporting System
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-lg text-sm leading-6 text-blue-100">
              A MERN Stack platform for reporting suspicious online activity,
              verifying scam reports, and publishing public safety warnings.
            </p>
          </div>

          <div>
            <h4 className="mb-4 flex items-center gap-2 font-bold">
              <ShieldCheck size={18} />
              Pages
            </h4>
            <div className="space-y-3 text-sm text-blue-100">
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
            <h4 className="mb-4 font-bold">Project Scope</h4>
            <div className="space-y-3 text-sm text-blue-100">
              <p>Login and registration</p>
              <p>Report submission</p>
              <p>Public warning board</p>
              <p>Admin verification</p>
            </div>
          </div>

          <div>
            <h4 className="mb-4 flex items-center gap-2 font-bold">
              <Database size={18} />
              Built With
            </h4>
            <div className="space-y-3 text-sm text-blue-100">
              <p>React + Vite</p>
              <p>Node.js + Express</p>
              <p>MongoDB Atlas</p>
              <p>JWT Authentication</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-7xl gap-3 border-t border-white/10 pt-5 text-sm text-blue-100 md:grid-cols-2 md:items-center">
          <p>Copyright 2026 ScamCheck PH. All rights reserved.</p>
          <p className="md:text-right">For academic and cyber-awareness use.</p>
        </div>
      </footer>
    </div>
  );
}

export default PublicLayout;
