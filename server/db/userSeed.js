const UserSchema = require("/Users/nalinkhanna/Society-management-portal/server/models/UserSchema.js") ;
const mongoose = require("mongoose");

const User = mongoose.model('User',UserSchema);

const addUser = ()=>{
    const user1 = new User({name:"user1",email:"nalinkhanna17@gmail.com",Password:"123456"})
    user1.save()
    .then(()=>{console.log("user added")})
}
module.exports=addUser