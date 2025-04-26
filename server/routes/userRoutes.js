const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const photoController = require("../controllers/photoController");
const userController = require("../controllers/userController");

//Non Token Routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword/:token", authController.resetPassword);

//Logged In Routes
router.use(authController.protect)

router.get("/getMe", userController.getMe, userController.getUser);
router.patch("/updatePassword", authController.updatePassword);
router.post("/logout", authController.logout);
router.patch(   
    '/updateMe', 
    photoController.processPhotoUpload('users'),
    userController.updateMe
);

//Admin Routes
router.use(authController.restrictTo("admin"))

router
    .route("/")
    .post(userController.createUser)
    .get(userController.getAllUsers)

router
    .route("/:id")
    .get(userController.getUser)
    .delete(userController.deleteUser)

module.exports = router;