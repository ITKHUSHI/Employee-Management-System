import {BrowserRouter , Routes , Route,Navigate} from "react-router-dom"
import AdminDashboard from "./pages/Admin.Dashboard.jsx"
import Login from "./pages/login.jsx"
import EmployeeDashBoard from "./pages/Employee.DashBoard.jsx"
import CreateEmployee from "./pages/CreateEmployee.jsx"
import EmployeeList from "./pages/EmployeeList.jsx"

function App() {

  return (
    <>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="admin-dashboard" element={<AdminDashboard />}>
          <Route path="create-employee" element={<CreateEmployee />} />
          <Route path="employee-list" element={<EmployeeList/>}></Route>
          
          {/* Add more routes here */}
        </Route>
        <Route path="/employee-dashboard" element={<EmployeeDashBoard />} />
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
