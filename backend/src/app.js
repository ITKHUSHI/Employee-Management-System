import express from "express"
import cors from 'cors';
// import path from "path";
import cookieParser from 'cookie-parser'
import userRouter from "./routes/user.route.js"
import bodyParser from "body-parser";


const app= express() 
app.use(cors({
	origin: 'http://localhost:8000' ,   //process.env.CORS_ORIGIN ,
	credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/v1/user" ,userRouter);

export{app}
