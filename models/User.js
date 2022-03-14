const { Schema, model } = require('mongoose');



const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String , required: true},
    projects: {type: [Schema.Types.ObjectId], ref: "project", default: []}
});


userSchema.index({ email: 1}, { unique: true });

const User = model("user", userSchema);



module.exports = User;