const mongoose=require("mongoose");
const {Schema}=mongoose;
const historySchema=new Schema({
    sender:{type:String,required:true},
    receiver:{type:String,required:true},
    date:{type:Date,default:Date.now},
})
module.exports=mongoose.model("history",historySchema);