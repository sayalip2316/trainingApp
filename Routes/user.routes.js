const express=require("express")
const {UserModel}=require("../Model/user.model")
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {client}=require("../Connections/redis");
const nodeMailer=require("nodemailer")
const userRouter=express.Router()
const {validation}=require("../middleware/validation.middleware")

// DEPLOYED LINK
// https://determined-cuff-links.cyclic.app/

userRouter.post("/register",validation,async(req,res)=>{
const {Firstname, Lastname, email, password}=req.body
try {
    bcrypt.hash(password, 5, async function (err, hash) {
        if (err) {
           res.send({ "msg": "something went wrong", "error": err.message })
        }else{
            const user=new UserModel({Firstname, Lastname, email, password:hash})
            await user.save()
            res.status(200).send({"msg":"Registration has been done!"})
        }
    })
            
} catch (error) {
    res.status(400).send({"msg":error.message})
}
})


// userRouter.post("/login",async(req,res)=>{
// const{email,password}=req.body
// try {
//     const user=await UserModel.findOne({email})
//    if(user){
//     bcrypt.compare(password, user.password,async(err, result)=> {
//         if(result){
//             res.status(200).send({"msg":"login successfull","token":jwt.sign({"userID":user._id},"masai")})
//         }else{
//             res.status(400).send({"msg":"Wrong credentials"})
//         }
      
//     });
   
//    }
// } catch (error) {
//     res.status(400).send("Wrong Credentials")
// }
// })


// generate otp and send to client and also store it in redis.

// 


userRouter.post("/sendmail",async(req,res)=>{
    const {email}=req.body;
    try{
        let user= await UserModel.findOne({email});
        if(user){
            async function main(){
                let transporter = nodeMailer.createTransport({
                  host: "smtp.gmail.com",
                  port: 587,
                  secure: false, // true for 465, false for other ports
                  auth: {
                    user:"joestheticclub@gmail.com",
                    pass:"bhfhyuylyvzfjpls" // generated ethereal password
                  },
                });
              
                const otp = Math.floor(100000 + Math.random() * 900000);
                client.set(otp, otp, "EX", 300);
            
                let info = await transporter.sendMail ({
                  from: 'joestheticclub@gmail.com', // sender address
                  to: user.email, // list of receivers
                  subject: "OTP Verification", // Subject line
                  text: `Your OTP for Joesthetic Club verification : ${otp}`, // plain text body
                });
                if(info){
                    res.status(200).send({msg:"Mail sent successfully"}) 
                }else{
                    res.status(400).send({msg:"Internal Errord"})
                }
                
            }
            main();
            
        }else{
            res.status(400).send({msg:"User not found"})
        }
        
    }catch(err){
        res.status(401).send(err);
    }
});

//verify otp from redis

userRouter.post("/verify",async(req,res)=>{
    try{
        const {otp}=req.body;
        const data= await client.get(otp);
        // console.log(data);
        if(otp==data){
            res.status(200).send({"msg":true});
        }else{
            res.status(400).send({"msg":false});
        }

    }catch(err){
        res.status(401).send({"error":err});
    }
})







module.exports={userRouter}