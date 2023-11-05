import React, { useCallback, useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import "../css/meetpage.css";
import peer from "../services/peer";
import videocontext from "../context/Videocontext";
const tooglebtn=document.getElementById('videotooglebtn');
const Videopage = () => {
  const contextcontent = useContext(videocontext);
  const [tracksend,settracksend]=useState(false);
  const [roomusers, setroomusers] = useState([]);
  const [newsocketid,setsocketid] = useState("");
  const [mystream, setmystream] = useState();
  const [remotestream, setremoteStream] = useState(null);
  const [flag,setflag]=useState(true);

  const socket = contextcontent.socket;

  // const handlenewuserjoined = useCallback((data) => {
  //   let id=data.id;
  //   setsocketid(id);
  //   localStorage.setItem("newuserid",id);
  //   setroomusers(data.users);
  // }, []);

  

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
      console.log("new user getting streams from the admin",otherstream);
      console.log("To test mystream of user:",mystream);  
      setremoteStream(otherstream[0]);
    })
  },[mystream]);


  const handleincommingcall=useCallback(async()=>{
    const from=localStorage.getItem("callfrom");
    const offer=contextcontent.incommingoffer;
    console.log("incomming call running:",from,offer);
    setsocketid(from);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    console.log("This is from the incomming call:",stream);
    setmystream(stream);
    const ans=await peer.getAnswer(offer);
    socket.emit("call:accepted",{to:from,ans});
  },[socket])

  const handlecallresponse=useCallback(async({from,ans})=>{
    peer.setLocalDescription(ans);
    console.log("call accepted");
    handlesendstream();
  },[handlesendstream]);

  const handlenegoneeded=useCallback(async()=>{
    console.log("negoneeded running");
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
    console.log("This is  from negoincomming",mystream);
    socket.emit("peer:nego:done",{to:from,ans});
  },[socket]);

    const handlenegofinal=useCallback(async(data)=>{
      const {from,ans}=data;
      console.log("running negofinal");
      await peer.setLocalDescription(ans);
      
    },[])
  

  useEffect(() => {

    // socket.on("userjoined", handlenewuserjoined);
    // socket.on('meetincomming:call',handleincommingcall);
    socket.on("call:response",handlecallresponse);
    socket.on("peer:nego:needed:req",handlenegoincoming);
    socket.on("peer:nego:final",handlenegofinal);
    
    
    return () => {
      
      // socket.off("userjoined", handlenewuserjoined);
      // socket.off('meetincomming:call',handleincommingcall);
      socket.off("call:response",handlecallresponse);
      socket.off("peer:nego:needed:req",handlenegoincoming);
      socket.off("peer:nego:final",handlenegofinal);
    };
  }, [socket,handleincommingcall,handlecallresponse]);


  const handlecallcancel = useCallback(() => {
    setmystream();
  },[]);


  const handlecall = useCallback(async () => {
    console.log("call function running");
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setmystream(stream);
    console.log("this is the local stream: from call function",stream,"newuser id:",localStorage.getItem("callto"));
    const offer=await peer.getOffer();

    const to=localStorage.getItem("callto");
    console.log(to);
    socket.emit('user:call',{to,offer});
  }, [socket]);

  useEffect(()=>{
    if(contextcontent.incommingoffer){
      handleincommingcall();
    }
    else{
      handlecall();
    }
  },[])



 const handletooglevideo=async()=>{
  mystream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
 }
 const handletooglemic=async()=>{
  mystream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
 }
  
  return (
    <div className="meetcover">
      <div className="buttonCover">
        {roomusers.length===0 && newsocketid!=="" && flag==true && <button style={{position:'fixed' ,zIndex:"20"}} onClick={handlesendstream}>Call comming{localStorage.getItem("call from")}</button>}
      </div>

      <button onClick={handlecallcancel}>Cancel</button>
      <div >
        <button onClick={handletooglevideo} id="videotooglebtn">video</button>
        <button onClick={handletooglemic}id="mictooglebtn">mic</button>
      </div>


      <div>
          <div className="videocover" id="myvideocover">
          {mystream && (
            <ReactPlayer height="100%" width="100%" muted playing url={mystream} className="myvideo" />
          )}
          </div>
          <div className="videocover" id="remotevideocover">
          {remotestream && (
            <ReactPlayer height="100%" width="100%" muted playing url={remotestream} className="remotevideo" />
          )}
          </div>
      </div>
      
    </div>
  );
};

export default Videopage;
