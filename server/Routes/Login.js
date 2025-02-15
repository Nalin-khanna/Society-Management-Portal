const express = require('express')
const router = express.Router();
router.use(express.json())
router.post('/login',(req , res)=>{
    const{username , Email , password} = req.body
    
})
module.exports = router