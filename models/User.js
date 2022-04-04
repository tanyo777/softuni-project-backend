const { Schema, model } = require('mongoose');



const userSchema = new Schema({
    fullName: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String , required: true, minlength: [6, "Password must be atleast 6 characters!"]},
    projects: {type: [Schema.Types.ObjectId], ref: "project", default: []},
    tasks: {type: [Schema.Types.ObjectId], ref: "task", default: []},
    hasProfilePicture: { type: Boolean, default: false}
}, { timestamps: true });


userSchema.index({ email: 1}, { unique: true });
userSchema.index({ username: 1}, { unique: true });

const User = model("user", userSchema);



module.exports = User;