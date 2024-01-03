import React, { useState } from 'react'
import {CameraIcon, ContactIcon, DocumentIcon, PollIcon, StickerIcon} from "../../../../../svg"
import PhotoAttachment from './PhotoAttachment'
import DocumentAttachment from './DocumentAttachment'

function Menu() {
 
  return (
    <div type="button" className="absolute bottom-12 openEmojiAnimation">
    <ul>
    <li>
      <button className="rounded-full">
       <PollIcon/>
       </button>
    </li>
    <li>
      <button type="button" className="bg-[#0EABF4] rounded-full">
       <ContactIcon/>
       </button>
    </li>
     <DocumentAttachment/>
    <li>
      <button type="button" className="bg-[#D3396D] rounded-full">
       <CameraIcon/>
       </button>
    </li>
    <li>
      <button type="button" className="rounded-full">
       <StickerIcon
       />
       </button>
    </li>
   
    <PhotoAttachment/>
    </ul>
    </div>
  )
}

export default Menu