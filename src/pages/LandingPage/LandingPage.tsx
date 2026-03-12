import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const slideInRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function LandingPage() {
    return (
        <div className="flex flex-col">
            <section className="bg-background-light px-6 py-6 min-h-[calc(100vh-80px)] flex flex-col justify-center w-full max-w-[1200px] mx-auto">
                <div className="relative overflow-hidden rounded-xl bg-slate-100 border border-slate-200 h-full min-h-[500px] flex flex-col items-center justify-center p-8 text-center group/hero transition-all flex-1">
                    <div className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-1000 group-hover/hero:opacity-20 z-20" style={{ backgroundImage: 'radial-gradient(circle at center, var(--color-primary) 0%, transparent 70%)' }}></div>
                    <div className="absolute inset-0 z-10 bg-black/40"></div>
                    <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
                        <img src="/src/assets/images/image_landing_page.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover/hero:scale-105" />
                    </div>

                    {/* Top Right Auth Buttons */}
                    <div className="absolute top-6 right-6 z-30 flex gap-4">
                        <Link to="/login" className="bg-black/20 hover:bg-black/40 backdrop-blur-md text-white border border-white/30 px-5 py-2 rounded-full font-semibold transition-all shadow-lg hover:border-white/50 text-sm tracking-wide">
                            Đăng Nhập
                        </Link>
                        <Link to="/register" className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30 px-5 py-2 rounded-full font-semibold transition-all text-sm tracking-wide">
                            Đăng Ký
                        </Link>
                    </div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="flex flex-col items-center justify-center relative z-20 w-full"
                    >
                        {/* Stylized SL Monogram Presentation (Restored as requested) */}
                        <motion.div variants={fadeInUp} className="relative z-30 mb-10 mt-8 group cursor-default">
                            <div className="size-48 border border-primary/40 bg-background-light/50 backdrop-blur-sm shadow-xl rotate-45 flex items-center justify-center transition-transform duration-700 group-hover:rotate-[135deg]">
                                <div className="-rotate-45 group-hover:rotate-[-135deg] transition-transform duration-700 text-primary flex items-center justify-center">
                                    <span className="text-7xl font-display font-bold tracking-tighter">SL</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="flex flex-col gap-4 relative z-10 drop-shadow-md">
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white font-display">
                                Saigon Lumière
                            </h1>
                            <p className="text-white/90 text-lg md:text-xl font-medium uppercase tracking-[0.3em]">
                                Trải Nghiệm Ẩm Thực Đỉnh Cao
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="mt-12 flex flex-col sm:flex-row gap-4 relative z-10 w-full md:w-auto items-center justify-center">
                            <Link to="/login" className="w-full sm:w-auto bg-primary text-white border-2 border-primary px-8 py-3 rounded-lg font-bold hover:bg-primary/90 hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-xl shadow-black/50 uppercase text-sm tracking-wide">
                                <span className="material-symbols-outlined text-sm">restaurant_menu</span> Khám Phá Thực Đơn
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Trải Nghiệm Section */}
            <section id="trai-nghiem" className="scroll-mt-20 min-h-[calc(100vh-80px)] px-6 py-10 flex flex-col justify-center w-full max-w-300 mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                    className="mb-6 flex items-end justify-between border-b border-slate-200 pb-4"
                >
                    <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-bold text-slate-900 font-display">Trải Nghiệm Tinh Hoa</motion.h2>
                    <motion.span variants={fadeInUp} className="text-xs uppercase tracking-widest text-slate-400">Khám Phá</motion.span>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <motion.div variants={fadeInUp} className="group flex flex-col bg-white rounded-lg overflow-hidden border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
                        <div className="aspect-[4/3] bg-slate-50 overflow-hidden relative border-b border-slate-100">
                            <img src="/src/assets/images/image_thuc_don.jpg" alt="Thực Đơn Nếm Thử" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="p-5 flex-1">
                            <h3 className="font-bold text-lg mb-2 font-display text-slate-900">Thực Đơn Nếm Thử</h3>
                            <p className="text-sm text-slate-500 leading-relaxed font-sans">Hành trình ẩm thực thú vị với các nguyên liệu thượng hạng theo từng mùa, được chế biến bằng kỹ thuật hiện đại.</p>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="group flex flex-col bg-white rounded-lg overflow-hidden border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
                        <div className="aspect-[4/3] bg-slate-50 overflow-hidden relative border-b border-slate-100">
                            <img src="/src/assets/images/ruou_vang_phap.jpg" alt="Nghệ Thuật Ghép Rượu" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="p-5 flex-1">
                            <h3 className="font-bold text-lg mb-2 font-display text-slate-900">Nghệ Thuật Ghép Rượu</h3>
                            <p className="text-sm text-slate-500 leading-relaxed font-sans">Tuyển tập những dòng vang xuất sắc nhất được chuyên gia Sommelier lựa chọn tinh tế để tôn vinh hương vị của món ăn.</p>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="group flex flex-col bg-white rounded-lg overflow-hidden border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
                        <div className="aspect-[4/3] bg-slate-50 overflow-hidden relative border-b border-slate-100">
                            <img src="/src/assets/images/khong_gian_nha_hang.jpg" alt="Không Gian Cao Cấp" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="p-5 flex-1">
                            <h3 className="font-bold text-lg mb-2 font-display text-slate-900">Không Gian Cao Cấp</h3>
                            <p className="text-sm text-slate-500 leading-relaxed font-sans">Không gian riêng tư được thiết kế dành cho các bữa tiệc kỷ niệm hay cuộc họp đối tác, mang lại sự tinh tế và ấm cúng.</p>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Ẩm Thực Section */}
            <section id="am-thuc" className="scroll-mt-20 min-h-[calc(100vh-80px)] px-6 py-10 flex flex-col justify-center w-full max-w-300 mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                    className="mb-6 flex items-end justify-between border-b border-slate-200 pb-4"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-display">Nghệ Thuật Ẩm Thực</h2>
                    <span className="text-xs uppercase tracking-widest text-slate-400">Thực Đơn</span>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 overflow-hidden">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={slideInLeft}
                        className="flex flex-col justify-center space-y-6"
                    >
                        <h3 className="font-display text-4xl text-slate-900 leading-tight">Đánh Thức Mọi Giác Quan</h3>
                        <p className="text-slate-600 leading-relaxed font-sans text-lg">
                            Mỗi món ăn tại Saigon Lumière đều là một tuyệt tác nghệ thuật, được chuẩn bị công phu từ những nguyên liệu tươi ngon nhất, hòa quyện với phong vị bản địa chuẩn xác để thổi bùng mọi giác quan của bạn.
                        </p>
                        <ul className="text-slate-500 space-y-3 font-sans mt-4 border-l-2 border-primary/30 pl-4">
                            <li>✨ Hải sản nguyên bản theo mùa</li>
                            <li>✨ Thịt bò Wagyu thượng hạng nướng than Hoa</li>
                            <li>✨ Các món tráng miệng kiểu Pháp kết hợp Á Đông</li>
                        </ul>
                        <Link to="/login" className="mt-4 bg-primary text-white px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform w-max shadow-md shadow-primary/30 uppercase text-sm tracking-wide">
                            Xem Thực Đơn Đầy Đủ
                        </Link>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={slideInRight}
                        className="grid grid-cols-2 gap-4"
                    >
                        <div className="rounded-xl overflow-hidden min-h-[300px] border border-slate-200 shadow-sm mt-8">
                            <img src="/src/assets/images/danh_thuc_moi_giac_quan_1.jpg" alt="Đánh Thức Mọi Giác Quan 1" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="rounded-xl overflow-hidden min-h-[300px] border border-slate-200 shadow-sm mb-8">
                            <img src="/src/assets/images/danh_thuc_moi_giac_quan_2.jpg" alt="Đánh Thức Mọi Giác Quan 2" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Triết Lý Section */}
            <section id="triet-ly" className="scroll-mt-20 min-h-[calc(100vh-80px)] px-6 py-10 flex flex-col justify-center w-full max-w-[1200px] mx-auto mb-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                    className="mb-6 flex items-end justify-between border-b border-slate-200 pb-4"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-display">Triết Lý Ẩm Thực</h2>
                    <span className="text-xs uppercase tracking-widest text-slate-400">Bản Sắc Của Chúng Tôi</span>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-10"
                >
                    <motion.div variants={fadeInUp} className="space-y-6">
                        <div className="p-10 bg-white rounded-xl border border-slate-200 h-full flex flex-col justify-center shadow-sm">
                            <p className="text-xs uppercase tracking-widest text-primary font-bold mb-4 font-sans">Tầm Nhìn</p>
                            <h3 className="font-display text-4xl lg:text-5xl mb-6 leading-tight text-slate-900">Nghệ Thuật Trên Đĩa</h3>
                            <p className="font-display text-lg lg:text-xl leading-relaxed text-slate-600 italic">
                                "Trong căn bếp của chúng tôi, mỗi món ăn là một tác phẩm nghệ thuật.
                                Nơi di sản Việt Nam gặp gỡ sự tinh tế của đổi mới toàn cầu.
                                Chúng tôi không chỉ phục vụ bữa ăn, chúng tôi tạo nên cảm xúc."
                            </p>
                            <div className="mt-8 flex items-center gap-4">
                                <div className="h-[2px] w-12 bg-primary"></div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest font-sans">Bếp Trưởng Điều Hành</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="space-y-6">
                        <div className="rounded-xl overflow-hidden shadow-sm h-full min-h-[400px] relative border border-slate-200">
                            <img src="/src/assets/images/nghe_thuat_tren_dia.jpg" alt="Nghệ Thuật Trên Đĩa" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
                        </div>
                    </motion.div>
                </motion.div>
            </section>
        </div>

    );
}
