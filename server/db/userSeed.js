
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const {UserSchema , User} = require('../models/UserSchema')
const password = "123456"
const addUser = async ()=>{
    const hashedpassword = await bcrypt.hash(password,10)
    const user1 = new User({name:"user2",email:"anil71khanna@gmail.com",Password:hashedpassword})
    user1.save()
    .then(()=>{console.log("user added")})
}
module.exports=addUser