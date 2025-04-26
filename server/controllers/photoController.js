const sharp = require('sharp');
const multer = require('multer');
const AppError = require('../utils/appError'); // adjust if needed
const catchAsync = require('../utils/catchAsync'); // adjust if needed

// Store image in memory
const multerStorage = multer.memoryStorage();

// Filter only images
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please only upload images.', 400), false);
  }
};

// Set up multer upload
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

// Middleware to upload photo from 'photo' field
const uploadPhoto = upload.single('photo');

// Middleware to resize and save image
const resizePhoto = (folder) => catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  // Create filename based on user
  req.file.filename = `${folder.slice(0, folder.length - 1)}-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/images/${folder}/${req.file.filename}`);

  next();
});

// Combines upload + resize
exports.processPhotoUpload = (folder) => [
  uploadPhoto,
  resizePhoto(folder)
];
