import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/ui/sidebar';
import { useStore } from '../store/Store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, FileText } from "lucide-react"; 
import {AlertCircle} from "lucide-react"

const WorksheetAdmin = () => {
    const user = useStore((state) => state.user);
    const verify = useStore((state) => state.verify);
    const [query, setQuery] = useState('');
    const [worksheet, setWorksheet] = useState('');
    const [errormssg , setErrorMessage] = useState('');
    const navigate = useNavigate();

    const searchHandler = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setWorksheet('');
        try {
            const response = await axios.get('http://localhost:3000/searchworksheet', { params: { search: query } });
            setWorksheet(response.data.fileurl);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            await verify();
            if (!user) {
                navigate('/');
                return;
            }
            if (user?.role !== 'admin') {
                navigate('/');
                return;
            }
        };
        checkAuth();
    }, [verify, navigate]);

    if (!user) return null;

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-1 flex-col items-center justify-center px-6">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
                        Search User Worksheets
                    </h2>

                    

                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <input 
                            type="text" 
                            placeholder="Enter user name..." 
                            className="flex-1 p-3 text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white p-3"
                            onClick={searchHandler}
                        >
                            <Search className="h-5 w-5" />
                        </button>
                    </div>

                    {worksheet && (
                        <div className="mt-6 text-center">
                            <a 
                                href={worksheet} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition"
                            >
                                <FileText className="h-5 w-5" />
                                Open Excel File
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorksheetAdmin;
