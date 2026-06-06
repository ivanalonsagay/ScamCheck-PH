import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function PublicLayout() {
  return (
    <div className="min-h-screen bg-soft">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <footer className="bg-navy px-5 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-bold">ScamCheck PH</h3>
            <p className="text-sm text-blue-100">
              Community-Based Online Scam Awareness and Reporting System
            </p>
          </div>

          <p className="text-sm text-blue-100">
            © 2025 ScamCheck PH. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default PublicLayout;