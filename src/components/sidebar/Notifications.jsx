import React from 'react'
import { ArrowIcon, CloseIcon, NotificationIcon } from '../../svg'

function Notifications() {
  return (
    <div className='h-[90px] dark:bg-dark_bg_3 flex items-center p-[13px]'>
        {/* CONTAIINER */}
        <div className='w-full flex items-center justify-between'>
             {/* left side */}
             <div className='flex items-center gap-x-4'>
                <NotificationIcon className="dark:fill-blue_1 cursor-pointer"/>
                <div className='flex flex-col'>
                    <span className='textPrimary'>Get Notified of new messages</span>
                    <span className='textSecondary mt-0.5 flex items-center gap-0.5'>
                        Turn on Desktop Notifications
                        <ArrowIcon className="dark:fill-dark_svg_2 mt-1"/>
                    </span>
                </div>
             </div>
            
             {/* right side */}
             <div className='cursor-pointer'>
             <CloseIcon className="dark:fill-dark_svg_2"/>
             </div>
           
        </div>
    </div>
  )
}

export default Notifications