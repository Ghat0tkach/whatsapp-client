import React, { useState } from 'react'
import { AttachmentIcon } from '../../../../svg'
import Menu from './menu/Menu'

function Attachments({showAttachment,setShowAttachment,setShowPicker}) {
  return (
  <li className='relative'>
    <button type="button" className='btn' onClick={()=>{
      setShowPicker(false);
      setShowAttachment((prev)=>!prev)}}>
        <AttachmentIcon className="dark:fill-dark_svg_2"/>
    </button>
    
    {showAttachment? <Menu/> :null}
  </li>
  )
}

export default Attachments