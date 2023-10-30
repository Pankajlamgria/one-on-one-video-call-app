const express=require('express');
const router=express.Router();
const authschema=require('../models/auth.js');
const scheduleSchema=require("../models/schedule.js");
const fetchuser = require('../fetchuser');
const { route } = require('./history.js');

router.post("/setSchedule",fetchuser,async(req,res)=>{
    const userid=req.userid;
    let success=false;
    if(!userid){
        res.json({success,error:"Log in first"});
    }
    else{
        const bodydata=req.body;
        const findAlreadyTask=await scheduleSchema.find({myemail:bodydata.myemail,with:bodydata.with,date:bodydata.date,month:bodydata.month,year:bodydata.year,hour:bodydata.hour,minute:bodydata.minute});
        if(findAlreadyTask.length!=0){
            res.send({success,error:"Meating Already exist with the user."});
        }
        else{
            const newschedule=await scheduleSchema.create({
                myemail:bodydata.myemail,
                with:bodydata.with,
                date:bodydata.date,
                month:bodydata.month,
                year:bodydata.year,
                hour:bodydata.hour,
                minute:bodydata.minute
            })
            success=true;
            res.json({success,newschedule});
        }
    }
})
router.get("/getAllSchedule",fetchuser,async(req,res)=>{
    const userid=req.userid;
    if(!userid)res.json({success,error:"Login First"});
    try {
        const userdetials=await authschema.findById(userid).select("-password");
        const meatings=await scheduleSchema.find({myemail:userdetials.email});
        success=true;
        res.json({success,meatings});
        
    } catch (error) {
        res.json({success,error});
    }

})
router.delete("/deleteScheduledMeating/:id",fetchuser,async(req,res)=>{
    const userid=req.userid;
    const userdetail=await authschema.findById(userid).select("-password");
    const schedulemeating=await scheduleSchema.findById(req.params.id);

    if(userdetail.email!=schedulemeating.myemail)res.json({success:false,error:"Access Denaid"});
    try{
        const schemaid=req.params.id;
        const schemaToDelete=await scheduleSchema.findByIdAndDelete(schemaid);
        res.json({sucess:true,schemaToDelete});

    }
    catch(error){
        res.json({success:false,error});
    }
    
})
module.exports=router;