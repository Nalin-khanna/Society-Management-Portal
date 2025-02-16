const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name : {type:String, required:true} , 
    email : {type:String, required:true} , 
    Password : {type:String, required:true} ,
    role : {type:String},
})
const User = mongoose.model('User',UserSchema);
module.exports = {UserSchema,User} ;
