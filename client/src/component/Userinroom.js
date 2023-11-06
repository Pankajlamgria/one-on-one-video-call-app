import React, { useCallback, useContext, useEffect, useState } from 'react'
import "../css/roomform.css"
import videocontext from '../context/Videocontext'
import Usercard from "./Usercard.js";
import { useNavigate } from 'react-router-dom';
import refresh from "../image/refresh.png";
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

    const handleSetnewsocketid=(data)=>{
      if(localStorage.getItem("roomJoined")){
        contextcontent.edituserdetail(localStorage.getItem("roomJoined"),data.id);
        contextcontent.roomuserlist(localStorage.getItem("roomJoined"));
      }
      else{
        contextcontent.edituserdetail("",data.id);
      }
    }
    contextcontent.socket.on('newsocket',handleSetnewsocketid);
    
    const handleremoveRoom=()=>{
      contextcontent.edituserdetail("","");
      console.log("socket,room removed from userdetials");
    }
    contextcontent.socket.on("removeRoom",handleremoveRoom);
    
    const handleincommingcall=useCallback(async({from,offer,callfromemail})=>{
      setflag(true);
      console.log("incomming call email:",callfromemail);
      localStorage.setItem("callfromemail",callfromemail);
      await contextcontent.setincommingoffer(offer);
      localStorage.setItem("callfrom",from);
      navigate(`/room/${localStorage.getItem("roomJoined")}/live`);
    },[contextcontent.socket])


    useEffect(()=>{
      contextcontent.socket.on('incomming:call',handleincommingcall);
      return ()=>{
        contextcontent.socket.off("incomming:call",handleincommingcall);
      }
    },[contextcontent.socket,handleincommingcall])

    const handlerefreshuserlist=()=>{
      contextcontent.roomuserlist(localStorage.getItem('roomJoined'));
    } 
  return (
    <div>
       <div className='userlist'>
        <div className="buttonCover" style={{display:(flag)?"block":"none"}}>
          <button onClick={handleacceptcall}>Accept</button>
        </div>
        <div className='userroomheadingcover'>
          <h2 id="userlistheading">Users in room:{localStorage.getItem("roomJoined")}</h2>
          <button><img id='refreshbtn' onClick={handlerefreshuserlist} src={refresh} /></button>
        </div>
        <div className='historySec'>
        {contextcontent.userlist.map((user)=>{
          return <Usercard key={user._id} user={user}></Usercard>
        })}
      </div>
    </div>
    </div>
  )
}

export default Userinroom
