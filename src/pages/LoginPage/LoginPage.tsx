import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { message, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import logoImg from "../../assets/images/logo_saigon_lumiere.jpg";
import { authService } from "../../services/authService";

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    // Initialize remember me if present
    useEffect(() => {
        const rememberedEmail = localStorage.getItem("rememberedEmail");
        if (rememberedEmail) {
            setEmail(rememberedEmail);
            setRememberMe(true);
        }
    }, []);

    const validate = () => {
        const newErrors: { email?: string; password?: string } = {};

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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsLoading(true);

        try {
            const users = await authService.login(email, password);
            
            if (users.length === 0) {
                // No user found with that email AND password combi
                message.error({
                    content: "Xác thực thất bại!",
                    style: { marginTop: '10px', fontSize: '16px' }
                });
                setIsLoading(false);
                return;
            }

            // Note: For real world apps this would be token management
            if (rememberMe) {
                localStorage.setItem("rememberedEmail", email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }

            message.success({
                content: "Xác thực thành công!",
                style: {
                    marginTop: '5vh',
                    fontSize: '16px',
                },
            });
            
            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            message.error({
                 content: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                 style: { marginTop: '5vh', fontSize: '16px' }
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (errors.email) setErrors({ ...errors, email: undefined });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (errors.password) setErrors({ ...errors, password: undefined });
    };

    return (
        <div className="flex min-h-screen w-full font-[Manrope]">
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
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

            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white relative">
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

                    <form className="space-y-6" onSubmit={handleLogin} noValidate>
                        <div className="flex flex-col gap-2">
                            <label className="text-[#1b0d10] text-base font-medium leading-normal">Địa Chỉ Email</label>
                            <div>
                                <div className={`flex w-full items-center rounded-lg border bg-white shadow-sm transition-all focus-within:ring-1 ${errors.email ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500' : 'border-[#e7cfd3] focus-within:border-[#ec1337] focus-within:ring-[#ec1337]'}`}>
                                    <input
                                        required
                                        value={email}
                                        onChange={handleEmailChange}
                                        disabled={isLoading}
                                        className="flex w-full min-w-0 flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-[#1b0d10] h-14 placeholder:text-[#9a4c59]/50 pl-[15px] pr-3 text-base font-normal leading-normal disabled:opacity-50"
                                        placeholder="chef@saigonlumiere.com"
                                        type="email"
                                    />
                                    <div className={`${errors.email ? 'text-red-500' : 'text-[#9a4c59]'} flex items-center justify-center pr-[15px]`}>
                                        <span className="material-symbols-outlined">mail</span>
                                    </div>
                                </div>
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[#1b0d10] text-base font-medium leading-normal">Mật Khẩu</label>
                            <div>
                                <div className={`flex w-full items-center rounded-lg border bg-white shadow-sm transition-all focus-within:ring-1 ${errors.password ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500' : 'border-[#e7cfd3] focus-within:border-[#ec1337] focus-within:ring-[#ec1337]'}`}>
                                    <input
                                        required
                                        value={password}
                                        onChange={handlePasswordChange}
                                        disabled={isLoading}
                                        className="flex w-full min-w-0 flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-[#1b0d10] h-14 placeholder:text-[#9a4c59]/50 pl-[15px] pr-3 text-base font-normal leading-normal disabled:opacity-50"
                                        placeholder="••••••••"
                                        type="password"
                                    />
                                    <div className={`${errors.password ? 'text-red-500' : 'text-[#9a4c59]'} flex items-center justify-center pr-[15px]`}>
                                        <span className="material-symbols-outlined">lock</span>
                                    </div>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input 
                                    className="rounded border-[#e7cfd3] text-[#ec1337] focus:ring-[#ec1337] w-5 h-5 focus:outline-none disabled:opacity-50" 
                                    type="checkbox" 
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    disabled={isLoading}
                                />
                                <span className={`text-sm font-medium transition-colors ${isLoading ? 'text-gray-400' : 'text-[#1b0d10] group-hover:text-[#ec1337]'}`}>Ghi nhớ đăng nhập</span>
                            </label>
                            <a className={`text-sm font-bold hover:underline ${isLoading ? 'text-gray-400 pointer-events-none' : 'text-[#ec1337]'}`} href={isLoading ? undefined : "#"}>Quên mật khẩu?</a>
                        </div>

                        <button 
                            className="w-full bg-[#ec1337] hover:bg-[#ec1337]/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-[#ec1337]/20 transition-all flex items-center justify-center gap-2 disabled:bg-[#ec1337]/60 disabled:cursor-not-allowed" 
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />} />
                                    <span>Đang xác thực...</span>
                                </>
                            ) : (
                                <>
                                    <span>Đăng Nhập</span>
                                    <span className="material-symbols-outlined text-sm">login</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-[#9a4c59]">
                            Chưa có tài khoản?
                            <Link className={`font-bold ml-1 ${isLoading ? 'text-gray-400 pointer-events-none' : 'text-[#ec1337] hover:underline'}`} to="/register">Đăng ký Saigon Lumière</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
