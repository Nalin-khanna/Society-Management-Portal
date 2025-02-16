
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const {UserSchema , User} = require('../models/UserSchema')
const password = "123456"
const addadminUser = async ()=>{
    const hashedpassword = await bcrypt.hash(password,10)
    const user1 = new User({name:"edc",email:"edcell.mait@gmail.com",Password:hashedpassword,role:"admin"})
    user1.save()
    .then(()=>{console.log("user added")})
}
module.exports=addadminUser