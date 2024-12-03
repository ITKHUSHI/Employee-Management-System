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
POST	/api/auth/login	Login and receive a JWT.	Public
POST	/api/auth/registerUser	Register a new user.	Admin Only
POST /api/auth/createEmployee (user create only his employee account if he does not have else only admin create one than more employees)![Screenshot 2024-12-03 231046](https://github.com/user-attachments/assets/f62f2174-c9cb-461f-bdad-5f7e8299e14f)
![Screenshot 2024-12-03 231025](https://github.com/user-attachments/assets/f177d565-8d7e-4b19-a121-48f9627d66bd)

GET	/api/employees	Fetch all employees.	Admin Only
POST	/api/employees	Add a new employee.	Admin Only

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
git clone https://github.com/your-username/employee-management-system.git
Install dependencies:

Backend:
bash
Copy code
cd backend
npm install
