Employee Management System
A scalable MERN stack-based application that simplifies employee management with a focus on role-based routing and a robust backend API architecture. This system enables secure user authentication and provides role-specific access to features, ensuring seamless management of employee data.

Key Features
Authentication & Authorization
JWT-based Authentication:
Users are authenticated securely with JSON Web Tokens for session management.

Role-Based Routing:

Admins and employees have distinct routes and access controls.
Admins can manage the entire system, while employees have access only to their data.
Middleware checks ensure protected routes are only accessible to authorized users.
Admin Features
Dashboard:
Admins can view system analytics and a summary of employee data.

Manage Employees:

Add new employees, including assigning roles.
Edit existing employee data (name, email, role).
Delete employee records.
Role Management:

Assign and update roles for each employee.
Ensure specific routes are accessible only by admins.
Employee Features
Personal Dashboard:
Employees can view their own profiles and update specific details.

Access Control:
Employees are restricted from accessing admin-level features, ensuring data security.

Backend Highlights
Role-Based Access Control (RBAC)
Middleware checks (authMiddleware.js) ensure role-based restrictions on API endpoints.
Example:
javascript
Copy code
const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Access denied.' });
        }
        next();
    };
};
API Endpoints
Method	Endpoint	Description	Access Level
router.route("/registerUser").post(upload.none(),registerUser);
router.route("/login").post(upload.none(), login);
router.route('/create-employee:id').post(upload.single("profileImg"),authenticate,registerEmployee);
router.route("/employees").get(authenticate,checkRole("admin"),getAllEmployees);
router.route("/logout").post(authenticate,logoutUser);
router.route("/delete:id").delete(authenticate,deleteEmployee);
router.route('/update-details:id').patch(upload.single("profileImg"),authenticate,updateEmployee);
router.route("/employee:employeeId").get(authenticate,getEmployee);

 (user create only his employee account if he does not have else only admin create one than more employees)

![Screenshot 2024-12-03 231046](https://github.com/user-attachments/assets/d6a4746c-9eb5-4e9c-9135-80ee0f9e889a)
![Screenshot 2024-12-17 144127](https://github.com/user-attachments/assets/35c8e834-622a-418a-8527-ed06ccfc50d2)
![Screenshot 2024-12-17 143959](https://github.com/user-attachments/assets/c371d84b-cc0c-4cd2-9346-9cb58e6bad3d)



Frontend Highlights
While the frontend provides a clean and responsive interface, it primarily serves as a consumer of the backend APIs.

Static Navbar:
The Navbar dynamically displays links based on user role (admin or employee).

Role-Specific Views:

Admin: Employee list, dashboard, and management features.
Employee: Profile and personal dashboard.
Getting Started
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/ITKHUSHI/employee-management-system.git
Install dependencies:

Backend:
bash
Copy code
cd backend
npm install
