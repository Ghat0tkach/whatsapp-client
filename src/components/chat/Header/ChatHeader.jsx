import React from 'react'
import { useSelector } from 'react-redux'
import {CallIcon, DotsIcon, SearchLargeIcon, VideoCallIcon} from "../../../svg"
import { capitalize, getConversationName, getConversationPicture } from '../../../utils/chat';

function ChatHeader({online,callUser}) {
    const {activeConversation}=useSelector((state)=>state.chat);
    const {user}=useSelector((state=>state.user))
    const {name,picture,users}=activeConversation;
    const Displayname=(getConversationName(user,users));
    console.log(Displayname)
  return (
    <div className='h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none'>
        <div className='w-full flex items-center justify-between'>
        <div className='flex items-center gap-x-4'>
        <button className='btn'>
        <img src={activeConversation.isGroup?activeConversation.picture:getConversationPicture(user,activeConversation.users)} alt={`${name}'s dp`} className='h-full w-full rounded-full'/>
 
        </button>
        <div className='flex flex-col'>
            <h1 className='dark:text-white text-md font-bold'>{activeConversation.isGroup?activeConversation.name: capitalize(Displayname.split(" ")[0])}</h1>
            <span className='text-xs dark:text-dark_svg_2'>{online? "online":""}</span>
        </div>
       
        </div>
        <ul className='flex items-center gap-x-2.5'>
        
        {online?
            <li >
            <button className='btn' onClick={()=>callUser()}>
                <VideoCallIcon className="dark:fill-dark_svg_1"/>
            </button>
            </li>
            :null
        }
           
       
        <li>
            <button className='btn'>
                <CallIcon className="dark:fill-dark_svg_1"/>
            </button>
        </li>
        <li>
            <button className='btn'>
                <SearchLargeIcon className="dark:fill-dark_svg_1"/>
            </button>
        </li> 
        <li>
            <button className='btn'>
                <DotsIcon className="dark:fill-dark_svg_1"/>
            </button>
        </li> 

        </ul>
        </div>
      
    </div>
  )
}

export default ChatHeader