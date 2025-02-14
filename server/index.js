require('dotenv').config();
const express = require ('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.post('/login',(req,res)=>{
    const body = req.body ;
    
    console.log(body);

})
app.listen(process.env.PORT, ()=>{
    console.log(`listening to port ${process.env.PORT}`)
})