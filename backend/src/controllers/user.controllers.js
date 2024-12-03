import {User} from "../model/user.model.js"
import {Employee} from "../model/employee.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const registerUser=( async (req, res)=>{
	try {
		const { email ,username, password, role } =  req.body;
		if (!email || !username || !password || !role) {
			return res.status(400).send('Username, password, and role are required.');
		}
	
		// Check if the role is valid
		if (!['admin', 'employee'].includes(role)) {
			return res.status(400).send('Role must be either admin or employee.');
		}
	
		// Check if the username already exists
		const existingUser = await  User.findOne({ email }).select("-token");
		if (existingUser) {
			return res.status(400).send('User with this email already exists. Please choose another one.');
		} 
	
		// Create a new user
	
		const hashedPassword = await bcrypt.hash(password, 8); // Hash the password
		const user = new User({ email, username, password: hashedPassword, role });
		await user.save(); // Save user to the database
		
		console.log(user);
		return res
			 .status(200)   
			 .json( {
				success:true,
				  user:{_id:user._id, username:user.username, role:user.role}  ,
				  message:"User register  Successfully"
				});
				
	} catch (error) {
		console.log("error while register user",error);
		return res.status(500).json({
			success:false,
			message:"Error while register user"
		});	
	}
	
    // Validate required fields
 
})
const login = (async (req,res)=>{
	try {
		const {email, password}=req.body;
     console.log(password)
	const user=(await User.findOne({email:email}) || await Employee.findOne({email}))
	if(!user){
		// console.log("user does not exist");

		return res
		.status(400)
		.json( {success:false, message:"User not exist "})
	}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if(!isPasswordValid){
			console.log("Ivalid user credentials");
		}
		   // Check if the user is an employee and registered in Employee model
		   console.log(user.role);
		   let isRegisteredEmployee = false;
		   if (user.role === "employee") {
			   const employee = await Employee.findOne({ user: user._id });
			   if (employee) {
				   isRegisteredEmployee = true;
			   } 
		   }
		const token = jwt.sign
		({
			_id:user._id ,
			email:user.email,
			username:user.username,
			role:user.role

		},
		   process.env.ACCESS_TOKEN_SECRET,
			 {
				expiresIn: process.env.ACCESS_TOKEN_EXPIRY

			 })
		const loggedInUser = await User.findById(user._id).select("-password -token")

		const options = {
			httpOnly: true,
			secure: true 
		}

		return res
         .status(200)   
		 .cookie("token",token , options)
		 .json( {
			success:true,
			message:"User logged in Successfully",
			 user:loggedInUser, 
			 isRegisteredEmployee,
			 token
			});

	
	} catch (error) {
		// console.error('Error while login user:', error); 
		return res.status(500).json({

			success:false,
			message:"Error while loggin user"
		});

	}
})


 
const logoutUser = (async (req, res) => {
try{
	
	// Check if user exists in User model 
	let  existUser = await User.findByIdAndUpdate(
		req.user._id,
		 {
	       $unset: {token: 1 },
	    }, {
	  new: true 
	});
  
	if (!existUser) {
	  // If not found in User model, check in Employee model
	  existUser = await Employee.findByIdAndUpdate( req.user._id
		, {
		$unset: { token: 1 },
	  }, {
		new: true
	  }); 
	}
  
	if (!existUser) { 
		// console.log("user not found");
	  return res.status(404).json(404, {}, "User not found");
	} 
	
	const options = {
        httpOnly: true,
        secure: true
	}
	return res
	  .status(200)
	  .clearCookie("token",options)
	  .json(200, {}, "User logged out");
  }
  catch(err){
	return res.status(500).json(err.message);
}});
  


export  {
	registerUser,
	login,
	logoutUser
}

