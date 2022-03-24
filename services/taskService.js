const Task = require("../models/Task");


const createTask =  async (issueType, summary, reporter, description, priority, project) => {

        // create task
        const task = new Task({
            issueType,
            summary,
            reporter, // creator id
            // assignedTo, // user id
            description,
            priority,
            project // project id
        });
        await task.save();
    
        return task;

}


module.exports = {
    createTask
}