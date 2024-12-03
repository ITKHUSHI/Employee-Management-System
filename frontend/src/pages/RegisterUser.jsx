import React, { useState } from 'react';
import axios from 'axios';
import { json, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee'); // Default role is 'employee'
    const [message, setMessage] = useState('');
   const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const res = await axios.post('/api/v1/user/registerUser', {
				email,
                username,
                password,
                role,
            })
             JSON.stringify(res)
            console.log(res)
            setMessage(res.data.message);
            // Clear the form fields
            setUsername('');
            setPassword('');
            setRole(res.data.role);
            window.localStorage.setItem("token",res.data.token);
			console.log(res.data.user);
			window.localStorage.setItem("user", res.data.user);
			window.localStorage.setItem("loggedIn",true);
			window.localStorage.setItem("userType",res.data.user.role);

            if(res.data.role=="employee"){
                navigate("/create-employee")
            }else if(res.data.role=="admin"){
                navigate("/admin-dashboard")
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data);
            } 
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl text-black font-bold text-center mb-4">Register User</h2>
                {message && <p className="text-red-500 text-center">{message}</p>}
                <form onSubmit={handleSubmit}>
				<div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                   
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete='false'
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Register
                    </button>
                    <div>
                    already having an account
                    <Link to="/login" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                                Login
                            </Link>
                </div>
                </form>
               
            </div>
        </div>
    );
};

export default RegisterUser;
