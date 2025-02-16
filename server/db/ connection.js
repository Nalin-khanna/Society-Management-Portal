const mongoose = require('mongoose');
const addadminUser = require('./adminuserSeed');
const addUser = require('./userSeed');
require('dotenv').config();
const connect= async (key)=>{
    try{
        await mongoose.connect(key)
        console.log("connected")
       

    } catch(error){
        console.log(error);
    }
}
module.exports = connect;
