import { Employee } from "../model/employee.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";


const registerEmployee = async (req, res) => {
    try {
        const { name, email, mobileNumber, designation, gender, course, password } = req.body;
        const courseString = Array.isArray(course) ? course[0] : course;

        // Validate required fields
        if (
            [name, email, mobileNumber, designation, gender, courseString, password].some(
                (field) => typeof field !== 'string' || field.trim() === ""
            )
        ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const role = req.user.role;

        // Check if the employee already exists based on email or mobile number
        const existingEmployee = await Employee.findOne({
            $or: [{ mobileNumber }, { email }]
        });

        if (existingEmployee) {
            // Admins can create multiple employees using the same email
            if (role !== 'admin') {
                return res.status(409).json({ message: "Employee with this email or mobile number already exists" });
            }
        }

        // Handle profile image upload
        let profileImgUrl = "";
        if (req.files && Array.isArray(req.files.profileImg) && req.files.profileImg.length > 0) {
            const profileLocalImg = req.files.profileImg[0].path;
            const profileImg = await uploadOnCloudinary(profileLocalImg);
            profileImgUrl = profileImg.url || "";
        }

        // Check if the user already exists in the User collection
        let user = await User.findOne({ email });
        if (!user) {
            // If the user does not exist, create a new User entry
            const hashedPassword = await bcrypt.hash(password, 8);
            user = new User({
                email,
                username: name, // Using 'name' as 'username'
                password: hashedPassword,
                role: 'employee'
            });
            await user.save();
        } else {
            // If the user exists, check credentials for non-admins
            if (role !== 'admin') {
                const isPasswordMatch = await bcrypt.compare(password, user.password);
                if (!isPasswordMatch) {
                    return res.status(401).json({ message: "Invalid credentials for existing user." });
                }

                // Restrict non-admins from creating duplicate entries
                if (user.role !== 'employee') {
                    return res.status(403).json({ message: "Unauthorized to create employee account." });
                }
            }
        }

        // Create the new Employee entry with a reference to the User ID
        const employee = new Employee({
            user: user._id,
            name,
            email,
            mobileNumber,
            designation,
            gender,
            course: courseString,
            profileImg: profileImgUrl,
            password: user.password // Use the hashed password
        });

        await employee.save();

        return res.status(201).json({
            message: "Employee registered successfully",
            data: { employee }
        });
    } catch (error) {
        // console.error("Error registering employee:", error);
        return res.status(500).json({ message: "Error registering employee", error });
    }
};


const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().select("-password"); // Exclude the password field

        if (!employees || employees.length === 0) {
            return res.status(404).json({ message: "No employees found" });
        }

        return res.status(200).json({ status: 200, data: employees });
    } catch (error) {
        // console.error("Error fetching employees:", error);
        return res.status(500).json({ message: "Internal server error" });
     }
};

export { 
    registerEmployee,
     getAllEmployees
     };
  