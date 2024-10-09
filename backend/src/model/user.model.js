import mongoose,{Schema} from "mongoose";
// import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema=new Schema({
	username:{
		type:String,
		required:true,
		unique:true,
		trim:true

	},
	email:{
		type:String,
		required:true,
		unique:true,
		lowecase: true,
		trim:true
		
	},
	password:{
		type:String,
		required:true,
	},
	role:{
		type:String,
		enum:["admin","employee"],
		required:true,
	},
	profile:{
		type:String,
	}
},
	{
		timestamps:true
	}

)
userSchema.pre("save",async function(next){
	if(!this.isModified("password")) {
		return next();
	}
     this.password= await bcrypt.hash(this.password,8)
	   next();
})
userSchema.methods.isPasswordCorrect=async function(password){
 const result=await	bcrypt.compare(password,this.password)
  return result;
}

export const User=mongoose.model("User",userSchema);