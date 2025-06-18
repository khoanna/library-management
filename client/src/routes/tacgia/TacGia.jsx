import { Search, Edit, DeleteIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Form from "./Form";

const API = import.meta.env.VITE_BASE_API;

const TacGia = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dsTacGia, setDsTacGia] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const load = async () => {
    const respone = await fetch(`${API}/tacgia`, {
      credentials: "include",
    });
    const data = await respone.json();
    if (respone.ok) {
      setDsTacGia(data.tacGia);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getUTCDate().toString().padStart(2, "0")}/${(date.getUTCMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getUTCFullYear()}`;
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id, ten) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa tác giả ${ten} không?`)) {
      const respone = await fetch(`${API}/tacgia/xoa`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (respone.ok) {
        load();
      }
    }
  };

  const filteredTacGia = dsTacGia.filter((author) =>
    author.TenTacGia.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="card">
      <Edit
        onClick={openModal}
        className="fixed bottom-4 right-8 w-12 h-12 cursor-pointer rounded-lg bg-blue-500 p-2 transition-colors dark:bg-blue-600 text-white font-bold"
      />
      <Form isOpen={isModalOpen} onClose={closeModal} reload={() => load()} />
      <div className="card-header flex-col justify-around">
        <div className="card-title m-auto">Danh sách tác giả</div>
        <div className="p-4 pt-2 w-full">
          <div className="border-black dark:border-slate-600 input w-3/4 m-auto flex items-center">
            <Search className="mr-2" />
            <input
              type="text"
              id="search"
              placeholder="Tên tác giả..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full m-auto bg-transparent text-slate-900 outline-none placeholder:text-slate-300 dark:text-slate-50"
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
                <th className="table-head">Tên tác giả</th>
                <th className="table-head text-center">Ngày sinh</th>
                <th className="table-head text-center">Quốc Tịch</th>
                <th className="table-head text-center">Xóa</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredTacGia.map((tacGia, index) => (
                <tr key={index} className="table-row">
                  <td className="table-cell">{index + 1}</td>
                  <td className="table-cell">
                    <div className="flex w-max gap-x-4">
                      <div className="flex flex-col">
                        <p>{tacGia.TenTacGia}</p>
                        <p className="font-normal text-slate-600 dark:text-slate-400">
                          {tacGia.TieuSu}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell text-center">
                    {formatDate(tacGia.NgaySinh)}
                  </td>
                  <td className="table-cell text-center">{tacGia.QuocTich}</td>
                  <td className="table-cell text-center">
                    <DeleteIcon
                      className="m-auto hover:cursor-pointer"
                      onClick={() => handleDelete(tacGia.MaTacGia, tacGia.TenTacGia)}
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

export default TacGia;
