import {User} from "../model/user.model.js"
import {Employee} from "../model/employee.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const login = (async (req,res)=>{
	const {email, password}=req.body;
     console.log(password)
	const user=(await User.findOne({email:email}) || await Employee.findOne({email}))
	if(!user){
		console.log("user does not exist");

		return res
		.status(400)
		.json( {success:false, message:"User logged in Successfully"})
	}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if(!isPasswordValid){
			console.log("Ivalid user credentials");
		}
		const token = jwt.sign({_id:user._id , role:user.role},process.env.JWT_KEY, {expiresIn:"10d"})
		const options = {
			httpOnly: true,
			secure: true
		}

		return res
         .status(200)
		 .cookie("token",token , options)
		 .json( {
			success:true,
			  user:{_id:user._id, username:user.username, role:user.role}  ,
			  message:"User logged in Successfully"
			});

	
})



export  {login}