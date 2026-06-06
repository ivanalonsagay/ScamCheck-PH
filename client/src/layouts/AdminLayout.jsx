import { Outlet } from "react-router-dom";
import {
  BarChart3,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

function AdminLayout() {
  const navItems = [
    {
      label: "Overview",
      to: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Reports",
      to: "/admin/reports",
      icon: FileText,
    },
    {
      label: "Users",
      to: "/admin/users",
      icon: Users,
    },
    {
      label: "Analytics",
      to: "/admin/analytics",
      icon: BarChart3,
    },
    {
      label: "Categories",
      to: "/admin/categories",
      icon: FolderKanban,
    },
    {
      label: "Settings",
      to: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-soft">
      <Sidebar items={navItems} title="Admin Panel" />

      <main className="min-h-screen px-5 py-6 lg:ml-72 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;