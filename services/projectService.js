const Project = require("../models/Project");


const getProject = async (id) => {
    // const project = await Project.findById(id).populate('participants').populate('lead').populate('tasks');
    const project = await Project.findById(id).populate('participants').populate('lead').populate('tasks');
    return project;
}

const getProjectByKey = async (key) => {
  const project = await Project.findOne({key});
  return project;
}


module.exports = {
  getProject,
  getProjectByKey
}