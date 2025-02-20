
const {v2} = require('cloudinary')
const fs = require('fs')
    // Configuration
v2.config({ 
    cloud_name: process.env.Cloudinary_cloudname, 
    api_key: process.env.cloudinary_apikey, 
    api_secret: process.env.cloudinary_apisecret,  
});

const uploadOnCloudinary = async (localfilepath)=>{
    try{
        if(!localfilepath) return null;
        const response = await v2.uploader.upload(localfilepath,{
            
            resource_type:'auto'
        })
        console.log("file has been uploaded" , response)
        return response
    }
    catch{
        fs.unlinkSync(localfilepath);
        return null
    }
}

module.exports = uploadOnCloudinary