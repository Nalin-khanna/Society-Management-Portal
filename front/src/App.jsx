import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import Users from './pages/Users'
import Worksheet_admin from './pages/Worksheet_admin'
import Department_admin from './pages/Department_admin'
import Attendance_admin from './pages/Attendance_admin'
function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/Admin-dashboard' element={<AdminDashboard />} />
        <Route path='/User-dashboard' element={<UserDashboard /> } />
        <Route path = '/Admin-dashboard/Users' element = {<Users />} />
        <Route path = '/Admin-dashboard/Worksheet' element = {<Worksheet_admin />} />
        <Route path = '/Admin-dashboard/Department' element = {<Department_admin />} />
        <Route path = '/Admin-dashboard/Attendance' element = {<Attendance_admin />} />

      </Routes>
    </>
  )
}
export default App
