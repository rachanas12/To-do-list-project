const express=require("express")
let taskRouter=express.Router()
const Task=require("../models/Task")
const { getTask, getData, putTask, deleteTask, createTask } = require("../controllers/taskController")


taskRouter.get("/",getTask)
taskRouter.post("/",createTask)
taskRouter.get("/:id",getData)
taskRouter.put("/:id",putTask)

taskRouter.delete("/:id",deleteTask)

module.exports=taskRouter;


