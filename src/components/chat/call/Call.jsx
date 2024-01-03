import React, { useState } from 'react'
import Ringtone from './Ringtone'
import Header from './Header';
import CallArea from './CallArea';
import CallActions from './CallActions';
function Call({call,setCall,callAccepted,userVideo,myVideo,answerCall,stream,show,endCall,totalSecInCall,setTotalSecInCall}) {
  const {receivingCall,callEnded,name,picture}=call;
  const [showActions,setShowActions]=useState(false);
  const [toggle,setToggle]=useState(false);

  return (
    <>
        <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg ${receivingCall && !callAccepted? "hidden":""}`}
    onMouseOver={()=>setShowActions(true)}
    onMouseOut={()=>setShowActions(false)}>
    {/* Container */}
    <div>
    <div>
        <Header/>
        <CallArea totalSecInCall={totalSecInCall} setTotalSecInCall={setTotalSecInCall} callAccepted={callAccepted}/>
        {
            showActions &&  <CallActions endCall={endCall}/>
        }
       
    </div>
    {/* Video Streams */}
    <div>
        {/* user video */}
        <div>
        {callAccepted && !callEnded ? (
            <video ref={userVideo} plays Inline muted autoPlay className={
                !toggle? 'largeVideoCall':'SmallVideoCall'
            }
            onClick={()=>setToggle(prev=>!prev)}
            ></video>
        ): null}
           
        </div>
        {/* my video */}
       {stream ?  <div>
            <video ref={myVideo} playsInline muted autoPlay className={`${toggle? 'largeVideoCall':'SmallVideoCall'} ${showActions?'moveVideoCall':''}`}
             onClick={()=>setToggle(prev=>!prev)}
            ></video>
        </div>:null}
    </div>
    </div>
   
   

    </div>
    {
        receivingCall && !callAccepted && (
            <Ringtone call={call} setCall={setCall} answerCall={answerCall}/>
        )
    }
    {/* Calling Ringtone */}
    {
        !callAccepted && show ? <audio src='../../../../audio/ringing.mp3' autoPlay loop></audio>:null
    }
    </>
    
  )
}

export default Call