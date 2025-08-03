const express=require("express");

const connectDB=require("./config/database");
const User=require("./models/user");
const app=express();

app.post("/signup",async(req,res)=>{
  const user=new User({
    firstName:"navrang",
    lastName:"Agrawal",
    emailId:"navrang@agrawal.com",
    passWord:"navrang@123",
    age:26,
    gender:"male"
  })
  try{
    await user.save();
  res.send("Data successfully created");
  }catch(err){
    res.status(400).send("data was not added:"+ err.message);
  }
})

connectDB().
then(()=>{
    console.log("connected successfully to the Database");
    app.listen(7777, () => {
      console.log("Server has started running on port 7777");
    });
})
.catch((err)=>{
  console.error("Connection failed to Database with error ", err);
})



 

  

// app.get("/getUserData",(req,res)=>{
//     try{
//         throw new Error("bnxvhj");
    
//     res.send("User route working fine")
//     }
//     catch(err){
//        res.status(500).send("Error is handle using try catch");
//     }
// })

// app.use("/",(err,req,res,next)=>{
//     if(err){
//         res.status(500).send("Something went wrong");
//     }
// })



