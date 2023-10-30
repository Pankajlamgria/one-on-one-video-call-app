const express=require('express');
const router=express.Router();
const authschema=require('../models/auth.js');
const historySchema=require("../models/history");
const fetchuser = require('../fetchuser');

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
router.get("/gethistory",fetchuser,async(req,res)=>{
    try {
        const userid=req.userid;
        const userdetail=await authschema.findById(userid).select("-password");
        if(!userdetail)res.json({success:false,error:"Login first"});
        else{
            const callSend=await historySchema.find({sender:userdetail.email});
            const callReceived=await historySchema.find({receiver:userdetail.email});
            res.json({success:true,callSend,receivedCall:callReceived});

        }
    } catch (error) {
        req.json({success:false,error});
    }
})

module.exports=router;