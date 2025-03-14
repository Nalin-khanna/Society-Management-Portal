import React, { useState } from 'react'
import Sidebar from '@/components/ui/sidebar'
import { useStore } from '../store/Store'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button , buttonVariants } from '@/components/ui/button'
const Attendance_admin = () => {
    const user = useStore((state) => state.user)
    const verify = useStore((state)=>state.verify)
    const [date, setDate] = useState()
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
    const handleChange = (e) =>{
        setDate(e.target.value)
        console.log(date)
    }
    const handleSubmit = ()=>{
        console.log("button clicked")
    }
    return (
        <>
         <div className='flex h-screen bg-gray-150'>
           <Sidebar />
           <Card className="h-60 ml-180 mt-50 ">
            <CardHeader>
                Get attendance for date 
            </CardHeader>
            <CardContent>
                <div className='flex-col'>
                    <div className='p-5'>
                    <input type='date' onChange={handleChange}>
                    </input>
                    </div>
                    <div className='p-4 ml-10'>
                      <Button  size={"lg"} onClick = {handleSubmit}>
                          Enter 
                      </Button>
                    </div>
                </div>
               
            </CardContent>
           </Card>
         </div>
        </>
      )
}

export default Attendance_admin