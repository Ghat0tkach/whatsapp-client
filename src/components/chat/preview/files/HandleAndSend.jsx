import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddFile from './AddFile'
import { CloseIcon, SendIcon } from '../../../../svg'
import { uploadfiles } from '../../../../utils/upload'
import { removeFileFromFiles, sendMessages } from '../../../../features/ChatSlice'
import SocketContext from '../../../../context/SocketContext'
import Conversation from '../../../sidebar/conversations/Conversation'
import { ClipLoader } from 'react-spinners'

function HandleAndSend({activeIndex,setActiveIndex,message,socket}) {
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(false);
    const {files,activeConversation}=useSelector(state=>state.chat)
    const {user}=useSelector(state=>state.user)
    const {token}=user
    const handleRemoveFile=(index)=>{
         dispatch(removeFileFromFiles(index))
    }
    const sendMessageHandler=async(e)=>{
        e.preventDefault();
        setLoading(true);
        console.log(files,message)
        const uploaded_files=await uploadfiles(files);
        const values={
            token,
            message,
            convo_id: activeConversation._id,
            files:uploaded_files.length>0 ? uploaded_files:[],
        };
        let newMsg= await dispatch(sendMessages(values));
        socket.emit('send message',newMsg.payload)
        setLoading(false)
        console.log(uploaded_files)
    }
  return (
    <div className='w-[97%] flex items-center justify-between mt-2 border-t dark:border-dark_border_2'>
        <span></span>
            {/* list files */}
            <div className='flex items-center gap-x-2'>
                {
                    files.map((file,i)=>(
                        <div key={i}
                        className={`fileThumbnail relative w-14 h-14 border dark:border-white mt-2 rounded-md overflow-hidden cursor-pointer
                        ${activeIndex===i ? "border-[3px] border-green_1":""}
                        `}
                        onClick={()=>setActiveIndex(i)}
                        >
                            {
                                file.type==="image"? <img src={file.fileData} alt="" className='w-full h-full mt-2 object-cover'/>:
                                files[0].type==="video"? 
                               <video src={files[activeIndex].fileData}  className='w-full h-full mt-2 object-cover'></video> :
                                <img src={`../../../../images/file/${file.type}.png`} alt=''/>
                            }

                            {/* Remove file icon */}
                            <div className='removeFileIcon hidden ' onClick={()=>handleRemoveFile(i)}>
                            <CloseIcon className={"dark:fill-dark_svg_1 absolute right-0 top-0 w-4 h-4"}/>

                            </div>
                        </div>
                    ))
                }
                {/* Add another file */}
                <AddFile setActiveIndex={setActiveIndex}/>
            </div>
            {/* Send Button */}
            <div className='bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer' onClick={sendMessageHandler}>
            {loading? (<ClipLoader color='#E9EDEF' size={25}/>
            ) : <SendIcon className="fill-white"/>
            }
                
            </div>
        
    </div>
  )
}



const HandleAndSendWithContext=(props)=>(
    <SocketContext.Consumer>
        {(socket)=> <HandleAndSend {...props} socket={socket} />}
    </SocketContext.Consumer>
)
export default HandleAndSendWithContext