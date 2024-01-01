import React from 'react'
import { AddContactIcon, ArrowIcon, LockIcon } from '../../../svg'

function Header() {
  return (
    <header className='absolute top-0 w-full z-40'>
        <div className='p-1 flex items-center justify-between'>
            {/* Return button */}
            <button className='btn'>
                <span className='rotate-180 scale-150'>
                    <ArrowIcon className={"fill-white"}/>
                </span>
            </button>
            {/* End to End encrypted text */}
            <p className='flex items-center'>
                <LockIcon className={"fill-white scale-75"}/>
                <span className='text-xs text-white'> End-To-End Encryted </span>
            </p>
            {/* Add Contact to Call */}
            <button className='btn'>
            <AddContactIcon className={"fill-white"}/>
            </button>
        </div>
    </header>
  )
}

export default Header