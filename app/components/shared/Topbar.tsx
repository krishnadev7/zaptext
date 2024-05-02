import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Topbar() {
  return (
    <nav className='topbar'>
      <Link href="/" className='flex items-center gap-4'>
        <Image src="/assets/logo.svg" alt='logo' width={28} height={28}/>
        <p className='text-light-1 text-heading3-bold max-xs:hidden'>Zaptext</p>
      </Link>
    </nav>
  )
}

export default Topbar