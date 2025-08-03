const mongoose=require("mongoose");

const connectDB=async()=>{
   await mongoose.connect("mongodb+srv://nikhilagrawal:sk3Mw7xvtlEEdZFL@hellomongodb.w7roqdq.mongodb.net/devHub");
}

module.exports=connectDB;



