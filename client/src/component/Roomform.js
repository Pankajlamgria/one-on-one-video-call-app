import React, { useContext, useEffect, useState } from 'react'
import "../css/roomform.css";
import { useNavigate } from 'react-router-dom';
import videocontext from '../context/Videocontext';
const Roomform = () => {
  const contextcontent=useContext(videocontext);
  const navigate=useNavigate();
  const [room,setroom]=useState('');
  const handleroomchange=(e)=>{
    setroom(e.target.value);
  }
  const handlejoinroom=(e)=>{
    e.preventDefault();
    localStorage.setItem("roomJoined",room);
    const data={roomname:room};
    contextcontent.socket.emit("join-room",data);
  }
  const handleJoinRoomsocket=async(data)=>{
    localStorage.setItem("mysocketid",data.id);
    contextcontent.edituserdetail(room,data.id);
    navigate(`/room/${room}`); 
  }
  useEffect(()=>{
    contextcontent.socket.on("room:joined",handleJoinRoomsocket);
    return ()=>{
      contextcontent.socket.off("room:joined",handleJoinRoomsocket);
    };
  },[contextcontent.socket,handleJoinRoomsocket]);

  return (
    <div className='RoomCover'>
        <div className='roomFormcover'>
          <h1 id="appname">Join Room</h1> 
            <form>
                <div>
                    <label htmlFor='room'>Room Name : </label>
                    <input type='text' id='room' name="room" onChange={handleroomchange} />
                </div>
                <div className='buttonCover'>
                    <button onClick={handlejoinroom}>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Roomform
