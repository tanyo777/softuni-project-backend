const Project = require("../models/Project");


const getProject = async (id) => {
    // const project = await Project.findById(id).populate('participants').populate('lead').populate('tasks');
    const project = await Project.findById(id).populate('participants').populate('lead');
    return project;
}


module.exports = {
  getProject  
}