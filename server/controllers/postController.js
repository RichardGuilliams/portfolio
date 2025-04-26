const Post = require("../models/postModel");
const handler = require("./handlerFactory");

exports.createPost = handler.createOne(Post);
exports.getAllPosts = handler.getAll(Post);
exports.getPostById = handler.getOne(Post);
exports.deletePost = handler.deleteOne(Post);
exports.deleteAllPosts = handler.deleteAll(Post);
exports.updatePost = handler.updateOne(Post);