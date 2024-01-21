import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DotsIcon,ChatIcon,   StoryIcon ,CommunityIcon} from '../.././svg';
import Menu from '../Menu';
import { CreateGroup} from './createGroups'

function SidebarHeader() {
    const {user}=useSelector((state)=>state.user);
    const [showMenu,setShowMenu]=useState(false);
    const [showGroup,setShowGroup]=useState(false);
    useEffect(() => {
      console.log('showGroup:', showGroup);
  }, [showGroup]);

  return (
    <>
       <div className='h-[50px] dark:bg-dark_bg_2 flex items-center p16'>
        {/* Container */}
        <div className='w-full flex items-center justify-between   '>
            {/* user image */}
            <button className='btn'>
                <img src={user.picture} alt={user.name} 
                 className='w-full h-full rounded-full object-cover'

                />
            </button>
            {/* user icons */}
          <ul className='flex items-center gap-x-2 5'>
          <li>
            <button className='btn' onClick={()=>setShowGroup(true)}>
                <CommunityIcon className='dark:fill-dark_svg_1'/>

             </button>
          </li>
          <li>
            <button className='btn'>
                <StoryIcon className='dark:fill-dark_svg_1'/>

             </button>
          </li>
          <li>
            <button className='btn'>
                <ChatIcon className='dark:fill-dark_svg_1'/>

             </button>
          </li>
          <li className='relative' onClick={()=>setShowMenu((prev)=>!prev)}> 
            <button className={`btn ${showMenu?'bg-dark_hover_1':''}`}>
                <DotsIcon className='dark:fill-dark_svg_1'/>

             </button>
             {
            showMenu? <Menu setShowGroup={setShowGroup}/>:null
          }
          </li>
       

          </ul>
        </div>
    </div>
   {/* Create Group */}
   {showGroup===true ? <CreateGroup setShowGroup={setShowGroup}/> :null}
    </>
   

  )
}

export default SidebarHeader