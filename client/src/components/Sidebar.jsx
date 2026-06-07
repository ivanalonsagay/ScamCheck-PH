import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.png";

function Sidebar({ items, title = "ScamCheck PH" }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear login data
    logout();

    // Go back to public home
    navigate("/", { replace: true });
  };

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-72 bg-navy text-white lg:block">
      <div className="flex h-full flex-col">
        <div className="px-6 py-7">
          <Link to="/" className="mb-8 flex items-center gap-3">
            <img
              src={logo}
              alt="ScamCheck PH logo"
              className="h-12 w-12 rounded-xl object-contain"
            />

            <div>
              <h2 className="font-bold">{title}</h2>
              <p className="text-xs text-blue-100">Safer digital community</p>
            </div>
          </Link>

          <nav className="space-y-2">
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-blue-100 hover:bg-white/10"
                    }`
                  }
                >
                  <Icon size={20} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto px-6 py-6">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-blue-100 hover:bg-white/10"
          >
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
