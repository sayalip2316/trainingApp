const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    Firstname : String,
    Lastname: String,
    email : String,
    password : String
})

const UserModel=mongoose.model("user",userSchema)

module.exports={UserModel}