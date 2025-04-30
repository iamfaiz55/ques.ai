import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router'

const FirstLayout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default FirstLayout
