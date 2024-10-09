import {v2 as cloudinary} from 'cloudinary';          
cloudinary.config({ 
  cloud_name: Process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

import fs from "fs";
          

const uploadOnCloudinary = async(profile)=>{
	try {
		if(!profile) {
			return null;
		}

		//uplod file on cloudinary
		const response= await cloudinary.uploader.upload(profile,{
            resource_type: "auto"
		})
		console.log("file successfuly uploaded on cloudinary" , response.url);
		//file has been uploaded successfully
		 fs.unlinkSync(profile)
		return response;
		
	} catch (error) {
       fs.unlinkSync(profile) // remove the locally saved temporary file as the uploded operation got failed
        return null;	
    } 
}

export{uploadOnCloudinary}