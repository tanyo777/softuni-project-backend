const taskRouter = require("express").Router();
const {isAuthenticated} = require("../middleware/auth");
const { createTaskHandler } = require("../controllers/TasksController");


taskRouter.post("/tasks", isAuthenticated, createTaskHandler);


module.exports = {
    taskRouter
}