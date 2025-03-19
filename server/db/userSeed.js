
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const {UserSchema , User} = require('../models/UserSchema')
const password = "Ahaan@5769"
const addUser = async ()=>{
    const hashedpassword = await bcrypt.hash(password,10)
    const user1 = new User({name:"Ahaan",email:"Ahaanedc@gmail.com",Password:hashedpassword,role:"graphics"})
    user1.save()
    .then(()=>{console.log("user added")})
}
module.exports=addUser