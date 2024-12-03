import {BrowserRouter , Routes , Route,Navigate} from "react-router-dom"
import AdminDashboard from "./pages/Admin.Dashboard.jsx"
import Login from "./pages/Login.jsx"
import EmployeeDashBoard from "./pages/Employee.DashBoard.jsx"
import CreateEmployee from "./pages/CreateEmployee.jsx"
import EmployeeList from "./pages/EmployeeList.jsx"
import RegisterUser from "./pages/RegisterUser.jsx"
import Protectedroute from "./component/Protectedroute.jsx"
import Navbar from "./component/Navbar.jsx"
function App() {
  const isLogging=window.localStorage.getItem("loggedIn");
  const userType=window.localStorage.getItem("userType");
  return (
    <>
            

   <BrowserRouter>
   <Navbar isLogging={isLogging} userType={userType} />
      <Routes>
    

         {
          !isLogging &&(
            <>
             <Route path="/" element={<Navigate to="/register-user" />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register-user" element={<RegisterUser/>}/>

            </>
          ) 
         }
           <Route element={<Protectedroute/>}>
           <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register-user" element={<Navigate to="/" />}/>
            {
              userType!="admin"?(
                <>
            <Route path="employee-dashboard" element={<EmployeeDashBoard />} />
            <Route path="/" element={<EmployeeDashBoard />} />


                </>
              ):(
                <>
            <Route path="admin-dashboard" element={<AdminDashboard />}/>
           <Route path="create-employee" element={<CreateEmployee />} />
            <Route path="employee-list" element={<EmployeeList/>}/>
            <Route path="/" element={<AdminDashboard />} />

                </>
              )
            }

           </Route>

        
          {/* Add more routes here */}
       
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
