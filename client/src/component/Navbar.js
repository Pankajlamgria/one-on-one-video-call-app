import React, { useState } from 'react'
import "../css/navbar.css"
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [flag,setflag]=useState(true);
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
  return (
    <div>
      <div className="HomeBar">
          <div className="Heading">
            <h2>Welcome to the video calling application</h2>
          </div>
          <div className="loginButtonCover" >
            <button style={{display:(flag)?"block":"none"}} onClick={toogleSignin}>Signin</button>
            <button style={{display:(flag)?"none":"block"}} onClick={toogleSignin}>X</button>
          </div>
        </div>
    </div>
  )
}

export default Navbar
