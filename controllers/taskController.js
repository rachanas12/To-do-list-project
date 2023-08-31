const Task=require("../models/Task")
const status=require("../models/Task")

const getTask=async (req,res)=>{
    //res.send("this is task-man")
    try{
        let tasks=await Task.find().lean()//lean()=to read the data properly
       
        res.render("home",{tasks:tasks,status:status})
    }
    catch(error){
        console.log(error);
    }
}

const createTask=async (req,res)=>{
    let {task}=req.body
    let {status}=req.body
    try{
        let duplicate=await Task.findOne({task:task})
        if(duplicate){
            return res.redirect("/task")
        }else{
            await Task.create({
                task :task })
                await status.create({
                    status:status
                })
                res.redirect("/task")

        }

    }
    catch(error){
        console.log(error);
        res.status(401).json({
            message:"con't create task"
        })
    }
}
const getData=async (req,res)=>{
    let id=req.params.id
    try{
        let task=await Task.findOne({_id:id}).lean()//lean()=to read the data properly
        let status=await status.findOne({_id:id}).lean()//lean()=to read the data properly

        res.render("update",{task})
    }
    catch(error){
        console.log(error);
    }
}
const putTask=async(req,res)=>{
    let id=req.params.id
    let {task}=req.body
    let {status}=req.body
    try{
        await Task.updateOne({_id:id},{$set:{task:task}})
        await status.updateOne({_id:id},{$set:{status:status}})

        res.redirect("/task")
    }
    catch(error){
        console.log(error);
        res.redirect("/:id")
    }
}

const deleteTask=async(req,res)=>{
    let id=req.params.id
    
    try{
        await Task.deleteOne({_id:id})
        res.redirect("/task")
    }
    catch(error){
        console.log(error);
        res.redirect("/task")
    }
}

module.exports={
    getTask,createTask,getData,putTask,deleteTask
}