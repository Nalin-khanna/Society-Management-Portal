import React from 'react'
import { useStore } from '../store/Store'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Sidebar } from '../components/ui/sidebar'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Users } from 'lucide-react'

const AdminDashboard = () => {
    const user = useStore((state) => state.user)
    const verify = useStore((state)=>state.verify)
    const navigate = useNavigate();
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
                <div className='flex-1 flex flex-col'>
                    <div className='bg-slate-900 p-3 h-15 text-slate-100 shadow-md'>
                        <div className='flex justify-center '>
                            <h1 className='text-2xl font-semibold'>
                                Admin Dashboard 
                            </h1>
                        </div>
                    </div>
                    <div className='p-6 flex-1 relative grid grid-cols-2 gap-4'>
                        <div className='flex items-center justify-center  '>
                            <Card className='bg-slate-800 text-gray-200'>
                                <CardHeader>
                                    <CardTitle>
                                        Users
                                    </CardTitle>
                                    <CardDescription className='text-gray-200' >
                                        The number of users logged in
                                        <Users></Users>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        Card content
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <div className='flex items-center justify-center h-full'>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        This is first card
                                    </CardTitle>
                                    <CardDescription>
                                        Yes it is the first card in the first column 
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        Card content
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard