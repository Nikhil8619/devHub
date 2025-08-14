const validator=require("validator");

const validateSignUpData=(req)=>{
 const {firstName,lastName,emailId,passWord}=req.body;
 if(!firstName || !lastName){
    throw new Error("Name is not valid")
 }
 else if(!validator.isEmail(emailId)){
    throw new Error("Enter a valid email id")
 }
 else if(!validator.isStrongPassword(passWord)){
    throw new Error("Enter a strong password");
 }
}

const validateEditProfileData=(req)=>{
   const allowedEditFields=["firstName","lastName","age","gender","photoUrl","skills","about"];

   const isEditAllowed=Object.keys(req.body).every((field)=>
      allowedEditFields.includes(field)
   )

   return isEditAllowed;

}

module.exports={
    validateSignUpData,
    validateEditProfileData,
}