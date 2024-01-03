import React from 'react'
import TraingleIcon from '../../../svg/Triangle'
import { BeatLoader } from 'react-spinners'

function Typing() {
  return (
    <div className={`w-full flex mt-2 space-x-3 max-w-xs `}>
    {/* Message container */}
    <div> 
        <div className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg dark:bg-dark_bg_2`}>
            {/* message */}
            <p className='float-left  text-sm pb-4 pr-8 '>
                <BeatLoader color='#ffff' size={10}/>
            </p>
           
            <span><TraingleIcon className={"dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5"}/> </span>
           
         
        </div>
    </div>
</div>
  )
}

export default Typing