const jwt = require("jsonwebtoken");
const Project = require("../models/Project");
const { getProject } = require("../services/projectService");
const { findUserByUsername } = require("../services/userService");



const projectsController = async (req, res) => {
    const token = req.headers.token;
    const { name, key, projectType, projectCategory, description } = req.body;

    try {
        const verified = await jwt.verify(token, process.env.jwtPrivateKey);

  

            const user = await findUserByUsername(verified.username);

       
            console.log(user);
        const project = new Project({
            name,
            key,
            projectType,
            projectCategory,
            description,
            lead: user._id,
            participants: [user._id]
        });


        // project id and save the created project
        const projectId = project._id;
        await project.save();

        user.projects.push(projectId);
        await user.save();

        res.status(200).json({message: "Successfully created a project!"});

        
        
    } catch(err) {
        res.json({error: err.message});
    }

}

const getProjectController = async (req, res) => {
    const projectId = req.params.id;
    const token = req.headers.token;
    try {
        await jwt.verify(token, process.env.jwtPrivateKey);
        const projectData = await getProject(projectId);
        res.json({project: projectData});
    } catch(err) {
        res.json({error: err.message});
    }
}

module.exports = {
    projectsController,
    getProjectController
}