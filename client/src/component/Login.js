import React, { useState } from "react";
import "../css/login.css";
import camera from "../image/camera.png";
import hi from "../image/hi.png";
const Login = () => {
  const [create, setcreate] = useState(true);
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
                <label className="formlabel" for="email">
                  Email
                </label>
                <input type="email" className="" id="email" />
              </div>
              <div className="inputcover">
                <label className="formlabel" for="password">
                  Password
                </label>
                <input type="password" className="" id="password" />
              </div>
              <div className="buttonCover">
                <button>Login</button>
              </div>
            </form>


            <form id="signinForm"  style={{ display: create ? "block" : "none" }}>
              <div className="inputcover">
                <label className="formlabel" for="username">
                  Username
                </label>
                <input type="text" className="" id="username" />
              </div>
              <div className="inputcover">
                <label className="formlabel" for="email">
                  Email
                </label>
                <input type="email" className="" id="email" />
              </div>
              <div className="inputcover">
                <label className="formlabel" for="password">
                  Password
                </label>
                <input type="password" className="" id="password" />
              </div>
              <div className="buttonCover">
                <button>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
