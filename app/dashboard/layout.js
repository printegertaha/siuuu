import Link from 'next/link'
import React from 'react'

export default function DashboardLayout({children}) {
  return (
    <>
    <nav className='flex justify-between gap-5 items-center p-5'>
        <Link href='/dashboard'>Dashboard</Link>

        <ul>
            <li><Link href='/dashboard/categories'>categories</Link></li>
        </ul>

        <button>log out</button>

    </nav>
        {children}
    </>
  )
}
