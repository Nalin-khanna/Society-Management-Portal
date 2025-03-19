import React, { useState } from "react";
import Sidebar from "@/components/ui/sidebar";
import { useStore } from "../store/Store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Attendance_admin = () => {
  const user = useStore((state) => state.user);
  const verify = useStore((state) => state.verify);
  const [date, setDate] = useState();
  const [attendancedata, setAttendancedata] = useState([]);
  const[mark , setMark] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      await verify();
      if (!user || user?.role !== "admin") {
        navigate("/");
        return;
      }
    };
    checkAuth();
  }, [verify, navigate]);

  if (!user) {
    return null;
  }

  const handleChange = (e) => {
    e.preventDefault();
    setDate(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Attendance", {
        params: { date: date },
      });
      setAttendancedata(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const markAttendance = async (userid , status) =>{
    try {
        await axios.post("http://localhost:3000/mark-attendance", {
          userid,
          status,
          date,
        },{
          headers: {"Content-Type": "application/json"}
        });
        await handleSubmit(); 
      } catch (error) {
        console.error("Error marking attendance:", error);
      }
  }

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="w-80% flex flex-1 flex-col items-center justify-center p-6">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center text-xl font-semibold">
              Mark Attendance
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
                <Button
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleSubmit}
                >
                  Fetch Attendance
                </Button>
              </div>
            </CardContent>
          </Card>

          {attendancedata.length > 0 && (
            <Card className="w-full max-w-3xl mt-6 shadow-lg">
              <CardHeader className="text-center text-lg font-semibold">
                Attendance List
              </CardHeader>
              <CardContent>
                <ul className="divide-y divide-gray-300">
                  {attendancedata.map((user) => (
                    <li key={user._id} className="py-3 flex justify-between">
                      <span className="font-medium">{user.name}</span>
                      <span
                        className={`px-3 py-1 text-white rounded-lg ${
                          user.status === "Present"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {user.status}
                      </span>
                      <button className="bg-green-600 hover:bg-green-700 rounded-lg px-2" onClick={()=>markAttendance(user._id , "Present")}>
                       Mark Present
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 rounded-lg px-2" onClick={()=> markAttendance(user._id , "Absent")}>
                       Mark Absent
                      </button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Attendance_admin;
