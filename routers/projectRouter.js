const { isAuthenticated } = require("../middleware/auth");
const { projectsController, getProjectController, inviteUser, leaveParticipant, leaveManager} = require("../controllers/ProjectsController");
const projectRouter = require("express").Router();



projectRouter.post("/projects", isAuthenticated, projectsController);
projectRouter.get("/projects/:id", isAuthenticated, getProjectController);
projectRouter.post("/user/invite", isAuthenticated, inviteUser);


// leave feature
projectRouter.post("/project/leave-participant", isAuthenticated, leaveParticipant);
projectRouter.post("/project/leave-manager", isAuthenticated, leaveManager);


module.exports = {
    projectRouter
}