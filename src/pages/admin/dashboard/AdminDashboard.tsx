

const AdminDashboard = () => {
    // Parse currentUser from localStorage
    const savedUser = localStorage.getItem("currentUser");
    const currentUser = savedUser ? JSON.parse(savedUser) : null;
    const username = currentUser?.fullName || currentUser?.username || "Admin";
    
    return (
        <main className="flex-1 overflow-y-auto bg-[#f8f7f5]">
            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold tracking-tight">Tổng Quan</h2>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="relative w-64">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                            <input className="w-full bg-slate-100 border-none rounded-lg pl-10 py-2 text-sm focus:ring-2 focus:ring-[#ec1337]/20" placeholder="Tìm kiếm đơn hàng..." type="text" />
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="p-2 text-slate-500 hover:text-[#ec1337] transition-colors">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto space-y-8">
                    {/* Welcome Section */}
                    <section>
                        <h2 className="text-3xl font-black tracking-tight text-slate-900 leading-none">Welcome back, {username}.</h2>
                        <p className="text-slate-500 mt-2 font-medium">Tóm tắt hiệu suất cho ngày hôm nay</p>
                    </section>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                            <div className="flex justify-between items-center mb-2">
                                <span className="material-symbols-outlined text-[#ec1337] bg-[#ec1337]/10 p-2 rounded-lg">shopping_bag</span>
                                <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-full">+12.5%</span>
                            </div>
                            <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Tổng Số Đơn</p>
                            <p className="text-3xl font-bold">142</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                            <div className="flex justify-between items-center mb-2">
                                <span className="material-symbols-outlined text-[#ec1337] bg-[#ec1337]/10 p-2 rounded-lg">payments</span>
                                <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-full">+8.2%</span>
                            </div>
                            <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Tổng Doanh Thu</p>
                            <p className="text-3xl font-bold">12,450,000đ</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                            <div className="flex justify-between items-center mb-2">
                                <span className="material-symbols-outlined text-[#ec1337] bg-[#ec1337]/10 p-2 rounded-lg">table_restaurant</span>
                                <span className="text-orange-500 text-xs font-bold bg-orange-500/10 px-2 py-1 rounded-full">Cao Điểm</span>
                            </div>
                            <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Bàn Đang Phục Vụ</p>
                            <p className="text-3xl font-bold">18/30</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Chart Column */}
                        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-lg font-bold">Doanh Thu Trong Ngày</h3>
                                    <p className="text-sm text-slate-500">Phân bố doanh thu theo giờ</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1.5 text-xs font-bold bg-slate-100 rounded-lg">Hàng Ngày</button>
                                    <button className="px-3 py-1.5 text-xs font-bold text-slate-400">Hàng Tuần</button>
                                </div>
                            </div>
                            
                            {/* Simple CSS Bar Chart */}
                            <div className="flex items-end justify-between h-64 gap-2">
                                <div className="flex-1 flex flex-col items-center gap-2 group">
                                    <div className="w-full bg-slate-100 rounded-t-lg h-[40%] group-hover:bg-[#ec1337]/20 transition-all relative">
                                        <div className="absolute inset-x-0 bottom-0 bg-[#ec1337]/10 rounded-t-lg h-[60%]"></div>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">11:00</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-2 group">
                                    <div className="w-full bg-slate-100 rounded-t-lg h-[65%] group-hover:bg-[#ec1337]/20 transition-all relative">
                                        <div className="absolute inset-x-0 bottom-0 bg-[#ec1337]/20 rounded-t-lg h-[80%]"></div>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">13:00</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-2 group">
                                    <div className="w-full bg-slate-100 rounded-t-lg h-[30%] group-hover:bg-[#ec1337]/20 transition-all relative">
                                        <div className="absolute inset-x-0 bottom-0 bg-[#ec1337]/10 rounded-t-lg h-[40%]"></div>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">15:00</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-2 group">
                                    <div className="w-full bg-slate-100 rounded-t-lg h-[50%] group-hover:bg-[#ec1337]/20 transition-all relative">
                                        <div className="absolute inset-x-0 bottom-0 bg-[#ec1337]/15 rounded-t-lg h-[70%]"></div>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">17:00</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-2 group">
                                    <div className="w-full bg-[#ec1337] rounded-t-lg h-[95%] shadow-lg shadow-[#ec1337]/20 transition-all relative">
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Cao Điểm</div>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-900 uppercase">19:00</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-2 group">
                                    <div className="w-full bg-slate-100 rounded-t-lg h-[85%] group-hover:bg-[#ec1337]/20 transition-all relative">
                                        <div className="absolute inset-x-0 bottom-0 bg-[#ec1337]/30 rounded-t-lg h-[90%]"></div>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">21:00</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-2 group">
                                    <div className="w-full bg-slate-100 rounded-t-lg h-[60%] group-hover:bg-[#ec1337]/20 transition-all relative">
                                        <div className="absolute inset-x-0 bottom-0 bg-[#ec1337]/10 rounded-t-lg h-[50%]"></div>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">23:00</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity Column */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold">Hoạt Động Gần Đây</h3>
                                <button className="text-[#ec1337] text-xs font-bold hover:underline">Xem Tất Cả</button>
                            </div>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="size-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-blue-500 text-lg">restaurant</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-semibold">Bàn 12 vừa gọi "Vịt Quay Bắc Kinh"</p>
                                        <p className="text-xs text-slate-500">2 phút trước • Phục vụ: Tuấn</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-emerald-500 text-lg">check_circle</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-semibold">Đơn hàng #842 đã thanh toán</p>
                                        <p className="text-xs text-slate-500">12 phút trước • 3,250,000đ</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="size-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-amber-500 text-lg">event</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-semibold">Đặt bàn mới cho 8 người</p>
                                        <p className="text-xs text-slate-500">45 phút trước • 20:30 Hôm nay</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="size-10 rounded-full bg-[#ec1337]/10 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-[#ec1337] text-lg">warning</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-semibold text-[#ec1337]">Cảnh Báo Kho: Bò Wagyu Sắp Hết</p>
                                        <p className="text-xs text-slate-500">1 giờ trước • Chỉ còn 4 phần</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="size-10 rounded-full bg-slate-500/10 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-slate-500 text-lg">person_add</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-semibold">Nhân viên đăng nhập: Quản lý Kim</p>
                                        <p className="text-xs text-slate-500">2 giờ trước • Tiền sảnh</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 p-4 bg-[#ec1337]/5 rounded-xl border border-[#ec1337]/10">
                                <p className="text-xs font-bold text-[#ec1337] uppercase tracking-tighter mb-1">Ghi Chú Ca Làm Việc</p>
                                <p className="text-sm italic text-slate-700">"Tiệc VIP đến lúc 8h tối, vui lòng đảm bảo Bàn 1 và 2 đã được chuẩn bị sẵn rượu vang thượng hạng."</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Kitchen Status Banner */}
                    <div className="bg-slate-900 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between text-white gap-6 shadow-xl shadow-slate-900/20">
                        <div className="flex items-center gap-6">
                            <div className="size-16 rounded-2xl bg-[#ec1337] flex items-center justify-center">
                                <span className="material-symbols-outlined text-4xl text-white">speed</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Năng Suất Bếp</h3>
                                <p className="text-slate-400">Thời gian chuẩn bị trung bình: <span className="text-white font-bold">18 phút</span></p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="text-2xl font-black">24</div>
                                <div className="text-[10px] text-slate-400 uppercase font-bold">Đang Làm</div>
                            </div>
                            <div className="w-[1px] h-10 bg-white/20"></div>
                            <div className="flex flex-col items-center">
                                <div className="text-2xl font-black text-amber-400">08</div>
                                <div className="text-[10px] text-slate-400 uppercase font-bold">Chậm Trễ</div>
                            </div>
                            <div className="w-[1px] h-10 bg-white/20"></div>
                            <div className="flex flex-col items-center">
                                <div className="text-2xl font-black text-emerald-400">112</div>
                                <div className="text-[10px] text-slate-400 uppercase font-bold">Hoàn Thành</div>
                            </div>
                        </div>
                        <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-[#ec1337] hover:text-white transition-all">Quản Lý Tiến Độ Bếp</button>
                    </div>
                </div>
            </main>
    );
};

export default AdminDashboard;
