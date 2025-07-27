const express=require("express");
const app=express();

app.get("/user",(req,res)=>{
    res.send({firstname:"Nikhil", lastname:"Agrawal"})
})

app.post("/user",(req,res)=>{
   res.send("Data has been successfully added to then SDB");
})

app.delete("/user",(req,res)=>{
    res.send("Data has been successfully Deleted to then SDB");
})

app.use("/test/12",(req,res)=>{
    res.send("AbrakaDabra gili gili chuu");
});

app.use("/test",(req,res)=>{
    res.send("This is our test routing without fail using get function");
});

// app.use("/hello",(req,res)=>{
//     res.send("hello  ");
// })

// app.use((req,res)=>{
//     res.send("Welcome to the port")
// })

// app.use("/",(req,res)=>{
//     res.send("Hello welcome to port 7777");
// });



app.listen(7777,()=>{
    console.log("server has started running on port 7777");
})