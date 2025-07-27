const express=require("express");
const app=express();

app.get("/",(req,res)=>{
    res.send("Hello welcome to port 7777");
});

app.get("/test",(req,res)=>{
    res.send("This is our test routing without fail using get function");
});

app.get("/hello",(req,res)=>{
    res.send("hello  ");
})


app.listen(7777,()=>{
    console.log("server has started running on port 7777");
})