// {require("dotenv").config();}
const express=require('express');
const router=express.Router();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const auth=require('../models/auth.js');
const SECRET="pankajlamgria";
const fetchuser=require("../fetchuser.js");
router.post("/signin",async(req,res)=>{
    const bodydata=req.body;
    let success=false;
    if(bodydata.username===""||bodydata.password===""||bodydata.email===""){
        res.json({success,error:"Enter the valid details."});
    }
    else{
        const newuser=await auth.findOne({email:bodydata.email});
        if(newuser){
            res.json({success,error:"User with this email already exist."})
        }
        else{
            try{
                const salt=await bcrypt.genSalt(10);
                const strongpswd=await bcrypt.hash(bodydata.password,salt);
                const createuser=await auth.create({
                    username:bodydata.username,
                    email:bodydata.email,
                    password:strongpswd
                })
                const token={
                    user:{id:createuser.id}
                }
                const authtoken=jwt.sign(token,SECRET);
                console.log(authtoken);
                success=true;
                res.json({success,authtoken});
            }
            catch(error){
                res.json({success,error});
            }
        }
    }
})
router.post("/login",async(req,res)=>{
    const bodydata=req.body;
    let success=false;
    if(bodydata.email===""|| bodydata.password===""){
        res.json({success,error:"Incorrect Details."});
    }
    else{
        const finduser=await auth.findOne({email:bodydata.email});
        if(!finduser){
            res.json({success,error:"Email does not exist"});
        }
        else{
            try{
                const result=await bcrypt.compare(bodydata.password,finduser.password);
                if(result){
                    const token={
                        user:{id:finduser.id}
                    }
                    const authtoken=jwt.sign(token,SECRET);
                    success=true;
                    res.json({success,authtoken});
                }
            }
            catch(error){
                res.json({success,error:error});
            }
        }
    }

})
router.get("/userdetail",fetchuser,async(req,res)=>{
    try{
        const id=req.userid;
        const userdetails=await auth.findById(id).select("-password");
        if(userdetails){
            res.json({success:true,userdetails});
        }
        else{
            res.json({success:false,error:"Server Not responding"});
        }
    }
    catch(error){
        res.json({success:false,error});
    }
    
})

module.exports=router;