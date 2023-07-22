const express=require("express")
const {connection}=require("./Connections/db")
const {userRouter}=require("./Routes/user.routes")
const {courseRoute}=require("./Routes/courses.routes")

require("dotenv").config()
const cors = require('cors')
const app=express()
app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
app.use("/course",courseRoute)




app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to db")
        console.log(`Server is running at port ${process.env.PORT}`)
    } catch (error) {
        console.log("Cannot Connected to db")
        console.log(error)
    }
    
})