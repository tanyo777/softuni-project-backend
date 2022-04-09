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


const deleteTask = async (id) => {
    await Task.findByIdAndRemove(id);
    return "Task successfully deleted!";
}

const updateTaskStatus = async (id, status) => {


    const task = await Task.findByIdAndUpdate(id, { status });
    return task;
}

const updateTask = async (id, { summary, issueType, priority, description, createdAt, updatedAt, assignedTo }) => {

    
    let task = await Task.findByIdAndUpdate(id, { summary, issueType, priority, description, createdAt, updatedAt, assignedTo});
    return task;
}

module.exports = {
    createTask,
    deleteTask,
    updateTaskStatus,
    updateTask
}