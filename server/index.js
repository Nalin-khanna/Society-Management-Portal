require('dotenv').config();
const express = require ('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors');
const connect = require('./db/ connection');
const authRoute = require('./Routes/Login')
const URL = process.env.MONGODB_URL;
console.log(URL)
app.use(express.json())
app.use(cors())
app.use(authRoute)
connect(process.env.MONGODB_URL)
app.listen(process.env.PORT, ()=>{
    console.log(`listening to port ${process.env.PORT}`) ; 
})