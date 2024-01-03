import React from 'react'

function FileImageVideo({url,type}) {
  return (
    <div className='cursor-pointer mb-1'>
      {
        type==="image"?(
          <img src={url} alt="" />
        ):(
          <video src={url} controls ></video>
        )
  
      }
    </div>
  )
}

export default FileImageVideo