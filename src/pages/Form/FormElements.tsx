import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const FormElements: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [today, setToday] = useState<string>('');
  const [tomorrow, setTomorrow] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const test = localStorage.getItem('user');
  const parsedTest = test ? JSON.parse(test) : null;
  const id = parsedTest ? parsedTest._id : '';
  const username = parsedTest ? parsedTest.username : '';

  useEffect(() => {
    const todayDate = new Date();
    const formattedDate = `${todayDate.getDate()}/${
      todayDate.getMonth() + 1
    }/${todayDate.getFullYear()}`;
    setDate(formattedDate);
  }, []);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const formatDate = (date: any) => {
    return moment(date).format('DD/MM/YYYY');
  };

  useEffect(() => {
    if (id && date) {
      fetch(
        `https://report-work.onrender.com/report?date=${formatDate(
          selectedDate,
        )}&idUser=${id}`,
      )
        .then((response) => response.json())
        .then((data) => {
          setToday(data.today);
          setTomorrow(data.tomorrow);
        })
        .catch((error) => {
          console.error('Error fetching report data:', error);
        });
    }
  }, [date, id, selectedDate]);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        'https://report-work.onrender.com/report/input',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idUser: id,
            msnv: username,
            name: username,
            date: formatDate(selectedDate),
            today: today,
            tomorrow: tomorrow,
          }),
        },
      );
      const data = await response.json();
      setData(data);
      console.log(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Báo cáo công việc" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* Date Picker Field */}
          <div className="rounded-sm border border-gray-300 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 dark:bg-black">
            <div className="border-b border-gray-300 py-4 px-6 dark:border-gray-700">
              <h3 className="font-medium text-black dark:text-white">
                Ngày báo cáo
              </h3>
            </div>
            <div className="flex flex-col gap-5 p-6">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Ngày báo cáo
                </label>
                <div className="relative">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    className="w-full px-5 py-3 border-[1.5px] border-stroke rounded focus:border-primary focus:outline-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary shadow-md hover:shadow-lg transition-shadow duration-200 dark:text-white"
                  />

                  <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
                        fill="#64748B"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Report Fields */}
          <div className="rounded-sm border border-gray-300 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 dark:bg-black">
            <div className="border-b border-gray-300 py-4 px-6 dark:border-gray-700">
              <h3 className="font-medium text-black dark:text-white">
                Báo cáo công việc
              </h3>
            </div>
            <div className="flex flex-col gap-5 p-6 dark:bg-black">
              <div>
                <label className="mb-3 block text-black dark:text-white dark:bg-black">
                  Báo cáo công việc hôm nay
                </label>
                <textarea
                  value={today}
                  onChange={(e) => setToday(e.target.value)}
                  rows={6}
                  placeholder="Default textarea"
                  className="w-full rounded-lg border border-gray-300 bg-transparent py-3 px-5 text-black outline-none transition focus:border-blue-500 active:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:bg-black dark:focus:border-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Báo cáo công việc ngày mai
                </label>
                <textarea
                  value={tomorrow}
                  onChange={(e) => setTomorrow(e.target.value)}
                  rows={6}
                  placeholder="Default textarea"
                  className="w-full rounded-lg border border-gray-300 bg-transparent py-3 px-5 text-black outline-none transition focus:border-blue-500 active:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleClick}
        className="mt-6 rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
      >
        Send Report
      </button>
    </DefaultLayout>
  );
};

export default FormElements;
