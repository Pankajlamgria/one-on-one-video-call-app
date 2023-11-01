import React, { useState } from 'react'
import videocontext from './Videocontext'
const VideoState = (props) => {
  const host="http://localhost:4000";
  const [historyCallSend,sethistoryCallSend]=useState([]);
  const [historyCallReceived,sethistoryCallReceived]=useState([]);
  const [schedulemeating,setschedulemeating]=useState([]);
  const authtoken=localStorage.getItem('videotoken');
  const getHistory=async()=>{
    const response=await fetch(`${host}/api/history/gethistory`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "authtoken":authtoken
      },
    });
    const result=await response.json();
    if(result.success){
      sethistoryCallSend(result.callSend);
      sethistoryCallReceived(result.receivedCall);
    }
  }
  const getSchedule=async()=>{ 
    const response=await fetch(`${host}/api/schedule/getAllSchedule`,{
      method:"GET",
      headers:{
        'Content-Type':'application-json',
        'authtoken':authtoken
      },
    });
    const res=await response.json();
    if(res.success){
      setschedulemeating(res.meatings);
    }
    else{
      alert(res.error);
    }
  }
  return (
    <videocontext.Provider
    value={{
      getHistory,historyCallSend,historyCallReceived,getSchedule,schedulemeating
    }}
    >{props.children}</videocontext.Provider>
  )
}

export default VideoState
