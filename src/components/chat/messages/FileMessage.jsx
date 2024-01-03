import React from 'react'
import TraingleIcon from '../../../svg/Triangle'
import moment from 'moment'
import FileImageVideo from './files/FileImageVideo'
import FileOthers from './files/FileOthers'

function FileMessage({FileMessage,message,me}) {
    const {file,type}=FileMessage
    return (

        <div className={`w-full flex mt-2 space-x-3 max-w-xs ${me? "ml-auto justify-end":""}`}>
            {/* Message container */}
            <div> 
                <div className={`relative h-full dark:text-dark_text_1 p-1 rounded-lg ${me? "bg-green_3":"dark:bg-dark_bg_2"} 
                  ${me && file.public_id.split(".")[1]==="png"?
                  "bg-white":"bg-green_3 p-1"}
                `}
              
                >
                    {/* message */}
                    <p className='float-left h-full text-sm'>
                    {
                        type==="image" || type==="video"?
                        <FileImageVideo url={file.secure_url} type={type} />
                        :<FileOthers file={file} type={type}/>                    }</p>
                   {/* Message dates */}
                   <span className='absolute right-1.5 bottom-[5px] float-right text-xs pt-6 text-dark_text_5'> {moment(message.createdAt).format("HH:mm")}</span>
                 {!me?
                    <span><TraingleIcon className={"dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5 z-[-1]"}/> </span>:
                    <span><TraingleIcon fill="#005a4a "className={"rotate-[60deg] absolute top-[-5px] -right-1.5 z-[-1]"}/> </span>}
                 
                </div>
            </div>
        </div>
      )
    }
    
export default FileMessage