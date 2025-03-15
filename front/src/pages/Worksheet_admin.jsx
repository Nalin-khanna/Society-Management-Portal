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
            <div className='flex h-screen bg-gray-180'>
                <Sidebar />
                <div className='flex flex-1 '>

                </div>
            </div>
        </>
    );
}

export default Worksheet_admin