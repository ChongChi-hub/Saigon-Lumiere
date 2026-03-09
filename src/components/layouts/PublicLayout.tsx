import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function PublicLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pt-20 bg-background-light">
      {/* TopNavBar based on HTML provided */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-solid border-slate-200 bg-background-light/95 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 text-primary decoration-transparent group">
            <div className="size-8 transition-transform group-hover:scale-110">
              <img src="/src/assets/images/logo_saigon_lumiere.jpg" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-slate-900 text-xl font-bold font-display tracking-tight transition-colors group-hover:text-primary">
              Saigon Lumière
            </h2>
          </Link>

          <div className="hidden md:flex flex-1 justify-end gap-8 items-center cursor-pointer">
            <nav className="flex items-center gap-9">
              <a onClick={(e) => handleNavClick(e, 'trai-nghiem')} className="text-slate-600 hover:text-primary text-sm font-medium transition-colors cursor-pointer">Trải Nghiệm</a>
              <a onClick={(e) => handleNavClick(e, 'am-thuc')} className="text-slate-600 hover:text-primary text-sm font-medium transition-colors cursor-pointer">Ẩm Thực</a>
              <a onClick={(e) => handleNavClick(e, 'triet-ly')} className="text-slate-600 hover:text-primary text-sm font-medium transition-colors cursor-pointer">Triết Lý</a>
            </nav>
            <Link to="/login" className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded font-bold text-sm tracking-wide transition-all uppercase shadow-md shadow-primary/20">
              Đặt Bàn Ngay
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full relative z-10 text-slate-900 bg-background-light">
        <Outlet />
      </main>

      {/* Footer based on HTML provided */}
      <footer className="bg-slate-100 border-t border-slate-200 py-12 relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <img src="/src/assets/images/logo_saigon_lumiere.jpg" alt="Logo" className="h-8 object-contain" />
            <span className="font-display font-bold text-lg text-slate-900">Saigon Lumière</span>
          </div>
          <p className="text-sm text-slate-500">© 2024 Saigon Lumière Fine Dining. Bản quyền đã được bảo lưu.</p>
          <div className="flex gap-6">
            <a className="text-slate-400 hover:text-primary transition-colors cursor-pointer"><span className="material-symbols-outlined">share</span></a>
            <a className="text-slate-400 hover:text-primary transition-colors cursor-pointer"><span className="material-symbols-outlined">help</span></a>
            <a className="text-slate-400 hover:text-primary transition-colors cursor-pointer"><span className="material-symbols-outlined">settings</span></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
