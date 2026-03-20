import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-2xl w-full border border-slate-100"
            >
                <Result
                    status="404"
                    title={<span className="text-4xl font-bold text-slate-800">404</span>}
                    subTitle={<span className="text-lg text-slate-500">Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ.</span>}
                    extra={
                        <Button 
                            type="primary" 
                            size="large"
                            onClick={() => navigate(-1)}
                            className="bg-primary hover:bg-primary/90 hover:scale-105 transition-transform h-12 px-8 text-base font-semibold shadow-md shadow-primary/30"
                        >
                            Quay Lại Trang Trước
                        </Button>
                    }
                />
            </motion.div>
        </div>
    );
}
