const express=require("express");
const requestRouter=express.Router();
const {userAuth}=require("../middleware/auth");

requestRouter.post("/sentConnectionRequest",userAuth ,async(req,res)=>{
  const user=req.user;
  res.send(user.firstName +" has sent the connection request");
})

module.exports=requestRouter;