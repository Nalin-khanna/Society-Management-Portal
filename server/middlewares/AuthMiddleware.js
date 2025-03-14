const jwt  = require("jsonwebtoken")
const { User } = require("../models/UserSchema")

const token_authorization = async(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        if(token==null){
           return res.status(404).json({success:false , error:"Token not provided"})
        }
        const decoded = jwt.verify(token , process.env.jwt_token)
        if(decoded==null){
            return res.status(404).json({success:false , error:"Invalid token"})
        }
        const user = await User.findById({_id:decoded._id}).select("-Password")
        if(user==null){
            return res.status(404).json({success:false , error:"Invalid token"})
        }
        res.user = user
        next()
    }catch(err){
        console.log(err)
        return res.status(500).json({success:false , error:"server error"})
    }
}
module.exports = token_authorization;