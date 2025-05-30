const User = require("../models/userModel");
const handler = require("./handlerFactory");
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Email = require("./../utils/email");

const filterObj = (obj, ...allowedFields) => {
	const newObj = {};
	Object.keys(obj).forEach(el => {
		if (allowedFields.includes(el)) newObj[el] = obj[el];
	});
	return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
	// 1) Create error if user POSTs password data
	if (req.body.password || req.body.passwordConfirm) {
		return next(
			new AppError(
				'This route is not for password updates. Please use /updateMyPassword.',
				400
			)
		);
	}

	// 2) Filtered out unwanted fields names that are not allowed to be updated
	const filteredBody = filterObj(req.body, 'name', 'email');
	if (req.file) filteredBody.photo = req.file.filename;

	// 3) Update user document
	const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
		new: true,
		runValidators: true
	});

	res.status(200).json({
		status: 'success',
		data: {
			user: updatedUser
		}
	});
});

exports.createUser = async (req, res) => {
	const newUser = new User(req.body);
	await newUser.save();
	res.status(201).json(newUser);
};

exports.getMe = (req, res, next) => {
	req.params.id = req.user.id;
	next();
};

exports.sendEmail = async (req, res) => {
	const { from, subject, message } = req.body;
	const user = {
		name: from,
		to: "contact@richardguilliams.dev",
	}
	await new Email(user,).sendMessage(from, subject, message)
	res.status(200).json({
		"message": "sent email successfully."
	})
};

exports.getAllUsers = handler.getAll(User);
exports.getUser = handler.getOne(User);
exports.deleteUser = handler.deleteOne(User);
exports.deleteAllUsers = handler.deleteAll(User);
