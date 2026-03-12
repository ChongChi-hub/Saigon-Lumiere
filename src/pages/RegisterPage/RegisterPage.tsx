import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { message, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import logoImg from "../../assets/images/logo_saigon_lumiere.jpg";
import { authService } from "../../services/authService";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);

    const [errors, setErrors] = useState<{
        fullName?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
        agreeTerms?: string;
    }>({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        const newErrors: typeof errors = {};

        if (!fullName.trim()) {
            newErrors.fullName = "Vui lòng nhập họ và tên";
        }

        if (!email) {
            newErrors.email = "Vui lòng nhập email";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Địa chỉ email không hợp lệ";
        }

        if (!password) {
            newErrors.password = "Vui lòng nhập mật khẩu";
        } else if (password.length < 6) {
            newErrors.password = "Mật khẩu phải từ 6 ký tự trở lên";
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
        } else if (confirmPassword !== password) {
            newErrors.confirmPassword = "Mật khẩu không khớp";
        }

        if (!agreeTerms) {
            newErrors.agreeTerms = "Bạn phải đồng ý với Điều khoản và Chính sách";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsLoading(true);

        try {
            await authService.register({
                fullName,
                email,
                password,
                username: email.split('@')[0], // Generate simple username
                role: 'customer' // default role
            });

            message.success({
                content: "Đăng ký thành công! Vui lòng đăng nhập.",
                style: {
                    marginTop: '5vh',
                    fontSize: '16px',
                },
            });
            
            navigate("/login");
        } catch (error: any) {
            if (error.message === "Email_Exists") {
                setErrors((prev) => ({ ...prev, email: "Email này đã được sử dụng" }));
            } else {
                message.error({
                    content: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                    style: { marginTop: '5vh', fontSize: '16px' }
               });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (field: keyof typeof errors) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        
        // Update state
        switch(field) {
            case 'fullName': setFullName(value as string); break;
            case 'email': setEmail(value as string); break;
            case 'password': setPassword(value as string); break;
            case 'confirmPassword': setConfirmPassword(value as string); break;
            case 'agreeTerms': setAgreeTerms(value as boolean); break;
        }

        // Clear local error when user types
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
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

                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white relative">
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

                        <form className="space-y-5" onSubmit={handleRegister} noValidate>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#1b0d10]">Họ và tên</label>
                                <div>
                                    <div className={`relative border rounded-lg bg-white shadow-sm transition-all flex items-center focus-within:ring-1 ${errors.fullName ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500' : 'border-[#e7cfd3] focus-within:border-[#ec1337] focus-within:ring-[#ec1337]'}`}>
                                        <span className={`material-symbols-outlined text-xl pl-3 ${errors.fullName ? 'text-red-500' : 'text-[#9a4c59]'}`}>person</span>
                                        <input 
                                            value={fullName}
                                            onChange={handleChange('fullName')}
                                            disabled={isLoading}
                                            className="w-full pl-3 pr-4 py-3 bg-transparent border-none focus:outline-none focus:ring-0 text-[#1b0d10] placeholder:text-[#9a4c59]/50 disabled:opacity-50" 
                                            placeholder="Saigon Lumiere" 
                                            type="text" 
                                        />
                                    </div>
                                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#1b0d10]">Địa Chỉ Email</label>
                                <div>
                                    <div className={`relative border rounded-lg bg-white shadow-sm transition-all flex items-center focus-within:ring-1 ${errors.email ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500' : 'border-[#e7cfd3] focus-within:border-[#ec1337] focus-within:ring-[#ec1337]'}`}>
                                        <span className={`material-symbols-outlined text-xl pl-3 ${errors.email ? 'text-red-500' : 'text-[#9a4c59]'}`}>mail</span>
                                        <input 
                                            value={email}
                                            onChange={handleChange('email')}
                                            disabled={isLoading}
                                            className="w-full pl-3 pr-4 py-3 bg-transparent border-none focus:outline-none focus:ring-0 text-[#1b0d10] placeholder:text-[#9a4c59]/50 disabled:opacity-50" 
                                            placeholder="name@saigonlumiere.com" 
                                            type="email" 
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#1b0d10]">Mật Khẩu</label>
                                <div>
                                    <div className={`relative border rounded-lg bg-white shadow-sm transition-all flex items-center focus-within:ring-1 ${errors.password ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500' : 'border-[#e7cfd3] focus-within:border-[#ec1337] focus-within:ring-[#ec1337]'}`}>
                                        <span className={`material-symbols-outlined text-xl pl-3 ${errors.password ? 'text-red-500' : 'text-[#9a4c59]'}`}>lock</span>
                                        <input 
                                            value={password}
                                            onChange={handleChange('password')}
                                            disabled={isLoading}
                                            className="w-full pl-3 pr-4 py-3 bg-transparent border-none focus:outline-none focus:ring-0 text-[#1b0d10] placeholder:text-[#9a4c59]/50 disabled:opacity-50" 
                                            placeholder="••••••••" 
                                            type="password" 
                                        />
                                    </div>
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#1b0d10]">Xác Nhận Mật Khẩu</label>
                                <div>
                                    <div className={`relative border rounded-lg bg-white shadow-sm transition-all flex items-center focus-within:ring-1 ${errors.confirmPassword ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500' : 'border-[#e7cfd3] focus-within:border-[#ec1337] focus-within:ring-[#ec1337]'}`}>
                                        <span className={`material-symbols-outlined text-xl pl-3 ${errors.confirmPassword ? 'text-red-500' : 'text-[#9a4c59]'}`}>lock_reset</span>
                                        <input 
                                            value={confirmPassword}
                                            onChange={handleChange('confirmPassword')}
                                            disabled={isLoading}
                                            className="w-full pl-3 pr-4 py-3 bg-transparent border-none focus:outline-none focus:ring-0 text-[#1b0d10] placeholder:text-[#9a4c59]/50 disabled:opacity-50" 
                                            placeholder="••••••••" 
                                            type="password" 
                                        />
                                    </div>
                                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                                </div>
                            </div>

                            <div className="flex flex-col items-start gap-1 pt-2">
                                <div className="flex items-start gap-2">
                                    <input 
                                        className="mt-1 rounded border-[#e7cfd3] text-[#ec1337] focus:ring-[#ec1337] h-4 w-4 disabled:opacity-50" 
                                        id="terms" 
                                        checked={agreeTerms}
                                        onChange={handleChange('agreeTerms')}
                                        disabled={isLoading}
                                        type="checkbox" 
                                    />
                                    <label className={`text-xs ${errors.agreeTerms ? 'text-red-500 font-medium' : 'text-[#9a4c59]'}`} htmlFor="terms">
                                        Bằng việc đăng ký, tôi đồng ý với <a className="text-[#ec1337] hover:underline font-bold" href={isLoading ? undefined : "#"}>Điều khoản Dịch vụ</a> và <a className="text-[#ec1337] hover:underline font-bold" href={isLoading ? undefined : "#"}>Chính sách Bảo mật</a>.
                                    </label>
                                </div>
                                {errors.agreeTerms && <p className="text-red-500 text-xs ml-6">{errors.agreeTerms}</p>}
                            </div>

                            <button 
                                className="w-full bg-[#ec1337] hover:bg-[#ec1337]/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-[#ec1337]/20 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2 disabled:bg-[#ec1337]/60 disabled:cursor-not-allowed" 
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />} />
                                        <span>Đang xử lý...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Tạo Tài Khoản</span>
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-[#1b0d10]">
                                Đã có tài khoản?
                                <Link className={`font-bold ml-1 ${isLoading ? 'text-gray-400 pointer-events-none' : 'text-[#ec1337] hover:underline'}`} to="/login">Đăng Nhập</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
