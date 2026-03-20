import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "../components/layouts/PublicLayout";
import ProtectedLayout from "../components/layouts/ProtectedLayout";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";
import AdminLayout from "../components/admin/AdminLayout";
import StaffManager from "../pages/admin/StaffManager/StaffManager";
import Settings from "../pages/admin/Settings/Settings";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes - Anyone can access */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<LandingPage />} />
            </Route>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes - Need Authentication */}
            <Route path="/dashboard" element={<ProtectedLayout />}>
                <Route index element={<DashboardPage />} />
            </Route>

            {/* Admin Routes with Shared Layout */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="staff" element={<StaffManager />} />
                <Route path="settings" element={<Settings />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}