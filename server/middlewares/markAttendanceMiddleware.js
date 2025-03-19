const mongoose = require('mongoose')
const Attendance = require('../models/AttendanceSchema');
const markAttendanceMiddleware = async (req,res,next) => {
    try{
        const {userid , status ,date} = req.body;
        const existingAttendance = await Attendance.findOne({user : userid, date: date})
        if(!existingAttendance){
            const newAttendance =  new Attendance({user : userid , date : date , status : status})
            await newAttendance.save();
            return res.status(201).json({ message: "Attendance marked successfully", attendance: newAttendance });
        }
        else{
            existingAttendance.status = status;
            await existingAttendance.save();
            return res.status(200).json({ message: "Attendance updated successfully", attendance: existingAttendance });
        }
    }
    catch (error){
        console.error(error);
        res.status(500).json({ error: "Error during marking attendance" });
    }
}
module.exports = markAttendanceMiddleware