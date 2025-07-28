const express=require("express");
const app=express();

const {adminAuth,userAuth}=require("./middleware/auth")

app.use("/admin",adminAuth)

app.get("/user",userAuth,(req,res)=>{
    res.send("User route working fine")
})

app.get("/admin/getAllData",(req,res)=>{
    res.send("Succcessfully received all the data");
})

app.get("/admin/deleteData",(req,res)=>{
    res.send("Succesfully deleted a data");
})

app.listen(7777,()=>{
    console.log("server has started running on port 7777");
})