import {v2 as cloudinary} from 'cloudinary';          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
 
});

import fs from "fs";
          

const uploadOnCloudinary = async(profileImg)=>{
	try {
		if(!profileImg) {
			return null;
		}

		//uplod file on cloudinary
		const response= await cloudinary.uploader.upload(profileImg,{
            resource_type: "auto"
		})
		console.log("file successfuly uploaded on cloudinary" , response.url);
		//file has been uploaded successfully
		 fs.unlinkSync(profileImg)
		return response;
		
	} catch (error) {
       fs.unlinkSync(profileImg) // remove the locally saved temporary file as the uploded operation got failed
        return null;	
    } 
}

export{uploadOnCloudinary}