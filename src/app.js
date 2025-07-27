const express=require("express");
const app=express();

app.get("/user/:userId",(req,res)=>{
    // console.log(req.query);
    console.log(req.params);
    res.send({firstname:"Nikhil", lastname:"Agrawal"})
})

// app.post("/user",(req,res)=>{
//    res.send("Data has been successfully added to then SDB");
// })

// app.delete("/user",(req,res)=>{
//     res.send("Data has been successfully Deleted to then SDB");
// })

// app.use("/test/12",(req,res)=>{
//     res.send("AbrakaDabra gili gili chuu");
// });

// app.use("/test",(req,res)=>{
//     res.send("This is our test routing without fail using get function");
// });

app.listen(7777,()=>{
    console.log("server has started running on port 7777");
})