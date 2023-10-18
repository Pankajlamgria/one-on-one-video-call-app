// {require("dotenv").config();}
const jwt=require("jsonwebtoken");
const SECRET="pankajlamgria";
const fetchuser=async(req,res,next)=>{
    const authtoken=req.header('authtoken');
    if(!authtoken){
        return res.json({success:false,error:"Authentication token not found"});
    }
    else{
        let tokendetials=jwt.verify(authtoken,SECRET);
        req.userid=tokendetials.user.id;
        next();
    }
}
module.exports=fetchuser;