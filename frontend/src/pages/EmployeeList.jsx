import React, { useEffect, useState } from "react";
import axios from "axios";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch employee details from the API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/v1/user/employees");
        setEmployees(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching employee data");
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Employee List</h1>
      {employees.length === 0 ? (
        <p className="text-center">No employees found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-green-700">
          <thead>
            <tr className="bg-gray-100 text-black " >
			<th className="border px-4 py-2">S. No</th>
			<th className="border px-4 py-2">Profile Image</th>

              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Mobile Number</th>
              <th className="border px-4 py-2">Designation</th>
              <th className="border px-4 py-2">Gender</th>
              <th className="border px-4 py-2">Course</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee,index) =>  (
             
              <tr key={employee._id} >
				 <td className="border px-4 py-2">{index + 1}</td>
				     <td className="border px-4 py-2">
                 <img src={employee.profileImg ||" https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"} alt="Profile" className="w-10 h-10 rounded-full" />
                 </td>

                <td className="border px-4 py-2">{employee.name}</td>
                <td className="border px-4 py-2">{employee.email}</td>
                <td className="border px-4 py-2">{employee.mobileNumber}</td>
                <td className="border px-4 py-2">{employee.designation}</td>
                <td className="border px-4 py-2">{employee.gender}</td>
                <td className="border px-4 py-2">{employee.course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeList;
