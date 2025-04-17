import React, { useState } from 'react';
const API = import.meta.env.VITE_BASE_API;

const Form = ({ isOpen, onClose, maDocGia, soTienPhat, maPhieuPhat, reload }) => {
    if (!isOpen) return null;

    const handleOverlayClick = () => {
        onClose();
    };

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const respone = await fetch(`${API}/phieuphat/nopphat`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ MaPhieuPhat: maPhieuPhat })
        });
        if (respone.ok) {
            reload();
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
                <h2 className="card-title font-bold text-2xl text-center">Nộp tiền phạt</h2>
                <form onSubmit={handleSubmit}>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <div className="mb-4">
                            <p className="card-title lg:text-xl block my-2 mb-4">Mã phiếu phạt</p>
                            <input
                                type="text"
                                value={maPhieuPhat}
                                className="bg-gray-500 w-full border border-gray-500 rounded p-2 focus:outline-none focus:border-blue-500 disable "
                            />
                        </div>
                        <div className="mb-4">
                            <p className="card-title lg:text-xl block my-2 mb-4">Mã độc giả</p>
                            <input
                                type="text"
                                value={maDocGia}
                                className="bg-gray-500 w-full border border-gray-500 rounded p-2 focus:outline-none focus:border-blue-500 disable "
                            />
                        </div>
                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <p className="card-title lg:text-xl block my-2 mb-4">Tiền phạt</p>
                                <input
                                    type="number"
                                    value={soTienPhat}
                                    className="w-full border bg-gray-500 border-gray-500 rounded p-2 focus:outline-none focus:border-blue-500 disable"
                                />
                            </div>
                            <div>
                                <p className="card-title lg:text-xl block my-2 mb-4">Tiền thu</p>
                                <input
                                    type="number"
                                    value={soTienPhat}
                                    className="w-full border bg-gray-500 border-gray-500 rounded p-2 focus:outline-none focus:border-blue-500 disable"
                                />
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
                            Đóng phạt
                        </button>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default Form;
