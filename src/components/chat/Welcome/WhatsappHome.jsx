import React from 'react'
import { Logo } from '../../../svg'

function WhatsappHome() {
  return (
    <div className='h-full w-full dark:bg-dark_bg_4 select-none border-l dark:border-l-dark_border_2 border-b-[6px] border-b-green_1'>
       {/* Container */}
       <div className='-mt-1.5 w-full h-full flex flex-col gap-y-8 items-center justify-center'>
        <span>
            <Logo/>
        </span>
        {/* Infos */}
        <h1 className='text-[32px] dark:text-dark_text_4 font-extralight'>Whatsapp Web</h1>
        <p className='text-sm dark:text-dark_text_3'>
            Send and Receive messages without keeping your phone online<br/>
            Use Whatsapp on upto 4 linked devices and 1 phone at the same time
        </p>

       </div>



    </div>
  )
}

export default WhatsappHome