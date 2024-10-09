import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast'; 
import { useNavigate } from 'react-router-dom';

function CreateEmployee() {
    const courses = ["MCA", "BCA", "BSC"];
    const [isLodding,setIslodding]=useState(false)
    const navigate=useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        mobileNumber: "",
        designation: "",
        gender: "",
        course: [],
        profileImg: null
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            // Handle checkbox for courses
            if (checked) {
                setInputs((prev) => ({
                    ...prev,
                    course: [...prev.course, value], // Add course to array if checked
                }));
            } else {
                setInputs((prev) => ({
                    ...prev,
                    course: prev.course.filter((course) => course !== value), // Remove course from array if unchecked
                }));
            }
        } else {
            setInputs({ ...inputs, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setInputs({ ...inputs, [name]: files[0] });
    };

    const createEmployee = async () => {
        try {
            setIslodding(true);
            const res = await axios.post("/api/v1/user/create-employee", {
                ...inputs // Use spread operator to include all input fields
            });
            navigate("employee-list")
            console.log(res.data);
            toast.success("Successfully created employee");

        } catch (error) {
            console.log(error, "Error while creating user");
            toast.error("Error while creating employee");
            setIslodding(false);
        }
        finally{
            setIslodding(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createEmployee();

        // Reset the form
        setInputs({
            name: "",
            email: "",
            mobileNumber: "",
            designation: "",
            gender: "",
            course: [],
            profileImg: null
        });
    };

    return (
        <>
            <main className="w-full h-[100vh] flex flex-col  justify-center items-center text-center ">
            <h2 className='font-serif text-green-500 font-semibold text-xl mt-4'>Create Employee</h2>

                <div className='h-[100vh] w-full flex text-center justify-center flex-col items-center '>

                    <div className='flex justify-center items-center flex-col p-2 shadow-sm rounded-sm h-[50%] w-[80%] font-serif '>
                        <form className="md:w-1/3 max-w-sm" onSubmit={handleSubmit}>

                            <label htmlFor="name" className="p-2 text-bold text-white">Name</label>
                            <input
                                className="text-sm w-full px-4 py-2 border m-2 border-solid border-gray-300 rounded-full"
                                type="text"
                                name="name"
                                id="name"
                                value={inputs.name}
                                onChange={handleInputChange}
                                placeholder="Name"
                                required
                            />

                            <br />
                            <label htmlFor="email" className="p-2 text-bold text-white">Email</label>
                            <input
                                id="email"
                                className="text-sm w-full px-4 py-2 m-2 border border-solid border-gray-300 rounded-full"
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={inputs.email}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="mobileNumber" className="p-2 text-bold text-white">Mobile Number</label>
                            <input
                                className="text-sm w-full m-2 px-4 py-2 border border-solid border-gray-300 rounded-full"
                                type="text"
                                id="mobileNumber"
                                name="mobileNumber"
                                placeholder="Mobile Number"
                                value={inputs.mobileNumber}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="designation" className="p-2 text-bold text-white">Designation</label>
                            <select
                                className="text-sm m-2 w-full px-4 py-2 border border-solid border-gray-300 rounded-full mt-4"
                                name="designation"
                                id="designation"
                                value={inputs.designation}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="" disabled>Select your designation</option>
                                <option value="HR">HR</option>
                                <option value="Manager">Manager</option>
                                <option value="Sales">Sales</option>
                            </select>

                            <label htmlFor="course" >Course</label>
                            <div className="flex justify-between">
                                {courses.map((course) => (
                                    <label key={course} className="text-white">
                                        <input
                                            className="m-2"
                                            type="checkbox"
                                            name="course"
                                            value={course}
                                            checked={inputs.course.includes(course)}
                                            onChange={handleInputChange}
                                        />
                                        {course}
                                    </label>
                                ))}
                            </div>

                            <label htmlFor="gender" className="p-2 text-bold text-white">Gender</label>
                            <div className="flex justify-between">
                                <label className="text-white">
                                    <input
                                        className="text-sm m-2"
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        onChange={handleInputChange}
                                        checked={inputs.gender === "female"}
                                    />
                                    Female
                                </label>

                                <label className="text-white">
                                    <input
                                        className="text-sm m-2"
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        onChange={handleInputChange}
                                        checked={inputs.gender === "male"}
                                    />
                                    Male
                                </label>

                                <label className="text-white">
                                    <input
                                        className="text-sm m-2"
                                        type="radio"
                                        name="gender"
                                        value="other"
                                        onChange={handleInputChange}
                                        checked={inputs.gender === "other"}
                                    />
                                    Other
                                </label>
                            </div>

                            <label htmlFor="profileImg" className="p-2 text-bold text-white">Profile Image</label>
                            <input
                                type="file"
                                required
                                className="text-sm w-12 px-4 py-2 m-4 border border-solid border-gray-300 rounded-full"
                                name="profileImg"
                                id="profileImg" // Corrected from 'profileIng' to 'profileImg'
                                onChange={handleFileChange}
                            />

                            <div className="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Or</p>
                            </div>
                            
                            <button type="submit" className='bg-green-400 p-2 rounded-sm hover:bg-green-800'>{isLodding?"creating....": "Create Employee"}</button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}

export default CreateEmployee;
