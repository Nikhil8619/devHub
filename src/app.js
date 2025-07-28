const express=require("express");
const app=express();

app.use("/user",
    [(req,res,next)=>{
    console.log("handling  the route user");
    // res.send("Response");
    next();
},
 (req,res,next)=>{
    console.log("handling  the route user 2");
    // res.send("Response 2");
    next();
}],
(req,res,next)=>{
    console.log("handling  the route user 3");
    // res.send("Response 3");
    next();
},
(req,res,next)=>{
    console.log("handling  the route user 4");
    // res.send("Response 4");
    next();
},
(req,res)=>{
    console.log("handling  the route user 5");
    res.send("Response 5");
    
}
)

app.listen(7777,()=>{
    console.log("server has started running on port 7777");
})