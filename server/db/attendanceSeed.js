const mongoose = require('mongoose')
const Attendance = require('../models/AttendanceSchema')

const addAttnd = async() => {
   const att = new Attendance({user: new mongoose.Types.ObjectId('67b16d04cf2fbd90d5eeebab'), date:'2025-03-10', status: 'Present'})
    await att.save();
    console.log('saved')
}
module.exports = addAttnd;