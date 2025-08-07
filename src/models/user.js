const mongoose=require("mongoose");
const validator=require("validator");

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
          if(!validator.isEmail(value)){
            throw new Error("Your Email is not valid");
          }
        }
    },
    passWord:{
        type:String,
        required:true,
        unique:true,
        
        validate(value){
          if(!validator.isStrongPassword(value)){
            throw new Error("Your password is not strong");
          }
        }
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Error data is not valid");
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwOVBmhdc2jcsiq5rULhg2UF06-0_2pq3-4g&s",
        validate(value){
          if(!validator.isURL(value)){
            throw new Error("Your url is not valid");
          }
        }
    },
    skills:{
        type:[String]
    },
    about:{
        type:String,
        default:"This is the default desc of the user",
    },
},{
    timestamps:true,
})

const userModel=mongoose.model("User",userSchema);

module.exports=userModel;