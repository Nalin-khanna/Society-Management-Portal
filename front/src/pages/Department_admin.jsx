import React from 'react'
import Sidebar from '@/components/ui/sidebar'
import { useStore } from '../store/Store'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const Department_admin = () => {
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
         </div>
        </>
      )
}

export default Department_admin