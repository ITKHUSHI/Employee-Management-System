import dotenv from "dotenv";
import  connectDB from './src/db/index.js'
import { app } from "./src/app.js"
dotenv.config({
	path: './.env'
})
connectDB()
.then(()=>{
	app.listen(process.env.PORT ,()=>{
		console.log(`server is runing at port  http://localhost:${process.env.PORT}`);
	} )
})
.catch((err)=>{
	console.log("Mongo db Connection faild !!!",err);
})