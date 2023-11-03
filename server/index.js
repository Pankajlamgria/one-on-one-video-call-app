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
        io.to(data.roomname).emit("userjoined");
        socket.join(data.roomname);
        io.to(socket.id).emit("room:joined",{id:socket.id});
    })

    socket.on('disconnect', ()=>{
      console.log('disconnected from user');
    });
  });
   