const jwt = require("jsonwebtoken");
const Project = require("../models/Project");
const { getProject, getProjectById } = require("../services/projectService");
const { findUserByUsername, getUserByEmail, getUserById } = require("../services/userService");



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

        res.status(200).json({ message: "Successfully created a project!" });



    } catch (err) {
        res.json({ error: err.message });
    }

}

const getProjectController = async (req, res) => {
    const projectId = req.params.id;
    const token = req.headers.token;
    try {
        await jwt.verify(token, process.env.jwtPrivateKey);
        const projectData = await getProject(projectId);
        res.json({ project: projectData });
    } catch (err) {
        res.json({ error: err.message });
    }
}


const inviteUser = async (req, res) => {
    const { email, projectId } = req.body;
    const { token } = req.headers;



    try {
        const PM = await jwt.verify(token, process.env.jwtPrivateKey);

        console.log(PM);
        // get user by email
        const user = await getUserByEmail(email);

        if (!user) {
            throw Error("User with that email doesn't exist!");
        }

        // get project
        const project = await getProjectById(projectId)


        if(String(project.lead._id) !== String(PM._id)) {
            throw Error("You are not the manager of the project!");
        }



        if (!project.participants.includes(user._id) && !user.projects.includes(project._id)) {
            project.participants.push(user._id);
            user.projects.push(project._id);
        } else {
            throw Error("That user is already in the project!");
        }


        await user.save()
        await project.save()

        res.json({ user });
    } catch (error) {
        res.json({ error: error.message });
    }

}


const leaveParticipant = async (req, res) => {
    const { projectId, participantId } = req.body;
    try {
        const project = await getProjectById(projectId);
        const participant = await getUserById(participantId);



        project.participants = project.participants.filter(id => String(id) !== String(participant._id));
        participant.projects = participant.projects.filter(id => String(id) !== String(project._id));


        await project.save();
        await participant.save();

        res.json({ msg: "Successfully left the project!" });
    } catch (error) {
        res.json({ error: error.message });
    }
}


const leaveManager = async (req, res) => {
    const { projectId, participantId, pmEmail } = req.body;

    const { token } = req.headers;

    try {

        const PM = await jwt.verify(token, process.env.jwtPrivateKey);

        const project = await getProjectById(projectId);

        if(String(project.lead._id) !== String(PM._id)) {
            throw Error("You are not the manager of the project!");
        }

        const participant = await getUserById(participantId);
        const newPm = await getUserByEmail(pmEmail);

        if (!newPm) {
            throw Error("There is no user with that email!");
        }


        project.participants = project.participants.filter(id => String(id) !== String(participant._id));
        participant.projects = participant.projects.filter(id => String(id) !== String(project._id));

        let isTheNewPmAParticipant = false;
        if (project.participants.includes(newPm._id)) {
            isTheNewPmAParticipant = true;
        }

        if (isTheNewPmAParticipant) {
            project.lead = newPm._id;
        } else {
            throw Error("There is no participant with that email!");
        }


        await project.save();
        await participant.save();

        res.json({ msg: "Successfully left the project!" });
    } catch (error) {
        res.json({ error: error.message });
    }
}

module.exports = {
    projectsController,
    getProjectController,
    inviteUser,
    leaveParticipant,
    leaveManager
}