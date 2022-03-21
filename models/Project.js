const { Schema, model} = require("mongoose");


const projectSchema = new Schema({
    name: { type: String, required: true},
    key: { type: String, required: true },
    projectType: { type: String, required: true},
    projectCategory: {type: String, required: true},
    description: { type: String },
    lead: { type: Schema.Types.ObjectId, ref: "user" },
    participants: { type: [Schema.Types.ObjectId], ref: "user", default: []},
    tasks: { type: [Schema.Types.ObjectId], ref: "task", default: []}
}, { timestamps: true });


const Project = model("project", projectSchema);

module.exports = Project;