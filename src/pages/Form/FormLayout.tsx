import { useState } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const FormLayout = () => {
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };



  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
  };

  console.log('Ngày đã chọn:', formatDate(selectedDate));
  
  const handleDownload = () => {
    setLoading(true);

    axios({
      url: 'https://report-work.onrender.com/export/download',
      method: 'POST',
      responseType: 'blob',
      data: {
        //  date gửi về string
        date: formatDate(selectedDate) as string,
        note: 'Ghi chú của bạn ở đây', // Ghi chú thực tế
      },
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `report-${formatDate(selectedDate)}.xlsx`,
        );
        document.body.appendChild(link);
        link.click();
        setLoading(false);
      })
      .catch((error = {}) => {
        console.error('Đã xảy ra lỗi khi tải xuống:', error);
        setLoading(false);
      });
  };

  return (
    <DefaultLayout>
      <div className="space-y-6">
        {/* Trường input để chọn ngày */}
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          className="w-full px-5 py-3 border-[1.5px] border-stroke rounded focus:border-primary focus:outline-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary shadow-md hover:shadow-lg transition-shadow duration-200"
        />

        {/* Nút để tải xuống */}
        <button
          onClick={handleDownload}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading ? 'Đang tải xuống...' : 'Tải xuống'}
        </button>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
