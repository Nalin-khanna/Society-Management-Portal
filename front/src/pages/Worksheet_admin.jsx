import React from 'react'
import Sidebar from '@/components/ui/sidebar'
import { useStore } from '../store/Store'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Upload } from "lucide-react"; 

const Worksheet_admin = () => {
    const user = useStore((state) => state.user)
    const verify = useStore((state)=>state.verify)
    const navigate = useNavigate()
    useEffect(()=>{
        const checkAuth = async () => {
            await verify()
            if (user === null) {
                navigate('/')
                return
            }
            
            if (user?.role !== 'admin') {
                navigate('/')
                return
            }
        }
        checkAuth()
    }, [ verify, navigate])
    if (user==null) {
        return null
        
    }
    return (
        <>
            <div className='flex h-screen bg-gray-150'>
                <Sidebar />
                <div className="flex-1 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold">File Management</h1>
                        <div className="flex gap-4">
                            <div className="relative">
                                <label className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                                    <Upload size={20} />
                                    Upload Files
                                    <input
                                        type="file"
                                        multiple
                                        accept=".pdf,.xlsx,.xls"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Worksheet_admin