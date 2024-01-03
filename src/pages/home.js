import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../components/sidebar";
import { useEffect, useRef, useState } from "react";
import { UpdateMessages, getConversations } from "../features/ChatSlice";
import WhatsappHome from "../components/chat/Welcome/WhatsappHome";
import ChatContainer from "../components/chat/ChatContainer";
import SocketContext from "../context/SocketContext";
import Call from "../components/chat/call/Call";
import { getConversationId, getConversationName, getConversationPicture } from "../utils/chat";
import Peer from "simple-peer";
const callData={
  socketId:"",
  receivingCall:false,
  callEnded:false,
  name:'',
  picture:'',
}
  function Home({socket}) {

  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.user);
  const {activeConversation}=useSelector((state)=>state.chat)
  const [onlineUsers,setOnlineUsers]=useState([]);
  const [typing,SetTyping]=useState(false);
  // call
  const [call,setCall,name,picture]=useState(callData);
  const [totalSecInCall,setTotalSecInCall]=useState(0);
  const [stream,setStream]=useState(callData);
  const {receivingCall,callEnded,socketId}=call;
  const [callAccepted, setCallAccepted]=useState(false);
  const [show,setShow]=useState(false);
  const myVideo=useRef();
  const userVideo=useRef();
  const connectionRef=useRef();
  // // Join user into socket io
  useEffect(()=>{
    socket.emit("join",user._id);
    //get online users
    socket.on("get-online-users",(users)=>{
      
      setOnlineUsers(users);
      console.log("online users",onlineUsers);
    })
  },[user])
// call
useEffect(()=>{
  setupMedia();
  socket.on("setup socket",(id)=>{
    setCall({...call,socketId:id})
  });
  socket.on('call user',(data)=>{
    setCall({...call,socketId:data.from,name:data.name,picture:data.picture,signal:data.signal,receivingCall:true})
  })

  socket.on('end call',()=>{
  setShow(false);
  setCall({...call,callEnded:true,receivingCall:false})
  myVideo.current.srcObject=null;
  connectionRef?.current?.destroy();

 
  })
},[]);
// call user
const callUser=()=>{
  enableMedia();
  setCall({...call,name:getConversationName(user,activeConversation.users),picture:getConversationPicture(user,activeConversation.users)})
  const peer=new Peer({
    initiator:true,
    trickle:false,
    stream:stream,
  });
  peer.on('signal',(data)=>{
    socket.emit('call user',{
      userToCall:getConversationId(user,activeConversation.users),
      signal:data,
      from:socketId,
      name:user.name,
      picture:user.picture,
    });
  });
  peer.on("stream",(stream)=>{
    userVideo.current.srcObject=stream;
  });
  socket.on("call accepted",(signal)=>{
    setCallAccepted(true);
    peer.signal(signal);
  })
  connectionRef.current=peer;
}
// answer call function
const answerCall=()=>{
  enableMedia();
  setCallAccepted(true);
  const peer=new Peer({
    initiator:false,
    trickle:false,
    stream:stream
  });
  peer.on('signal',(data)=>{
    socket.emit('answer call',{signal:data,to:call.socketId});
  });
  peer.on('stream',(stream)=>{
    userVideo.current.srcObject=stream;
  })
  peer.signal(call.signal);
  connectionRef.current=peer;
}
// end call
const endCall=()=>{
  setShow(false);
  setCall({...call,callEnded:true})
  socket.emit('end call',call.socketId)
  myVideo.current.srcObject=null;
  connectionRef?.current?.destroy();
}


const setupMedia= ()=>{
  navigator.mediaDevices.getUserMedia({video:true,audio:true})
  .then((stream)=>{
    setStream(stream);
    // myVideo.current.srcObject=stream;
  })

}
const enableMedia=()=>{
  myVideo.current.srcObject=stream;
  setShow(true);
}
  //getConversations
  useEffect(()=>{
    if(user?.token){
      dispatch(getConversations(user.token))
    }
  },[user])  ;                       
//listening to receive message

useEffect(() => {
  socket.on("ReceiveMsg", (message) => {
   
    dispatch(UpdateMessages(message));
  });
  socket.on("typing", (conversation) => {
   SetTyping(conversation);
 
  });
  socket.on("stop typing", (conversation) => {
    SetTyping(false);
  
  });
}, []);


  return <div className="h-screen  dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
  {/* Container */}
  <div className="container  h-screen flex pt-[19px] ">
    {/* Sidebar */}
    <Sidebar onlineUsers={onlineUsers} typing={typing}/>
    {
      activeConversation._id ? <ChatContainer onlineUsers={onlineUsers} typing={typing} callUser={callUser}/> : 
      <WhatsappHome/>
    }
    
  </div>
  <div className={(show || call.signal) && !call.callEnded ? "" : "hidden"}>
        <Call
          call={call}
          setCall={setCall}
          callAccepted={callAccepted}
          myVideo={myVideo}
          userVideo={userVideo}
          stream={stream}
          answerCall={answerCall}
          show={show}
          endCall={endCall}
          totalSecInCall={totalSecInCall}
          setTotalSecInCall={setTotalSecInCall}
        />
      </div>
  </div>;
}

const HomeWithSocket=(props)=>(
  <SocketContext.Consumer>
    {(socket)=><Home {...props} socket ={socket}/>}
  </SocketContext.Consumer>
)
  

export default HomeWithSocket