const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  type:{
    type: String,
    enum: ["p", "h1", "h2", "h3", "img", "a"],
    default: "h1"
  },
  content:{
    type: String,
    default: "This is the content"
  }
})

const blockSchema = new mongoose.Schema({
  sections: {
    type: [sectionSchema]
  },
  layout: {
    type: String,
    enum: ["horizontal", "vertical"],
    default: "vertical",
  },
  alignment: {
    type: String,
    enum: ["start", "center", "end"],
    default: "start",
  },
  display: {
    type: String,
    enum: ["flex", "block"],
    default: "block"
  }
});

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  thumbnail: {
    type: String,
    // required: [true, 'A post needs to have a url for a thumbnail image.']
  },
  blocks: {
    type: [blockSchema],
    // required: [true, "A post needs to have a block attached."]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
