const express=require("express");
{require("dotenv").config();}
const app=express();
// const http=require("http");
const socketIO=require("socket.io");
const connect=require('./database/db.js');
const cors=require("cors");
connect();
app.use(cors());
app.use(express.json());


app.use('/api/auth',require("./routes/auth.js"));
app.use('/api/history',require("./routes/history.js"));
app.use('/api/schedule',require("./routes/schedule.js"));

const port=4000;
const server=app.listen(port,()=>{
    console.log(`server running on the port ${port}`);
})
const io=socketIO(server,{
    cors:{
        origin: "*",
        methods: ["GET", "POST"],
    },
    
})
io.on('connection', (socket)=>{
    console.log('New user connected',socket.id);
    socket.on('join-room',(data)=>{
        io.to(data.roomname).emit("userjoined room ");
        console.log("user Joined room",data.roomname)
        socket.join(data.roomname);
        io.to(socket.id).emit("room:joined",{id:socket.id});
    })
    socket.on('user:call',(data)=>{
            const {to,offer}=data;
            console.log("call to:",to);
            flag=true;
            io.to(to).emit("incomming:call",{from:socket.id,offer});
    })
    socket.on('sendincomingtomeet',(data)=>{
        const {to,offer}=data;
        console.log("sending offer to meetpage:",offer);
        io.to(to).emit("meetincomming:call",{from:socket.id,offer});
    })
    socket.on('call:accepted',(data)=>{
            const {to,ans}=data;
            console.log("data from call accepted ",to,ans);
            ansflag=true;
            io.to(to).emit('call:response',{from:socket.id,ans});
    })
    socket.on("peer:nego:needed",(data)=>{
        const {to,offer}=data;
        io.to(to).emit("peer:nego:needed:req",{from:socket.id,offer});
    })
    socket.on("peer:nego:done",(data)=>{
        const {to,ans}=data;
        io.to(to).emit("peer:nego:final",{from:socket.id,ans});
    })

    socket.on('disconnect', ()=>{
      console.log('disconnected from user ',socket.id);
    });
  });
   