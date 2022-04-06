const taskRouter = require("express").Router();
const {isAuthenticated} = require("../middleware/auth");
const { createTaskHandler,deleteTaskHandler } = require("../controllers/TasksController");


taskRouter.post("/tasks", isAuthenticated, createTaskHandler);
taskRouter.delete('/tasks/:id', isAuthenticated, deleteTaskHandler);

module.exports = {
    taskRouter
}