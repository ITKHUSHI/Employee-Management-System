import { Employee } from "../model/employee.model.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const registerEmployee = async (req, res) => {
    const { name, email, mobileNumber, designation, gender, course } = req.body;

    // Ensure course is a string
    const courseString = Array.isArray(course) ? course[0] : course; 

    if (
        [name, email, mobileNumber, designation, gender, courseString].some((field) => typeof field !== 'string' || field.trim() === "")
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existedUser = await Employee.findOne({
        $or: [{ mobileNumber }, { email }]
    });
    
    if (existedUser) {
        return res.status(409).json({ message: "User with email or mobile number already exists" });
    }
    
    let profileLocalImg;
    if (req.files && Array.isArray(req.files.profileImg) && req.files.profileImg.length > 0) {
        profileLocalImg = req.files.profileImg[0].path;
    }

    const profileImg = await uploadOnCloudinary(profileLocalImg);

    const employee = new Employee({
        name,
        email,
        mobileNumber,
        designation,
        gender,
        course: courseString, // Use the validated course string
        profileImg: profileImg?.url || "",
    });

    await employee.save(); // Save the employee to the database

    const token = jwt.sign({ _id: employee._id }, process.env.JWT_KEY, { expiresIn: "10d" });

    const createEmployee = await Employee.findById(employee._id).select("-password");
    if (!createEmployee) {
        return res.status(500).json({ message: "Something went wrong while registering employee" });
    }

    return res.status(201).json({ status: 200, data: createEmployee, message: "User registered Successfully" });
};

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find().select("-password"); // Exclude the password field

    if (!employees || employees.length === 0) {
        return res.status(404).json({ message: "No employees found" });
    }

    return res.status(200).json({ status: 200, data: employees });
};


export { registerEmployee ,
	   getAllEmployees
};
