const { createTask, deleteTask, updateTaskStatus, updateTask } = require("../services/taskService");
const jwt = require("jsonwebtoken");
const { getProjectByKey } = require("../services/projectService");

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
    const task = await createTask(
      issueType,
      summary,
      id,
      description,
      priority,
      selectedProject._id
    );

    // add the task to the project
    selectedProject.tasks.push(task._id);
    await selectedProject.save();

    res.json({ msg: task});
  } catch (err) {
    res.json({ error: err.message });
  }
};

const deleteTaskHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteMessage = await deleteTask(id);

    res.status = 200;
    res.json({ msg: deleteMessage });
  } catch (err) {
    res.status = 500;
    res.json({ error: err.message });
  }
};

const updateTaskStatusHandler = async (req, res) => {
  const { id, status } = req.body; 
  try {
    const updatedTask = await updateTaskStatus(id, status);
    console.log(updatedTask);
    res.json({ msg: "Task's status successfully updated!" });
  } catch(err) {
    res.json({ error: "Task's status cannot be changed!" });
  }
}

const updateTaskProperties = async (req, res) => {
  const { id, properties } = req.body;

  console.log(id, properties);

  try {
    const task = await updateTask(
      id, 
      { 
        summary: properties.summary,
        issueType: properties.issueType,
        priority: properties.priority,
        description: properties.description,
        createdAt: properties.createTask,
        updatedAd: properties.updatedAt,
        assignedTo: properties.assignedTo 
      }
    );
    console.log(task);
    res.json({ task });
  } catch(err) {
    res.json({ error: "Task's status cannot be changed!" });
  }
}

module.exports = {
  createTaskHandler,
  deleteTaskHandler,
  updateTaskStatusHandler,
  updateTaskProperties
};
