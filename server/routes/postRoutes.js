const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");
const photoController = require("../controllers/photoController");
const multer = require("multer");
const upload = multer({ dest: "public/images/posts" });

router
    .route("/")
    .get(postController.getAllPosts)

router
    .route("/:id")
    .get(postController.getPostById)

router.use(authController.protect, authController.restrictTo("admin"));

router
    .route('/')
    .post(
        photoController.processPhotoUpload('thumbnail'),
        postController.createPost)
    .delete(postController.deleteAllPosts)

router
    .route('/:id')
    .delete(
        photoController.processPhotoUpload('posts'),
        postController.deletePost
    )
    .patch(
        photoController.processPhotoUpload('posts'),
        postController.updatePost
    )

module.exports = router;