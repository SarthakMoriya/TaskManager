const taskController = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const User = require("../models/userModel");
const Task = require("../models/taskModel");

taskController.get("/getall", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ author: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message:
        "Something went wrong fetching your tasks, Please try again or login again",
      error: error.message,
    });
  }
});

taskController.patch("/update/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const task = await Task.findById(id);

    if (!task) throw new Error("Task not found");
    task.title = req.body.title;
    task.desc = req.body.desc;
    task.status = req.body.status;

    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({
      message:
        "Something went wrong updating your tasks, Please try again later",
      error: error.message,
    });
  }
});

taskController.post("/create", verifyToken, async (req, res) => {
  try {
    const task = await Task.create({ ...req.body });
    res.status(200).json({ message: "Task created successfully", task: task });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong adding your tasks, Please try again later",
      error: error.message,
    });
  }
});

taskController.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task Deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong adding your tasks, Please try again later",
      error: error.message,
    });
  }
});

taskController.get("/getOneTask/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const task = await Task.findById(req.params.id);
    console.log(task);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong adding your tasks, Please try again later",
    });
  }
});
module.exports = taskController;
