import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/layouts/PublicLayout";
import ProtectedLayout from "./components/layouts/ProtectedLayout";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";

export default function App() {
  return (
    <Routes>
      {/* Public Routes - Anyone can access */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes - Need Authentication */}
      <Route path="/dashboard" element={<ProtectedLayout />}>
        <Route index element={<DashboardPage />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<div className="p-8 text-center text-xl">404 - Không tìm thấy trang</div>} />
    </Routes>
  );
}
