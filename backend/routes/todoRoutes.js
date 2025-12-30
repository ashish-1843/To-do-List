const express = require("express");
const Todo = require("../models/Todo");
const { toast } = require("react-toastify");
const router = express.Router();

//Add todo

router.post("/", async(req,res) =>{
    const todo = new Todo(req.body);
    await todo.save();
    res.json(todo);
});

//get todo by date

router.get("/:date", async(req,res) =>{
    const todos = await Todo.find({date : req.params.date});
    res.json(todos);
    
});

//update todo
router.put("/:id", async(req,res) =>{
    const updateTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    res.json(updateTodo);
});

//delete todo
router.delete("/:id", async(req,res) =>{
    await Todo.findByIdAndDelete(
        req.params.id
    );
    res.json({message : "Todo deleted"});
});

module.exports = router;