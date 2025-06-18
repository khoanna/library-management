import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTheme } from "@/hooks/use-theme";
import { DollarSign, Package, TrendingDown, TrendingUp, Users, UserRoundPlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BASE_API;

const DashboardPage = () => {
    const { theme } = useTheme();
    const [sachTrongThang, setSachTrongThang] = useState(0);
    const [sachTrongThangTruoc, setSachTrongThangTruoc] = useState(0);
    const [nhanVienTrongThang, setNhanVienTrongThang] = useState(0);
    const [nhanVienTrongThangTruoc, setNhanVienTrongThangTruoc] = useState(0);
    const [docGiaTrongThang, setDocGiaTrongThang] = useState(0);
    const [docGiaTrongThangTruoc, setDocGiaTrongThangTruoc] = useState(0);
    const [tienPhatTrongThang, setTienPhatTrongThang] = useState(0);
    const [tienPhatTrongThangTruoc, setTienPhatTrongThangTruoc] = useState(0);
    const [topDocGia, setTopDocGia] = useState([]);
    const [sachHot, setSachHot] = useState([]);
    const [chart, setChart] = useState([]);
    const [theLoai, setTheLoai] = useState([]);
    const [phieuTraTre, setPhieuTraTre] = useState([]);

    // [Load các thông tin trang thống kê]
    useEffect(() => {
        const load = async () => {
            const respone = await fetch(`${API}/dashboard`, {
                credentials: "include",
            });

            if (respone.ok) {
                const data = await respone.json();
                setSachTrongThang(data.sachTrongThang);
                setSachTrongThangTruoc(data.sachTrongThangTruoc);
                setNhanVienTrongThang(data.nhanVienTrongThang);
                setNhanVienTrongThangTruoc(data.nhanVienTrongThangTruoc);
                setDocGiaTrongThang(data.docgiaTrongThang);
                setDocGiaTrongThangTruoc(data.docgiaTrongThangTruoc);
                setTienPhatTrongThang(Number(data.tienPhatDaThuTrongThang));
                setTienPhatTrongThangTruoc(Number(data.tienPhatDaThuThangTruoc));
                setTopDocGia(data.topDocGia);
                setSachHot(data.sachHot)
                setChart(data.chartData);
                setTheLoai(data.muonTheLoai);
                setPhieuTraTre(data.TraTre)
            }
        }
        load();
    }, [])

    console.log(sachHot);


    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Thống kê tháng</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="card">
                    <div className="card-header">
                        <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <Package size={26} />
                        </div>
                        <p className="card-title">Sách mới</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">{sachTrongThang}</p>
                        {sachTrongThang - sachTrongThangTruoc > 0 ? (
                            <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                                <TrendingUp size={18} />
                                {sachTrongThangTruoc == 0 ? 100 : ((sachTrongThang - sachTrongThangTruoc) * 100 / sachTrongThangTruoc).toFixed(2)}%
                            </span>
                        ) : (
                            <span className="flex w-fit items-center gap-x-2 rounded-full border border-red-500 px-2 py-1 font-medium text-red-500 dark:border-red-600 dark:text-red-600">
                                <TrendingDown size={18} />
                                {sachTrongThangTruoc == 0 ? 0 : ((sachTrongThang - sachTrongThangTruoc) * 100 / sachTrongThangTruoc).toFixed(2)}%
                            </span>
                        )}
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <Users size={26} />
                        </div>
                        <p className="card-title">Nhân viên</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">{nhanVienTrongThang}</p>
                        {nhanVienTrongThang - nhanVienTrongThangTruoc > 0 ? (
                            <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                                <TrendingUp size={18} />
                                {nhanVienTrongThang == 0 ? 100 : ((nhanVienTrongThang - nhanVienTrongThangTruoc) * 100 / nhanVienTrongThangTruoc).toFixed(2)}%
                            </span>
                        ) : (
                            <span className="flex w-fit items-center gap-x-2 rounded-full border border-red-500 px-2 py-1 font-medium text-red-500 dark:border-red-600 dark:text-red-600">
                                <TrendingDown size={18} />
                                {nhanVienTrongThang == 0 ? 0 : ((nhanVienTrongThang - nhanVienTrongThangTruoc) * 100 / nhanVienTrongThangTruoc).toFixed(2)}%
                            </span>
                        )}
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <UserRoundPlusIcon size={26} />
                        </div>
                        <p className="card-title">Độc giả</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">{docGiaTrongThang}</p>
                        {docGiaTrongThang - docGiaTrongThangTruoc > 0 ? (
                            <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                                <TrendingUp size={18} />
                                {docGiaTrongThangTruoc == 0 ? 100 : ((docGiaTrongThang - docGiaTrongThangTruoc) * 100 / docGiaTrongThangTruoc).toFixed(2)}%
                            </span>
                        ) : (
                            <span className="flex w-fit items-center gap-x-2 rounded-full border border-red-500 px-2 py-1 font-medium text-red-500 dark:border-red-600 dark:text-red-600">
                                <TrendingDown size={18} />
                                {docGiaTrongThangTruoc == 0 ? 0 : ((docGiaTrongThang - docGiaTrongThangTruoc) * 100 / docGiaTrongThangTruoc).toFixed(2)}%
                            </span>
                        )}
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <DollarSign size={26} />
                        </div>
                        <p className="card-title">Tiền phạt đã thu</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">{tienPhatTrongThang} VND</p>
                        {tienPhatTrongThang - tienPhatTrongThangTruoc > 0 ? (
                            <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                                <TrendingUp size={18} />
                                {tienPhatTrongThangTruoc === 0 ? 100 : ((tienPhatTrongThang - tienPhatTrongThangTruoc) * 100 / tienPhatTrongThangTruoc).toFixed(2)}%
                            </span>
                        ) : (
                            <span className="flex w-fit items-center gap-x-2 rounded-full border border-red-500 px-2 py-1 font-medium text-red-500 dark:border-red-600 dark:text-red-600">
                                <TrendingDown size={18} />
                                {tienPhatTrongThangTruoc === 0 ? 0 : ((tienPhatTrongThang - tienPhatTrongThangTruoc) * 100 / tienPhatTrongThangTruoc).toFixed(2)}%
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-8">
                <div className="card col-span-1 md:col-span-2 lg:col-span-4">
                    <div className="card-header">
                        <p className="card-title">Thống kê lượt mượn theo thể loại</p>
                    </div>
                    <div className="card-body h-[300px] overflow-auto p-0">
                        {theLoai.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between gap-x-4 py-2 pr-2"
                            >
                                <div className="flex items-center gap-x-4">
                                    <div className="flex flex-col gap-y-2">
                                        <p className="font-medium text-slate-900 dark:text-slate-50">{item.TenTheLoai}</p>
                                    </div>
                                </div>
                                <p className="font-medium text-slate-900 dark:text-slate-50">{item.SoLuongSachMuon} lượt mượn</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="card col-span-1 md:col-span-2 lg:col-span-4">
                    <div className="card-header">
                        <p className="card-title">Sách trả trễ</p>
                    </div>
                    <div className="card-body h-[300px] overflow-auto p-0">
                        {phieuTraTre.length == 0 ? (
                            <div className="p-4 text-center text-gray-500">Không có sách trả trễ</div>
                        ) : (
                            phieuTraTre.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between gap-x-4 py-2 pr-2"
                                >
                                    <div className="flex items-center gap-x-4">
                                        <div className="flex flex-col gap-y-2">
                                            <p className="font-medium text-slate-900 dark:text-slate-50">{item.TenSach}</p>
                                        </div>
                                    </div>
                                    <p className="font-medium text-slate-900 dark:text-slate-50">trễ {item.SoNgayTre} ngày</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-8">
                <div className="card col-span-1 md:col-span-2 lg:col-span-6">
                    <div className="card-header">
                        <p className="card-title">Số lượng sách cho mượn trong 12 tháng qua</p>
                    </div>
                    <div className="card-body p-0">
                        {chart && (
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
                        )}
                    </div>
                </div>
                <div className="card col-span-1 md:col-span-2 lg:col-span-2">
                    <div className="card-header">
                        <p className="card-title">Top 10 độc giả thư viện</p>
                    </div>
                    <div className="card-body h-[300px] overflow-auto p-0">
                        {topDocGia.map((docGia, index) => (
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
                                <p className="font-medium text-slate-900 dark:text-slate-50">{docGia.SoLuongSachMuon} cuốn</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <p className="card-title">Top 10 sách hot thư viện</p>
                </div>
                <div className="card-body p-0">
                    <div className="h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
                        <table className="table">
                            <thead className="table-header">
                                <tr className="table-row">
                                    <th className="table-head">#</th>
                                    <th className="table-head ">Tên sách</th>
                                    <th className="table-head text-center">Tác giả</th>
                                    <th className="table-head text-center">Số lượt mượn</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {sachHot.map((sach, index) => (
                                    <tr
                                        key={index}
                                        className="table-row"
                                    >
                                        <td className="table-cell">{index + 1}</td>
                                        <td className="table-cell">
                                            <div className="flex w-max gap-x-4">
                                                <div className="flex flex-col">
                                                    <p>{sach.TenSach}</p>
                                                    <p className="font-normal text-slate-600 dark:text-slate-400">{sach.TenNhaXuatBan}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="table-cell text-center">{sach.TenTacGia}</td>
                                        <td className="table-cell text-center">{sach.SoLuongDuocMuon}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
