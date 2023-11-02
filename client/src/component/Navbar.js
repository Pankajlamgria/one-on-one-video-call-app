import React, { useContext, useEffect, useState } from 'react'
import "../css/navbar.css"
import { useNavigate } from "react-router-dom";
import usericon from "../image/user.png";
import videocontext from '../context/Videocontext';
const Navbar = () => {
  const contextcontent=useContext(videocontext);
  const [showdetail,setshowdetail]=useState(false);
  const [flag,setflag]=useState(true);
  const localstoragetoken=localStorage.getItem("videotoken");
  const navigate=useNavigate();
  const handleShowUserDetial=()=>{
    (showdetail)?setshowdetail(false):setshowdetail(true);
    if(contextcontent.userdetail.length===0){
          contextcontent.getUserDetail();
    }
  }
    const toogleSignin=()=>{
      if(flag){
        navigate('/signin');
        setflag(false);
      }
      else{
        navigate('/');
        setflag(true); 
      }
    }
    const handleshowhome=()=>{
      setflag(true);
      navigate('/');
    }
  const handleLogout=()=>{
    localStorage.removeItem("videotoken");
    window.location.reload(false);
  }
  return (
    <div>
    <div>
      <div className="HomeBar">
          <div className="Heading">
            <h2 id="appname" onClick={handleshowhome}>ViewMeet</h2>
          </div>
          <div className="loginButtonCover" style={{display:(localstoragetoken)?("none"):"block"}}>
            <button style={{display:(flag)?"block":"none"}} onClick={toogleSignin}>Signin</button>
            <button style={{display:(flag)?"none":"block"}} onClick={toogleSignin}>X</button>
          </div>
          <div className='loginButtonCover' style={{display:(localstoragetoken)?("block"):"none"}}>
            <button onClick={handleShowUserDetial}><img className='usericonStyle'  src={usericon} alt="usericon"/>
            </button>
          </div>
        </div>
        <div id='usedetailcard' style={{display:(showdetail)?"flex":"none"}}>
            <p>{contextcontent.userdetail.username}</p>
            <p>{contextcontent.userdetail.email}</p>
            <div className='hrlineblack'></div>
            <p id="logout" onClick={handleLogout}>Log Out</p>
        </div>      
    </div>
    </div>
  )
}

export default Navbar
