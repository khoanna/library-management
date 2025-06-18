import React, { useState, useEffect, useRef } from 'react';

const MultiSelectBook = ({ allBooks, selectedBooks, setSelectedBooks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
    } else {
      const filtered = allBooks?.filter((book) =>
        book.TenSach.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedBooks.some((selected) => selected.MaSach === book.MaSach)
      );
      setSuggestions(filtered);
    }
    // Quan trọng: thêm selectedBooks vào mảng dependency
  }, [searchTerm, allBooks, selectedBooks]);

  const handleSelectBook = (book) => {
    // Thêm sách vào selectedBooks nếu chưa có
    if (!selectedBooks.some((selected) => selected.MaSach === book.MaSach)) {
      setSelectedBooks((prev) => [...prev, book]);
      setSearchTerm(``)
    }
  };

  const handleRemoveBook = (bookMaSach) => {
    setSelectedBooks((prev) => prev.filter((book) => book.MaSach !== bookMaSach));
  };

  return (
    <div className="mb-4 relative" ref={containerRef}>
      <p className="text-xl font-medium mb-2 dark:text-white">Chọn sách</p>

      {/* Input để tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm sách theo mã hoặc tên..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Dropdown gợi ý (absolute để hiển thị đè) */}
      {suggestions?.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded mt-1 shadow-lg z-10 max-h-60 overflow-y-auto">
          {suggestions.map((book) => (
            <li
              key={book.MaSach}
              onClick={() => handleSelectBook(book)}
              className="cursor-pointer hover:bg-blue-100 p-2"
            >
              {book.MaSach} - {book.TenSach}
            </li>
          ))}
        </ul>
      )}

      {/* Danh sách sách đã chọn */}
      {selectedBooks.length > 0 && (
        <div className="mt-4">
          <p className="font-medium mb-2 dark:text-white">Sách đã chọn:</p>
          <ul className="space-y-2">
            {selectedBooks.map((book) => (
              <li
                key={book.MaSach}
                className="flex items-center justify-between p-2 border border-gray-200 rounded dark:text-white"
              >
                <span>
                  {book.MaSach} - {book.TenSach}
                </span>
                <div
                  onClick={() => handleRemoveBook(book.MaSach)}
                  className="text-red-500 hover:text-red-700 hover:cursor-pointer"
                >
                  Xóa
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectBook;
