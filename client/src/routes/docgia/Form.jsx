import React, { useState } from 'react';
const API = import.meta.env.VITE_BASE_API;

const Form = ({ isOpen, onClose, tuoi, reload, thang }) => {
    if (!isOpen) return null;

    const [hoTen, setHoTen] = useState('');
    const [loaiDocGia, setLoaiDocGia] = useState('Thuong');
    const [ngaySinh, setNgaySinh] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [email, setEmail] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');
    const [gioiTinh, setGioiTinh] = useState('Nam');
    const [ngayLamThe, setNgayLamThe] = useState('');
    const [ngayHetHan, setNgayHetHan] = useState('');

    const handleOverlayClick = () => {
        onClose();
    };

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!hoTen || !loaiDocGia || !ngaySinh || !soDienThoai || !diaChi || !email || !gioiTinh || !ngayLamThe || !ngayHetHan) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const emailRegex = /^[\w\.-]+@[\w\.-]+\.\w{2,}$/;
        const phoneRegex = /^(03|05|07|08|09)\d{8}$/;

        if (!emailRegex.test(email)) {
            alert("Vui lòng nhập đúng định dạng email.");
            return;
        }

        if (!phoneRegex.test(soDienThoai)) {
            alert("Vui lòng nhập đúng định dạng số điện thoại.");
            return;
        }

        const today = new Date();
        const birthDate = new Date(ngaySinh);
        const age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();


        if (age < tuoi || (age === tuoi && month < 0)) {
            alert("Bạn chưa đủ tuổi để mượn sách.");
            return;
        }

        const ngayLamTheDate = new Date(ngayLamThe);
        const ngayHetHanDate = new Date(ngayHetHan);

        if (ngayLamTheDate > today) {
            alert("Ngày làm thẻ phải nhỏ hơn hoặc bằng ngày hiện tại");
            return;
        }

        if (ngayHetHanDate < today) {
            alert("Ngày hết hạn phải lớn hơn ngày hiện tại");
            return;
        }

        const respone = await fetch(`${API}/docgia/taomoi`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ hoTen, loaiDocGia, ngaySinh, diaChi, email, soDienThoai, gioiTinh, ngayLamThe, ngayHetHan })
        });
        if (respone.ok) {
            await reload()
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleOverlayClick}
        >
            <div
                className="card relative bg-white dark:bg-slate-900 lg:w-1/3 w-2/3 rounded-lg shadow-md"
                onClick={handleContentClick}
            >
                {/* Nút đóng modal */}
                <div
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                >
                    &times;
                </div>
                <h2 className="card-title font-bold text-2xl text-center mt-4">
                    Thêm độc giả mới
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="card-body p-6 bg-slate-100 dark:bg-slate-950 transition-colors">
                        {/* Họ tên */}
                        <div className="mb-4">
                            <p className="mb-2 font-medium dark:text-white">
                                Họ tên
                            </p>
                            <input
                                type="text"
                                value={hoTen}
                                onChange={(e) => setHoTen(e.target.value)}
                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                placeholder="VD: Nguyễn Văn A"
                            />
                        </div>
                        {/* Loại độc giả + Giới tính */}
                        <div className="gap-4 mb-4">
                            <div>
                                <p className="mb-2 font-medium dark:text-white">
                                    Giới tính
                                </p>
                                <select
                                    value={gioiTinh}
                                    onChange={(e) => setGioiTinh(e.target.value)}
                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                >
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </select>
                            </div>
                        </div>
                        {/* Ngày sinh */}
                        <div className="mb-4">
                            <p className="mb-2 font-medium dark:text-white">
                                Ngày sinh
                            </p>
                            <input
                                type="date"
                                value={ngaySinh}
                                onChange={(e) => setNgaySinh(e.target.value)}
                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        {/* Địa chỉ */}
                        <div className="mb-4">
                            <p className="mb-2 font-medium dark:text-white">
                                Địa chỉ
                            </p>
                            <input
                                type="text"
                                value={diaChi}
                                onChange={(e) => setDiaChi(e.target.value)}
                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                placeholder="VD: 123 Đường ABC, Quận 1, TP.HCM"
                            />
                        </div>
                        {/* Email + Số điện thoại */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="mb-2 font-medium dark:text-white">
                                    Email
                                </p>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                    placeholder="nguyenvanA1@example.com"
                                />
                            </div>
                            <div>
                                <p className="mb-2 font-medium dark:text-white">
                                    Số điện thoại
                                </p>
                                <input
                                    type="text"
                                    value={soDienThoai}
                                    onChange={(e) => setSoDienThoai(e.target.value)}
                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                    placeholder="VD: 0901234567"
                                />
                            </div>
                        </div>
                        {/* Ngày làm thẻ + Ngày hết hạn */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="mb-2 font-medium dark:text-white">
                                    Ngày làm thẻ
                                </p>
                                <input
                                    type="date"
                                    value={ngayLamThe}
                                    onChange={(e) => {
                                        setNgayLamThe(e.target.value)
                                        const ngayLam = new Date(e.target.value);
                                        const ngayHetHan = new Date(ngayLam);
                                        ngayHetHan.setMonth(ngayHetHan.getMonth() + thang);
                                        const formatted = ngayHetHan.toISOString().split("T")[0];
                                        setNgayHetHan(formatted);
                                    }}
                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <p className="mb-2 font-medium dark:text-white">
                                    Ngày hết hạn
                                </p>
                                <input
                                    type="date"
                                    value={ngayHetHan}
                                    disabled
                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                        {/* Nút submit */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                        >
                            Thêm độc giả
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;
