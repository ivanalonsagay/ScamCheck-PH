import {
  AlertTriangle,
  CheckCircle2,
  Mail,
  Search,
  ShieldCheck,
  Trash2,
  User,
  UserCheck,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import StatCard from "../../components/StatCard";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

function UsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { data } = await api.get("/admin/users");
        setUsers(data.users || []);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchText = `${user.name} ${user.email} ${user.role}`.toLowerCase();
      const matchesSearch = searchText.includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "all" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  const adminCount = users.filter((user) => user.role === "admin").length;
  const reporterCount = users.filter((user) => user.role === "user").length;

  const updateRole = async (targetUser, role) => {
    setSavingId(targetUser._id);
    setNotice("");
    setError("");

    try {
      const { data } = await api.patch(`/admin/users/${targetUser._id}/role`, {
        role,
      });

      setUsers((current) =>
        current.map((user) =>
          user._id === targetUser._id ? { ...user, role: data.user.role } : user
        )
      );
      setNotice(`${targetUser.name} is now ${role}.`);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update user role.");
    } finally {
      setSavingId("");
    }
  };

  const deleteUser = async (targetUser) => {
    const confirmed = window.confirm(
      `Delete ${targetUser.name} and all submitted reports?`
    );

    if (!confirmed) {
      return;
    }

    setSavingId(targetUser._id);
    setNotice("");
    setError("");

    try {
      await api.delete(`/admin/users/${targetUser._id}`);
      setUsers((current) => current.filter((user) => user._id !== targetUser._id));
      setNotice(`${targetUser.name} was deleted.`);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete user.");
    } finally {
      setSavingId("");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-primary">Admin Panel</p>
        <h1 className="text-3xl font-extrabold">Users</h1>
        <p className="text-slate-500">
          Monitor registered users and report activity.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <StatCard icon={Users} label="Total Users" value={loading ? "..." : users.length} note="Registered accounts" />
        <StatCard icon={ShieldCheck} label="Admins" value={loading ? "..." : adminCount} note="Can moderate reports" color="blue" />
        <StatCard icon={User} label="Reporters" value={loading ? "..." : reporterCount} note="Community users" color="green" />
      </div>

      {notice && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <CheckCircle2 size={18} />
          {notice}
        </div>
      )}

      {error && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertTriangle size={18} />
          {error}
        </div>
      )}

      <div className="card mt-8 p-6">
        <div className="mb-5 grid gap-4 md:grid-cols-[1fr_220px]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              className="input pl-11"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <select
            className="input"
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b text-slate-500">
                <th className="py-3">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Total Reports</th>
                <th>Verified</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-b last:border-none">
                  <td className="py-4 font-semibold">{user.name}</td>
                  <td>
                    <span className="inline-flex items-center gap-2 text-slate-600">
                      <Mail size={15} />
                      {user.email}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>{user.totalReports}</td>
                  <td>{user.verifiedReports}</td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                        onClick={() =>
                          updateRole(user, user.role === "admin" ? "user" : "admin")
                        }
                        disabled={savingId === user._id || user._id === currentUser?.id}
                        title={
                          user.role === "admin"
                            ? "Demote to user"
                            : "Promote to admin"
                        }
                      >
                        <UserCheck size={17} />
                      </button>
                      <button
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                        onClick={() => deleteUser(user)}
                        disabled={savingId === user._id || user._id === currentUser?.id}
                        title="Delete user"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!loading && filteredUsers.length === 0 && (
            <div className="py-10 text-center text-sm text-slate-500">
              No users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
