import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-[#f8f7f5] font-admin-display text-slate-900">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
