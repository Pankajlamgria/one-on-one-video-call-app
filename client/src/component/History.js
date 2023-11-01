import React, { useContext, useEffect, useState } from 'react'
import "../css/history.css";
import videocontext from '../context/Videocontext';
import Callsend from './Callsend';
import Callreceived from './Callreceived';
const History = () => {
  const contextcontent=useContext(videocontext);
  const [showsend,setshowsend]=useState(true);
  const [dropdown,setdropdown]=useState(true);

  useEffect(()=>{
    contextcontent.getHistory();
  },[])
  const handleShowSend=()=>{
    setshowsend(true);
  }
  const handleShowReceived=()=>{
    setshowsend(false);
  }
  const handletoggledropdown=()=>{
    (dropdown)?(setdropdown(false)):(setdropdown(true));
  }
  return (
    <div className='historyCover'>
      <div className='historyHeading'>
        <h2>History</h2>
        <div>
        <div className='dropdownBox'>
          <h3 onClick={handletoggledropdown}>Select <i className='arrow'></i></h3>
        </div>
          <div className='dropdownVal' style={{display:(dropdown)?"none":"block"}} >  
            <h3 className='dropdownoption' onClick={handleShowSend}>Send</h3>
            <div className='hrline'></div>
            <h3 className='dropdownoption'onClick={handleShowReceived}>Received</h3>
          </div>
          </div>
      </div>
      <div className='historySec' style={{display:(showsend)?"block":"none"}}>
        {contextcontent.historyCallSend.map((calls)=>{
          return <Callsend key={calls.id} sendcall={calls}></Callsend>
        })}
      </div>
      <div className='historySec' style={{display:(showsend)?"none":"block"}} >
      {contextcontent.historyCallReceived.map((calls)=>{
          return <Callreceived key={calls.id} sendcall={calls}></Callreceived>    
        })}
      </div>


    </div> 
  )
}

export default History
