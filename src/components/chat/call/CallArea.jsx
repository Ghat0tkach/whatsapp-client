import React from 'react'
import { capitalize, getConversationName } from '../../../utils/chat'
import { useSelector } from 'react-redux';
import CallTimer from './CallTimer';

function CallArea({totalSecInCall,setTotalSecInCall,callAccepted}) {
    const {activeConversation}=useSelector((state)=>state.chat);
    const {user}=useSelector((state=>state.user))
    const {name,picture,users}=activeConversation;
    console.log(activeConversation)

    const Displayname=(users && getConversationName(user,users));
    console.log(Displayname)
  return (
    <div className='absolute top-12 w-full p-1 z-40'>
        {/* Container */}
        <div className='fle flex-col items-center'>
            <div className='flex flex-col items-center gap-y-1'>
                <h1 className='text-white text-lg'>
                    <b>{Displayname? capitalize(Displayname):""}</b>
                </h1>
                 
                {totalSecInCall===0 ?(
                    <span className='text-dark_text_1'>Ringing...</span>
                ): null}
             <CallTimer setTotalSecInCall={setTotalSecInCall} totalSecInCall={totalSecInCall} callAccepted={callAccepted}/>
            </div>
        </div>
    </div>
  )
}

export default CallArea