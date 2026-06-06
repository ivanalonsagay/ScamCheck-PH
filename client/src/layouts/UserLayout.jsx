import { Outlet } from "react-router-dom";
import {
  Bookmark,
  FileText,
  Home,
  LayoutDashboard,
  PlusCircle,
  Settings,
  User,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

function UserLayout() {
  const navItems = [
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: LayoutDashboard,
      end: true,
    },
    {
      label: "Submit Report",
      to: "/dashboard/submit-report",
      icon: PlusCircle,
    },
    {
      label: "My Reports",
      to: "/dashboard/my-reports",
      icon: FileText,
    },
    {
      label: "Bookmarks",
      to: "/dashboard/bookmarks",
      icon: Bookmark,
    },
    {
      label: "Profile",
      to: "/dashboard/profile",
      icon: User,
    },
    {
      label: "Settings",
      to: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-soft">
      <Sidebar items={navItems} />

      <main className="min-h-screen px-5 py-6 lg:ml-72 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default UserLayout;