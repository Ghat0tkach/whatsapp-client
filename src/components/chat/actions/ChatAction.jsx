import React, { useRef, useState } from 'react'
import Attachments from './attachments/Attachments'
import Input from './Input'
import { SendIcon } from '../../../svg'
import { sendMessages } from '../../../features/ChatSlice'
import { useDispatch, useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import EmojiPickerApp from './EmojiPicker'
import { set } from 'react-hook-form'
import SocketContext from '../../../context/SocketContext'

function ChatAction({socket}) {
    const [message,setMessage]=useState("");
    const [showPicker,setShowPicker]=useState(false);
    const [showAttachment,setShowAttachment]=useState(false);
    const [loading,setLoading]=useState(false);
    const dispatch=useDispatch();
    const {activeConversation,status}=useSelector((state)=>state.chat)
    const {user}=useSelector((state)=>state.user)
    const {token}=user;
    const textRef=useRef();
    const values={
        message,
        convo_id:activeConversation?._id,
        files:[],
        token,

    }
    const sendMessageHandler=async(e)=>{
        e.preventDefault(); 
        setLoading(true);
        if(message===""){
            setLoading(false);
            return
        }
        else{
            let newMsg=await dispatch(sendMessages(values))
            socket.emit('send message',newMsg.payload)
            setMessage("");
            setLoading(false);
        }
     
    }
  return (
    <form className='dark:bg-dark_bg_2 h-[60px] bottom-[13px] w-full flex items-center absolute py-2 select-none'
    onSubmit={sendMessageHandler}
    >
        {/* Container */}
        <div className='w-full items-center flex gap-x-2'>
            {/*Emojies and attachment  */}
            <ul className='flex gap-x-2'>
            <EmojiPickerApp textRef={textRef} message={message} setMessage={setMessage} showPicker={showPicker} setShowPicker={setShowPicker} setShowAttachment={setShowAttachment}/>
            <Attachments showAttachment={showAttachment} setShowAttachment={setShowAttachment} setShowPicker={setShowPicker}/>
              
            </ul>
            <Input message={message} setMessage={setMessage} textRef={textRef} socket={socket}
            />

            <button className='btn'>
            {
                status==="loading" && loading?<ClipLoader color="#E9EDEF" size={35}/>:
                <SendIcon className={"dark:fill-dark_svg_2"}/>
            }
               
            </button>
        </div>
    </form>
  )
}

const ChatActionContext=(props)=>(
    <SocketContext.Consumer>
      {(socket)=><ChatAction {...props} socket={socket}/>}
    </SocketContext.Consumer>
    )
  
 export default ChatActionContext
