import React ,{ useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import  Spline  from '@splinetool/react-spline';
import toast from "react-hot-toast"
import { userContext } from '../context/authContext';
import { useContext } from 'react';


function Login() {
	const [email ,setEmail]= useState("");
	const [password,setPassword]= useState("");
	const [isLogging , setIsloggin]=useState(false);
	const {login}=useContext(userContext);
	const navigate=useNavigate()
	const handleSubmit= async(e)=>{
		e.preventDefault();
		try {
			const res= await axios.post("/api/v1/user/login",{email,password});
			setIsloggin(true);

			console.log(res);
			login(res.data.user);
			localStorage.setItem("token",res.data.token);
			console.log(res.data.user)
			if(res.data.user.role==="admin"){
                 navigate("/admin-dashboard")
			}else{
				navigate("/employee-dashboard")
			}
			toast.success("successfully Login user")
			

		} catch (error) {
		        setIsloggin(false);
			console.log(error ,"error while login user")
			toast.error("error while login user")
		}finally{
			setIsloggin(false);
		}

	}
  return (
	<>
	<main className="w-full h-[100vh] flex justify-center items-center text-center ">
		<div className=' h-[100vh] w-full absolute'>
		<Spline
        scene="https://prod.spline.design/CAfNaWJ2FwvlQ6q7/scene.splinecode" 
      />
	  </div>

	  <div className='  h-[100vh] w-full relative flex  text-center justify-center flex-col items-center '>
	  <h2  className='font-serif text-purple-600 font-semibold text-center text-xl'>Employee Management System</h2>

		
			<div className='flex justify-center items-center flex-col p-2  shadow-sm rounded-sm h-[50%] w-[80%] font-serif '>
				<h3>Login</h3>
			<form onSubmit={handleSubmit} className='flex justify-center items-start flex-col p-2  shadow-sm rounded-sm  font-serif '>
			<label htmlFor="text" id="email" >Email</label>
			<input type="text" id="email" className=' p-1 rounded-sm shadow-sm '
			placeholder='Enter Email' required onChange={(e)=>setEmail(e.target.value)} />

			<label htmlFor="text" id="password" className=''>password</label>
			<input required  type="password" id="password" className=' p-1 rounded-sm shadow-sm '
			placeholder='Enter password'
			onChange={(e)=>setPassword(e.target.value)} />
	          	
	</form>
	<button className=' bg-purple-400 p-2 rounded-sm hover:bg-purple-800' onClick={handleSubmit}>{isLogging===true? "loding..." : "Login"}</button>

			</div>

		</div>
	 
		
	</main>
	</>
  )
}

export default Login