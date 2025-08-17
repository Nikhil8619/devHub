const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middleware/auth");
const ConnectionRequest=require("../models/connectionRequest")

const USER_SAFE_DATA="firstName lastName age skills gender about";

userRouter.get("/user/request/received", userAuth,async(req,res)=>{
    try{
       const loggedInUser=req.user;
       const connectionRequest= await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:"interested",
       }).populate("fromUserId", USER_SAFE_DATA)

    //    populate("fromUserId", ["firstName", "lastName"])--------> both way are possible

       res.json({
        message:"Data fetched Successfully",
        data:connectionRequest,
       })
    }
    catch(err){
        res.status(400).send("ERROR "+ err.message);
    }
})

userRouter.get("/user/connections", userAuth, async(req,res)=>{
    try{
     const loggedInUser=req.user;
     const connectionRequest=await ConnectionRequest.find({
        $or:[
            {toUserId:loggedInUser._id,status:"accepted"},
            {fromUserId:loggedInUser._id, status:"accepted"},
        ]
     }).populate("fromUserId", USER_SAFE_DATA)
       .populate("toUserId", USER_SAFE_DATA)

    const data=connectionRequest.map((row)=> {
        if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
            return row.toUserId
        }
        return row.fromUserId
    });
    res.json({
        data
    })
    }
    catch(err){
        res.status(400).send("ERROR " + res.message);
    }
})


module.exports=userRouter;