const mongoose=require("mongoose");
const {Schema}=mongoose;
const scheduleSchema=new Schema({
    myemail:{type:String,required:true},
    with:{type:String,required:true},
    date:{type:Number,required:true},
    month:{type:Number,required:true},
    year:{type:Number,required:true},
    hour:{type:Number,required:true},
    minute:{type:Number,required:true}
})
module.exports=mongoose.model("schedule",scheduleSchema);