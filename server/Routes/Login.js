const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose');
const {UserSchema,User} = require('../models/UserSchema')
const router = express.Router();
const {login , verify} = require('../controllers/AuthController');
const token_authorization = require('../middlewares/AuthMiddleware');
const worksheetSearch = require('../middlewares/worksheetSearch')
const attendanceMiddleware = require('../middlewares/AttendanceMiddleware')
const upload = require('../middlewares/multerMiddleware');
const uploadOnCloudinary = require('../controllers/Cloudinary');
router.post('/login',login)
router.get('/searchworksheet',worksheetSearch)
router.get('/Attendance',attendanceMiddleware)
router.get('/verify',token_authorization,verify)
router.post('/submitfile',upload.single('file'),async (req , res)=>{
    try{    
        const localfilepath = req.file.path
        const result = await uploadOnCloudinary(localfilepath);
        const userId = req.body.user;
        
        if(userId == null ){
            return res.status(400).json({success:false , message:"no user_id"})
        }
        if(userId){
            await User.updateOne({ _id: userId }, { $set: { worksheet: result.url } });
        }
        
        if (result) {
            // Successfully uploaded to cloudinary
            console.log(result)
            fs.unlinkSync(localfilepath); // Clean up the local file
            res.json({ success: true, url: result.url });

        } else {
            res.status(400).json({ success: false, message: "Cloudinary upload failed" });
        }
    }
    catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
})
module.exports = router;