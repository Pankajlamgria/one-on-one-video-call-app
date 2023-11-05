import React, { useCallback, useContext, useEffect, useState } from 'react'
import "../css/roomform.css"
import videocontext from '../context/Videocontext'
import Usercard from "./Usercard.js";
import { useNavigate } from 'react-router-dom';
const Userinroom = () => {
  const navigate=useNavigate();
    const contextcontent=useContext(videocontext);
    const [flag,setflag]=useState(false);
    useEffect(()=>{
        contextcontent.roomuserlist(localStorage.getItem("roomJoined"));
    },[])
    const handleacceptcall=useCallback(async()=>{
      navigate(`/room/${localStorage.getItem("roomJoined")}/live`);
    },contextcontent.socket)


    const handleincommingcall=useCallback(async({from,offer})=>{
      setflag(true);
      await contextcontent.setincommingoffer(offer);
      localStorage.setItem("callfrom",from);
      // contextcontent.socket.emit("sendincomingtomeet",{to:from,offer});
      navigate(`/room/${localStorage.getItem("roomJoined")}/live`);
    },[contextcontent.socket])


    useEffect(()=>{
      contextcontent.socket.on('incomming:call',handleincommingcall);
      return ()=>{
        contextcontent.socket.off("incomming:call",handleincommingcall);
      }
    },[contextcontent.socket,handleincommingcall])

  return (
    <div>
       <div className='userlist'>
        <div className="buttonCover" style={{display:(flag)?"block":"none"}}>
          <button onClick={handleacceptcall}>Accept</button>
        </div>
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
