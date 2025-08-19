const express=require("express");
const profileRouter=express.Router();
const {userAuth}=require("../middleware/auth");
const {validateEditProfileData}=require("../utils/validation")
const bcrypt=require("bcrypt");

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
  try{
    const user=req.user;
  // console.log(user);
  res.send(user);
  }
  catch(err){
  res.status(400).send("Error" + err.message);
 }
})

profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
  try{
      if(!validateEditProfileData(req)){
        throw new Error("Invalid Edit request");
      }
      const LoggedInUser=req.user;
      Object.keys(req.body).forEach((key)=>{
         LoggedInUser[key]=req.body[key];
      })

      await LoggedInUser.save();

      res.json({
        message:`${LoggedInUser.firstName} ${LoggedInUser.lastName} data has been updated successfully!!!`,
        data: LoggedInUser,
      })
  }
  catch(err){
    res.status(400).send("ERROR " + err.message);
  }
})

profileRouter.patch("/profile/password",userAuth,async(req,res)=>{
  try{
    const {oldPassword,newPassword}=req.body;
    if(!oldPassword || !newPassword){
      throw new Error("Old and new password must be provided");
    }

    const user=req.user;
    const isMatch=await bcrypt.compare(oldPassword,user.passWord);
    if(!isMatch){
      throw new Error("password is incorrect");
    }

    const salt=await bcrypt.genSalt(10);
    user.passWord=await bcrypt.hash(newPassword,salt);

    await user.save();
    res.json({ message: "Password updated successfully!" });

  }catch(err){
    res.status(400).json({
      message: err.message,
    })
  }
})


module.exports=profileRouter;