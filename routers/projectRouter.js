const { isAuthenticated } = require("../middleware/auth");
const { projectsController, getProjectController } = require("../controllers/ProjectsController");
const projectRouter = require("express").Router();



projectRouter.post("/projects", isAuthenticated, projectsController);
projectRouter.get("/projects/:id", isAuthenticated, getProjectController);

module.exports = {
    projectRouter
}