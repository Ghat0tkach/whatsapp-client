import React, { useEffect } from 'react'
import ChatHeader from './Header/ChatHeader'
import ChatMessages from './messages/ChatMessages'
import { useDispatch, useSelector } from 'react-redux'
import { getConversationsMessages } from '../../features/ChatSlice';
import ChatAction from './actions/ChatAction';
import { getConversationId } from '../../utils/chat';
import FilePreview from './preview/files/FilePreview';
function ChatContainer({onlineUsers,typing,callUser}) {
  const dispatch=useDispatch();
   const {activeConversation,files}=useSelector((state)=>state.chat);
   console.log(files)
   const {user}=useSelector((state)=>state.user)
   const{token}=user;
   const values={
    token,
    convo_id:activeConversation?._id,
   }

   useEffect(() => {
   
    if (activeConversation?._id) {
  
        dispatch(getConversationsMessages(values));
    }
}, [activeConversation]);

  
     return (

    <div className='relative w-full h-[104%] border-l dark:border-l-dark_border_2 select-none overflow-hidden'>
      <div>
        {/* Header */}
        <ChatHeader callUser={callUser} online={activeConversation.isGroup? false: onlineUsers.find((u)=>u.userId===getConversationId(user,activeConversation.users)?true:false)}/>
        {files.length>0 ? <FilePreview/>:
        <>
        <ChatMessages typing={typing}/>
        <ChatAction/>
        </>}
       
      </div>
    </div>
  )
}

export default ChatContainer