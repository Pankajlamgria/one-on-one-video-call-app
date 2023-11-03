import React, { useContext, useEffect, useState } from "react";
import "../css/schedule.css";
import videocontext from "../context/Videocontext";
import Meatingscard from "./Meatingscard";
const Schedule = () => {
  const contextcontent=useContext(videocontext);
  const [scheduleDetails,setscheduleDetails]=useState({youremail:`${contextcontent.userdetail.email}`,email:"",date:"",hour:0,min:0});

  const handleScheduleInputChange=(e)=>{
    setscheduleDetails({...scheduleDetails,[e.target.name]:e.target.value});
  }
  const handleScheduleSubmit=(e)=>{
    e.preventDefault();
    const val=scheduleDetails.date.split('-');  
    if(scheduleDetails.email==="" ||scheduleDetails.date===""){
      alert("Enter all the details first");
    }
    else{
      contextcontent.setSchedule(contextcontent.userdetail.email,scheduleDetails.email,parseInt(val[2]),parseInt(val[1]),parseInt(val[0]),scheduleDetails.hour,scheduleDetails.minute);
    }
    
  }
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
                value={contextcontent.userdetail.email}
                onChange={handleScheduleInputChange}
              />
            </div>
            <div>
              <label>2nd Person's Email: </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="abc@gmail.com"
                onChange={handleScheduleInputChange}
              />
            </div>
          </div>
          <div className="datecover">
            <div>
              <label htmlFor="date">Date: </label>
              <input type="date" name="date" id="date" onChange={handleScheduleInputChange} />
            </div>
            <div>
              <label htmlFor="duration">Meating Duration: </label>
              <input
                type="Number"
                name="hour"
                id="hour"
                placeholder="<=24"
                onChange={handleScheduleInputChange}
              />
              <input
                type="Number"
                name="minute"
                id="minute"
                placeholder="<60"
                onChange={handleScheduleInputChange}
              />
            </div>
          </div>
          <div className="buttonCover schedulebtncover">
            <button onClick={handleScheduleSubmit}>Submit</button>
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
