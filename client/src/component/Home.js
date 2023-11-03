import React from "react";
import "../css/home.css";
import createimg from "../image/editicon.png";
import createRoom from "../image/projectvideocall2img.png";
import schedule from "../image/schedule.png";
import clock from "../image/clock.png";
import historyimg from "../image/history.png";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate=useNavigate();
  const handleHistoryShow=()=>{
    navigate('/history');
  }
  const handletoschedule=()=>{
    navigate('/schedulemeating');
  }
  const handleJoinroom=()=>{
    if(localStorage.getItem("videotoken")){
      navigate('/room');
    }
    else{
      navigate('/signin');
    }
  }
  return (
    <div>
      <div className="homeCover">
        
        <div className="cardCover">
          <div className="Card createroomeCard" onClick={handleJoinroom}>
            <div className="cardHeading">
              <h3 className="cardHeadingText">Create/Join Meating</h3>
              <div className="cardHeadingimgcover">
                <img className="cardHeadingimg" src={createimg} alt="meating"/>
              </div>
            </div>
            <img className="cardimg" src={createRoom} alt="room"/>
          </div>

          <div className="Card historyCard" onClick={handleHistoryShow}>
            <div className="cardHeading">
            <h3 className="cardHeadingText" >History</h3>
              <div className="cardHeadingimgcover">
              </div>
            </div>
            <img className="cardimg" src={historyimg} alt="historyimg" />
          </div>

          <div className="Card previousLogCard">
          <div className="cardHeading">
              <h3 className="cardHeadingText">Schedule Meating</h3>
              <div className="cardHeadingimgcover">
                <img className="cardHeadingimg" src={clock} alt="clockimg"/>
              </div>
            </div>
            <div className="cardcontent" onClick={handletoschedule}>
              <img className="cardicon" src={schedule} alt="schedule" />
              <div className="cardText">
                {" "}
                <h3>"Let's craft an appointment for a powerful rendezvous!"</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
