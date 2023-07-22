const express=require("express")
const courseRoute=express.Router()
const {CourseModel}=require("../Model/courses.model")

courseRoute.post("/add",async(req,res)=>{
    try {
        const model=new CourseModel(req.body)
        await model.save()
        res.status(200).send({msg:"Course added successfully"})
    } catch (error) {
        res.status(400).send({msg:error})
    }
})

courseRoute.get("/",async(req,res)=>{
    try {
        const data=await CourseModel.find()
        res.json(data)
    } catch (error) {
        res.status(400).send({msg:error})
    }
})

courseRoute.get("/search", async (req, res) => {
    try {
        const Title=req.query.Title
        const query = Title ? { Title: { $regex: Title, $options: "i" } } : {};
        const data = await CourseModel.find(query);
        res.json(data);
    } catch (error) {
        res.status(400).send({msg:error})
    }
   
  });

  courseRoute.get("/rating/:sortOrder", async (req, res) => {
    const sortOrder = req.params.sortOrder; // Possible values: "asc" or "desc"
    try {
        let data;
        if (sortOrder === "asc") {
            data = await CourseModel.find().sort({ Rating: 1 });
        } else if (sortOrder === "desc") {
            data = await CourseModel.find().sort({ Rating: -1 });
        } else {
            return res.status(400).send({ msg: "Invalid sortOrder. Use 'asc' or 'desc'." });
        }
        res.json(data);
    } catch (error) {
        res.status(400).send({ msg: error });
    }
});

courseRoute.get("/price/:sortOrder", async (req, res) => {
    const sortOrder = req.params.sortOrder; // Possible values: "asc" or "desc"
    try {
        let data;
        if (sortOrder === "asc") {
            data = await CourseModel.find().sort({ Price: 1 });
        } else if (sortOrder === "desc") {
            data = await CourseModel.find().sort({ Price: -1 });
        } else {
            return res.status(400).send({ msg: "Invalid sortOrder. Use 'asc' or 'desc'." });
        }
        res.json(data);
    } catch (error) {
        res.status(400).send({ msg: error });
    }
});





module.exports={courseRoute}