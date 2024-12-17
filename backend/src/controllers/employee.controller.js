import { Employee } from "../model/employee.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";


const registerEmployee = async (req, res) => {
  try {
      const { name, email, mobileNumber, designation, gender, course, password } = req.body;
      const courseString = Array.isArray(course) ? course[0] : course;

      // Validate required fields
      if (
          [name, email, mobileNumber, designation, gender, courseString, password].some(
              (field) => typeof field !== "string" || field.trim() === ""
          )
      ) {
          return res.status(400).json({ message: "All fields are required" });
      }

     

      // Check authorization: only admin or the user themselves can create an employee
     
      // Check if the employee already exists based on email or mobile number
      const existingEmployee = await Employee.findOne({
          $or: [{ mobileNumber }, { email }]
      });

      if (existingEmployee) {
          return res
              .status(409)
              .json({ message: "Employee with this email or mobile number already exists" });
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

      if (user) {
          // If the user exists, ensure the password matches if it's not an admin
          if (req.params.id === user._id && user.role === "admin") {
            const employee = new Employee({
              user: user._id,
              name,
              email,
              mobileNumber,
              designation,
              gender,
              course: courseString,
              profileImg: profileImgUrl,
              password: user.password // Store the hashed password from User model
          });
    
          await employee.save(); // Save to the Employee collection
    
          return res.status(201).json({
              message: "Employee registered successfully",
              data: { employee }
          });
          }
  
          
      } else {
          // If the user doesn't exist, create a new User entry
          const isAdmin= await User.findById(req.params.id)
         if( isAdmin && isAdmin.role==="admin"){
          const hashedPassword = await bcrypt.hash(password, 8);
          user = new User({
              email,
              username: name,
              password: hashedPassword,
              role: "employee"
          });
          await user.save()
         }else{
          return res.status(300).json("employee can not create other id")
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
          password: user.password // Store the hashed password from User model
      });

      await employee.save(); // Save to the Employee collection

      return res.status(201).json({
          message: "Employee registered successfully",
          data: { employee }
      });
  } catch (error) {
      console.error("Error registering employee:", error);
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
const deleteEmployee= async(req,res)=>{
  try {
    const userId = req.params.id.trim().replace(/^:/, "");
    const _id= req.query.employeeId;

    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(_id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const employeeUserId = await Employee.findById(_id).select("user");
         if(!employeeUserId){
          return res.status(404).json({ message: 'Employee not exist with given id ' });

         } 
    if (userId.toString() === employeeUserId.user.toString() || user.role === 'admin') {
      const deleteEmployee = await Employee.findByIdAndDelete(_id,);  

      if (!deleteEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      return res.status(200).json({ message: 'Employee deleted successfully', deleteEmployee });
    } else {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
  }catch (error) {
        console.error(error);
       return  res.status(500).json({ message: 'Server error' });
      }
}
const updateEmployee = async (req, res) => {
  try {
    const userId = req.params.id.trim().replace(/^:/, "");

    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(req.body._id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
     
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(req.body.course);
    if (!["MCA", "BCA", "BSC"].includes(req.body.course)) {
      return res.status(400).json({ error: "Invalid course selected." });
    }
    const employeeUserId = await Employee.findById(req.body._id).select("user");
         
    if (userId.toString() === employeeUserId.user.toString() || user.role === 'admin') {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        req.body._id,
        {
          username: req.body.username,
          email: req.body.email,
          mobileNumber: req.body.mobileNumber,
          designation: req.body.designation,
          gender: req.body.gender,
          course:req.body.course,
          profileImg: req.body.profileImg, 
        },
        { new: true }
      ).lean();  

      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      return res.status(200).json({ message: 'Employee details updated successfully', updatedEmployee });
    } else {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
  } catch (error) {
    console.error('Error updating employee:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};  
  const getEmployee= async(req,res)=>{
   try {
    const employeeId=req.params.employeeId.trim().replace(/^:/, "");
    if(!employeeId){
      return res.status(400).json("employee ID is not founnd please send employee Id")
    }
  
    let user  =await Employee.findById(employeeId);
    // console.log(user);
    if(!user){
      return res.status(400).json("user not found");
    }
    return res.status(200).json(user);
   } catch (error) {
    return res.status(500).json("server error while fecthing employee",error);
    
   }
 
  }
export { 
    registerEmployee,
     getAllEmployees,
     deleteEmployee,
     updateEmployee,
     getEmployee,
     };
  
      
     