import { useState, useEffect, useRef } from 'react';
import { message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import api from '../../../services/api';
import { uploadUserAvatarPhoto } from '../../../services/cloudinaryService';
import type { User } from '../../../types/user';

const Settings = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    
    // Form state
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Load current user from localStorage
        const savedUserStr = localStorage.getItem("currentUser");
        if (savedUserStr) {
            const savedUser = JSON.parse(savedUserStr) as User;
            setUser(savedUser);
            setFullName(savedUser.fullName || '');
            setEmail(savedUser.email || '');
            setPhone(savedUser.phone || '');
            setAvatar(savedUser.avatar || '');
        }
        setIsLoading(false);
    }, []);

    const handleAvatarClick = () => {
        if (!isUploading) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validating file type
        if (!file.type.startsWith('image/')) {
            message.error("Vui lòng chọn file hình ảnh hợp lệ (JPG, PNG, WebP)!");
            return;
        }

        setIsUploading(true);
        try {
            message.loading({ content: 'Đang tải ảnh lên Cloudinary...', key: 'uploadAvatar' });
            
            // Upload to Cloudinary using existing service 
            // (Note: uploadUserAvatarPhoto automatically places it in "SaigonLumiere/Users")
            const secureUrl = await uploadUserAvatarPhoto(file);
            
            setAvatar(secureUrl);
            message.success({ content: 'Tải ảnh lên thành công!', key: 'uploadAvatar' });
        } catch (error) {
            message.error({ content: 'Tải ảnh thất bại. Vui lòng thử lại.', key: 'uploadAvatar' });
            console.error("Avatar Upload Error:", error);
        } finally {
            setIsUploading(false);
            // Reset input so the same file can be selected again if needed
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!user) return;
        
        if (!fullName.trim()) {
            message.error("Họ và tên không được để trống!");
            return;
        }

        setIsSaving(true);
        try {
            const updatedData = {
                fullName,
                email,
                phone,
                avatar
            };

            // 1. Update backend via json-server
            const response = await api.patch(`/users/${user.id}`, updatedData);
            
            // 2. Update local storage so Header & Sidebar can pick it up
            const updatedUser = { ...user, ...response.data };
            localStorage.setItem("currentUser", JSON.stringify(updatedUser));
            
            message.success({ content: 'Cập nhật thông tin thành công!', key: 'saveProfile' });
            
            // 3. Reload window to trigger un-linked components (Sidebar/Header) to re-read localStorage
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            message.error({ content: 'Đã có lỗi xảy ra khi lưu thông tin.', key: 'saveProfile' });
            console.error("Update Profile Error:", error);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <main className="flex-1 overflow-y-auto w-full flex items-center justify-center p-8">
                <Spin indicator={<LoadingOutlined style={{ fontSize: 40, color: '#ec1337' }} spin />} />
            </main>
        );
    }

    if (!user) {
        return (
            <main className="flex-1 overflow-y-auto w-full p-8">
                <div className="bg-red-50 text-red-600 p-4 rounded-xl font-bold border border-red-200">
                    Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.
                </div>
            </main>
        );
    }

    const defaultAvatarIcon = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName || user.username)}&background=random&size=128`;

    return (
        <main className="flex-1 overflow-y-auto w-full">
            <div className="p-8 max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Cài Đặt Hệ Thống</h2>
                    <p className="text-slate-500 mt-1">Quản lý tài khoản cá nhân và hồ sơ hiển thị của bạn.</p>
                </div>

                {/* Settings Grid */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    {/* Hồ Sơ Cá Nhân */}
                    <div className="border-b border-slate-200 bg-slate-50/50 px-8 py-5">
                        <h3 className="text-lg font-bold text-slate-800">Hồ Sơ Cá Nhân</h3>
                        <p className="text-sm text-slate-500">Thông tin này sẽ được hiển thị trên hệ thống nội bộ của nhà hàng.</p>
                    </div>

                    <div className="p-8">
                        <form onSubmit={handleSave} className="space-y-8">
                            
                            {/* Avatar Section */}
                            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                                <div className="relative group">
                                    <div 
                                        onClick={handleAvatarClick}
                                        className={`size-28 rounded-full border-4 border-white shadow-lg overflow-hidden relative cursor-pointer bg-slate-100 ${isUploading ? 'opacity-70 pointer-events-none' : ''}`}
                                    >
                                        <img 
                                            src={avatar || defaultAvatarIcon} 
                                            alt="User Avatar" 
                                            className="w-full h-full object-cover"
                                        />
                                        
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
                                        </div>

                                        {/* Uploading Spinner Overlay */}
                                        {isUploading && (
                                            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                                                <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />} />
                                            </div>
                                        )}
                                    </div>
                                    <input 
                                        type="file" 
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/jpeg, image/png, image/webp"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <div>
                                    <button 
                                        type="button" 
                                        onClick={handleAvatarClick}
                                        disabled={isUploading}
                                        className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold px-4 py-2 rounded-lg text-sm transition-colors mb-2 disabled:opacity-50"
                                    >
                                        Thay đổi ảnh đại diện
                                    </button>
                                    <p className="text-xs text-slate-500">Hỗ trợ JPG, PNG hoặc WebP. Kích thước tối đa 5MB. Ảnh sẽ được upload và bảo mật qua Cloudinary.</p>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 block">Họ và Tên</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">person</span>
                                        <input 
                                            type="text" 
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#ec1337]/20 focus:border-[#ec1337] outline-none transition-all" 
                                            placeholder="Nhập họ và tên..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 block">Tên Đăng Nhập / Username (Chỉ xem)</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">fingerprint</span>
                                        <input 
                                            type="text" 
                                            value={user.username}
                                            disabled
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed outline-none" 
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 block">Địa Chỉ Email</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                                        <input 
                                            type="email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#ec1337]/20 focus:border-[#ec1337] outline-none transition-all" 
                                            placeholder="Nhập địa chỉ email..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 block">Số Điện Thoại</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">call</span>
                                        <input 
                                            type="tel" 
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#ec1337]/20 focus:border-[#ec1337] outline-none transition-all" 
                                            placeholder="Nhập số điện thoại..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-bold text-slate-700 block">Quyền Truy Cập (Chỉ xem)</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">admin_panel_settings</span>
                                        <input 
                                            type="text" 
                                            value={user.role.toUpperCase()}
                                            disabled
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 font-bold cursor-not-allowed outline-none" 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                                <button 
                                    type="button" 
                                    className="px-6 py-2.5 font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
                                >
                                    Huỷ thay đổi
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={isSaving || isUploading}
                                    className="px-6 py-2.5 font-bold text-white bg-[#ec1337] hover:bg-[#ec1337]/90 rounded-lg transition-all shadow-lg shadow-[#ec1337]/20 flex items-center gap-2 disabled:bg-[#ec1337]/50 disabled:cursor-not-allowed"
                                >
                                    {isSaving ? (
                                        <>
                                            <Spin indicator={<LoadingOutlined style={{ fontSize: 16, color: 'white' }} spin />} />
                                            Đang lưu...
                                        </>
                                    ) : (
                                        'Lưu Thay Đổi'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Settings;
