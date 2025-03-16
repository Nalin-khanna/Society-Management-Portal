require('dotenv').config();
const express = require ('express')
const app = express()
const cors = require('cors');
const connect = require('./db/ connection');
const router = require('./Routes/Login')
const addAttnd = require('./db/attendanceSeed')
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true // Enable cookies and authentication headers
}));
app.use(router)
connect(process.env.MONGODB_URL)
app.listen(process.env.PORT, ()=>{
    console.log(`listening to port ${process.env.PORT}`) ; 
})