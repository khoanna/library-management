import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { DollarSign, Package, Search, DeleteIcon, Edit, Users, UserRoundPlusIcon, Plus } from "lucide-react";
import { useEffect } from "react";
import Form from "./Form";

const API = import.meta.env.VITE_BASE_API;

const DocGia = () => {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tuoiQuyDinh, setTuoiQuyDinh] = useState(0);
  const [tuoiMax, setTuoiMax] = useState(0);
  const [thang, setThang] = useState(0);
  const [sachToiDa, setSachToiDa] = useState(0);
  const [ngayMuonToiDa, setNgayMuonToiDa] = useState(0);
  const [tienPhat, setTienPhat] = useState(0);
  const [docGia, setDocGia] = useState([]);
  const [docGiaGanDay, setDocGiaGanDay] = useState([]);
  const [chart, setChart] = useState([]);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState([]);
  const [thangValues, setThangValues] = useState({});

  const [tuoiEdit, setTuoiEdit] = useState();
  const [tuoiMaxEdit, setTuoiMaxEdit] = useState();
  const [sachEdit, setSachEdit] = useState();
  const [ngayEdit, setNgayEdit] = useState();
  const [tienEdit, setTienEdit] = useState();
  const [thangEdit, setThangEdit] = useState();


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
    }
    check();
  }, [])

  const load = async () => {
    const respone = await fetch(`${API}/docgia`, {
      credentials: "include",
    });
    const data = await respone.json();

    if (respone.ok) {
      setTuoiQuyDinh(data.tuoiQuyDinh);
      setTuoiMax(data.tuoiMax)
      setSachToiDa(data.soSachToiDa);
      setNgayMuonToiDa(data.soNgayToiDa);
      setTienPhat(data.tienPhat);
      setDocGia(data.danhSachDocGia);
      setFilter(data.danhSachDocGia);
      setDocGiaGanDay(data.docGiaGanDay);
      setChart(data.chart);
      setThang(data.thang);
    }
  }

  // [Load thong tin trang doc gia]
  useEffect(() => {
    load();
  }, [])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getUTCDate().toString().padStart(2, '0')}/${(date.getUTCMonth() + 1).toString().padStart(2, '0')}/${date.getUTCFullYear()}`;
  };

  const handleSearch = (query) => {
    setQuery(query);
    const result = docGia.filter(item => item.MaDocGia.toLowerCase().includes(query.toLowerCase()) || item.HoTen.toLowerCase().includes(query.toLowerCase()));
    setFilter(result);
  }

  const editTuoi = async () => {

    if (!tuoiEdit) {
      alert("Vui lòng nhập tuổi!");
      return;
    }

    if (tuoiEdit <= 0) {
      alert("Vui lòng nhập tuổi hợp lệ!");
      return;
    }

    const respone = await fetch(`${API}/docgia/age`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tuoi: tuoiEdit })
    })
    if (respone.ok) {
      setTuoiQuyDinh(tuoiEdit);
    }
  }

  const editTuoiMax = async () => {
    if (!tuoiMaxEdit) {
      alert("Vui lòng nhập tuổi!");
      return;
    }
    if (tuoiMaxEdit <= 0) {
      alert("Vui lòng nhập tuổi hợp lệ!");
      return;
    }
    const respone = await fetch(`${API}/docgia/ageMax`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tuoi: tuoiMaxEdit })
    })
    if (respone.ok) {
      setTuoiMax(tuoiMaxEdit);
    }
  }

  const editSach = async () => {
    if (!sachEdit) {
      alert("Vui lòng nhập số sách tối đa!");
      return;
    }
    if (sachEdit <= 0) {
      alert("Vui lòng nhập số sách hợp lệ!");
      return;
    }
    const respone = await fetch(`${API}/docgia/maxbook`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sach: sachEdit })
    })
    if (respone.ok) {
      setSachToiDa(sachEdit);
    }
  }

  const editNgay = async () => {
    if (!ngayEdit) {
      alert("Vui lòng nhập số ngày tối đa!");
      return;
    }
    if (ngayEdit <= 0) {
      alert("Vui lòng nhập số ngày hợp lệ!");
      return;
    }
    const respone = await fetch(`${API}/docgia/maxday`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ngay: ngayEdit })
    })
    if (respone.ok) {
      setNgayMuonToiDa(ngayEdit);
      setNgayEdit();
    }
  }

  const editTien = async () => {
    if (!tienEdit) {
      alert("Vui lòng nhập tiền phạt quy định!");
      return;
    }
    if (tienEdit <= 0) {
      alert("Vui lòng nhập tiền phạt hợp lệ!");
      return;
    }
    const respone = await fetch(`${API}/docgia/tienphat`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tien: tienEdit })
    })
    if (respone.ok) {
      setTienPhat(tienEdit);
      setTienEdit();
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm(`Xóa người dùng ${id}`)) {
      const respone = await fetch(`${API}/docgia/xoa`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id })
      })
      if (respone.ok) {
        await load();
      }
    }
  }

  const handleThangChange = (id, value) => {
    setThangValues(prev => ({ ...prev, [id]: value }));
  };

  const giaHan = async (id) => {

    if (!thangValues[id]) {
      alert("Vui lòng nhập số tháng gia hạn");
      return;
    }
    if (thangValues[id] <= 0) {
      alert("Vui lòng nhập số tháng hợp lệ!");
      return;
    }
    const respone = await fetch(`${API}/docgia/giahan`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, thang: thangValues[id] })
    })
    if (respone.ok) {
      alert("Gia hạn thành công");
      await load();
    }
  }

  const editThang = async () => {
    if (!thangEdit) {
      alert("Vui lòng nhập số tháng!");
      return;
    }
    if (thangEdit <= 0) {
      alert("Vui lòng nhập số tháng hợp lệ!");
      return;
    }
    const respone = await fetch(`${API}/docgia/thang`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ thang: thangEdit })
    })

    if (respone.ok) {
      setThang(thangEdit);
    }
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Edit onClick={openModal} className="z-99 fixed bottom-4 right-8 w-12 h-12 cursor-pointer rounded-lg bg-blue-500 p-2 transition-colors dark:bg-blue-600 text-white font-bold" />
      <Form isOpen={isModalOpen} onClose={closeModal} tuoi={tuoiQuyDinh} thang={thang} reload={() => load()} />
      <h1 className="title">Quản lý độc giả</h1>
      {isAdmin && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <div className="card">
            <div className="card-header">
              <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                <Package size={26} />
              </div>
              <p className="card-title">Độ tuổi quy định</p>
            </div>
            <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
              <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">{tuoiQuyDinh} - {tuoiMax} tuổi</p>
              <div className="flex w-full justify-between mt-2">
                <div className="border-black dark:border-slate-500 input w-8/12 flex">
                  <input
                    type="number"
                    value={tuoiEdit}
                    onChange={e => setTuoiEdit(e.target.value)}
                    id="search"
                    placeholder="Tuổi tối thiểu"
                    className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                  />
                </div>
                <div className="cursor-pointer rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-white font-bold" onClick={editTuoi}>
                  Sửa
                </div>
              </div>
              <div className="flex w-full justify-between mt-2">
                <div className="border-black dark:border-slate-500 input w-8/12 flex">
                  <input
                    type="number"
                    value={tuoiMaxEdit}
                    onChange={e => setTuoiMaxEdit(e.target.value)}
                    id="search"
                    placeholder="Tuổi tối đa"
                    className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                  />
                </div>
                <div className="w-fit cursor-pointer rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-white font-bold" onClick={editTuoiMax}>
                  Sửa
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                <Users size={26} />
              </div>
              <p className="card-title">Số sách mượn tối đa trong một lần</p>
            </div>
            <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
              <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">{sachToiDa} cuốn / lần</p>
              <div className="flex w-full justify-between mt-2">
                <div className="border-black dark:border-slate-500 input w-8/12 flex">
                  <input
                    type="number"
                    value={sachEdit}
                    onChange={e => setSachEdit(e.target.value)}
                    id="search"
                    placeholder="Số sách tối đa"
                    className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                  />
                </div>
                <div className="w-fit cursor-pointer rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-white font-bold" onClick={editSach}>
                  Sửa
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                <UserRoundPlusIcon size={26} />
              </div>
              <p className="card-title">Số ngày mượn tối đa</p>
            </div>
            <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
              <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">{ngayMuonToiDa} ngày</p>
              <div className="flex w-full justify-between mt-2">
                <div className="border-black dark:border-slate-500 input w-8/12 flex">
                  <input
                    type="number"
                    id="search"
                    value={ngayEdit}
                    onChange={e => setNgayEdit(e.target.value)}
                    placeholder="Số ngày mượn tối đa"
                    className="border-black dark:border-slate-500 w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                  />
                </div>
                <div className="w-fit cursor-pointer rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-white font-bold" onClick={editNgay}>
                  Sửa
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                <UserRoundPlusIcon size={26} />
              </div>
              <p className="card-title">Số tháng mặc định cho thẻ</p>
            </div>
            <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
              <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">{thang} tháng</p>
              <div className="flex w-full justify-between mt-2">
                <div className="border-black dark:border-slate-500 input w-8/12 flex">
                  <input
                    type="number"
                    id="search"
                    value={thangEdit}
                    onChange={e => setThangEdit(e.target.value)}
                    placeholder="Số tháng"
                    className="border-black dark:border-slate-500 w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                  />
                </div>
                <div className="w-fit cursor-pointer rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-white font-bold" onClick={editThang}>
                  Sửa
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                <DollarSign size={26} />
              </div>
              <p className="card-title">Tiền phạt cơ bản</p>
            </div>
            <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
              <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">{tienPhat} VND</p>
              <div className="flex w-full justify-between mt-2">
                <div className="border-black dark:border-slate-500 input w-8/12 flex">
                  <input
                    type="number"
                    id="search"
                    value={tienEdit}
                    onChange={e => setTienEdit(e.target.value)}
                    placeholder="Tiền phạt"
                    className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                  />
                </div>
                <div className="w-fit cursor-pointer rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-white font-bold" onClick={editTien}>
                  Sửa
                </div>
              </div>
            </div>
          </div>
        </div>)}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-8">
        <div className="card col-span-1 md:col-span-2 lg:col-span-6">
          <div className="card-header">
            <p className="card-title">Số lượng độc giả hoạt động trong năm qua</p>
          </div>
          <div className="card-body p-0">
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <AreaChart
                data={chart}
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="colorTotal"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#2563eb"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="#2563eb"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <Tooltip
                  cursor={false}
                  formatter={(value) => `${value}`}
                />

                <XAxis
                  dataKey="name"
                  strokeWidth={0}
                  stroke={theme === "light" ? "#475569" : "#94a3b8"}
                  tickMargin={6}
                />
                <YAxis
                  dataKey="total"
                  strokeWidth={0}
                  stroke={theme === "light" ? "#475569" : "#94a3b8"}
                  tickFormatter={(value) => `${value}`}
                  tickMargin={6}
                />

                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#2563eb"
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card col-span-1 md:col-span-2 lg:col-span-2">
          <div className="card-header">
            <p className="card-title">Độc giả hoạt động gần đây</p>
          </div>
          <div className="card-body h-[300px] overflow-auto p-0">
            {docGiaGanDay.map((docGia, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-x-4 py-2 pr-2"
              >
                <div className="flex items-center gap-x-4">
                  <div className="flex flex-col gap-y-2">
                    <p className="font-medium text-slate-900 dark:text-slate-50">{docGia.HoTen}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{docGia.MaDocGia}</p>
                  </div>
                </div>
                <p className="font-medium text-slate-900 dark:text-slate-50">{formatDate(docGia.NgayMuonGanNhat)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card">
        <Edit onClick={openModal} className="fixed bottom-4 right-8 w-12 h-12 cursor-pointer rounded-lg bg-blue-500 p-2 transition-colors dark:bg-blue-600 text-white font-bold" />
        <div className="card-header flex-col justify-around">
          <div className="card-title m-auto">Danh sách độc giả</div>
          <div className="p-4 pt-2 w-full">
            <div className="border-black dark:border-slate-600 input  w-3/4 m-auto flex ">
              <Search></Search>
              <input
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                id="search"
                placeholder="Họ tên hoặc mã độc giả..."
                className="w-full m-auto bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
              />
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="h-[800px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
            <table className="table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-head text-left">Số thứ tự</th>
                  <th className="table-head ">Họ tên</th>
                  <th className="table-head text-center">Giới tính</th>
                  <th className="table-head text-center">Ngày hết hạn</th>
                  <th className="table-head text-center">Mã thẻ</th>
                  <th className="table-head text-center">Xóa</th>
                  <th className="table-head text-center">Gia hạn</th>
                </tr>
              </thead>
              <tbody>
                {filter.map((docGia, index) => (
                  <tr
                    key={index}
                  >
                    <td className="table-cell text-left">{index}</td>
                    <td className="table-cell">
                      <div className="flex w-max gap-x-4">
                        <div className="flex flex-col">
                          <p>{docGia.HoTen}</p>
                          <p className="font-normal text-slate-600 dark:text-slate-400">Mã {docGia.MaDocGia}</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell text-center">{docGia.GioiTinh}</td>
                    <td className="table-cell text-center">{formatDate(docGia.NgayHetHan)}</td>
                    <td className="table-cell text-center">
                      {docGia.MaThe}
                    </td>
                    <td className="table-cell text-center ">
                      <DeleteIcon className="m-auto hover:cursor-pointer" onClick={() => handleDelete(docGia.MaDocGia)} />
                    </td>
                    <td className="table-cell text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <input
                          type="number"
                          className="w-24 p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Tháng"
                          value={thangValues[docGia.MaDocGia] || ""}
                          onChange={(e) => handleThangChange(docGia.MaDocGia, e.target.value)}
                        />
                        <button
                          onClick={() => giaHan(docGia.MaDocGia)}
                          className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                          <Plus className="w-6 h-6" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocGia