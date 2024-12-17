import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateEmployee = () => {
 
  const courses = ["MCA", "BCA", "BSC"];
  const [isLoading, setIsLoading] = useState(false);
  const user=JSON.parse(localStorage.getItem("user"));
  const [employee, setEmployee] = useState({});
  const location=useLocation();
  const {employeeId}=location.state|| {};
  
useEffect(() => {
  
    // Fetch data if user is not passed
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`/api/v1/user/employee${employeeId}`);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };
    fetchEmployee();
  
}, []);

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const debouncedSetEmployee = debounce(setEmployee, 300);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    debouncedSetEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEmployee((prev) => ({ ...prev, profileImg: URL.createObjectURL(file) }));
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const token = localStorage.getItem("token");
      const id=user._id;
      const res = await axios.patch(
        `/api/v1/user/update-details${id}`,
        {   
      _id:employee._id, 
        username:employee.name, 
        email:employee.email, 
        mobileNumber:employee.mobileNumber,
         designation:employee.designation,
          gender:employee.gender, 
          course:employee.course,
           profileImg:employee.profileImg 
       }, // Send the updated employee data
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedUser = JSON.stringify(res.data.updatedEmployee);
      console.log(updatedUser);
      setIsLoading(true);
      window.localStorage.setItem("employee", updatedUser);
      navigate("employee-list");
    } catch (error) {
      console.error("Error while updating employee details:", error);
      setIsLoading(false);
    }finally{ 
      setIsLoading(false);
    }
  }; 

  return (
    <>
    
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Update Employee</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={employee.name || ""}
            onChange={handleInputChange}
            className="border w-full px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={employee.email || ""}
            onChange={handleInputChange}
            className="border w-full px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Mobile Number:</label>
          <input
            type="text"
            name="mobileNumber"
            value={employee.mobileNumber || ""}
            onChange={handleInputChange}
            className="border w-full px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Gender:</label>
          <select
            name="gender"
            value={employee.gender || ""}
            onChange={handleInputChange}
            className="border w-full px-3 py-2 rounded"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="designation">Designation:</label>
          <select
            name="designation"
            id="designation"
            value={employee.designation || ""}
            onChange={handleInputChange}
            className="border w-full px-3 py-2 rounded"
            required
          >
            <option value="">Select your designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div>
        <label htmlFor="course" >Course</label>
                            <div className="flex justify-between">
                                {courses.map((course) => (
                                    <label key={course} className="text-white">
                                        <input
                                            className="m-2"
                                            type="checkbox"
                                            name="course"
                                            value={course}
                                            checked={(employee.course || []).includes(course)}                                            onChange={handleInputChange}
                                        />
                                        {course}
                                    </label>
                                ))}
                            </div>
           
          </div>
  
        <div>
          <label className="block text-gray-700">Profile Image:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="border w-full px-3 py-2 rounded"
            accept="image/*"
          />
          {employee.profileImg && (
            <img
              src={employee.profileImg}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
          )}
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          disabled={isLoading}
        >
                   {isLoading ? "Updating..." : "Save Changes"}
        
        </button>
      </form>
    </div>
    </>
  );
};

export default UpdateEmployee;




