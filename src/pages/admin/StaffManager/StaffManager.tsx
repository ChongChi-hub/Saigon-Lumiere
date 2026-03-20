import { useState, useEffect } from 'react';
import api from '../../../services/api';
import type { User } from '../../../types/user';

const StaffManager = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentFilter, setCurrentFilter] = useState('Tất Cả');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 6;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const totalStaff = users.length;
    const activeStaff = users.filter(u => u.status !== false).length; 
    const onLeaveStaff = users.filter(u => u.status === false).length;
    const kitchenStaff = users.filter(u => u.role === 'chef').length;

    const getRoleTranslation = (role: string) => {
        switch(role) {
            case 'admin': return 'Quản Trị Hệ Thống';
            case 'manager': return 'Quản Lý';
            case 'chef': return 'Đầu Bếp';
            case 'waiter': return 'Phục Vụ';
            default: return 'Nhân Viên';
        }
    };

    const getRoleBadgeClasses = (role: string) => {
        switch(role) {
            case 'admin': return 'bg-slate-100 text-slate-800';
            case 'manager': return 'bg-purple-100 text-purple-700';
            case 'chef': return 'bg-amber-100 text-amber-700';
            case 'waiter': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredUsers = users.filter(user => {
        // Role Filter Logic
        let roleMatch = true;
        if (currentFilter === 'Quản Trị') roleMatch = user.role === 'admin' || user.role === 'manager';
        else if (currentFilter === 'Phục Vụ') roleMatch = user.role === 'waiter';
        else if (currentFilter === 'Đầu Bếp') roleMatch = user.role === 'chef';

        // Search Query Logic
        let searchMatch = true;
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            const translateRole = getRoleTranslation(user.role).toLowerCase();
            searchMatch = 
                (user.fullName || '').toLowerCase().includes(query) ||
                (user.username || '').toLowerCase().includes(query) ||
                (user.email || '').toLowerCase().includes(query) ||
                translateRole.includes(query);
        }

        return roleMatch && searchMatch;
    });

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE) || 1;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleFilterChange = (filter: string) => {
        setCurrentFilter(filter);
        setCurrentPage(1); // Reset to first page when filtering
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    return (
        <main className="flex-1 overflow-y-auto w-full">
            <div className="p-8 max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Quản Lý Nhân Sự</h2>
                        <p className="text-slate-500 mt-1">Quản lý nhân viên, vai trò và quyền truy cập của nhà hàng.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-[#ec1337] hover:bg-[#ec1337]/90 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-[#ec1337]/20">
                        <span className="material-symbols-outlined text-xl">person_add</span>
                        <span>Thêm Nhân Viên</span>
                    </button>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Tổng Nhân Sự</p>
                        <p className="text-2xl font-black mt-1">
                            {isLoading ? <span className="text-gray-300">...</span> : totalStaff}
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Đang Làm Việc</p>
                        <p className="text-2xl font-black mt-1 text-green-600">
                            {isLoading ? <span className="text-gray-300">...</span> : activeStaff}
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Nghỉ Phép</p>
                        <p className="text-2xl font-black mt-1 text-amber-500">
                            {isLoading ? <span className="text-gray-300">...</span> : onLeaveStaff}
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Nhân Viên Bếp</p>
                        <p className="text-2xl font-black mt-1">
                            {isLoading ? <span className="text-gray-300">...</span> : kitchenStaff}
                        </p>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex gap-1">
                            {['Tất Cả', 'Quản Trị', 'Phục Vụ', 'Đầu Bếp'].map((filter) => (
                                <button 
                                    key={filter}
                                    onClick={() => handleFilterChange(filter)}
                                    className={`px-4 py-2 text-sm transition-colors ${
                                        currentFilter === filter 
                                        ? 'font-bold border-b-2 border-[#ec1337] text-[#ec1337]' 
                                        : 'font-medium text-slate-500 hover:text-slate-900'
                                    }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full max-w-md">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input 
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#ec1337]/20 outline-none" 
                                placeholder="Tìm kiếm theo tên, email hoặc vai trò..." 
                                type="text" 
                            />
                        </div>
                    </div>

                    {/* Staff Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Nhân Viên</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Vai Trò</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Thông Tin Liên Hệ</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Trạng Thái</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Đang tải dữ liệu nhân viên...</td>
                                    </tr>
                                ) : paginatedUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Không tìm thấy nhân viên nào phù hợp.</td>
                                    </tr>
                                ) : paginatedUsers.map(user => {
                                    const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || user.username)}&background=random`;
                                    const isActive = user.status !== false;

                                    return (
                                        <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-10 rounded-full bg-slate-100 flex-shrink-0">
                                                        <img 
                                                            alt={user.fullName || user.username} 
                                                            className="w-full h-full rounded-full object-cover" 
                                                            src={user.avatar || defaultAvatar} 
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900">{user.fullName || user.username}</p>
                                                        <p className="text-xs text-slate-500">
                                                            {user.createdAt ? `Tham gia ${new Date(user.createdAt).toLocaleDateString('vi-VN')}` : 'Tham gia mới đây'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${getRoleBadgeClasses(user.role)}`}>
                                                    {getRoleTranslation(user.role)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-slate-600">{user.email || 'Chưa cập nhật email'}</p>
                                                <p className="text-xs text-slate-400">{user.phone || 'Chưa cập nhật SĐT'}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`flex items-center gap-1.5 text-xs font-bold ${isActive ? 'text-green-600' : 'text-amber-500'}`}>
                                                    <span className={`size-2 rounded-full ${isActive ? 'bg-green-600' : 'bg-amber-500'}`}></span>
                                                    {isActive ? 'Đang Làm Việc' : 'Nghỉ Phép'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="text-[#ec1337] hover:text-[#ec1337]/80 font-bold text-sm">Sửa</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-white rounded-b-xl">
                        {!isLoading && <p className="text-xs text-slate-500">Đang hiển thị {paginatedUsers.length} / {filteredUsers.length} nhân viên</p>}
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1 || isLoading}
                                className="size-8 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors" 
                            >
                                <span className="material-symbols-outlined text-sm">chevron_left</span>
                            </button>
                            
                            {Array.from({ length: totalPages }).map((_, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setCurrentPage(idx + 1)}
                                    className={`size-8 flex items-center justify-center rounded text-xs font-bold transition-colors ${
                                        currentPage === idx + 1 
                                        ? 'bg-[#ec1337] text-white' 
                                        : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    {idx + 1}
                                </button>
                            ))}

                            <button 
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages || isLoading}
                                className="size-8 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors" 
                            >
                                <span className="material-symbols-outlined text-sm">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default StaffManager;
