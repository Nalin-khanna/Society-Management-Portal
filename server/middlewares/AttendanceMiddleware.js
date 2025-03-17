const mongoose = require('mongoose');
const { User } = require('../models/UserSchema');
const Attendance = require('../models/AttendanceSchema');

const attendancemiddleware = async (req, res, next) => {
    try {
        const { date } = req.query;  
        if (!date) return res.status(400).json({ message: "Date is required" });

        const formattedDate = new Date(date);  // Convert to Date object

        const attendanceList = await User.aggregate([
            {
                $lookup: {
                    from: "attendances",
                    localField: "_id",
                    foreignField: "user",
                    as: "attendanceRecords"
                }
            },
            {
                $addFields: {
                    attendanceStatus: {
                        $ifNull: [
                            {
                                $arrayElemAt: [
                                    {
                                        $filter: {
                                            input: "$attendanceRecords",
                                            as: "record",
                                            cond: { $eq: ["$$record.date", formattedDate] }
                                        }
                                    },
                                    0
                                ]
                            },
                            { status: "Absent" }
                        ]
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    status: "$attendanceStatus.status"
                }
            }
        ]);

        res.json(attendanceList);
        next(); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching attendance' });
    }
};

module.exports = attendancemiddleware;
