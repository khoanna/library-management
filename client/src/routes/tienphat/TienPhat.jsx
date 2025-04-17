import React from 'react'
import { Search, DollarSignIcon, Edit } from 'lucide-react'
import { useState, useEffect } from 'react';
import Form from './Form';
import FormPhat from './FormPhat';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_BASE_API;

const TienPhat = () => {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [danhSachPhieuPhat, setDanhSachPhieuPhat] = useState([]);
    const [checked, setChecked] = useState(false);

    const [maPhieuPhat, setMaPhieuPhat] = useState("")
    const [maDocGia, setMaDocGia] = useState("")
    const [soTienPhat, setSoTienPhat] = useState(0)
    const [formPhat, setFormPhat] = useState(false)

    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState([]);

    const openForm = () => {
        setFormPhat(true)
    }

    const closeForm = () => {
        setFormPhat(false);
    };

    const openModal = (maPhieuPhat, maDocGia, soTienPhat) => {
        setMaPhieuPhat(maPhieuPhat);
        setMaDocGia(maDocGia);
        setSoTienPhat(Number(soTienPhat));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const load = async () => {
        const respone = await fetch(`${API}/phieuphat`, {
            credentials: "include",
        });
        const data = await respone.json();
        if (respone.ok) {
            setDanhSachPhieuPhat(data.danhSachPhieuPhat);
            setFilter(data.danhSachPhieuPhat);
        }
    }

    // [Load các thông tin trang tien phat]
    useEffect(() => {
        load();
    }, [])

    const handleSearch = (value) => {
        setQuery(value);
        setFilter(danhSachPhieuPhat.filter(item => item.MaPhieuPhat.toLowerCase().includes(value.toLowerCase())))
    }

    return (
        <div className="card">
            <Edit onClick={openForm} className="z-99 fixed bottom-4 right-8 w-12 h-12 cursor-pointer rounded-lg bg-blue-500 p-2 transition-colors dark:bg-blue-600 text-white font-bold" />
            <Form isOpen={isModalOpen} onClose={closeModal} maDocGia={maDocGia} soTienPhat={soTienPhat} maPhieuPhat={maPhieuPhat} reload={() => load()} />
            <FormPhat isOpen={formPhat} onClose={closeForm} reload={() => load()} />
            <div className="card-header flex-col justify-around">
                <div className="card-title m-auto">Danh sách phiếu phạt</div>
            </div>
            <div className="p-4 pt-2 w-full">
                <div className="border-black dark:border-slate-600 input  w-3/4 m-auto flex ">
                    <Search></Search>
                    <input
                        type="text"
                        id="search"
                        placeholder="Mã phiếu phạt"
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full m-auto bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                    />
                </div>
                <div className="flex justify-center mt-4">
                    <input
                        type="checkbox"
                        value={checked}
                        onChange={() => setChecked(!checked)}
                        className="mr-2"
                    />
                    <p className="dark:text-white font-semibold">Hiển thị phiếu phạt chưa đóng</p>
                </div>
            </div>
            <div className="card-body p-0">
                <div className="h-[800px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
                    <table className="table">
                        <thead className="table-header">
                            <tr className="table-row">
                                <th className="table-head">#</th>
                                <th className="table-head ">Mã phiếu</th>
                                <th className="table-head text-center">Tiền phạt </th>
                                <th className="table-head text-center">Nộp phạt</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {filter.map((phieuPhat, index) => (
                                (checked == true) ? (
                                    phieuPhat.TrangThai !== "Đã thanh toán" && (
                                        <tr
                                            key={index}
                                            className="table-row"
                                        >
                                            <td className="table-cell">{index + 1}</td>
                                            <td className="table-cell">
                                                <div className="flex w-max gap-x-4">
                                                    <div className="flex flex-col">
                                                        <p>{phieuPhat.MaPhieuPhat}</p>
                                                        <p className="font-normal text-slate-600 dark:text-slate-400">Độc giả {phieuPhat.MaDocGia}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="table-cell text-center">{Number(phieuPhat.TongNo)}</td>
                                            <td className="table-cell text-center">
                                                <DollarSignIcon
                                                    onClick={() => {
                                                        if (phieuPhat.TrangThai !== "Đã thanh toán") {
                                                            openModal(phieuPhat.MaPhieuPhat, phieuPhat.MaDocGia, phieuPhat.TongNo);
                                                        }
                                                    }}
                                                    className={`m-auto w-8 h-8 cursor-pointer rounded-lg bg-blue-500 p-2 transition-colors dark:bg-blue-600 text-white font-bold ${phieuPhat.TrangThai === "Đã thanh toán" ? "opacity-50 cursor-not-allowed" : ""}`}
                                                    disabled={phieuPhat.TrangThai === "Đã thanh toán"}
                                                />
                                            </td>
                                        </tr>
                                    )
                                ) : (
                                    <tr
                                        key={index}
                                        className="table-row"
                                    >
                                        <td className="table-cell">{index + 1}</td>
                                        <td className="table-cell">
                                            <div className="flex w-max gap-x-4">
                                                <div className="flex flex-col">
                                                    <p>{phieuPhat.MaPhieuPhat}</p>
                                                    <p className="font-normal text-slate-600 dark:text-slate-400">Độc giả {phieuPhat.MaDocGia}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="table-cell text-center">{Number(phieuPhat.TongNo)}</td>
                                        <td className="table-cell text-center">
                                            <DollarSignIcon
                                                onClick={() => {
                                                    if (phieuPhat.TrangThai !== "Đã thanh toán") {
                                                        openModal(phieuPhat.MaPhieuPhat, phieuPhat.MaDocGia, phieuPhat.TongNo);
                                                    }
                                                }}
                                                className={`m-auto w-8 h-8 cursor-pointer rounded-lg bg-blue-500 p-2 transition-colors dark:bg-blue-600 text-white font-bold ${phieuPhat.TrangThai === "Đã thanh toán" ? "opacity-50 cursor-not-allowed" : ""}`}
                                                disabled={phieuPhat.TrangThai === "Đã thanh toán"}
                                            />
                                        </td>
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TienPhat