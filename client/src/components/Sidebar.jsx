import { NavLink } from "react-router-dom";
import { LogOut, ShieldCheck } from "lucide-react";

function Sidebar({ items, title = "ScamCheck PH" }) {
  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-72 bg-navy text-white lg:block">
      <div className="flex h-full flex-col">
        <div className="px-6 py-7">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600">
              <ShieldCheck size={27} />
            </div>

            <div>
              <h2 className="font-bold">{title}</h2>
              <p className="text-xs text-blue-100">Safer digital community</p>
            </div>
          </div>

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
          <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-blue-100 hover:bg-white/10">
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;