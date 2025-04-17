import React, { useState, useEffect, useRef } from 'react';

function SingleSelect({
  label,        // Hiển thị label, ví dụ: 'Chọn Nhà xuất bản'
  items,        // Mảng dữ liệu [{ id: '', name: '' }, ...]
  selectedItem,
  setSelectedItem,
  displayKey = 'name',  // key hiển thị (vd: 'TenNhaXuatBan')
  idKey = 'id'          // key duy nhất (vd: 'MaNhaXuatBan')
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
    } else {
      const filtered = items.filter(
        (item) =>
          item[displayKey]?.toLowerCase().includes(searchTerm.toLowerCase()) &&
          // Loại bỏ phần điều kiện không cho phép multiple
          // Ở single select, chúng ta đơn giản hiển thị tất cả
          // (hoặc nếu muốn ẩn item đã được chọn, có thể check item[idKey] !== selectedItem?.[idKey])
          item[idKey] !== selectedItem?.[idKey]
      );
      setSuggestions(filtered);
    }
  }, [searchTerm, items, selectedItem, displayKey, idKey]);

  const handleSelectItem = (item) => {
    // Chọn item => setSelectedItem là item
    setSelectedItem(item);
    // Reset searchTerm và gợi ý
    setSearchTerm('');
    setSuggestions([]);
  };

  const handleClearSelection = () => {
    setSelectedItem(null);
  };

  return (
    <div className="mb-4 relative" ref={containerRef}>
      <p className="font-medium mb-1 dark:text-white">{label}</p>
      {/* Input để tìm kiếm */}
      <input
        type="text"
        placeholder={`Tìm kiếm ${label.toLowerCase()}...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Dropdown gợi ý */}
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded mt-1 shadow-lg z-10 max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item[idKey]}
              onClick={() => handleSelectItem(item)}
              className="cursor-pointer hover:bg-blue-100 p-2"
            >
              {item[displayKey]}
            </li>
          ))}
        </ul>
      )}

      {/* Hiển thị item đã chọn (nếu có) */}
      {selectedItem && (
        <div className="mt-2 flex items-center justify-between rounded dark:text-white">
          <span>{!selectedItem[displayKey] ? `Chọn ${label.toLowerCase()}` : selectedItem[displayKey]}</span>
          <div
            onClick={handleClearSelection}
            className="text-red-500 hover:text-red-700 hover:cursor-pointer"
          >
            Xóa
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleSelect;
