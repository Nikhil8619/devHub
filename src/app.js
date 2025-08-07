const express=require("express");

const connectDB=require("./config/database");
const User=require("./models/user");
const app=express();

app.use(express.json());

app.post("/signup",async(req,res)=>{
  
  const user=new User(req.body)
  try{
    await user.save();
  res.send("Data successfully created");
  }catch(err){
    res.status(400).send("data was not added:"+ err.message);
  }
})

// Getting 1 user using get user api
app.get("/user",async(req,res)=>{
  const userEmail=req.body.emailId;

 try{

  // const user=await User.findOne({emailId:userEmail});
  const user=await User.findOne();
  
  if(!user){
    res.status(304).send("user not found");
  }else{
    res.send(user);
  }
  // const users= await User.find({emailId:userEmail});
  // if(users.length===0){
  // res.status(404).send("user not found");
  // }else{
  //   res.send(users);
  // }
  
 }
 catch(err){
  res.status(400).send("Something went wrong");
 }

})

  // Find User By id

  app.get("/userById",async(req,res)=>{
    const userId=req.body.userId;
  try{
    
    const user=await User.findById(userId);
    if(!user){
      res.status(404).send("user not found");
    }else{
      res.send(user);
    }
  }
  catch(err){
    res.status(400).send("something went wrong");
  }
  })

// API Feed:- Getting all the user from DB
app.get("/feed",async(req,res)=>{
  try{
    const users= await User.find({});
    res.send(users);
  } 
  catch(err){
  res.status(400).send("Something went wrong");
 }
})

// Delete a user
app.delete("/user",async(req,res)=>{
  const userId=req.body.userId;
  try{
    const user=await User.findByIdAndDelete(userId);
    if(!user){
      res.status(404).send("user not found");
    }else{
      res.send("user deleted successfully");
    }
    
  }catch(err){
    res.status(400).send("something went wrong");
  }
})


// Update data in DB
app.patch("/user/:userId",async(req,res)=>{
  const userId=req.params?.userId;
  const data=req.body;
  try{
    const Allowed_Updates=["age","photoURL","about","skills","gender"];
    const isAllowedUpdates=Object.keys(data).every((k)=>
      Allowed_Updates.includes(k)
      )
      if(!isAllowedUpdates){
        throw new Error("Updates not allowed to this field");
      }
      if(data?.skills.length>5){
        throw new Error("cannot update more than 5 skills");
      }
    const user=await User.findByIdAndUpdate(userId,data,{returnDocument:'before',runValidators:true})
    console.log(user);
    res.send("user updated successfully");
  }
  catch(err){
    res.status(400).send("updation failed" + err.message);
  }
})

// Connect to DB
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



