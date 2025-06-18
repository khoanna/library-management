import React, { useState } from 'react';
const API = import.meta.env.VITE_BASE_API;

const Form = ({ isOpen, onClose, reload }) => {
    if (!isOpen) return null;

    // Các state cho các trường
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('Nam'); // Mặc định "Nam"
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('Thủ thư'); // Mặc định "Thủ thư"
    const [salary, setSalary] = useState('');

    const handleOverlayClick = () => {
        onClose();
    };

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !birthDate || !address || !phone || !role || !salary) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        const today = new Date();
        const selectedDate = new Date(birthDate);

        if (selectedDate > today) {
            alert("Ngày sinh không được lớn hơn ngày hiện tại!");
            return;
        }
        const emailRegex = /^[\w\.-]+@[\w\.-]+\.\w{2,}$/;
        const phoneRegex = /^(03|05|07|08|09)\d{8}$/;

        if (!phoneRegex.test(phone)) {
            alert("Vui lòng nhập đúng định dạng số điện thoại!");
            return;
        }

        if (!emailRegex.test(email)) {
            alert("Vui lòng nhập đúng định dạng email.");
            return;
        }

        if (salary <= 0) {
            alert("Vui lòng nhập lương hợp lệ!");
            return;
        }

        const respone = await fetch(`${API}/nhanvien/them`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, birthDate, address, gender, phone, role, salary, })
        })
        const data = await respone.json();
        console.log(data);
        if (data.success) {
            await reload();
            onClose();
        } else {
            alert(data.message);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleOverlayClick}
        >
            <div className="card relative lg:w-1/3 w-2/3" onClick={handleContentClick}>
                {/* Nút đóng modal */}
                <div
                    onClick={onClose}
                    className="absolute hover:cursor-pointer top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    &times;
                </div>
                <h2 className="card-title font-bold text-2xl text-center">
                    Thêm nhân viên
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        {/* Họ tên */}
                        <div className="mb-4">
                            <p className="font-medium mb-2">Họ tên</p>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nhập họ tên nhân viên"
                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <p className="font-medium mb-2">Email</p>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Nhập email của nhân viên"
                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Mật khẩu */}
                        <div className="mb-4">
                            <p className="font-medium mb-2">Mật khẩu</p>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Tạo mật khẩu cho nhân viên"
                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Ngày sinh + Địa chỉ */}
                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-medium mb-2">Ngày sinh</p>
                                <input
                                    type="date"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <p className="font-medium mb-2">Địa chỉ</p>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Nhập địa chỉ của nhân viên"
                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Giới tính + Số điện thoại */}
                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-medium mb-2">Giới tính</p>
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                >
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </select>
                            </div>
                            <div>
                                <p className="font-medium mb-2">Số điện thoại</p>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Nhập số điện thoại"
                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Chức vụ + Lương */}
                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-medium mb-2">Chức vụ</p>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                >
                                    <option value="Quản lý">Quản lý</option>
                                    <option value="Thủ thư">Thủ thư</option>
                                </select>
                            </div>
                            <div>
                                <p className="font-medium mb-2">Lương</p>
                                <input
                                    type="number"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                    placeholder="Nhập lương"
                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                        >
                            Thêm nhân viên
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;
