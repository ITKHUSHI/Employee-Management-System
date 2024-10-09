import mongoose,{Schema} from "mongoose";

const employeeSchema = new Schema({
	name:{
		type:String,
		required:true,
		trim:true,
	},
	email:{
		type:String,
		required:true,
		unique:true,
		trim:true,
		lowecase: true,
	},
    mobileNumber:{
		type:String,
		required:true,
		unique:true,
		trim:true,
		lowecase: true,
	},
	designation:{
		type:String,
		enum:["HR","Manager","Sales"],
		required:true,
	},
	gender:{
		type:String,
		enum:["male","female","other"],
		required:true,
	
	},
	course:{
		type:String,
		enum:["MCA","BCA","BSC"],
		required:true,

	},
	profileImg:{
		type:String,
		default:"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
		
	}

},{
	timeseries:true,
})

export const Employee=mongoose.model("Employee",employeeSchema)