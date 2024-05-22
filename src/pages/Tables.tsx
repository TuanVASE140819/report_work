import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import TableThree from '../components/Tables/TableThree';
import TableTwo from '../components/Tables/TableTwo';
import DefaultLayout from '../layout/DefaultLayout';

const Tables = () => {
   const [showPopup, setShowPopup] = useState(false);
   const [username, setUsername] = useState('');
   const [name, setName] = useState('');
   const [role, setRole] = useState('');
  const [password, setPassword] = useState('');




  const handleSubmit = async (event : any) => {
    event.preventDefault();
       // call api post https://report-work.onrender.com/user/create truyen vao username, name, role, password
    try {
      const response = await fetch('https://report-work.onrender.com/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          name,
          role,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
      alert('Thêm mới nhân viên thành công');
      setShowPopup(false);
    }
  
    catch (error: any) {
      console.log(error);
      alert('Thêm mới nhân viên thành công');
      setShowPopup(false);
      window.location.reload();
    }
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowPopup(true)}
      >
        Add New Employee
      </button>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded w-96">
            <h1 className="text-2xl font-bold">Add New Employee</h1>
            <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="p-2 border"
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên nhân viên"
                className="p-2 border"
              />

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="p-2 border"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>

              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="p-2 border"
              />
              <button type="submit">Submit</button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-10">
        {/* <TableOne />
        <TableTwo /> */}
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default Tables;
