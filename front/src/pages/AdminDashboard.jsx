import React from 'react'
import { useStore } from '../store/Store'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const AdminDashboard = () => {
    const user = useStore((state) => state.user)
    const navigate = useNavigate();
    useEffect(()=>{
        if (user==null) {
            navigate('/')
            return
        }
        
        // Optional: Check for admin role if you have role-based auth
        if (user.role !== 'admin') {
            navigate('/')
            return
        }

    },[user,navigate])
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