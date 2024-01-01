import React, { useState } from 'react'
import Ringtone from './Ringtone'
import Header from './Header';
import CallArea from './CallArea';
import CallActions from './CallActions';
function Call({call,setCall,callAccepted,userVideo,myVideo,answerCall,stream}) {
  const {receivingCall,callEnded,name,picture}=call;
  const [showActions,setShowActions]=useState(false);

  return (
    <>
        <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg ${receivingCall && !callAccepted? "hidden":""}`}
    onMouseOver={()=>setShowActions(true)}
    onMouseOut={()=>setShowActions(false)}>
    {/* Container */}
    <div>
    <div>
        <Header/>
        <CallArea/>
        {
            showActions &&  <CallActions/>
        }
       
    </div>
    {/* Video Streams */}
    <div>
        {/* user video */}
        <div>
        {callAccepted && !callEnded ? (
            <video ref={userVideo} plays Inline muted autoPlay className='largeVideoCall'></video>
        ): null}
           
        </div>
        {/* my video */}
       {stream &&  <div>
            <video ref={myVideo} playsInline muted autoPlay className={`SmallVideoCall ${showActions?'moveVideoCall':''}`}></video>
        </div>}
    </div>
    </div>
   
   

    </div>
    {
        receivingCall && !callAccepted && (
            <Ringtone call={call} setCall={setCall} answerCall={answerCall}/>
        )
    }
    </>
    
  )
}

export default Call