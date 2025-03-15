const mongoose = require('mongoose');
const {UserSchema,User} = require("../models/UserSchema")
const worksheetSearch = async (req, res)=>{
    try{
        const { search } = req.query; 
        const user = await User.findOne({name:`${search}`})
        if(user == null){
            res.status(400).json({success:false , error:"user not found"})
        }
        if(user.worksheet == null){
            res.status(400).json({success:false , error:"user have not uploaded the worksheet"})
        }
        res.send({fileurl : user.worksheet})        

    }
    catch(error){
        console.log(error)
    }
}
module.exports = worksheetSearch;