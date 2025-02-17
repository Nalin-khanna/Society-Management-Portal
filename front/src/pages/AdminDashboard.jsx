import React from 'react'
import { useStore } from '../store/Store'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

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
    // Don't render anything while redirecting
    if (user==null) {
        return null
        
    }
    
    return (
        <>
            <div>AdminDashboard</div> 
            <div>
                {user.name}
            </div>
        </>
    )
}

export default AdminDashboard