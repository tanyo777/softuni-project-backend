const { createTask } = require("../services/taskService");
const jwt = require('jsonwebtoken');
const { getProjectByKey } = require('../services/projectService');


const createTaskHandler = async (req, res) => {
    const { project, issueType, summary, description, priority } = req.body;

    try {
        const token = req.headers.token;

        // verify user
        const user = jwt.verify(token, process.env.jwtPrivateKey);
        const id = user.id;

        // get the project by key
        let selectedProject = await getProjectByKey(project);
        console.log(selectedProject);


        // create the task
        const task = await createTask(issueType, summary, id, description, priority, selectedProject._id);



        // add the task to the project
        selectedProject.tasks.push(task._id);
        await selectedProject.save();

        res.json({msg: "Successfully created a task!"});
    } catch(err) {
        res.json({error: err.message});
    }

}



module.exports = {
    createTaskHandler
}