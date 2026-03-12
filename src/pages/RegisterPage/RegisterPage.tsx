import { useNavigate, Link } from "react-router-dom";
import logoImg from "../../assets/images/logo_saigon_lumiere.jpg";

export default function RegisterPage() {
    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // Redirect to login after successful "registration"
        navigate("/login");
    };

    return (
        <div className="bg-[#f8f6f6] text-[#1b0d10] min-h-screen font-[Manrope]">
            <div className="flex min-h-screen">
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA4PAd6fqChdi7WD2_YxtxLh2P0DOa_Nw1MabHcSD6Sy3tmVn-9P2Fwl1OpBp-wpZKsNdwitOBnrPrql6jtKHGOsqVqDzGGv2tZwrIAShTUmIvdBrFPYMn1rpgku9lteMUqualWOXxv0mfrvJj74Si7QsQcGNlLZ2j5qA6sHB0BdrRxEl_-OtjHtC8H9OwfrNG8QzFw_0jrFz4-gLKKQpfOwVMJG_5a_Xayq_BIPkoGYgEa4EkTcHASBHpdUbqsvvgJZrZduopbOjY")' }}>
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                    </div>
                    <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-lg overflow-hidden flex items-center justify-center bg-white p-0.5">
                                <img src={logoImg} alt="Saigon Lumière Logo" className="w-full h-full object-cover rounded-md" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight">Saigon Lumière</h1>
                        </div>
                        <div>
                            <h2 className="text-5xl font-extrabold leading-tight mb-6">Nâng tầm <br /><span className="text-[#ec1337]">trải nghiệm ẩm thực.</span></h2>
                            <p className="text-xl text-gray-200 max-w-md">Đăng ký ngay để đặt bàn, lưu món ăn yêu thích và tận hưởng những trải nghiệm ẩm thực được thiết kế riêng cho bạn.</p>
                        </div>
                        <div className="flex gap-8 text-sm font-medium opacity-80">
                            <span>© {new Date().getFullYear()} Saigon Lumière</span>
                            <a className="hover:underline" href="#">Chính sách bảo mật</a>
                            <a className="hover:underline" href="#">Điều khoản dịch vụ</a>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
                    <div className="w-full max-w-md">
                        <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
                            <div className="size-8 rounded-md overflow-hidden flex items-center justify-center bg-white border border-gray-100">
                                <img src={logoImg} alt="Saigon Lumière Logo" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-2xl font-bold">Saigon Lumière</span>
                        </div>

                        <div className="mb-10 text-center lg:text-left">
                            <h2 className="text-3xl font-black text-[#1b0d10] mb-2 tracking-tight">Đăng Ký Tài Khoản</h2>
                            <p className="text-[#9a4c59]">Gia nhập đội ngũ Saigon Lumière. Thiết lập tài khoản của bạn chỉ trong vài phút.</p>
                        </div>

                        <form className="space-y-5" onSubmit={handleRegister}>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#1b0d10]">Họ và tên</label>
                                <div className="relative border border-[#e7cfd3] rounded-lg bg-white shadow-sm focus-within:border-[#ec1337] focus-within:ring-1 focus-within:ring-[#ec1337] transition-all flex items-center">
                                    <span className="material-symbols-outlined text-[#9a4c59] text-xl pl-3">person</span>
                                    <input className="w-full pl-3 pr-4 py-3 bg-transparent border-none focus:outline-none focus:ring-0 text-[#1b0d10] placeholder:text-[#9a4c59]/50" placeholder="Saigon Lumiere" required type="text" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#1b0d10]">Địa Chỉ Email</label>
                                <div className="relative border border-[#e7cfd3] rounded-lg bg-white shadow-sm focus-within:border-[#ec1337] focus-within:ring-1 focus-within:ring-[#ec1337] transition-all flex items-center">
                                    <span className="material-symbols-outlined text-[#9a4c59] text-xl pl-3">mail</span>
                                    <input className="w-full pl-3 pr-4 py-3 bg-transparent border-none focus:outline-none focus:ring-0 text-[#1b0d10] placeholder:text-[#9a4c59]/50" placeholder="name@saigonlumiere.com" required type="email" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#1b0d10]">Mật Khẩu</label>
                                <div className="relative border border-[#e7cfd3] rounded-lg bg-white shadow-sm focus-within:border-[#ec1337] focus-within:ring-1 focus-within:ring-[#ec1337] transition-all flex items-center">
                                    <span className="material-symbols-outlined text-[#9a4c59] text-xl pl-3">lock</span>
                                    <input className="w-full pl-3 pr-4 py-3 bg-transparent border-none focus:outline-none focus:ring-0 text-[#1b0d10] placeholder:text-[#9a4c59]/50" placeholder="••••••••" required type="password" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#1b0d10]">Xác Nhận Mật Khẩu</label>
                                <div className="relative border border-[#e7cfd3] rounded-lg bg-white shadow-sm focus-within:border-[#ec1337] focus-within:ring-1 focus-within:ring-[#ec1337] transition-all flex items-center">
                                    <span className="material-symbols-outlined text-[#9a4c59] text-xl pl-3">lock_reset</span>
                                    <input className="w-full pl-3 pr-4 py-3 bg-transparent border-none focus:outline-none focus:ring-0 text-[#1b0d10] placeholder:text-[#9a4c59]/50" placeholder="••••••••" required type="password" />
                                </div>
                            </div>

                            <div className="flex items-start gap-2 pt-2">
                                <input className="mt-1 rounded border-[#e7cfd3] text-[#ec1337] focus:ring-[#ec1337] h-4 w-4" id="terms" required type="checkbox" />
                                <label className="text-xs text-[#9a4c59]" htmlFor="terms">
                                    Bằng việc đăng ký, tôi đồng ý với <a className="text-[#ec1337] hover:underline font-bold" href="#">Điều khoản Dịch vụ</a> và <a className="text-[#ec1337] hover:underline font-bold" href="#">Chính sách Bảo mật</a>.
                                </label>
                            </div>

                            <button className="w-full bg-[#ec1337] hover:bg-[#ec1337]/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-[#ec1337]/20 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2" type="submit">
                                <span>Tạo Tài Khoản</span>
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-[#1b0d10]">
                                Đã có tài khoản?
                                <Link className="text-[#ec1337] font-bold hover:underline ml-1" to="/login">Đăng Nhập</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
