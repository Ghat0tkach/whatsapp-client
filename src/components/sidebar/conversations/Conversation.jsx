import React from 'react'
import { useSelector } from 'react-redux'
import NewConversation from './NewConversation'
import { getConversationId } from '../../../utils/chat'

function Conversation({onlineUsers,typing}) {
    const {conversations,activeConversation}=useSelector((state)=>state.chat)
    const {user}=useSelector((state)=>state.user)
    return (
    <div className='convos scrollbar'>
    <ul>
    {
        conversations && conversations.filter((c)=>c.latestMessage || c._id===activeConversation._id || c.isGroup===true)
        .map((convo)=>{
          let check=onlineUsers.find(
            (u)=>u.userId===getConversationId(user,convo.users)
          );
          return <NewConversation convo={convo} key={convo._id} online={check?true:false} typing={typing}/>
        }
          
       
    
  
    )
    }
    </ul>
   
  

    </div>
  )
}

export default Conversation