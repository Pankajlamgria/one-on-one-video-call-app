import React, { useState } from 'react'
import "../css/navbar.css"
import { useNavigate } from "react-router-dom";
import usericon from "../image/user.png";
const Navbar = () => {
  const [flag,setflag]=useState(true);
  const localstoragetoken=localStorage.getItem("videotoken");
  const navigate=useNavigate();
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
      navigate('/');
    }
  return (
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
            <button><img className='usericonStyle'  src={usericon} alt="usericon"/>
            </button>
          </div>
        </div>
        {/* <div id='usedetailcard'>

        </div> */}      
    </div>
  )
}

export default Navbar
