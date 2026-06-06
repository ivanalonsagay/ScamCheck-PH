import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

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

import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import ManageReportsPage from "./pages/admin/ManageReportsPage";

import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public website routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/warnings" element={<WarningsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

        {/* User dashboard routes */}
        <Route path="/dashboard" element={<UserLayout />}>
          <Route index element={<UserDashboardPage />} />
          <Route path="submit-report" element={<SubmitReportPage />} />
          <Route path="my-reports" element={<MyReportsPage />} />
        </Route>

        {/* Admin dashboard routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="reports" element={<ManageReportsPage />} />
        </Route>

        {/* Unknown page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;