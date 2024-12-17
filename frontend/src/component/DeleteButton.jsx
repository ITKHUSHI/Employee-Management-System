import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeleteButton({employeeId}) {
  const navigate=useNavigate()
  const handleDelete=async()=>{
    try {
      console.log(employeeId);
     const token=localStorage.getItem("token")
     const user= JSON.parse(localStorage.getItem("user"))
      const res= await axios.delete(`/api/v1/user/delete${user._id}?employeeId=${employeeId}`,
        
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });        
       // Redirect to login page after logout
       if(user.role!=='admin'){
        window.localStorage.removeItem('loggedIn');
        window.localStorage.removeItem('employee');
        window.localStorage.removeItem('user');
        navigate('/login')
       }
     } catch (error) {
       console.error('Error while delete employee :', error);
     }
  }
  return (
	<div 
  className="mt-6 w-full bg-red-600 text-white py-2 rounded-sm text-lg font-semibold hover:bg-red-900 focus:ring-2 focus:ring-red-500"
  onClick={handleDelete}>DeleteButton</div>
  )
}

export default DeleteButton