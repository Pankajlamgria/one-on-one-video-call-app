const express=require("express");
{require("dotenv").config();}
const app=express();
const connect=require('./database/db.js');
const cors=require("cors");
connect();
app.use(cors());
app.use(express.json());
app.use('/api/auth',require("./routes/auth.js"));

const port=4000;
app.listen(port,()=>{
    console.log(`server running on the port ${port}`);
})