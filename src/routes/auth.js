const express=require("express");
const authRouter=express.Router();
const User=require("../models/user");
const bcrypt=require("bcrypt");
const {validateSignUpData}=require("../utils/validation");

authRouter.post("/signup",async(req,res)=>{
try{
     // Validation of Data
   validateSignUpData(req);
   const {firstName,lastName,emailId,passWord}=req.body;
  // Password encryption to hashCode using bcrypt Library
   
   const passwordHash=await bcrypt.hash(passWord,10);

  //  Create new instance of a user model
  const user=new User({
    firstName,
    lastName,
    emailId,
    passWord:passwordHash,
  })

  //  Saving User to the DB
   const saveUser=await user.save();
   const token= await saveUser.getJWT();
   res.cookie("token", token , {
    expires: new Date(Date.now()+ 8*360000)
   });

  res.json({
    message:"User added successfully",
    data: saveUser
  })
  }catch(err){
    res.status(400).send("ERROR:"+ err.message);
  }
})

authRouter.post("/login",async (req,res)=>{
  try{
    const {emailId,passWord}=req.body;
  const user=await User.findOne({emailId:emailId});
  if(!user){
    throw new Error("Invalid Credentials");
  }
  const isPasswordValid=await user.validatePassword(passWord);
  if(isPasswordValid){
    const token=await user.getJWT();

    res.cookie("token",token, {
      expires:new Date(Date.now() + 8 * 3600000)
    });
    res.send(user);
  }else{
    throw new Error("Invalid Credentials");
  }
  }
  catch(err){
    res.status(400).send("data was not added:"+ err.message);
  }
})

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token", null,{
        expires:new Date(Date.now())
    })

    res.send("User Logout Successfully!!!");
})

module.exports=authRouter;