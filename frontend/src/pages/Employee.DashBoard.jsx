import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateButton from "../component/UpdateDetails";

const EmployeeDashBoard = () => {
  const employeeData = JSON.parse(localStorage.getItem("employee"));
  const user = JSON.parse(localStorage.getItem("user"));
  const [employee, setEmployee] = useState(employeeData || {});
  const employeeId= employeeData?._id;

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`/api/v1/user/employee${employeeId}`);
        setEmployee(response.data);
      } catch (err) {
        console.error("Error fetching employee details:", err);
      }
    };
    fetchEmployee();
  }, [employeeId]);

  return (
    <div className="flex flex-col items-center bg-slate-800 min-h-screen py-8 px-4">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">Employee Dashboard</h1>
      <div className="bg-slate-900 shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img
            src={ 
              "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full border border-gray-300 mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-100">{user?.username}</h2>
          <p className="text-gray-200">Role: Employee</p>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-100">Name:</span>
            <span className="text-gray-200">{employee?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-100">Employee ID:</span>
            <span className="text-gray-200">{employee?._id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-100">User ID:</span>
            <span className="text-gray-200">{employee?.user}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-100">Mobile Number:</span>
            <span className="text-gray-200">{employee?.mobileNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-100">Course:</span>
            <span className="text-gray-200">{employee?.course}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-100">Gender:</span>
            <span className="text-gray-200">{employee?.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-100">Designation:</span>
            <span className="text-gray-200">{employee?.designation}</span>
          </div>
        </div>
       <UpdateButton employeeId={employeeId}></UpdateButton>
      </div>
    </div>
  );
};

export default EmployeeDashBoard;
   