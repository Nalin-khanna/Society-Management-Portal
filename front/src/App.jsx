import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'

function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/Admin-dashboard' element={<AdminDashboard />} />
        <Route path='/User-dashboard' element={<UserDashboard /> } />
      </Routes>
    </>
  )
}
export default App
