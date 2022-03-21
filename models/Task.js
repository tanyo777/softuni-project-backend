const { Schema, model} = require("mongoose");


const taskSchema = new Schema({
    project: { type: String, required: true},
    issueType: { type: String, required: true},
    summary: { type: String, required: true},
    creator: { type: Schema.Types.ObjectId, ref: "user"},
    assignedTo: { type: Schema.Types.ObjectId, ref: 'user'},
    description: { type: String, required: true},
    project: { type: Schema.Types.ObjectId, ref: "project"}
}, { timestamps: true});


const Task = model("task", taskSchema);

module.exports = Task;