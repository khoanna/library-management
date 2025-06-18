
import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Package, Search, Edit, Users, Plus, DeleteIcon } from "lucide-react";
import Form from "./Form";

const API = import.meta.env.VITE_BASE_API;

const Sach = () => {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [dsTheLoai, setDsTheLoai] = useState([]);
  const [namHopLe, setNamHopLe] = useState([]);
  const [soTheLoai, setSoTheLoai] = useState([]);
  const [dsSach, setDsSach] = useState([]);
  const [filteredDsSach, setFilteredDsSach] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [editTheLoai, setEditTheLoai] = useState();
  const [editNamHopLe, setEditNamHopLe] = useState();
  const [soLuong, setSoLuong] = useState({});

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // [Load quyen admin]
  useEffect(() => {
    const check = async () => {
      const response = await fetch(`${API}/login/auth`, {
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setIsAdmin(data.user.VaiTro === "Admin");
      }
    };
    check();
  }, []);

  const load = async () => {
    const respone = await fetch(`${API}/sach`, {
      credentials: "include",
    });
    const data = await respone.json();
    setDsSach(data.danhSach);
    setDsTheLoai(data.danhSachTheLoai);
    setSoTheLoai(data.soTheLoai);
    setNamHopLe(data.namHopLe);
    setFilteredDsSach(data.danhSach);
  };

  // [Load thong tin sach]
  useEffect(() => {
    load();
  }, []);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    const filtered = dsSach.filter(
      (sach) =>
        sach.TenSach.toLowerCase().includes(searchValue.toLowerCase()) ||
        sach.MaSach.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredDsSach(filtered);
  };

  const handleEditTheLoai = async () => {
    if (!editTheLoai) {
      alert("Vui lòng nhập tên thể loại!");
      return;
    }
    const response = await fetch(`${API}/sach/theloai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ tenTheLoai: editTheLoai }),
    });
    if (response.ok) {
      load();
    }

  }

  const handleEditNamHopLe = async () => {
    if (!editNamHopLe) {
      alert("Vui lòng nhập năm hợp lệ!");
      return;
    }
    if (editNamHopLe <= 0) {
      alert("Vui lòng nhập năm hợp lệ!");
      return;
    }
    const thisYear = new Date().getFullYear();
    if (Number(editNamHopLe) > thisYear) {
      alert("Năm xuất bản không hợp lệ!");
      return;
    }
    const response = await fetch(`${API}/sach/nam`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ nam: editNamHopLe }),
    });
    if (response.ok) {
      load();
    }

  }

  const handleThem = (id, value) => {
    setSoLuong(prev => ({ ...prev, [id]: value }));
  };

  const giaHan = async (id) => {
    const response = await fetch(`${API}/sach/them`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ MaSach: id, SoLuong: soLuong[id] }),
    });
    const data = await response.json();
    if (data.success) {
      load();
    } else {
      alert("Thêm không thành công!");
    }
  }

  const handleDelete = async (tenTheLoai) => {
    const response = await fetch(`${API}/sach/xoaTheLoai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ tenTheLoai: tenTheLoai }),
    });
    if (response.ok) {
      load();
    }
  }

  const handleDeleteSach = async (maSach) => {
    const response = await fetch(`${API}/sach/xoa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ MaSach: maSach }),
    });
    if (response.ok) {
      load();
    }
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Edit
        onClick={openModal}
        className="z-99 fixed bottom-4 right-8 w-12 h-12 cursor-pointer rounded-lg bg-blue-500 p-2 transition-colors dark:bg-blue-600 text-white font-bold"
      />
      <Form isOpen={isModalOpen} onClose={closeModal} reload={() => load()} />
      <h1 className="title">Quản lý sách</h1>
      {isAdmin && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <div className="card mb-2">
              <div className="card-header">
                <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                  <Package size={26} />
                </div>
                <p className="card-title">Năm xuất bản hợp lệ</p>
              </div>
              <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">{namHopLe}</p>
                <div className="flex w-full justify-between mt-2">
                  <div className="border-black dark:border-slate-500 input w-10/12 flex">
                    <input
                      type="number"
                      id="search"
                      value={editNamHopLe}
                      onChange={(e) => setEditNamHopLe(e.target.value)}
                      placeholder="Sửa năm xuất bản hợp lệ"
                      className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                    />
                  </div>
                  <div className="w-fit cursor-pointer rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-white font-bold" onClick={() => handleEditNamHopLe()}>
                    Sửa
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-4">
              <div className="card-header">
                <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                  <Users size={26} />
                </div>
                <p className="card-title">Số thể loại</p>
              </div>
              <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">{soTheLoai}</p>
                <div className="flex w-full justify-between mt-2">
                  <div className="border-black dark:border-slate-500 input w-10/12 flex">
                    <input
                      type="text"
                      value={editTheLoai}
                      onChange={(e) => setEditTheLoai(e.target.value)}
                      id="search"
                      placeholder="Thêm thể loại sách"
                      className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                    />
                  </div>
                  <div className="w-fit cursor-pointer rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-white font-bold" onClick={() => handleEditTheLoai()}>
                    Thêm
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card col-span-1 md:col-span-2 lg:col-span-4">
            <div className="card-header">
              <p className="card-title">Danh sách thể loại</p>
            </div>
            <div className="card-body h-[350px] overflow-auto">
              {dsTheLoai?.map((theLoai, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-x-4 py-2 pr-2"
                >
                  <div className="flex items-center gap-x-4">
                    <div className="flex flex-col gap-y-2">
                      <p className="font-medium text-slate-900 dark:text-slate-50">{theLoai.TenTheLoai} - <span className="hover:text-blue-400 cursor-pointer" onClick={() => handleDelete(theLoai.MaTheLoai)}>Xóa</span> </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{theLoai.MaTheLoai}</p>
                    </div>
                  </div>
                  <p className="font-medium text-slate-900 dark:text-slate-50">{theLoai.SoLuongSach} cuốn</p>
                </div>
              ))}
            </div>
          </div>
        </div >
      )}
      {/* Danh sách sách */}
      <div className="card">
        <div className="card-header flex-col justify-around">
          <div className="card-title m-auto">Danh sách sách</div>
          <div className="p-4 pt-2 w-full">
            <div className="border-black dark:border-slate-600 input w-3/4 m-auto flex">
              <Search />
              <input
                type="text"
                id="search"
                placeholder="Tên hoặc mã sách "
                className="w-full m-auto bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="h-[800px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
            <table className="table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-head">#</th>
                  <th className="table-head">Tên sách</th>
                  <th className="table-head text-center">Nhà xuất bản</th>
                  <th className="table-head text-center">Tác giả</th>
                  <th className="table-head text-center">Số lượng</th>
                  <th className="table-head text-center">Nhập thêm</th>
                  <th className="table-head text-center">Xóa</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {filteredDsSach?.map((sach, index) => (
                  <tr key={index} className="table-row">
                    <td className="table-cell">{index + 1}</td>
                    <td className="table-cell">
                      <div className="flex w-max gap-x-4">
                        <div className="flex flex-col">
                          <p>{sach.TenSach}</p>
                          <p className="font-normal text-slate-600 dark:text-slate-400">Mã {sach.MaSach}</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell text-center">{sach.TenNhaXuatBan}</td>
                    <td className="table-cell text-center">{sach.TenTacGia}</td>
                    <td className="table-cell text-center">{sach.SoLuong}</td>
                    <td className="table-cell text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <input
                          type="number"
                          className="w-24 p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Số lượng"
                          value={soLuong[sach.MaSach] || ""}
                          onChange={(e) => handleThem(sach.MaSach, e.target.value)}
                        />
                        <button
                          onClick={() => giaHan(sach.MaSach)}
                          className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                          <Plus className="w-6 h-6" />
                        </button>
                      </div>
                    </td>
                    <td className="table-cell text-center" onClick={() => handleDeleteSach(sach.MaSach)}>
                      <DeleteIcon className="m-auto cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Sach;
