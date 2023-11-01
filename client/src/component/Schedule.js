import React, { useContext, useEffect } from "react";
import "../css/schedule.css";
import videocontext from "../context/Videocontext";
import Meatingscard from "./Meatingscard";
const Schedule = () => {
  const contextcontent=useContext(videocontext);
  useEffect(()=>{
    contextcontent.getSchedule();
  },[])
  return (
    <div className="scheduleCover">
      <div className="scheduleformcover">
        <h2 className="scheduleheading">Schedule Meatings</h2>
        <form id="scheduleform">
          <div className="emailscover">
            <div>
              <label>Your Email: </label>
              <input
                type="Youremail"
                id="Youremail"
                name="Youremail"
                placeholder="abc@gmail.com"
                value={"pankaj@gmail.com"}
              />
            </div>
            <div>
              <label>2nd Person's Email: </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="abc@gmail.com"
              />
            </div>
          </div>
          <div className="datecover">
            <div>
              <label htmlFor="date">Date: </label>
              <input type="date" name="date" id="name" />
            </div>
            <div>
              <label htmlFor="duration">Meating Duration: </label>
              <input
                type="Number"
                name="hour"
                id="hour"
                placeholder="<=24"
              />
              <input
                type="Number"
                name="minute"
                id="minute"
                placeholder="<60"
              />
            </div>
          </div>
          <div className="buttonCover schedulebtncover">
            <button>Submit</button>
          </div>
        </form> 
      </div>

      <div className="allmeatingscover">
        <h2 className="scheduleheading">All Meatings</h2>
        {contextcontent.schedulemeating.map((meatings)=>{
          return <Meatingscard key={meatings.id} meatings={meatings}></Meatingscard>
        })}
      </div>
    </div>
  );
};

export default Schedule;
