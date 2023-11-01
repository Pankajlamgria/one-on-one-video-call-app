import React, { useContext, useState } from "react";
import "../css/login.css";
import camera from "../image/camera.png";
import hi from "../image/hi.png";
import videocontext from "../context/Videocontext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const contextcontent=useContext(videocontext);
  const navigate=useNavigate();
  const host="http://localhost:4000";
  const [create, setcreate] = useState(true);
  const [logindetial,setlogindetail]=useState({email:"",password:""});
  const [signindetail,setsignindetail]=useState({username:"",email:"",password:""});
  const handlelongindetailchange=(e)=>{
    setlogindetail({...logindetial,[e.target.name]:e.target.value});
  }
  const handleSigninDetailChange=(e)=>{
    setsignindetail({...signindetail,[e.target.name]:e.target.value});
  }
  const handleLogin=async(e)=>{
    e.preventDefault();
    // console.log(logindetial);
    const response=await fetch(`${host}/api/auth/login`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({email:logindetial.email,password:logindetial.password}),
    });
    const logninres=await response.json();
    if(logninres.success){
      localStorage.setItem('videotoken',logninres.authtoken);
      navigate('/');
      window.location.reload(false);
    }
    else{
      alert(logninres.error);
    }
  }
  const handleSignin=async(e)=>{
    e.preventDefault();
    const response=await fetch(`${host}/api/auth/signin`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({username:signindetail.username,email:signindetail.email,password:signindetail.password})
    });
    const signinres=await response.json();
    if(signinres.success){
      localStorage.setItem('videotoken',signinres.authtoken);
      navigate('/');
      window.location.reload(false);
      alert("Signin Successfull");
    }
    else{
      alert(signinres.error);
    }
  }


  const handletoogleform=(e)=>{
    if(create) setcreate(false);
    else setcreate(true);
  }
  return (
    <div>
      <div className="loginCover">
        <div className="subcover">
          <div className="loginHeading">
            <div style={{ display: create ? "block" : "none" }}>
              <h2>
                Crete New Account
                <img id="cameraicon" src={camera} alt="camera" />
              </h2>
              <p onClick={handletoogleform}>Already have an account</p>
              
            </div>
            <div style={{ display: create ? "none" : "block" }}>
              <h2 id="LoginName">Login <img id="cameraicon" src={hi} alt="hi" /></h2>
              
              <p onClick={handletoogleform}>Create new account</p>
            </div>
          </div>
          <div className="loginContent">
          <form id="loginForm" style={{ display: create ? "none" : "block" }}>
              <div className="inputcover">
                <label className="formlabel" htmlFor="loginemail">
                  Email
                </label>
                <input type="email" className="" id="loginemail" name="email" onChange={handlelongindetailchange} />
              </div>
              <div className="inputcover">
                <label className="formlabel" htmlFor="loginpassword">
                  Password
                </label>
                <input type="password" className="" id="loginpassword" name="password" onChange={handlelongindetailchange}/>
              </div>
              <div className="buttonCover">
                <button onClick={handleLogin}>Login</button>
              </div>
            </form>


            <form id="signinForm"  style={{ display: create ? "block" : "none" }}>
              <div className="inputcover">
                <label className="formlabel" htmlFor="username">
                  Username
                </label>
                <input type="text" className="" id="username" name="username" onChange={handleSigninDetailChange} />
              </div>
              <div className="inputcover">
                <label className="formlabel" htmlFor="email">
                  Email
                </label>
                <input type="email" className="" id="email" name="email" onChange={handleSigninDetailChange}/>
              </div>
              <div className="inputcover">
                <label className="formlabel" htmlFor="password">
                  Password
                </label>
                <input type="password" className="" id="password" name="password" onChange={handleSigninDetailChange}/>
              </div>
              <div className="buttonCover">
                <button onClick={handleSignin}>Signin</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
