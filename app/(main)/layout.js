import React from 'react'
import Navbar from '../_components/Navbar'
import Footer from '../_components/Footer'

export default function Main_layout({children}) {
  return (
    <div className='grid grid-rows-[auto_1fr_auto] min-h-dvh'>
        <Navbar />
          {children}
        <Footer />
    </div>
  )
}
