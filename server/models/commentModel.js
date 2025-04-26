const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    poster:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "A comment must have a User"]
    },
    text:{
        type: String,
        required: [true, "A comment must contain text"]
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    reply:{
        type: mongoose.Schema.ObjectId,
        ref: Comment,
    }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment;