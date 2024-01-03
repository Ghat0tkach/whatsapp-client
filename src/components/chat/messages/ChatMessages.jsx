import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Message from './Message'
import TraingleIcon from '../../../svg/Triangle'
import { BarLoader, BeatLoader } from 'react-spinners'
import Typing from './Typing'
import FileMessage from './FileMessage'

function ChatMessages({typing}) {
  const {messages,activeConversation,files}=useSelector((state)=>state.chat)
  const {user}=useSelector((state)=>state.user)
  const endRef=useRef();
  console.log(typing)
  useEffect(()=>{
    endRef.current.scrollIntoView({behavior:"smooth"})
  },[messages])
 
  return (
    <div className="mb-[60px] bg-cover h-[86vh] bg-no-repeat bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')]">
      <div className='scrollbar overflow_scrollbar overflow-auto py-2 px-[2%] '>
       { 
        messages && 
        messages.map((message)=>(
          <>
           {/* Message files */}
           {message.files.length>0? 
            message.files.map((file)=>
            <FileMessage FileMessage={file} message={message} key={message._id} me={user._id===message.sender._id}/>

            )
           :null}
           {/* Message Text */}
            {message.message.length>0? (
              <Message message={message} key={message._id} me={user._id===message.sender._id}/>
            ) : null}
          </>
       
      ))}
      {typing===activeConversation._id? <Typing/> : null}
      <div ref={endRef}></div>
      </div>
    </div>
  )
}


export default ChatMessages