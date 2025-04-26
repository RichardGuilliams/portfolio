const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "A Project must have a name."]
    },
    url:{
        type: String,
        required: [true, "A project must contain a valid url."]
    },
    description:{
        type: String,
        required: [true, "A project must contain a description."]
    },
    photo:{
        type: String,
        required: [true, "A project must contain a photo to be used as a thumbnail."]
    }
})

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;