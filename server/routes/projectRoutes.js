const express = require("express");
const router = express.Router();
const projectController = require("./../controllers/projectController");
const photoController = require("./../controllers/photoController");
const authController = require("./../controllers/authController");

router
    .route("/")
    .get(projectController.GetAllProjects);

router
    .route("/:id")
    .get(projectController.GetProject);

router.use(authController.protect, authController.restrictTo('admin'));

router
    .route("/")
    .post((req, res, next) => {
        console.log(req.body)
        next();
    },
    photoController.processSinglePhotoUpload("projectImage", "projects"), 
    projectController.createProject)

router
    .route("/:id")
    .delete(projectController.deleteProject)
    .patch(projectController.updateProject);
    

    module.exports = router