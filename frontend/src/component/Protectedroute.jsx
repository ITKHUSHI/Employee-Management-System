import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';


function Protectedroute() {
	const isLoggin=window.localStorage.getItem("loggedIn")
  
  return (
	isLoggin==='true'?<Outlet/>:<Navigate to='/login'/>
  )
}

export default Protectedroute 