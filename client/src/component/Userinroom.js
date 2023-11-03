import React, { useContext, useEffect } from 'react'
import "../css/roomform.css"
import videocontext from '../context/Videocontext'
import Usercard from "./Usercard.js";
const Userinroom = () => {
    const contextcontent=useContext(videocontext);
    useEffect(()=>{
        contextcontent.roomuserlist(localStorage.getItem("roomJoined"));
    },[])
  return (
    <div>
       <div className='userlist'>
        <h2 id="userlistheading">Users in room:{localStorage.getItem("roomJoined")}</h2>
        <div className='historySec'>
        {contextcontent.userlist.map((user)=>{
          return <Usercard key={user.id} user={user}></Usercard>
        })}
      </div>
    </div>
    </div>
  )
}

export default Userinroom
