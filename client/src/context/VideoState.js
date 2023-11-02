import React, { useState } from 'react'
import videocontext from './Videocontext'
const VideoState = (props) => {
  const host="http://localhost:4000";
  const [historyCallSend,sethistoryCallSend]=useState([]);
  const [historyCallReceived,sethistoryCallReceived]=useState([]);
  const [schedulemeating,setschedulemeating]=useState([]);
  const [userdetail,setuserdetail]=useState([]);
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
  const getUserDetail=async()=>{
    if(authtoken){
      const response=await fetch(`${host}/api/auth/userdetail`,{
        method:'GET',
        headers:{
          'Content-Type':'application-json',
          'authtoken':authtoken
        },
      });
      const res=await response.json();
      if(res.success){
        setuserdetail(res.userdetails);
      }
      else{
        alert(res.error);
      }
    }
    else{
      alert("Login First");
    }
  }
  const setSchedule=async(youremail,email,date,month,year,hour,minute)=>{
    if(authtoken){
      const response=await fetch(`${host}/api/schedule/setSchedule`,{
        method:'POST',
          headers:{
            "Content-Type":"application/json",
            "authtoken":authtoken,
          },
          body:JSON.stringify({myemail:youremail,with:email,date:date,month:month,year:year,hour:hour,minute:minute})
      });
      const result=await response.json();
      if(result.success){
        alert("Meating successfully Scheduled.");
      }
      else{
        alert(result.error);
      }
    }
    else{
      alert("Login first");
    }
  }
  const deleteMeating=async(id)=>{
    if(authtoken){
      const response=await fetch(`${host}/api/schedule/deleteScheduledMeating/${id}`,{
        method:'DELETE',
        headers:{
          "Content-Type":"application/json",
          "authtoken":authtoken,
        }
      });
      const result=await response.json();
      if(result.success){
        alert("Deleted successfully.");
      }
      else{
        window.location.reload(false);
        // alert(result.error);
      }
    }
    else{
      alert("Login first");
    }

  }
  return (
    <videocontext.Provider
    value={{
      getHistory,historyCallSend,historyCallReceived,getSchedule,schedulemeating,getUserDetail,userdetail,setSchedule,deleteMeating
    }}
    >{props.children}</videocontext.Provider>
  )
}

export default VideoState
