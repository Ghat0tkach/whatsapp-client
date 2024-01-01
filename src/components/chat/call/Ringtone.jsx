import React, { useEffect, useState } from 'react'
import {CloseIcon} from "../../../svg"
import {ValidIcon} from "../../../svg"
function Ringtone({call,setCall,answerCall}) {
const {receiveingCall,callEnded}=call;
const [timer,setTimer]=useState(0);
let interval;
const handleTimer=()=>{
 interval=setInterval(()=>{
    setTimer((prev)=>prev+1)
  },1000)
}
useEffect(()=>{
  if(timer<5){
     handleTimer();
  }else{
    setCall({...call,receivingCall:false})
  }
  return ()=>clearInterval(interval)
})
  return (
    <div className='dark:bg-dark_bg_1 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg z-30'>
      {/* Container */}
      <div className='p-4 flex items-center justify-between gap-x-8'>
      {/* call infos */}
      <div className='flex items-center gap-x-2'>
      <img src={call.picture}
        alt={`caller profile `}
        className='w-28 h-28 rounded-full'
        />
        <div>
        <h1 className='dark:text-white'>
        <b>{call.name}</b>
      </h1>
      <span className='dark:text-dark_text_2'>Whatsapp video..</span>
        </div>
        
      </div>
      {/* Call actions */}
      <ul className='flex items-center gap-x-2'>
        <li>
          <button className='w-8 h-8 flex items-center justify-center rounded-full bg-red-400'>
            <CloseIcon className="fill-white w-5"/>
          </button>
        </li>
        <li onClick={answerCall}>
          <button className='w-8 h-8 flex items-center justify-center rounded-full bg-blue-500'>
            <ValidIcon className="fill-white w-5 "/>
          </button>
        </li>
      </ul>
      </div>
      {/* Ringtone */}
      <audio src='../../../../audio/ringtone.mp3' ></audio>
      
    </div>
  )
}

export default Ringtone