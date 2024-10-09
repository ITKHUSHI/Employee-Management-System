import multer from "multer";

  const storage =  multer.diskStorage({
	 
		destination: function (req, file, cb) {
		  cb(null, './public/temp')
		},
		
	 	filename: function (req, file, cb) {
		    //console.log(file);
		  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
		  cb(null, file.fieldname + '-' + uniqueSuffix)
		},
		fileFilter: function( req , file ,cb){
			if(!file.fieldname==='profileImg') {
				cb(null ,true);
			}else{
				cb (new Error('Invailid field'),false)
			}
		}
	  })
	  

	  
	
export const upload = multer({  storage: storage})