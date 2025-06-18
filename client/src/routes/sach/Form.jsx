import React, { useState, useEffect } from 'react';
import SingleSelect from './SingleSelect';

const API = import.meta.env.VITE_BASE_API;

const Form = ({ isOpen, onClose, reload }) => {
    if (!isOpen) return null;

    const [bookName, setBookName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [publishYear, setPublishYear] = useState("");

    const [NXB, setNXB] = useState([]);
    const [theLoai, setTheLoai] = useState([]);
    const [tacGia, setTacGia] = useState([]);

    const [selectedNXB, setSelectedNXB] = useState(null);
    const [selectedTheLoai, setSelectedTheLoai] = useState(null);
    const [selectedTacGia, setSelectedTacGia] = useState(null);

    const load = async () => {
        const response = await fetch(`${API}/sach/thongtin`, {
            credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
            setNXB(data.NXB);
            setTheLoai(data.theLoai);
            setTacGia(data.tacGia);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const handleOverlayClick = () => onClose();

    const handleContentClick = (e) => e.stopPropagation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!bookName || !publishYear || !price || !quantity || !selectedNXB || !selectedTheLoai || !selectedTacGia) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const currentDate = new Date();
        const chosenDate = new Date(publishYear);

        if (chosenDate > currentDate) {
            alert("Năm xuất bản không thể lớn hơn ngày hiện tại!");
            return;
        }

        if (price <= 0) {
            alert("Giá sách không hợp lệ!");
            return;
        }
        if (quantity <= 0) {
            alert("Số lượng không hợp lệ!");
            return;
        }

        const response = await fetch(`${API}/sach/nhap`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                TenSach: bookName,
                MaTheLoai: selectedTheLoai.id,
                MaTacGia: selectedTacGia.id,
                NamXuatBan: publishYear,
                NhaXuatBan: selectedNXB.id,
                GiaSach: price,
                SoLuong: quantity,
            }),
        });
        const data = await response.json();
        if (data.success) {
            await reload();
            onClose();
        } else {
            alert(data.error);
            return;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleOverlayClick}>
            <div className="card relative lg:w-1/3 w-2/3" onClick={handleContentClick}>
                <div onClick={onClose} className="absolute hover:cursor-pointer top-3 right-3 text-gray-500 hover:text-gray-700">
                    &times;
                </div>
                <h2 className="card-title font-bold text-2xl text-center">Nhập sách</h2>
                <form onSubmit={handleSubmit}>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">

                        {/* Tên sách */}
                        <div className="mb-4">
                            <p className="font-medium mb-2 dark:text-white">Tên sách</p>
                            <input
                                type="text"
                                value={bookName}
                                onChange={(e) => setBookName(e.target.value)}
                                placeholder="Nhập tên sách"
                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* MultiSelect cho nhà xuất bản */}
                        <SingleSelect
                            label="Nhà xuất bản"
                            items={NXB.map((n) => ({ id: n.MaNhaXuatBan, name: n.TenNhaXuatBan }))}
                            selectedItem={selectedNXB}
                            setSelectedItem={setSelectedNXB}
                        />

                        <SingleSelect
                            label="Thể loại"
                            items={theLoai.map((t) => ({ id: t.MaTheLoai, name: t.TenTheLoai }))}
                            selectedItem={selectedTheLoai}
                            setSelectedItem={setSelectedTheLoai}
                        />

                        <SingleSelect
                            label="Tác giả"
                            items={tacGia.map((a) => ({ id: a.MaTacGia, name: a.TenTacGia }))}
                            selectedItem={selectedTacGia}
                            setSelectedItem={setSelectedTacGia}
                        />

                        <div className="mb-4 grid grid-cols-2 gap-4">
                            {/* Năm xuất bản */}
                            <div>
                                <p className="font-medium mb-2 dark:text-white">Ngày xuất bản</p>
                                <input
                                    type="date"
                                    value={publishYear}
                                    onChange={(e) => setPublishYear(e.target.value)}
                                    placeholder="Chọn ngày xuất bản"
                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>


                            {/* Giá sách */}
                            <div>
                                <p className="font-medium mb-2 dark:text-white">Giá sách</p>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Nhập giá sách"
                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Số lượng */}
                        <div className="mb-4">
                            <p className="font-medium mb-2 dark:text-white">Số lượng</p>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="Nhập số lượng"
                                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
                            Lưu thông tin sách
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;
