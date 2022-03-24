const { Schema, model} = require("mongoose");


const taskSchema = new Schema({
    // project: { type: String, required: true},
    issueType: { type: String, required: true},
    summary: { type: String, required: true},
    reporter: { type: Schema.Types.ObjectId, ref: "user"},
    // assignedTo: { type: Schema.Types.ObjectId, ref: 'user'},
    description: { type: String},
    priority: { type: String},
    project: { type: Schema.Types.ObjectId, ref: "project"}
}, { timestamps: true});


const Task = model("task", taskSchema);

module.exports = Task;