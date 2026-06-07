import { Link, NavLink } from "react-router-dom";
import { Send } from "lucide-react";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.png";

function Navbar() {
  const { user, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition ${
      isActive ? "text-blue-300" : "text-white hover:text-blue-200"
    }`;

  const dashboardPath =
    user?.role === "admin" ? "/admin/dashboard" : "/dashboard";

  return (
    <header className="sticky top-0 z-40 bg-navy text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="ScamCheck PH logo"
            className="h-12 w-12 rounded-xl object-contain"
          />

          <div>
            <h1 className="text-xl font-bold leading-none">
              ScamCheck <span className="text-blue-300">PH</span>
            </h1>
            <p className="text-xs text-blue-100">
              Online Scam Awareness and Reporting System
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/warnings" className={linkClass}>
            Warnings
          </NavLink>
          <NavLink to="/dashboard/submit-report" className={linkClass}>
            Report a Scam
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to={dashboardPath}>
                <Button>Dashboard</Button>
              </Link>

              <Button
                type="button"
                variant="ghost"
                className="text-white hover:bg-white/10"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>

              <Link to="/signup">
                <Button>
                  <Send size={16} />
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
