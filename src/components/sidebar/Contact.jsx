import { useDispatch, useSelector } from "react-redux";
import { create_open_Conversations } from "../../features/ChatSlice";
import { capitalize } from "../../utils/chat";
import SocketContext from "../../context/SocketContext";
function Contact({contact,setSearchResults,socket}){
    const dispatch=useDispatch();
    const {user}=useSelector((state)=>state.user);
    const {token}=user;
    const values={
      receiver_id: contact._id,
      token,
    }
    const openConversation=async()=>{
     let newConvo= await dispatch(create_open_Conversations(values))
       socket.emit('join conversation',newConvo.payload._id)
       
  }
    return <li 
     onClick={()=>openConversation()}
     className='list-none h-[72px] hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]'>
      <div className='flex items-center gap-x-3 py-[10px]'>
      <div className='flex items-center gap-x-3'>
          <div className='relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden'>
            <img src={contact.picture} alt={contact.name} className='w-full h-full object-cover'/>
          </div>
          <div className='w-full flex flex-col'>
            <h1 className='font-bold gap-x-2'>{capitalize(contact.name)}</h1>
            <div className='flex items-center gap-x-1 dark:text-dark_text_2'>
            <div className='flex-1 items-center gap-x-2 dark:text-dark_text_2'>
              <p>{contact.status}</p>
            </div>
          </div>
          </div>
         
        </div>
      </div>
      <div className='ml-16 border-b dark:border-b-dark_border_1'></div>
    </li>
  }
  
  
  const ContactWithContext=(props)=>(
  <SocketContext.Consumer>
    {(socket)=><Contact {...props} socket={socket}/>}
  </SocketContext.Consumer>
  )

  export default ContactWithContext