import React from 'react'
import Navbar from '../_components/Navbar'
import Footer from '../_components/Footer'

export default function Main_layout({children}) {
  return (
    <div>

        <Navbar />
          {children}
        <Footer />
    </div>
  )
}
