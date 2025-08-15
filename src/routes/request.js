const express=require("express");
const requestRouter=express.Router();
const {userAuth}=require("../middleware/auth");
const ConnectionRequest=require('../models/connectionRequest')
const User=require("../models/user")

requestRouter.post("/request/send/:status/:toUserId",userAuth ,async(req,res)=>{
  try{
     const fromUserId=req.user._id;
     const toUserId=req.params.toUserId;
     const status=req.params.status;

     const allowedStatus=["interested","ignored"];
     if(!allowedStatus.includes(status)){
      return res.status(400).json({
        message:`${status} is not a valid type of status`,
      })
     }
    
    //  If my user doesnot exist
     const toUser=await User.findById(toUserId);
     if(!toUser){
      return res.status(404).json({
        message:"User not found",
      })
     }

    //  If we alrerady have an exisiting request status

    const existingConnectionRequest= await ConnectionRequest.findOne({
      $or:[
        { fromUserId, toUserId},
        {fromUserId:toUserId, toUserId:fromUserId},
      ]
    })
    if(existingConnectionRequest){
      return res.status(400).json({
        message:"Connection Request Already Exist",
      })
    }

     const connectionRequest=new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
     })
    
     const data=await connectionRequest.save();
     res.json({
      message: req.user.firstName+" "+ status+" " + toUser.firstName,
      data,
     })


  }
  catch(err){
    res.status(400).send("ERROR "+ err.message);
  }
})

module.exports=requestRouter;