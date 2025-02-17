require('dotenv').config();
const express = require ('express')
const app = express()
const cors = require('cors');
const connect = require('./db/ connection');
const router = require('./Routes/Login')
const URL = process.env.MONGODB_URL;
app.use(express.json())
app.use(cors())
app.use(router)
connect(process.env.MONGODB_URL)
app.listen(process.env.PORT, ()=>{
    console.log(`listening to port ${process.env.PORT}`) ; 
})