// components/LogoutButton.js

import React from 'react';
import axios from 'axios';
import  { useNavigate}  from "react-router-dom";

const LogoutButton = () => {
	const navigate=useNavigate()
  const token= window.localStorage.getItem("token"); 
  const handleLogout = async () => {
    try {
     
     const res= await axios.post('/api/v1/user/logout',{
         "Authorization": `Bearer ${token}`,
         "Content-Type": "application/json",

      }); 
      console.log(res) 
      window.localStorage.removeItem('loggedIn'); // Example: clear user data from localStorage
      window.localStorage.removeItem("userType");
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("employee");
        navigate('login');
      // Redirect to login page after logout
    } catch (error) {
      if(error.name=="")
      console.error('Error logging out:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton ;
