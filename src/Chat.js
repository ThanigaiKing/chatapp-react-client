
import React,{useState,useEffect} from 'react'
import './chat.css'

function Chat({socket,username,room}) {
  const [currentMessage,setCurrentMessage]=useState("");
  const [messagelist,setMessagelist]=useState([]);

  const sendmessage=async ()=>{
    if(currentMessage !== ""){
      const messageData={
        room:room,
        author:username,
        message:currentMessage,
        time:new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }
      await socket.emit("send_message",messageData);
      setMessagelist((list)=>[...list,messageData])
      setCurrentMessage("");
    }
  }
  useEffect(()=>{
    socket.on("receive_message",(data)=>{
      setMessagelist((list)=>[...list,data])
    })
  },[socket]);        //when changes happen in [socket] useEffect will render
  return (
    <div className="chat-window">
        <div className="chat-header">Live Chat</div>
        <div className="chat-body">
          {/* <ScrollToBottom className="class-container"> */}
          {messagelist.map((messagecontent)=>{
          return (<div className="message" id={username === messagecontent.author ? "you" : "other"}>
                  <div className="message-box">
                    <div className="message-content"><p>{messagecontent.message}</p></div>
                    <div className="message-sub">
                      <p className="message-userdetail">{messagecontent.time}</p>
                      <p className="message-userdetail">{messagecontent.author}</p>
                    </div>
                  </div>
                </div>)
        })}
        {/* </ScrollToBottom> */}
        </div>
        <div className="chat-footer">
          <input type="text" 
          value={currentMessage}
          onChange={(event)=>{setCurrentMessage(event.target.value)}} 
          placeholder="Enter the message"/>
          <button classname="chat-button" onClick={sendmessage}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chat