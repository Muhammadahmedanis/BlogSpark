import React from 'react'
import Nvabar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <Nvabar />
        <div className='px-4 md:px-8 lg:px-16 lx:px-16 2xl:px-56 mt-4'>
      <Outlet />
    </div>
    </>
  )
}

export default Layout