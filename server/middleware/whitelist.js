const hpp = require('hpp');

// Export the middleware directly
module.exports = hpp({
  whitelist: [
    'duration',
    'ratingsAverage',
    'ratingsQuantity',
    'maxGroupSize',
    'difficulty',
    'price'
  ]
});
