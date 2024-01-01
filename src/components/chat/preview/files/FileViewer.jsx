import React from 'react'
import { useSelector } from 'react-redux'
function FileViewer({activeIndex}) {
    const {files}=useSelector(state=>state.chat)
    console.log(files[activeIndex].type)
  return (
    <div className='flex justify-center items-center'>
    {files[0].type==="image"?
    <img src={files[activeIndex].fileData} alt="" className='max-w-[80%] object-contain hview'/>
    :
    (files[0].type==="video"? 
    <video src={files[activeIndex].fileData} controls className='max-w-[80%] object-contain hview'></video> :
        <div className='min-h-full hview flex flex-col items-center justify-center'>
            <img src={`../../../../../images/file/${files[activeIndex].type}.png`} alt={files[activeIndex].type}/>
            <h1 className='dark:text-dark_text_2 text-2xl'>No Preview Available</h1>
            <span className='dark:text-dark_text_2'>
                {files[0]?.file?.size} Kb- {files[0]?.type}
            </span>
        </div>
    
    )
    }
    </div>
  )
}

export default FileViewer