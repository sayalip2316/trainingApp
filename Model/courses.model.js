const mongoose=require("mongoose")

const courseSchema=mongoose.Schema({
    Image:{
        type: String,
        required: true,
    },
    Title : {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Instructor : {
        type: String,
        required: true,
    },
    Rating : {
        type: Number,
        required: true,
    },
    Level : {
        type: String,
        required: true,
    },
    Price:{
        type: Number,
        required: true,
    }
})

const CourseModel=mongoose.model("course",courseSchema)

module.exports={CourseModel}