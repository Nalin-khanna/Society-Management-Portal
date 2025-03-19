import React, { useEffect, useState } from "react";
import { useStore } from "../store/Store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Sidebar } from "../components/ui/sidebar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Users = () => {
  const user = useStore((state) => state.user);
  const verify = useStore((state) => state.verify);
  const navigate = useNavigate();
  const [allusers, setAllusers] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      await verify();
      if (!user) {
        navigate("/");
      }
    };
    checkAuth();
  }, [verify, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/fetch-all-users");
        setAllusers(response.data.AllUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-1 flex-col items-center p-6">
        <Card className="w-full max-w-4xl shadow-lg">
          <CardHeader className="text-center text-xl font-semibold">
            List of All Users
          </CardHeader>
          <CardContent>
            {allusers.length === 0 ? (
              <p className="text-center text-gray-500">No users found.</p>
            ) : (
              <ul className="divide-y divide-gray-300">
                {allusers.map((user) => (
                  <li key={user._id} className="flex items-center gap-4 p-3">
                    <Avatar>
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-lg">{user.name}</span>
                      <span className="text-sm text-gray-500">{user.email}</span>
                    </div>
                    <span className="ml-auto px-3 py-1 text-sm font-medium rounded-lg bg-blue-100 text-blue-800">
                      {user.role}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Users;
