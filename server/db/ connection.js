const mongoose = require('mongoose');
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
