import React, { useEffect, useState } from "react";
import { useStore } from "../store/Store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Sidebar } from "../components/ui/sidebar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"; // Import button

const Users = () => {
  const user = useStore((state) => state.user);
  const verify = useStore((state) => state.verify);
  const navigate = useNavigate();
  const [allusers, setAllusers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
        const response = await axios.get(`http://localhost:3000/fetch-all-users?page=${page}&limit=10`);
        setAllusers(response.data.AllUsers);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [page]); // Refetch users when page changes

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

            {/* Pagination Controls */}
            <div className="flex justify-center gap-4 mt-4">
              <Button 
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))} 
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="text-lg font-medium">{page} / {totalPages}</span>
              <Button 
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} 
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Users;
