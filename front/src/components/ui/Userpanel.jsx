import React from 'react'
import {
    Home,
    Users,
    BarChart2,
    Boxes,
    Calendar,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Menu
  } from 'lucide-react';
import { useStore } from '../../store/Store';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Userpanel = () => {
    const menuItems = [
        { id: '', label: 'Dashboard', icon: Home },
        { id: 'Users', label: 'Users', icon: Users },
        { id: 'Department', label: 'Department', icon: Boxes },
        { id: 'Worksheet', label: 'Worksheet', icon: BarChart2 },
        { id: 'Attendance', label: 'Attendence', icon: Calendar },
      ];
      const [expanded, setExpanded] = useState(true);
      const [activePage, setActivePage] = useState('dashboard');
      const logout = useStore((state)=>state.logout)
      const user  = useStore((state)=>state.user)
      const navigate = useNavigate();
      const handleronclick =async ()=>{
      logout()
      navigate('/')
  }
    return (
        <div className="relative">
          <button 
            className="lg:hidden fixed top-4 left-4 p-2 bg-slate-800 text-white rounded-md"
            onClick={() => setExpanded(!expanded)}
          >
            <Menu size={24} />
          </button>
    
    
          <div 
            className={`
              fixed top-0 left-0 h-screen 
              bg-slate-800 text-slate-100
              duration-300 ease-in-out
              ${expanded ? 'w-64' : 'w-20'}
              lg:relative
            `}
          >
            <div className="flex items-center h-16 px-4 border-b border-slate-600">
              {expanded && (
                <span className="text-2xl font-semibold ">Hey {user.name}</span>
              )}
            </div>

            <button
              onClick={() => setExpanded(!expanded)}
              className="absolute -right-3 top-8 p-1.5 rounded-full bg-slate-800 text-slate-100 hidden lg:block"
            >
              {expanded ? <ChevronLeft size={26} /> : <ChevronRight size={16} />}
            </button>
    
            <nav className="p-4 ">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button 
                   key={item.id}
                   onClick={()=> {
                    setActivePage(item.id)
                    navigate(item.id)
                   }
                   }
    
                   className={`
                    flex items-center w-full p-3 rounded-lg
                    transition-colors duration-200
                    ${activePage === item.id 
                      ? 'bg-slate-700 text-white' 
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }
                  `}>
                     <Icon size={20} />
                    {expanded && (
                      <span className="ml-4 text-sm font-medium">{item.label}</span>
                    )}
                  </button> 
                );
              })}
            </nav>
            {/* Bottom Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
              <button onClick={handleronclick} className="flex items-center w-full p-3 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors duration-200" >
                <LogOut size={20} />
                {expanded && (
                  <span className="ml-4 text-sm font-medium">Logout</span>
                )}
              </button>
            </div>
          </div>
        </div>
      );
}

export default Userpanel