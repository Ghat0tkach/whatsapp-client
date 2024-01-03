import React from 'react'
import SidebarSearch from './SidebarSearch'
import { useDispatch, useSelector } from 'react-redux';
import { capitalize, getConversationId } from '../../utils/chat';
import { create_open_Conversations } from '../../features/ChatSlice';
import Contact from "./Contact";


function SearchList({searchResults,setSearchResults }) {
  console.log(searchResults)
  return (
    
    <div className='w-full convos scrollbar'>
    <div className='flex flex-col px-8 pt-8'>
    <h1 className='font-extralight text-nd text-green_2'>Contacts</h1>
  <span className='w-full mt-4 ml-10 border-b dark:border-b-dark_border_1'></span>
    </div>
  <ul>
    {
      searchResults && searchResults.map((user)=>(
        <Contact contact={user} key={user._id} setSearchResults={setSearchResults}/>
      ))
    }
  </ul>
   </div>
  )
}

export default SearchList