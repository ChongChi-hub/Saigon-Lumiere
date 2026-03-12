import { useNavigate, Link } from "react-router-dom";
import logoImg from "../../assets/images/logo_saigon_lumiere.jpg";

export default function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/dashboard");
    };

    return (
        <div className="flex min-h-screen w-full font-[Manrope]">
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                {/* Adjusted gradient to match the new color scheme #ec1337 */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ec1337]/40 to-black/60 z-10"></div>
                <div
                    className="absolute inset-0 bg-center bg-no-repeat bg-cover"
                    style={{ backgroundImage: 'url("/src/assets/images/image_landing_page.jpg")' }}
                ></div>

                <div className="relative z-20 flex flex-col justify-between p-12 text-white w-full">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg overflow-hidden flex items-center justify-center bg-white p-0.5">
                            <img src={logoImg} alt="Saigon Lumière Logo" className="w-full h-full object-cover rounded-md" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">Saigon Lumière</h1>
                    </div>

                    <div className="text-white max-w-md">
                        <p className="text-5xl font-black leading-tight tracking-tight mb-6">Thắp sáng tinh hoa nhà bếp của bạn.</p>
                        <p className="text-lg font-medium opacity-90">Hãy đăng nhập để khám phá thực đơn tinh tuyển, quản lý đặt bàn và trải nghiệm hành trình ẩm thực được thiết kế riêng cho bạn..</p>
                    </div>

                    <div className="flex gap-8 text-sm font-medium opacity-80 text-white">
                        <span>© {new Date().getFullYear()} Saigon Lumière</span>
                        <a className="hover:underline" href="#">Chính sách bảo mật</a>
                        <a className="hover:underline" href="#">Điều khoản dịch vụ</a>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
                <div className="max-w-md w-full mx-auto">
                    <div className="mb-10 text-center lg:text-left">
                        <div className="lg:hidden flex items-center gap-3 mb-8 text-[#ec1337] justify-center lg:justify-start">
                            <div className="size-8 rounded-md overflow-hidden flex items-center justify-center bg-white border border-gray-100">
                                <img src={logoImg} alt="Saigon Lumière Logo" className="w-full h-full object-cover rounded-md" />
                            </div>
                            <span className="text-xl font-bold">Saigon Lumière</span>
                        </div>

                        <h2 className="text-[#1b0d10] text-4xl font-black leading-tight tracking-[-0.033em]">Saigon Lumière</h2>
                        <p className="text-[#9a4c59] text-base font-normal mt-2">Chào mừng trở lại! Vui lòng điền thông tin để truy cập hệ thống.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="flex flex-col gap-2">
                            <label className="text-[#1b0d10] text-base font-medium leading-normal">Địa Chỉ Email</label>
                            <div className="flex w-full items-center rounded-lg border border-[#e7cfd3] bg-white shadow-sm focus-within:border-[#ec1337] focus-within:ring-1 focus-within:ring-[#ec1337] transition-all">
                                <input
                                    required
                                    className="flex w-full min-w-0 flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-[#1b0d10] h-14 placeholder:text-[#9a4c59]/50 pl-[15px] pr-3 text-base font-normal leading-normal"
                                    placeholder="chef@saigonlumiere.com"
                                    type="email"
                                />
                                <div className="text-[#9a4c59] flex items-center justify-center pr-[15px]">
                                    <span className="material-symbols-outlined">mail</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[#1b0d10] text-base font-medium leading-normal">Mật Khẩu</label>
                            <div className="flex w-full items-center rounded-lg border border-[#e7cfd3] bg-white shadow-sm focus-within:border-[#ec1337] focus-within:ring-1 focus-within:ring-[#ec1337] transition-all">
                                <input
                                    required
                                    className="flex w-full min-w-0 flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-[#1b0d10] h-14 placeholder:text-[#9a4c59]/50 pl-[15px] pr-3 text-base font-normal leading-normal"
                                    placeholder="••••••••"
                                    type="password"
                                />
                                <div className="text-[#9a4c59] flex items-center justify-center pr-[15px]">
                                    <span className="material-symbols-outlined">lock</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input className="rounded border-[#e7cfd3] text-[#ec1337] focus:ring-[#ec1337] w-5 h-5 focus:outline-none" type="checkbox" />
                                <span className="text-sm font-medium text-[#1b0d10] group-hover:text-[#ec1337] transition-colors">Ghi nhớ đăng nhập</span>
                            </label>
                            <a className="text-sm font-bold text-[#ec1337] hover:underline" href="#">Quên mật khẩu?</a>
                        </div>

                        <button className="w-full bg-[#ec1337] hover:bg-[#ec1337]/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-[#ec1337]/20 transition-all flex items-center justify-center gap-2" type="submit">
                            <span>Đăng Nhập</span>
                            <span className="material-symbols-outlined text-sm">login</span>
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-[#9a4c59]">
                            Chưa có tài khoản?
                            <Link className="text-[#ec1337] font-bold hover:underline ml-1" to="/register">Đăng ký Saigon Lumière</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
