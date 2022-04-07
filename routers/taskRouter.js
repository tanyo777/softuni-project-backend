const taskRouter = require("express").Router();
const {isAuthenticated} = require("../middleware/auth");
const { createTaskHandler,deleteTaskHandler, updateTaskStatusHandler } = require("../controllers/TasksController");


taskRouter.post("/tasks", isAuthenticated, createTaskHandler);
taskRouter.delete('/tasks/:id', isAuthenticated, deleteTaskHandler);
taskRouter.post("/task/status", isAuthenticated, updateTaskStatusHandler);

module.exports = {
    taskRouter
}