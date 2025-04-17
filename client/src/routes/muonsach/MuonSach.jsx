import { Search, Edit, BookAIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Form from "./Form";

const API = import.meta.env.VITE_BASE_API;

const MuonSach = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [danhSach, setDanhSach] = useState([]);
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState([]);
    const [checked, setChecked] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const load = async () => {
        const respone = await fetch(`${API}/phieumuon`, {
            credentials: "include",
        });
        const data = await respone.json();
        if (respone.ok) {
            setDanhSach(data.danhSachPhieuMuon)
            setFilter(data.danhSachPhieuMuon)
        }
    }

    useEffect(() => {
        load();
    }, [])

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return `${date.getUTCDate().toString().padStart(2, '0')}/${(date.getUTCMonth() + 1).toString().padStart(2, '0')}/${date.getUTCFullYear()}`;
    };

    const handleSearch = (value) => {
        setQuery(value);
        const result = danhSach.filter(item => item.MaPhieuMuon.toLowerCase().includes(value.toLowerCase()));
        setFilter(result);
    }

    const handleTra = async (phieuMuon) => {
        if (window.confirm(`Xác nhận độc giả ${phieuMuon.MaDocGia} đã trả sách cho phiếu mượn ${phieuMuon.MaPhieuMuon} không?`)) {
            const respone = await fetch(`${API}/phieumuon/tra`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    MaPhieuMuon: phieuMuon.MaPhieuMuon,
                    MaDocGia: phieuMuon.MaDocGia,
                }),
            });
            const data = await respone.json();
            if (respone.ok) {
                alert("Trả sách thành công")
                load()
            } else {
                alert(data.message)
            }
        }
    }

    return (
        <div className="card">
            <Edit onClick={openModal} className="fixed bottom-4 right-8 w-12 h-12 cursor-pointer rounded-lg bg-blue-500 p-2 transition-colors dark:bg-blue-600 text-white font-bold" />
            <Form isOpen={isModalOpen} onClose={closeModal} reload={() => load()} />
            <div className="card-header flex-col justify-around">
                <div className="card-title m-auto">Danh sách phiếu mượn</div>
                <div className="p-4 pt-2 w-full">
                    <div className="border-black dark:border-slate-600 input  w-3/4 m-auto flex ">
                        <Search></Search>
                        <input
                            type="text"
                            id="search"
                            value={query}
                            onChange={e => handleSearch(e.target.value)}
                            placeholder="Mã phiếu mượn"
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
                        <p className="dark:text-white font-semibold">Hiển thị phiếu mượn chưa trả</p>
                    </div>
                </div>
            </div>
            <div className="card-body p-0">
                <div className="h-[800px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
                    <table className="table">
                        <thead className="table-header">
                            <tr className="table-row">
                                <th className="table-head">#</th>
                                <th className="table-head ">Mã phiếu</th>
                                <th className="table-head text-center">Số sách mượn</th>
                                <th className="table-head text-center">Ngày mượn</th>
                                <th className="table-head text-center">Ngày hẹn trả</th>
                                <th className="table-head text-center">Trả sách</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {filter.map((phieuMuon, index) => (
                                (checked == true) ? (
                                    phieuMuon.daCoPhieuTra == 0 && (
                                        <tr
                                            key={index}
                                            className="table-row"
                                        >
                                            <td className="table-cell">{index + 1}</td>
                                            <td className="table-cell">
                                                <div className="flex w-max gap-x-4">
                                                    <div className="flex flex-col">
                                                        <p>{phieuMuon.MaPhieuMuon}</p>
                                                        <p className="font-normal text-slate-600 dark:text-slate-400">Độc giả {phieuMuon.MaDocGia}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="table-cell text-center">{phieuMuon.SoSachMuon}</td>
                                            <td className="table-cell text-center">{formatDate(phieuMuon.NgayTao)}</td>
                                            <td className="table-cell text-center">{formatDate(phieuMuon.NgayHenTra)}</td>
                                            <td className="table-cell text-center">
                                                <BookAIcon
                                                    className={`m-auto w-8 h-8 cursor-pointer rounded-lg bg-blue-500 p-2 transition-colors dark:bg-blue-600 text-white font-bold ${phieuMuon.daCoPhieuTra != 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                                    onClick={() => { if (phieuMuon.daCoPhieuTra == 0) handleTra(phieuMuon) }}
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
                                                    <p>{phieuMuon.MaPhieuMuon}</p>
                                                    <p className="font-normal text-slate-600 dark:text-slate-400">Độc giả {phieuMuon.MaDocGia}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="table-cell text-center">{phieuMuon.SoSachMuon}</td>
                                        <td className="table-cell text-center">{formatDate(phieuMuon.NgayTao)}</td>
                                        <td className="table-cell text-center">{formatDate(phieuMuon.NgayHenTra)}</td>
                                        <td className="table-cell text-center">
                                            <BookAIcon
                                                className={`m-auto w-8 h-8 cursor-pointer rounded-lg bg-blue-500 p-2 transition-colors dark:bg-blue-600 text-white font-bold ${phieuMuon.daCoPhieuTra != 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                                onClick={() => { if (phieuMuon.daCoPhieuTra == 0) handleTra(phieuMuon) }}
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

export default MuonSach