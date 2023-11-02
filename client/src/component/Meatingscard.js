import React, { useContext } from 'react'
import deleteimg from "../image/deleteicon.png";
import videocontext from '../context/Videocontext';
const Meatingscard = (props) => {
  const contextcontent=useContext(videocontext);
  const handleDeleteMeating=()=>{
    contextcontent.deleteMeating(props.meatings._id);
  }
  return (
    <div className='Calls schedulemeating'>
    <h4>Meating with:{props.meatings.with}</h4>
      <h4>{props.meatings.date}/{props.meatings.month}/{props.meatings.year}</h4>
    <h4>{props.meatings.hour}:{props.meatings.minute}hr</h4>
    <div className='deleteCover' onClick={handleDeleteMeating}><img src={deleteimg}/></div>
    </div>
  )
}

export default Meatingscard
