const sharp = require('sharp');
const multer = require('multer');
const AppError = require('../utils/appError'); // adjust if needed
const catchAsync = require('../utils/catchAsync'); // adjust if needed

// // Store image in memory
const multerStorage = multer.memoryStorage();

// // Filter only images
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please only upload images.', 400), false);
  }
};

// // Set up multer upload
// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter
// });

// // Middleware to upload photo from 'photo' field
// const uploadPhoto = upload.single('photo');

// // Middleware to resize and save image
// const resizePhoto = (folder) =>
//   catchAsync(async (req, res, next) => {
//     if (!req.file) return next();

//     // JSON parse for 'blocks' if sent via multipart/form-data
//     if (typeof req.body.blocks === 'string') {
//       try {
//         req.body.blocks = JSON.parse(req.body.blocks);

//         // Ensure deep parsing of each block's `sections` if those were also stringified
//         req.body.blocks = req.body.blocks.map((block) => ({
//           ...block,
//           sections: typeof block.sections === 'string' ? JSON.parse(block.sections) : block.sections,
//         }));
//       } catch (err) {
//         return next(new AppError('Invalid JSON structure in blocks.', 400));
//       }
//     }

//     req.file.filename = `${folder.slice(0, folder.length - 1)}-${req.user.id}-${Date.now()}.jpeg`;

//     await sharp(req.file.buffer)
//       .resize(500, 500)
//       .toFormat('jpeg')
//       .jpeg({ quality: 90 })
//       .toFile(`public/images/${folder}/${req.file.filename}`);

//     // Inject the filename into the body for mongoose save
//     req.body.thumbnail = `images/${folder}/${req.file.filename}`;

//     next();
//   });


// // Combines upload + resize
// exports.processPhotoUpload = (folder) => [
//   uploadPhoto,
//   resizePhoto(folder)
// ];


// Shared config
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

// SINGLE: Upload & resize just one image (for simple routes)
const uploadSingle = (fieldName, folder) => [
  upload.single(fieldName),
  resizeSingle(fieldName, folder)
];

const resizeSingle = (fieldName, folder) =>
  catchAsync(async (req, res, next) => {
    console.log(req.body);
    if (!req.file) return next();
    const filename = `${folder}-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/images/${folder}/${filename}`);

    req.body.photo = `images/${folder}/${filename}`;
    next();
  });

// MULTI: Upload & resize multiple named fields (for complex forms)
const uploadMulti = upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'sectionsImages', maxCount: 10 }
]);

const resizeMulti = (folder) =>
  catchAsync(async (req, res, next) => {
    if (!req.files) return next();

    // Parse JSON blocks if needed
    if (typeof req.body.blocks === 'string') {
      try {
        req.body.blocks = JSON.parse(req.body.blocks);
      } catch (err) {
        return next(new AppError('Invalid JSON in blocks.', 400));
      }
    }

    // Handle thumbnail
    if (req.files.thumbnail) {
      const file = req.files.thumbnail[0];
      const filename = `thumbnail-${req.user.id}-${Date.now()}.jpeg`;

      await sharp(file.buffer)
        .resize(500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/${folder}/${filename}`);

      req.body.thumbnail = `images/${folder}/${filename}`;
    }

    // Handle sectionsImages
    if (req.files.sectionsImages) {
      req.body.sectionsImages = [];


      await Promise.all(
        req.files.sectionsImages.map(async (file, i) => {
          try {
            const filename = `section-${req.user.id}-${Date.now()}-${i}.jpeg`;
      
            await sharp(file.buffer)
              .resize(800)
              .toFormat('jpeg')
              .jpeg({ quality: 85 })
              .toFile(`public/images/${folder}/${filename}`);
      
            req.body.sectionsImages.push(`images/${folder}/${filename}`);

            for(const block of req.body.blocks){
              for(const section of block.sections){
                if(section.name === file.originalname) section.content = `images/${folder}/${filename}`  
              }
            }
    
          } catch (error) {
            console.error('Error processing file', error);
          }
        })
      );
    }
    next();
  });

exports.processSinglePhotoUpload = (fieldName, folder) => uploadSingle(fieldName, folder);
exports.processPhotoUpload = (folder) => [uploadMulti, resizeMulti(folder)];
