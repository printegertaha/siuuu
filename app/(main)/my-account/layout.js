import PathLink from '@/app/_components/PathLink'
import React from 'react'

export default function MyAccountLayout ({children}) {
  return (
    <div>
        <PathLink />
        <main className=''>
            {children}
        </main>
    </div>
  )
}
