const express=require("express");
const requestRouter=express.Router();
const {userAuth}=require("../middleware/auth");
const ConnectionRequest=require('../models/connectionRequest')
const User=require("../models/user");
const { model } = require("mongoose");

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

requestRouter.post("/request/review/:status/:requestId", userAuth, async(req,res)=>{
  try{
     const loggedInUser=req.user;
     const {status,requestId}=req.params;

    //  Check is status is valid or not
    const allowedStatus=["accepted","rejected"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({
        message:`${status}  is not a valid status type`,
      })
    }
    
    // RequestId must be a valid id means it must exist in our connectionrequest DB model
    // status must be interested => in orser to make it either accpedted or rejected , cannot be pertformed for ignored status
    // LoggedInuser must be touserid to whom we have sent the request earlier

    const connectionRequest=await ConnectionRequest.findOne({
      _id:requestId,
      toUserId:loggedInUser._id,
      status:"interested",
    })

    if(!connectionRequest){
      return res.status(404).json({
        message:"Connection request not found"
      })
    }

    connectionRequest.status=status;

    const data=await connectionRequest.save();
    res.json({
      message:"Connection request is "+ status
    })


  }
  catch(err){
    res.status(400).send("ERROR "+ err.message);
  }
})

module.exports=requestRouter;