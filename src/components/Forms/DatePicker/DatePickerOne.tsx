import { useState } from 'react';
import moment from 'moment';

const DatePickerOne = () => {
  const [selectedDate, setSelectedDate] = useState('');

  // Hàm xử lý khi ngày thay đổi
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
  };

  // Hàm xử lý khi nhấn nút Tải xuống
  const handleDownload = () => {
    const formattedDate = moment(selectedDate).format('DD/MM/YYYY'); // Định dạng lại ngày tháng

    // Gửi yêu cầu tải xuống với ngày được định dạng lại
    console.log('Ngày đã chọn:', formattedDate);
  };

  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Ngày báo cáo
      </label>
      <div className="relative">
        {/* Input để chọn ngày */}
        <input
          type="date"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      {/* Nút Tải xuống */}
      <button onClick={handleDownload}>
        Tải xuống
      </button>
    </div>
  );
};

export default DatePickerOne;
