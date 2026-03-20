import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/images/logo_saigon_lumiere.jpg';

const Sidebar = () => {
    const { pathname } = useLocation();
    
    // Parse currentUser from localStorage
    const savedUser = localStorage.getItem("currentUser");
    const currentUser = savedUser ? JSON.parse(savedUser) : null;
    const username = currentUser?.fullName || currentUser?.username || "Admin";
    
    const getRoleDisplay = (role: string) => {
        switch(role) {
            case 'admin': return 'Admin';
            case 'manager': return 'Quản Trị Viên';
            case 'chef': return 'Bếp Trưởng';
            case 'waiter': return 'Phục Vụ';
            default: return 'Nhân Viên';
        }
    };
    const roleDisplay = getRoleDisplay(currentUser?.role);
    
    const defaultAvatar = "https://ui-avatars.com/api/?name=" + encodeURIComponent(username) + "&background=random";
    const avatar = currentUser?.avatar || defaultAvatar;
    
    return (
        <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col h-full">
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl overflow-hidden flex items-center justify-center bg-white border border-gray-100">
                        <img src={logoImg} alt="Saigon Lumière Logo" className="w-full h-full object-cover rounded-md" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-slate-900 text-base font-bold leading-none">Saigon Lumière</h1>
                        <p className="text-slate-500 text-xs mt-1">Quản Trị Viên</p>
                    </div>
                </div>
            </div>
            <nav className="flex-1 px-4 space-y-1">
                <Link 
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg ${pathname === '/admin/dashboard' ? 'bg-[#ec1337]/10 text-[#ec1337]' : 'text-slate-600 hover:bg-slate-50 transition-colors'}`} 
                    to="/admin/dashboard"
                >
                    <span className="material-symbols-outlined text-[22px]">dashboard</span>
                    <span className={`text-sm ${pathname === '/admin/dashboard' ? 'font-bold' : 'font-medium'}`}>Tổng Quan</span>
                </Link>
                <Link 
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg ${pathname === '/admin/staff' ? 'bg-[#ec1337]/10 text-[#ec1337]' : 'text-slate-600 hover:bg-slate-50 transition-colors'}`} 
                    to="/admin/staff"
                >
                    <span className="material-symbols-outlined text-[22px]" style={pathname === '/admin/staff' ? { fontVariationSettings: "'FILL' 1" } : {}}>group</span>
                    <span className={`text-sm ${pathname === '/admin/staff' ? 'font-bold' : 'font-medium'}`}>Quản Lý Nhân Sự</span>
                </Link>
                <Link className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 transition-colors rounded-lg" to="#">
                    <span className="material-symbols-outlined text-[22px]">restaurant_menu</span>
                    <span className="text-sm font-medium">Quản Lý Thực Đơn</span>
                </Link>
                <Link className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 transition-colors rounded-lg" to="#">
                    <span className="material-symbols-outlined text-[22px]">receipt_long</span>
                    <span className="text-sm font-medium">Đơn Hàng</span>
                </Link>
                <Link className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 transition-colors rounded-lg" to="#">
                    <span className="material-symbols-outlined text-[22px]">analytics</span>
                    <span className="text-sm font-medium">Báo Cáo</span>
                </Link>
                <Link 
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg ${pathname === '/admin/settings' ? 'bg-[#ec1337]/10 text-[#ec1337]' : 'text-slate-600 hover:bg-slate-50 transition-colors'}`} 
                    to="/admin/settings"
                >
                    <span className="material-symbols-outlined text-[22px]" style={pathname === '/admin/settings' ? { fontVariationSettings: "'FILL' 1" } : {}}>settings</span>
                    <span className={`text-sm ${pathname === '/admin/settings' ? 'font-bold' : 'font-medium'}`}>Cài Đặt</span>
                </Link>
            </nav>
            <div className="p-4 mt-auto border-t border-slate-200">

                <div className="flex items-center gap-3 px-3 py-4 mt-2">
                    <div className="size-8 rounded-full bg-slate-200 bg-cover bg-center border-2 border-white shadow-sm" style={{ backgroundImage: `url('${avatar}')` }}></div>
                    <div className="flex flex-col min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">{username}</p>
                        <p className="text-xs text-slate-500 truncate">{roleDisplay}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
