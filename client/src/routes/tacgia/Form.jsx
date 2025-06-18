import React, { useState } from 'react';

const Form = ({ isOpen, onClose, reload }) => {
    if (!isOpen) return null;

    const [tenTacGia, setTenTacGia] = useState("");
    const [tieuSu, setTieuSu] = useState("");
    const [quocTich, setQuocTich] = useState("");
    const [ngaySinh, setNgaySinh] = useState("");
    const [ngayMat, setNgayMat] = useState(null);

    const handleOverlayClick = () => {
        onClose();
    };

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!tenTacGia || !tieuSu || !quocTich || !ngaySinh) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        const date = new Date(ngaySinh);
        const currentDate = new Date();

        if (date > currentDate) {
            alert("Ngày sinh không hợp lệ!");
            return;
        }

        if (ngayMat) {
            const dateMat = new Date(ngayMat);
            if (dateMat < date) {
                alert("Ngày mất không thể bé hơn ngày sinh!");
                return;
            }
        }

        const respone = await fetch(`${import.meta.env.VITE_BASE_API}/tacgia/add`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                tenTacGia,
                tieuSu,
                quocTich,
                ngaySinh,
                ngayMat
            }),
        });
        if (respone.ok) {
            await reload();
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleOverlayClick}>
            <div className="card relative lg:w-1/3 w-2/3" onClick={handleContentClick}>
                {/* Nút đóng modal */}
                <div onClick={onClose} className="absolute hover:cursor-pointer top-3 right-3 text-gray-500 hover:text-gray-700">
                    &times;
                </div>
                <h2 className="card-title font-bold text-2xl text-center">Thêm tác giả</h2>
                <form onSubmit={handleSubmit}>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <div className="mb-4">
                            <p className="card-title l:text-xl block my-2 mb-4">Tên tác giả</p>
                            <input
                                type="text"
                                value={tenTacGia}
                                onChange={(e) => setTenTacGia(e.target.value)}
                                placeholder="Nhập tên tác giả"
                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <p className="card-title l:text-xl block my-2 mb-4">Tiểu sử</p>
                            <input
                                type="text"
                                value={tieuSu}
                                onChange={(e) => setTieuSu(e.target.value)}
                                placeholder="Nhập tiểu sử tác giả"
                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <p className="card-title l:text-xl block my-2 mb-4">Quốc tịch</p>
                            <input
                                type="text"
                                value={quocTich}
                                onChange={(e) => setQuocTich(e.target.value)}
                                placeholder="Nhập quốc tịch tác giả"
                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <p className="card-title lg:text-xl block my-2 mb-4">Ngày sinh</p>
                                <input
                                    type="date"
                                    value={ngaySinh}
                                    onChange={(e) => setNgaySinh(e.target.value)}
                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <p className="card-title lg:text-xl block my-2 mb-4">Ngày mất (nếu có)</p>
                                <input
                                    type="date"
                                    value={ngayMat}
                                    onChange={(e) => setNgayMat(e.target.value)}
                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
                            Thêm tác giả
                        </button>
                    </div>


                </form>
            </div>
        </div >
    );
};

export default Form;
