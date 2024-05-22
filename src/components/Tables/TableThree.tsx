import { Package } from '../../types/package';
// getUser

import { useEffect, useState } from 'react';




const TableThree = () => {

// get api https://report-work.onrender.com/user

  const [user, setUser] = useState<Package[]>([]);
  useEffect(() => {
    fetch('https://report-work.onrender.com/user')
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);

 
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {/* stt */}
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                stt
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
               Ho va ten
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
               Phan quyen
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {
                Array.isArray(user) && user.map((data: Package, index: number) => (
                <tr key={index} className="border-b border-stroke dark:border-strokedark">
                  <td className="py-4 px-4 text-black dark:text-white">
                    {index + 1}
                  </td>
                  <td className="py-4 px-4 text-black dark:text-white">
                    {data.name}
                  </td>
                  <td className="py-4 px-4 text-black dark:text-white">
                    {data.role}
                  </td>
                  <td className="py-4 px-4 text-black dark:text-white">
                    <span className="text-green-500 dark:text-green-500">{data.status}</span> 
                  </td>
                  <td className="py-4 px-4 text-black dark:text-white">
                    <button className="text-blue-500 dark:text-blue-500">View</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
