import React, { useState, useEffect } from 'react';
import MultiSelectBook from './SelectBook';

const API = import.meta.env.VITE_BASE_API;

const Form = ({ isOpen, onClose, reload }) => {
    if (!isOpen) return null;

    const [allBooks, setAllBook] = useState([{}]);

    const [readerId, setReaderId] = useState("");
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [sachToiDa, setSachToiDa] = useState(0);

    useEffect(() => {
        const load = async () => {
            const respone = await fetch(`${API}/phieumuon/sach`, {
                credentials: "include",
            });
            const data = await respone.json();
            setAllBook(data);
        }
        load();
    }, [])

    useEffect(() => {
        const load = async () => {
            const respone = await fetch(`${API}/docgia`, {
                credentials: "include",
            });
            const data = await respone.json();
            if (respone.ok) {
                setSachToiDa(data.soSachToiDa);
            }
        }
        load();
    }, [])

    const handleOverlayClick = () => {
        onClose();
    };

    const handleContentClick = (e) => {
        e.stopPropagation();
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!readerId || selectedBooks.length == 0) {
            alert("Vui lòng điền thông tin phiếu mượn");
            return;
        }

        const books = selectedBooks.map(item => {
            return { MaSach: item.MaSach, SoLuong: 1 };
        });

        if (books.length > sachToiDa) {
            alert(`Vượt quá số lượng sách tối đa: ${sachToiDa} cuốn`);
            return;
        }

        const respone = await fetch(`${API}/phieumuon/tao`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: readerId, ds: books })
        });
        const data = await respone.json();
        if (data.errno == 1644) {
            alert(data.message);
        } else if (!data.success) {
            alert("Độc giả không tồn tại hoặc thẻ độc giả đã hết hạn!");
        } else {
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
                <h2 className="card-title font-bold text-2xl text-center">Tạo Phiếu Mượn</h2>
                <form onSubmit={handleSubmit}>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <div className="mb-4">
                            <p className="card-title lg:text-xl block my-2 mb-4">Mã độc giả</p>
                            <input
                                type="text"
                                value={readerId}
                                onChange={(e) => setReaderId(e.target.value)}
                                placeholder="Nhập mã độc giả"
                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <MultiSelectBook allBooks={allBooks.danhSach} selectedBooks={selectedBooks} setSelectedBooks={setSelectedBooks} />
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
                            Tạo phiếu mượn
                        </button>
                    </div>


                </form>
            </div>
        </div >
    );
};

export default Form;
