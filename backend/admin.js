import { User } from './src/model/user.model.js';
import bcrypt from 'bcrypt'
import connectDB from "./src/db/index.js"
const adminRegister = async ()=>{
	try {
		connectDB();
		const hashPassword= await bcrypt.hash("khushi07",8);
		const newAdmin= await new User({
			username:"khushi",
			email:"khushi@gmail.com",
			password:hashPassword,
			role:"admin",
		});
		await newAdmin.save();
		
		console.log(newAdmin)
	} catch (error) {
		console.log("wrong email or password",error);
		
	}
}
adminRegister();