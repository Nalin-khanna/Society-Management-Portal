const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {UserSchema, User} = require('../models/UserSchema')
const login = async (req,res)=>{
    try{
        const {username , Email , password} = req.body;
        const user = await User.findOne({email:Email})
        if(!user){
            return res.status(401).json({success: false , error:"Invalid email or password"})
        }
      
        const isMatch = await bcrypt.compare(password,user.Password);
        if(!isMatch){
            return res.status(401).json({success: false, error:"Invalid email or password"})
            }
        const token = jwt.sign({_id:user._id },process.env.jwt_token,{expiresIn:"1d"})
   
        return res.status(200).json({ 
            success: true, 
            token, 
            user: { _id: user._id, name: user.name , role : user.role} 
        });
    }
    catch(err){
        res.status(500).json({success:false , error: err.message})
    }
}

module.exports = login 