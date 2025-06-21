import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../Components/Nav/Nav'
import Footer from '../Components/Footer/Footer'

const Layout = () => {
  return (
     <div>
      <Nav />
     <main className="flex flex-col min-h-screen bg-gray-200 text-gray-800">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout