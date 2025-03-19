const mongoose = require ('mongoose')
const {User} = require('../models/UserSchema')
const FetchAllUsers = async(req , res , next) => { 
    try{
        const allUsers = await User.find();
        return res.status(201).json({ message: "All users fetched successfully", AllUsers : allUsers });
    }catch(error){
        console.error(error)
        res.status(500).json({ error: "Error during fetching user data" });
    }
}

module.exports = FetchAllUsers ; 
