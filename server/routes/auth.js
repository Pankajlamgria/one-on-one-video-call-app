// {require("dotenv").config();}
const express=require('express');
const router=express.Router();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const auth=require('../models/auth.js');
const SECRET="pankajlamgria";

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
                // to do from here.
            }
        }
    }
})

module.exports=router;