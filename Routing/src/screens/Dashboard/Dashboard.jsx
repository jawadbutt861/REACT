import React from 'react'
import {useNavigate,Outlet } from 'react-router'

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>   
    <h1>Dashboard</h1>
    <button onClick={()=> navigate('/Dashboard/')}>Student</button>
    <button onClick={()=> navigate('/Dashboard/Manager')}>Manager</button>
    <button onClick={()=>navigate('/Dashboard/Settings')}>Settings</button>
    <button onClick={()=> navigate('/Dashboard/Campus')}>Campus</button>
    <Outlet/>
    </>
  )
}

export default Dashboard