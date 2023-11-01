import React from 'react'
import senderimg from "../image/receivedcall.png";
import "../css/call.css";
const Callsend = (props) => {
  return (
    <div className='Calls'>
      <div className='callImgCover'><img src={senderimg} alt="Send"/></div>
      <h3>{props.sendcall.sender}</h3>
        <h3>{~~(props.sendcall.timeduration/60)
      }:{props.sendcall.timeduration%60}hr</h3>
      <h3>{props.sendcall.date}</h3>
    </div>
  )
}

export default Callsend
