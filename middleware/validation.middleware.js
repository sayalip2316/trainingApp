const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
function validation(req,res,next){
    const {Firstname, Lastname, email, password}=req.body
   
    if(!Firstname){
        res.send({msg:"Please Enter FirstName"})
    }
    if(!Lastname){
        res.send({msg:"Please Enter LastName"})
    }
    if(!email){
        res.send({msg:"Please Enter Email"})
    }
    if(!password){
        res.send({msg:"Please Enter Password"})
    }
    if(!emailRegex.test(email)){
        res.send({msg:"Please Enter valid Email"})
    }
    if(!passwordRegex.test(password)){
        res.send({msg:"Password must be at least 8 characters long, including an uppercase letter, a lowercase letter, a digit, and a special character."})
    }
    next()
}

module.exports = {validation}