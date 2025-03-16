const mongoose = require('mongoose');
const {UserSchema,User} = require('./UserSchema')
const attendanceSchema = mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId , ref:User , required:true},
    date : {type : Date },
    status: { type: String, enum: ['Present', 'Absent', 'Late','Justified Reason'] }
})
const Attendance = mongoose.model('Attendance' , attendanceSchema);
module.exports = Attendance;