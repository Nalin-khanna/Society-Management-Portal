const mongoose = require ('mongoose')
const {User} = require('../models/UserSchema')
const FetchAllUsers = async(req , res ) => { 
    const {page = 1 , limit = 8} = req.query ;
    const skip = (page-1)*10;
    try{
        const allUsers = await User.find().skip(skip).limit(Number(limit));
        const totalUsers = await User.countDocuments();
        return res.status(201).json({ message: "All users fetched successfully", AllUsers : allUsers , totalUsers : totalUsers , totalPages : Math.ceil(totalUsers/limit), currentPage : Number(page)});
    }catch(error){
        console.error(error)
        res.status(500).json({ error: "Error during fetching user data" });
    }
}

module.exports = FetchAllUsers ; 
