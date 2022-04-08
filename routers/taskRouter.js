const taskRouter = require("express").Router();
const {isAuthenticated} = require("../middleware/auth");
const { createTaskHandler,deleteTaskHandler, updateTaskStatusHandler, updateTaskProperties } = require("../controllers/TasksController");


taskRouter.post("/tasks", isAuthenticated, createTaskHandler);
taskRouter.delete('/tasks/:id', isAuthenticated, deleteTaskHandler);
taskRouter.post("/task/status", isAuthenticated, updateTaskStatusHandler);
taskRouter.post("/task/update", isAuthenticated, updateTaskProperties);

module.exports = {
    taskRouter
}