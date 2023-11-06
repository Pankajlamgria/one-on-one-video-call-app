import React, { useCallback, useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import "../css/meetpage.css";
import peer from "../services/peer";
import videocontext from "../context/Videocontext";
import { useNavigate } from "react-router-dom";
import videoon from "../image/videoon.png";
import videooff from "../image/videooff.png";
import micoff from "../image/micoff.png";
import micon from "../image/micon.png";
import endicon from "../image/endimg.png";
import hi from "../image/hi.png";

const tooglebtn=document.getElementById('videotooglebtn');
const Videopage = () => {
  const navigate=useNavigate();
  const contextcontent = useContext(videocontext);
  const [tracksend,settracksend]=useState(false);
  const [roomusers, setroomusers] = useState([]);
  const [newsocketid,setsocketid] = useState("");
  const [mystream, setmystream] = useState();
  const [remotestream, setremoteStream] = useState(null);
  const [flag,setflag]=useState(true);
  const [videoflag,setvideoflag]=useState(false);
  const [micflag,setmicflag]=useState(false);
  const socket = contextcontent.socket;

  const handlenewuserjoined = useCallback((data) => {
    console.log("new user joined");
    contextcontent.roomuserlist(data.room);
  }, []);
  
  socket.on("userjoined", handlenewuserjoined);


  const handlesendstream=useCallback(()=>{
    setflag(false);
    if(!tracksend){
      for(const track of mystream.getTracks()){
        peer.peer.addTrack(track,mystream);
      } 
      settracksend(true);
    }
  },[mystream]);



  useEffect(()=>{
    peer.peer.addEventListener('track',async (ev)=>{
      const otherstream=ev.streams;
      console.log("accepted");
      setremoteStream(otherstream[0]);
    })
  },[mystream]);


  const handleincommingcall=useCallback(async()=>{
    const from=localStorage.getItem("callfrom");
    const offer=contextcontent.incommingoffer;
    // console.log("incomming call running:",from,offer);
    setsocketid(from);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    // console.log("This is from the incomming call:",stream);
    setmystream(stream);
    const ans=await peer.getAnswer(offer);
    socket.emit("call:accepted",{to:from,ans});
  },[socket])

  const handlecallresponse=useCallback(async({from,ans})=>{
    peer.setLocalDescription(ans);
    // console.log("call accepted");
    handlesendstream();
  },[handlesendstream]);

  const handlenegoneeded=useCallback(async()=>{
    // console.log("negoneeded running");
    const offer=await peer.getOffer();
    if(roomusers.length===0 && newsocketid!=="" && flag==true){
      socket.emit("peer:nego:needed",{offer,to:localStorage.getItem("callfrom")});
    }
    else{
      socket.emit("peer:nego:needed",{offer,to:localStorage.getItem("callto")});
    }
  },[newsocketid,socket]);

  useEffect(()=>{
    peer.peer.addEventListener('negotiationneeded',handlenegoneeded);
    return ()=>{
      peer.peer.removeEventListener('negotiationneeded',handlenegoneeded);
    }
  },[handlenegoneeded])
  

  

  const handlenegoincoming=useCallback(async({from,offer})=>{
    const ans=await peer.getAnswer(offer);
    // console.log("This is  from negoincomming",mystream);
    socket.emit("peer:nego:done",{to:from,ans});
  },[socket]);

    const handlenegofinal=useCallback(async(data)=>{
      const {from,ans}=data;
      // console.log("running negofinal");
      await peer.setLocalDescription(ans);
      
    },[])
  

  useEffect(() => {

    // socket.on("userjoined", handlenewuserjoined);
    socket.on("call:response",handlecallresponse);
    socket.on("peer:nego:needed:req",handlenegoincoming);
    socket.on("peer:nego:final",handlenegofinal);
    
    
    return () => {
      
      // socket.off("userjoined", handlenewuserjoined);
      socket.off("call:response",handlecallresponse);
      socket.off("peer:nego:needed:req",handlenegoincoming);
      socket.off("peer:nego:final",handlenegofinal);
    };
  }, [socket,handleincommingcall,handlecallresponse]);


  const handlecallcancel = useCallback(() => {
    setmystream();
  },[]);


  const handlecall = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setmystream(stream);
    const offer=await peer.getOffer();

    const to=localStorage.getItem("callto");
    const myemail=localStorage.getItem("myemail");
    console.log("Senders email",myemail);
    socket.emit('user:call',{myemail,to,offer});
  }, [socket]);

  useEffect(()=>{
    if(contextcontent.incommingoffer){
      handleincommingcall();
    }
    else{
      handlecall();
    }
  },[])



 
  const handleendcall=async()=>{
    contextcontent.edituserdetail("","");
    if(roomusers.length===0 && newsocketid!=="" && flag==false){
      await contextcontent.addhistory(localStorage.getItem("callfromemail"),localStorage.getItem("myemail"));
      await contextcontent.socket.emit("call:canceled",{to:localStorage.getItem("callfrom")});
    }
    else{
      await contextcontent.addhistory(localStorage.getItem("myemail"),localStorage.getItem("calltoemail"));
      await contextcontent.socket.emit("call:canceled",{to:localStorage.getItem("callto")});
    } 
    navigate('/');
    window.location.reload();
  }
  
  const handlecallhasbeencanceled=async()=>{
    await contextcontent.edituserdetail("","");
    navigate('/');
    window.location.reload();
  }
  contextcontent.socket.on("callhasbeencanceled",handlecallhasbeencanceled);


  const handletooglevideo=async()=>{
    if(videoflag){
      setvideoflag(false);
    }
    else{
      setvideoflag(true);
    }
    mystream.getVideoTracks().forEach(track =>track.enabled = !track.enabled);
    }
   const handletooglemic=async()=>{
    if(micflag){
      setmicflag(false);
    }
    else{
      setmicflag(true);
    }
    mystream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
   }
  return (
    <div className="meetcover">
      <div className="acceptbtncover">
        {roomusers.length===0 && newsocketid!=="" && flag==true && <button style={{position:'fixed' ,zIndex:"20"}} onClick={handlesendstream}> <img className="acceptbtnimg" src={hi}/>Call comming{localStorage.getItem("call from")}</button>}
      </div>
      <div >
        
        {!videoflag && <button onClick={handletooglevideo} id="videotooglebtn"><img className="buttonimg redcls" src={videooff}/></button>}
        {videoflag && <button onClick={handletooglevideo} id="videotooglebtn"><img className="buttonimg" src={videoon}/></button>}
        {!micflag &&<button onClick={handletooglemic}id="mictooglebtn"><img className="buttonimg redcls" src={micoff}/></button>}
        {micflag &&<button onClick={handletooglemic}id="mictooglebtn"><img className="buttonimg" src={micon}/></button>}
        <button onClick={handleendcall}id="endcallbtn"><img className="buttonimg redcls" src={endicon}/></button>
      </div>


      <div>
          <div className="videocover" id="myvideocover">
          {mystream && (
            <ReactPlayer height="100%" width="100%" muted playing url={mystream} className="myvideo" />
          )}
          </div>
          <div className="videocover" id="remotevideocover">
          {remotestream && (
            <ReactPlayer height="100%" width="100%" muted  playing url={remotestream} className="remotevideo" />
          )}
          </div>
      </div>
      
    </div>
  );
};

export default Videopage;
