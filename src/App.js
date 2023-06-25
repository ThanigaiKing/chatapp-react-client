import io from 'socket.io-client'
import {useState} from 'react'
import Chat from './Chat'
import './App.css'

const socket=io.connect("http://localhost:3001");

function App() {
  const [username,setUsername]=useState("");
  const [room,setRoom]=useState("");
  const [showchat,setShowchat]=useState(false);
  // console.log(room);
  const joinRoom=()=>{
       if(username !== "" && room !== ""){
        socket.emit("join_room",room)  //send join_room to match with socket and send room data
        setShowchat(true);
       }
  }
  return (
    <div className="App">
      { !showchat ?
      ( <div className="home-container-outer" >
       <div className="home-center">
        <h3 className="Bolder">Join A Chat</h3>
        <input className="home-input" type="text"
          placeholder="Enter your Name"
          onChange={(event) => { setUsername(event.target.value); } } 
        /><br/><br/>

          <input className="home-input" type="text" 
          placeholder="Enter the Room Id" 
          onChange={(event) => setRoom(event.target.value)} 
          /><br/><br/>

          <button className="home-button" onClick={joinRoom}>Join A Room</button>
          </div>
          </div>)
      :
       (<div className="home-center">
       <Chat socket={socket} username={username} room={room}/>
       </div>
      )}
      </div>
  )
}

export default App;
