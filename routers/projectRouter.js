const { isAuthenticated } = require("../middleware/auth");
const { projectsController, getProjectController, inviteUser} = require("../controllers/ProjectsController");
const projectRouter = require("express").Router();



projectRouter.post("/projects", isAuthenticated, projectsController);
projectRouter.get("/projects/:id", isAuthenticated, getProjectController);
projectRouter.post("/user/invite", isAuthenticated, inviteUser);


module.exports = {
    projectRouter
}