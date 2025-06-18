import React, { useState } from 'react';
const API = import.meta.env.VITE_BASE_API;

const FormPhat = ({ isOpen, onClose, reload }) => {
    if (!isOpen) return null;

    const [readerId, setReaderId] = useState("");
    const [tienPhat, setTienPhat] = useState(0);
    const [tienTra, setTienTra] = useState(0);
    const [bookCodes, setBookCodes] = useState([""]);

    const handleOverlayClick = () => {
        onClose();
    };

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    const handleAddBookCode = () => {
        setBookCodes([...bookCodes, ""]);
    };

    const handleBookCodeChange = (index, value) => {
        const newBookCodes = [...bookCodes];
        newBookCodes[index] = value;
        setBookCodes(newBookCodes);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!readerId || tienPhat <= 0 || tienTra <= 0) {
            alert("Vui lòng nhập mã độc giả và số tiền phạt hợp lệ!");
            return;
        }

        if (Number(tienTra) > Number(tienPhat)) {
            alert("Số tiền đã trả không được lớn hơn số tiền phạt!");
            return;
        }

        const respone = await fetch(`${API}/phieuphat/taophieu`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ MaDocGia: readerId, tienPhat, tienTra })
        });
        
        if (respone.status == 400) {
            alert("Mã độc giả không hợp lệ!");
        } else {
            alert("Tạo phiếu phạt thành công!");
            await reload();
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleOverlayClick}>
            <div className="card relative lg:w-1/3 w-2/3" onClick={handleContentClick}>
                {/* Nút đóng modal */}
                <div onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 hover:cursor-pointer">
                    &times;
                </div>
                <h2 className="card-title font-bold text-2xl text-center">Tạo Phiếu Phạt</h2>
                <form onSubmit={handleSubmit}>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <div className="mb-4">
                            <p className="card-title l:text-xl block my-2 mb-4">Mã độc giả</p>
                            <input
                                type="text"
                                value={readerId}
                                onChange={(e) => setReaderId(e.target.value)}
                                placeholder="Nhập mã độc giả"
                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <p className="card-title lg:text-xl block my-2 mb-4">Tiền phạt</p>
                                <input
                                    type="number"
                                    value={tienPhat}
                                    onChange={(e) => setTienPhat(e.target.value)}
                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <p className="card-title lg:text-xl block my-2 mb-4">Đã trả</p>
                                <input
                                    type="number"
                                    value={tienTra}
                                    onChange={(e) => setTienTra(e.target.value)}
                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
                            Tạo phiếu phạt
                        </button>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default FormPhat;
