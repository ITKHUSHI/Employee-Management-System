
import React from "react";
import { useNavigate } from "react-router-dom";

const UpdateButton = ({employeeId}) => {
  
  const user=JSON.parse(localStorage.getItem("user"));
const userId=user._id;
  const navigate = useNavigate();
  const handleUpdate = () => {
    navigate(`update-employee/${userId}`,{state:{employeeId}});
  };

  return (
    <button
      className="mt-6 w-full bg-purple-700 text-white py-2 rounded-lg text-lg font-semibold hover:bg-purple-800 focus:ring-2 focus:ring-purple-500"
      onClick={handleUpdate}  
    >
      Update
    </button>
  );
};

export default UpdateButton;
