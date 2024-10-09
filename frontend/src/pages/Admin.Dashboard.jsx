import React, { useState } from 'react'
import Navbar from "../component/Navbar"
import { Outlet } from 'react-router-dom'
function AdminDashboard() {

  

  return (
	<>
   <Navbar/>
  <Outlet>
  </Outlet>
   
 

  </>
  )
}

export default AdminDashboard