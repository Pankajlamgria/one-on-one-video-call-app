import React from 'react'
import { useNavigate } from 'react-router-dom'

const Usercard = (props) => {
    const navigate=useNavigate();
    const handlecall=()=>{
      localStorage.setItem("callto",props.user.socketId);
        navigate(`/room/${localStorage.getItem("roomJoined")}/live`);
    }
  return (
    <div className='Calls usercard'>
      <h3>{props.user.username}</h3>
        <h3>{props.user.email}</h3>
      <h3>{props.user.socketId}</h3>
    <div>
        <div className='buttonCover'>
            <button onClick={handlecall}>Call</button>
        </div>
    </div>
    </div>
  )
}

export default Usercard
