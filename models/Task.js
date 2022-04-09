const { Schema, model} = require("mongoose");


const taskSchema = new Schema({
    issueType: { type: String, required: true},
    summary: { type: String, required: true},
    reporter: { type: Schema.Types.ObjectId, ref: "user"},
    assignedTo: { type: String, default: ""},
    description: { type: String},
    priority: { type: String},
    project: { type: Schema.Types.ObjectId, ref: "project"},
    status: { type: String, required: true, default: 'To do'}
}, { timestamps: true});


const Task = model("task", taskSchema);

module.exports = Task;