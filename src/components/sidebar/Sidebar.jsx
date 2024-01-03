import React from 'react'
import SidebarHeader from './SidebarHeader'
import Notifications from './Notifications'
import SidebarSearch from './SidebarSearch'
import { useState } from 'react';
import Conversation from './conversations/Conversation';
import SearchList from './SearchList';


function Sidebar({onlineUsers,typing}) {
    const [searchResults,setSearchResults]=useState([]);

  return (
    <div className='flex0030 w-[30%] h-full select-none'>
        {/* Sidebar Header */}
        <SidebarHeader/>
        <Notifications/>
        {/* search */}
        <SidebarSearch searchLength={searchResults.length} setSearchResults={setSearchResults}/>
        {
          searchResults.length>0 ?(

            < ><SearchList searchResults={searchResults} setSearchResults={setSearchResults}/>
            </>
           
          
        
          ):
          <Conversation onlineUsers={onlineUsers} typing={typing}/>
        }
        {/* Conversations */}
      
    </div>
  )
}

export default Sidebar