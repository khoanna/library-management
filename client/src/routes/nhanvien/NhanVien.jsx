import { Search, Edit, Delete } from "lucide-react";
import { useState, useEffect } from "react";
import Form from "./Form";

const API = import.meta.env.VITE_BASE_API;

const NhanVien = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dsNhanVien, setDsNhanVien] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const load = async () => {
    const respone = await fetch(`${API}/nhanvien`, {
      credentials: "include",
    });
    const data = await respone.json();
    setDsNhanVien(data.danhSachNhanVien);
  };

  useEffect(() => {
    load();
  }, []);

  const handleXoa = async (MaNhanVien) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này không?")) {
      const respone = await fetch(`${API}/nhanvien/xoa/`, {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: MaNhanVien }),
      });
      const data = await respone.json();
      console.log(data);
      if (data.success) {
        await load();
      } else {
        alert(data.message);
      }
    }
  };

  // Lọc danh sách nhân viên theo tên hoặc mã nhân viên
  const filteredNhanVien = dsNhanVien.filter((nv) =>
    nv.HoTen.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nv.MaNhanVien.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card">
      <Edit
        onClick={openModal}
        className="fixed bottom-4 right-8 w-12 h-12 cursor-pointer rounded-lg bg-blue-500 p-2 transition-colors dark:bg-blue-600 text-white font-bold"
      />
      <Form isOpen={isModalOpen} onClose={closeModal} reload={() => load()} />
      <div className="card-header flex-col justify-around">
        <div className="card-title m-auto">Danh sách nhân viên</div>
        <div className="p-4 pt-2 w-full">
          <div className="border-black dark:border-slate-600 input w-3/4 m-auto flex items-center">
            <Search className="mr-2" />
            <input
              type="text"
              id="search"
              placeholder="Tra cứu theo tên hoặc mã nhân viên"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-300 dark:text-slate-50"
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
                <th className="table-head">Họ Tên</th>
                <th className="table-head">Chức vụ</th>
                <th className="table-head text-center">Số Điện Thoại</th>
                <th className="table-head text-center">Địa chỉ</th>
                <th className="table-head text-center">Email</th>
                <th className="table-head text-center">Mật khẩu</th>
                <th className="table-head text-center">Lương</th>
                <th className="table-head text-center">Xóa</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredNhanVien.map((nhanVien, index) => (
                <tr key={index} className="table-row">
                  <td className="table-cell">{index + 1}</td>
                  <td className="table-cell">
                    <div className="flex w-max gap-x-4">
                      <div className="flex flex-col">
                        <p>{nhanVien.HoTen}</p>
                        <p className="font-normal text-slate-600 dark:text-slate-400">
                          {nhanVien.MaNhanVien}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell text-center">{nhanVien.ChucVu}</td>
                  <td className="table-cell text-center">{nhanVien.SoDienThoai}</td>
                  <td className="table-cell text-center">{nhanVien.DiaChi}</td>
                  <td className="table-cell text-center">{nhanVien.Email}</td>
                  <td className="table-cell text-center">{nhanVien.MatKhau}</td>
                  <td className="table-cell text-center">{Number(nhanVien.Luong)}</td>
                  <td className="table-cell text-center">
                    <Delete
                      className="m-auto hover:cursor-pointer"
                      onClick={() => handleXoa(nhanVien.MaNhanVien)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NhanVien;
