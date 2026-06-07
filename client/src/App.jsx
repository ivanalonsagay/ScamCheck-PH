import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PageTransition from "./components/PageTransition";

import PublicLayout from "./layouts/PublicLayout";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import HomePage from "./pages/public/HomePage";
import WarningsPage from "./pages/public/WarningsPage";
import AboutPage from "./pages/public/AboutPage";

import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";

import UserDashboardPage from "./pages/user/UserDashboardPage";
import SubmitReportPage from "./pages/user/SubmitReportPage";
import MyReportsPage from "./pages/user/MyReportsPage";
import BookmarksPage from "./pages/user/BookmarksPage";
import SettingsPage from "./pages/user/SettingsPage";

import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import ManageReportsPage from "./pages/admin/ManageReportsPage";
import UsersPage from "./pages/admin/UsersPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import CategoriesPage from "./pages/admin/CategoriesPage";

import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PageTransition />
        <Routes>
          {/* Public website routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/warnings" element={<WarningsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>

          {/* Protected user dashboard routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserDashboardPage />} />
            <Route path="submit-report" element={<SubmitReportPage />} />
            <Route path="my-reports" element={<MyReportsPage />} />
            <Route path="bookmarks" element={<BookmarksPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Protected admin dashboard routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="reports" element={<ManageReportsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="categories" element={<CategoriesPage />} />
          </Route>

          {/* Unknown page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
