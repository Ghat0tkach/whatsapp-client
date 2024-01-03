import React from 'react'
import { CloseIcon } from '../../../../svg'
import { useDispatch, useSelector } from 'react-redux'
import { clearFiles } from '../../../../features/ChatSlice';

function Header({activeIndex}) {
    const dispatch=useDispatch();
    const {files}=useSelector(state=>state.chat)
    const clearFilesHandler=()=>{
        dispatch(clearFiles())
    }
   
  return (
    <div className='w-full flex items-center justify-between'>
        {/* Close Icon / empty files */}
        <div className='cursor-pointer' onClick={clearFilesHandler}>
            <CloseIcon className={"dark:fill-dark_svg_1"}/>
        </div>
        <h1 className='dark:text-dark_text_1 text-[15px]'>{ files[activeIndex].file.name}
        <span></span>
        </h1>
    </div>
  )
}

export default Header