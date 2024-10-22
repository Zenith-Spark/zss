import React from 'react'
import SideBar from './SideBar/SideBar'

const DashboardLayout = ({children}) => {
  return (
    <div>
      <div className="dashboard-layout">
      <header className='flex flex-col'>
      <SideBar/>
      </header>
      <main>{children}</main>
    </div>
    </div>
  )
}

export default DashboardLayout