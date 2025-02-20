const express = require('express')
const router = express.Router();
const {login , verify} = require('../controllers/AuthController');
const token_authorization = require('../middlewares/AuthMiddleware');
const upload = require('../middlewares/multerMiddleware');
const uploadOnCloudinary = require('../controllers/Cloudinary');
router.post('/login',login)
router.get('/verify',token_authorization,verify)
router.post('/submitfile',upload.single('file'),async (req , res)=>{
    try{
        const localfilepath = req.file.path
        const result = await uploadOnCloudinary(localfilepath);
        if (result) {
            // Successfully uploaded to cloudinary
            fs.unlinkSync(localFilePath); // Clean up the local file
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