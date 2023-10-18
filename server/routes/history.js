const express=require('express');
const router=express.Router();
const historySchema=require("../models/history");

router.post("/addhistory",async(req,res)=>{
    const bodydata=req.body;
    let success=false;
    if(bodydata.sender===""||bodydata.receiver===""||bodydata.timeduration===0){
        res.json({success,error:"Wrong input."});
    }
    else{
        const newhistory=await historySchema.create({
            sender:bodydata.sender,
            receiver:bodydata.receiver,
            timeduration:bodydata.timeduration
        })
        console.log("new history added.",newhistory);
        success=true;
        res.json({success,newhistory});
    }
})

module.exports=router;