

const adminAuth=(req,res,next)=>{
     const token="xyz";
    const isAuthenticate=token==="xyz";
    if(!isAuthenticate){
        res.status(401).send("User was not authenticated");
    }else{
        next();
    }

}

const userAuth=(req,res,next)=>{
     const token="xyz";
    const isAuthenticate=token==="xyz";
    if(!isAuthenticate){
        res.status(401).send("User was not authenticated");
    }else{
        next();
    }

}

module.exports={
    adminAuth,
    userAuth
}