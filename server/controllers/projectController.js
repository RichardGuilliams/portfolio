const Project = require("../models/projectModel");
const handler = require("./handlerFactory");
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.GetAllProjects = handler.getAll(Project);
exports.deleteAllProjects = handler.deleteAll(Project);
exports.GetProject = handler.getOne(Project);
exports.deleteProject = handler.deleteOne(Project);
exports.createProject = handler.createOne(Project);
exports.updateProject = handler.updateOne(Project);